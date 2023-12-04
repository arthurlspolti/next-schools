import React, { ChangeEvent } from "react";

export function YearDropdown({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const years = [2021, 2019, 2017, 2015, 2013, 2011, 2009, 2007, 2005];
  return (
    <select onChange={onChange} className="w-1/3 border rounded p-2">
      <option value="">Selecione o ano</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
export function SchoolYearsDropdown({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const schoolYears = [
    { label: "Iniciais (1-5)", value: "iniciais (1-5)" },
    { label: "Finais (6-9)", value: "finais (6-9)" },
    { label: "Todos (1-4)", value: "todos (1-4)" },
  ];
  return (
    <select onChange={onChange} className="w-1/3 border rounded p-2">
      <option value="">Selecione os anos escolares</option>
      {schoolYears.map((schoolYear) => (
        <option key={schoolYear.value} value={schoolYear.value}>
          {schoolYear.label}
        </option>
      ))}
    </select>
  );
}
