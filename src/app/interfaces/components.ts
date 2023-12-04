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

export interface School {
  nome_escola: string;
  ano: number;
  rede: string;
  ensino: string;
  anos_escolares: string;
  nota_saeb_media_padronizada: number;
}

export interface BestSaebTableProps {
  data: School[];
}

export interface CompareSchoolsProps {
  school1: string;
  school2: string;
  SelectYear: string;
  SelectSchoolYears: string;
}
export interface SchoolData {
  escola1: any[];
  escola2: any[];
}

export interface ColumnSelectorProps {
  columns: string[];
  selectedColumn: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
