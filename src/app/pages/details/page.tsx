"use client";
import React, { useState } from "react";
import BestSaebTableWithData from "@/app/components/bestSaebAverageFilter/BestSaebTableWithData";
import BestSaebTableWithDataMedio from "@/app/components/bestSaebAverageFilter/BestSaebTableWithDataMedio";
import Link from "next/link";

export default function Details() {
  const [showTable, setShowTable] = useState(false);
  const [showTableMedio, setShowTableMedio] = useState(false);

  const handleClickFundamental = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  const handleClickMedio = () => {
    setShowTableMedio((prevShowTableMedio) => !prevShowTableMedio);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link href="/">
        <button className="mb-4 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
          Voltar a página inicial
        </button>
      </Link>
      <button
        onClick={handleClickFundamental}
        className="mt-4 mb-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Mostrar melhores médias do fundamental
      </button>
      {showTable && <BestSaebTableWithData />}
      <button
        onClick={handleClickMedio}
        className="mt-4 mb-4 px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
      >
        Mostrar melhores médias do médio
      </button>
      {showTableMedio && <BestSaebTableWithDataMedio />}
      <Link href="/pages/compare">
        <button className="mt-4 px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700">
          Comparar escolas
        </button>
      </Link>
    </div>
  );
}
