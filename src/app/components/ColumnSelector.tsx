import React from "react";

interface ColumnSelectorProps {
  columns: string[];
  selectedColumn: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export default function ColumnSelector({
  columns,
  selectedColumn,
  onChange,
  className,
}: ColumnSelectorProps) {
  const renderOptions = () => {
    const options = [
      <option key="" value="">
        Todas as colunas
      </option>,
    ];
    columns.forEach((column, index) => {
      options.push(
        <option key={index} value={column}>
          {column}
        </option>
      );
    });
    return options;
  };

  return (
    <select value={selectedColumn} onChange={onChange} className={className}>
      {renderOptions()}
    </select>
  );
}
