import React, { useMemo, useState } from "react";
import "./table.css";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel, //Aqui filtraremos columnas
} from "@tanstack/react-table";
import dataJSON from "./data.json";
import { ColumnDef } from "./column";
import Filter from "./FilterFuncion";

const ColumnFiltering = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumn = useMemo(() => ColumnDef, []);

  const [columnFilters, setColumnFilters] = useState([]);

  //Hay que crear un instancia de la tabla
  const tableInstance = useReactTable({
    columns: finalColumn,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    //Con el columFilters sirve para filtrar columnas, hay que llamar el metodo getFilterdRowModel
    state:{
        columnFilters
    }, 
    onColumnFiltersChange:  setColumnFilters,
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
                      : <>
                      {
                        flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )
                      }
                      <div>
                        <Filter column={columnEl.column} table={tableInstance}/>
                      </div>
                      </>}
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

export default ColumnFiltering;
