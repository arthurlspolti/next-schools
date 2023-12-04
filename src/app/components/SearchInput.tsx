import React, { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Procurar"
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}
