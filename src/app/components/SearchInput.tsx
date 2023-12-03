import React, { ChangeEvent } from "react";
import { SearchInputProps } from "../interfaces/components";

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input type="text" placeholder="Search" value={value} onChange={onChange} />
  );
}
