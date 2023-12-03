import { ChangeEvent } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ColumnSelectorProps {
  columns: string[];
  selectedColumn: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
