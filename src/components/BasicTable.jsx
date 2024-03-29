import React, { useMemo } from "react";
import "./table.css";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import dataJSON from "./data.json";
import { ColumnDef, columnDefWithGrouping } from "./column";

const BasicTable = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumn = useMemo(() => ColumnDef, []);

  //Hay que crear un instancia de la tabla
  const tableInstance = useReactTable({
    columns: finalColumn,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table>
      <thead>
        {tableInstance.getHeaderGroups().map((headerEl) => {
          return (
            <tr key={headerEl.id}>
              {headerEl.headers.map((columnEl) => {
                return (
                  <th key={columnEl.id} colSpan={columnEl.colSpan}>
                    {columnEl.isPlaceholder //isPlaceholder funciona para que no se repitan los header y se quiten los nombres
                      ? null
                      : flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((rowEl) => (
          <tr key={rowEl.id}>
            {rowEl.getVisibleCells().map((cellEl) => (
              <td key={cellEl.id}>
                {flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicTable;
