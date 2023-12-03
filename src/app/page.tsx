"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import RenderTable from "./components/renderTable";
import ColumnSelector from "./components/ColumnSelector";
import IGetDataResponse, {
  IGetSchoolsNameResponse,
} from "./interfaces/apiResponse";
import Link from "next/link";

export default function FilterableTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [dados, setDados] = useState<IGetDataResponse[]>([]);
  const [searchResults, setSearchResults] = useState<IGetDataResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [dataResult, schoolIdsResult] = await Promise.all([
        axios.get("/api/getData"),
        axios.get("/api/getSchoolsName", {
          params: { ids: dados.map((item) => item.id_escola) },
        }),
      ]);

      const filledData = dataResult.data.map((item: IGetDataResponse) => ({
        ...item,
        ...Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value ?? 0])
        ),
      }));

      const schoolNamesData: IGetSchoolsNameResponse[] = schoolIdsResult.data;

      const dataWithSchoolNames = filledData.map(
        (item: IGetSchoolsNameResponse) => ({
          ...item,
          nome_escola:
            schoolNamesData.find(
              (school) => school.id_escola === item.id_escola
            )?.nome_escola || "Desconhecido",
        })
      );

      setDados(dataWithSchoolNames);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = dados.filter((dado) =>
      selectedColumn === ""
        ? Object.values(dado).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        : String(dado[selectedColumn])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, dados, selectedColumn]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(event.target.value);
  };

  if (!dados.length) {
    return null;
  }

  const headers = Object.keys(dados[0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className="w-1/3">
          <ColumnSelector
            columns={headers}
            selectedColumn={selectedColumn}
            onChange={handleColumnChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/3">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="w-1/3">
          <Link
            href="/pages/details"
            className="p-2 bg-blue-500 text-white rounded"
          >
            Detalhes
          </Link>
        </div>
      </div>
      <div className="w-full">
        <RenderTable data={searchResults} />
      </div>
    </div>
  );
}
