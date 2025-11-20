import React from "react";

export interface SelectOption {
  code: string;
  name: string;
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
  tooltip?: string;
}

function Select({
  value,
  onChange,
  options,
  className = "",
  tooltip = "",
}: SelectProps) {
  return (
    <div className={tooltip ? "tooltip" : ""} data-tip={tooltip}>
      <select
        value={value}
        onChange={onChange}
        className={`select ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
