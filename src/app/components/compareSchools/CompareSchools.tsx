import React, { useEffect, useState } from "react";
import axios from "axios";
import { CompareSchoolsProps, SchoolData } from "@/app/interfaces/components";

const CompareSchools: React.FC<CompareSchoolsProps> = ({
  school1,
  school2,
}) => {
  const [data, setData] = useState<SchoolData | null>(null);

  useEffect(() => {
    const compareSchools = async () => {
      try {
        const response = await axios.post("/api/compareSchools", {
          school1,
          school2,
        });
        setData(response.data);
      } catch (error) {
        console.error("Erro ao comparar escolas", error);
      }
    };

    if (school1 && school2) {
      compareSchools();
    }
  }, [school1, school2]);

  const compareValues = (key: string) => {
    const school1Value = data?.escola1[0][key];
    const school2Value = data?.escola2[0][key];
    if (typeof school1Value === "number" && typeof school2Value === "number") {
      if (school1Value > school2Value) {
        return `${school1} tem um valor maior para ${key}`;
      } else if (school1Value < school2Value) {
        return `${school2} tem um valor maior para ${key}`;
      } else {
        return `Ambas as escolas têm o mesmo valor para ${key}`;
      }
    }
    return null;
  };

  return (
    <div className="overflow-x-auto w-[99%]">
      {data ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{school1}</h2>
          <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(data.escola1[0]).map(
                  (key: string, index: number) => (
                    <th
                      key={index}
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                    >
                      {key}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.escola1.map((school: any, index: number) => (
                <tr key={index}>
                  {Object.values(school).map((value: any, index: number) => (
                    <td
                      key={index}
                      className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200"
                    >
                      {value || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-2xl font-bold mb-4 mt-8">{school2}</h2>
          <table className="min-w-full divide-y divide-gray-200 table-auto w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(data.escola2[0]).map(
                  (key: string, index: number) => (
                    <th
                      key={index}
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                    >
                      {key}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.escola2.map((school: any, index: number) => (
                <tr key={index}>
                  {Object.values(school).map((value: any, index: number) => (
                    <td
                      key={index}
                      className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200"
                    >
                      {value || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8">
            {Object.keys(data.escola1[0]).map((key: string, index: number) => {
              const comparison = compareValues(key);
              return comparison && <p key={index}>{comparison}</p>;
            })}
          </div>
        </>
      ) : (
        <p>Escolha duas escolas para comparar...</p>
      )}
    </div>
  );
};

export default CompareSchools;
