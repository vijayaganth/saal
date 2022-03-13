import React from "react";

export default function TableHead({ columns = [] }) {
  return (
    <thead>
      <tr>
        {columns.map((column, columnIndex) => (
          <th key={columnIndex}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
}
