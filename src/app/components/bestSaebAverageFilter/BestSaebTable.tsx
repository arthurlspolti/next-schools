import { BestSaebTableProps } from "@/app/interfaces/components";
import React from "react";

export default function BestSaebTable({ data }: BestSaebTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Nome da Escola
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Ano
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Rede
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Ensino
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Anos Escolares
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Média Padronizada do SAEB
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((school, index) => (
            <tr key={index}>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                {school.nome_escola}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                {school.ano}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                {school.rede}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                {school.ensino}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                {school.anos_escolares}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                {school.nota_saeb_media_padronizada}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
