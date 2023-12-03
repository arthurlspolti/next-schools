"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import IGetDataResponse, {
  IGetSchoolsNameResponse,
} from "../interfaces/apiResponse";

const RenderTable = ({ data }: { data: IGetDataResponse[] }) => {
  const [dados, setDados] = useState<IGetDataResponse[]>([]);

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
        (item: IGetSchoolsNameResponse) => {
          const schoolNameItem = schoolNamesData.find(
            (school) => school.id_escola === item.id_escola
          );
          return {
            ...item,
            nome_escola: schoolNameItem
              ? schoolNameItem.nome_escola
              : "Desconhecido",
          };
        }
      );

      setDados(dataWithSchoolNames);
    };

    fetchData();
  }, []);

  if (!dados.length) {
    return null;
  }

  const headers = Object.keys(dados[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-xs">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RenderTable;
