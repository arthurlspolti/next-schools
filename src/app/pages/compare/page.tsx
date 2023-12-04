"use client";
import React, { useState } from "react";
import Dropdown from "@/app/components/compareSchools/Dropdown";
import CompareSchools from "@/app/components/compareSchools/CompareSchools";
import Link from "next/link";
import {
  SchoolYearsDropdown,
  YearDropdown,
} from "@/app/components/compareSchools/YearAndSchoolYear";

export default function Compare() {
  const [selectedSchool1, setSelectedSchool1] = useState("");
  const [selectedSchool2, setSelectedSchool2] = useState("");
  const [SelectYear, setSelectedSchool3] = useState("");
  const [SelectSchoolYears, setSelectedSchool4] = useState("");

  const handleSelectSchool1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool1(event.target.value);
  };

  const handleSelectSchool2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool2(event.target.value);
  };

  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool3(event.target.value);
  };
  const handleSelectSchoolYears = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSchool4(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center self-start w-[98%] p-2">
        <Link href="/pages/details">
          <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
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
          {selectedSchool1 && selectedSchool2 && (
            <>
              <YearDropdown onChange={handleSelectYear} />
              <SchoolYearsDropdown onChange={handleSelectSchoolYears} />
            </>
          )}
        </div>
      </div>
      <CompareSchools
        school1={selectedSchool1}
        school2={selectedSchool2}
        SelectYear={SelectYear}
        SelectSchoolYears={SelectSchoolYears}
      />
    </div>
  );
}
