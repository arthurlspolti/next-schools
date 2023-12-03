import React, { useEffect, useState } from "react";
import axios from "axios";

type Option = {
  nomeEscolas: string;
};

interface DropdownProps {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ className, onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("/api/getOnlyNames");
        setOptions(response.data);
      } catch (error) {
        console.error("Erro ao buscar opções", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <select className={className} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.nomeEscolas}>
          {option.nomeEscolas}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
