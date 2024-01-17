import React, { useMemo, useState } from "react";
import "./table.css";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel, //Sirve para ordernar las
} from "@tanstack/react-table";
import dataJSON from "./data.json";
import { ColumnDef, columnDefWithGrouping } from "./column";

const SortingTable = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumn = useMemo(() => ColumnDef, []);

  const [sorting, setSorting] = useState([]);

  //Hay que crear un instancia de la tabla
  const tableInstance = useReactTable({
    columns: finalColumn,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //Cuando vamos a ordernar siempre debe de llevar el stato y el metodo getSortedRowModel
    state: {
      sorting,
    },
    //Se declara el metodo para ordenar de TanskTack table
    onSortingChange: setSorting,
  });
  return (
    <table>
      <thead>
        {tableInstance.getHeaderGroups().map((headerEl) => {
          return (
            <tr key={headerEl.id}>
              {headerEl.headers.map((columnEl) => {
                return (
                  <th
                    key={columnEl.id}
                    colSpan={columnEl.colSpan}
                    onClick={columnEl.column.getToggleSortingHandler()} //Funcion para ordernar cuando se da click en eheader de la tabla
                  >
                    {columnEl.isPlaceholder //isPlaceholder funciona para que no se repitan los header y se quiten los nombres
                      ? null
                      : flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                    {/* COde for UP and DOWN SORTING */}
                    {
                      { asc: "-UP", desc: "-DOWN" }[
                        columnEl.column.getIsSorted() ?? null
                      ]
                    }
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

export default SortingTable;
