import React from "react";
import { TableHeadEnums } from "../../Others/enums";
import { arrangeDate, removeHyphen } from "../../Others/helper";

export default function TableBody({ rows = {}, columns = [] }) {
  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex + rowIndex}>{ApplyValue(row, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export const ApplyValue = (row, column) => {
  const rowValue = row[column.name];
  switch (column.type) {
    case TableHeadEnums.STRING:
      return rowValue;
    case TableHeadEnums.PHONE:
      return removeHyphen(rowValue);
    case TableHeadEnums.DATE:
      return arrangeDate(rowValue);
    case TableHeadEnums.CUSTOM_DATA:
      return column.Render(row, column);
    default:
      return rowValue;
  }
};
