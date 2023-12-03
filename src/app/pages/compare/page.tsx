"use client";
import React, { useState } from "react";
import Dropdown from "@/app/components/compareSchools/Dropdown";
import CompareSchools from "@/app/components/compareSchools/CompareSchools";
import Link from "next/link";

export default function Compare() {
  const [selectedSchool1, setSelectedSchool1] = useState("");
  const [selectedSchool2, setSelectedSchool2] = useState("");

  const handleSelectSchool1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool1(event.target.value);
  };

  const handleSelectSchool2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool2(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center self-start w-[98%] p-2">
        <Link href="/pages/details">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Voltar a página de detalhes
          </button>
        </Link>
        <div className="flex justify-end">
          <Dropdown
            onChange={handleSelectSchool1}
            className="w-1/3 border rounded p-2"
          />
          <Dropdown
            onChange={handleSelectSchool2}
            className="w-1/3 border rounded p-2"
          />
        </div>
      </div>
      <CompareSchools school1={selectedSchool1} school2={selectedSchool2} />
    </div>
  );
}
