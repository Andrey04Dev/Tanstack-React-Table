import React, { useMemo, useState } from "react";
import "./table.css";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel, //Sirve para ordernar las filas de forma ascedente o decendete
  getFilteredRowModel, //Sirve para filtrar las filas
} from "@tanstack/react-table";
import dataJSON from "./data.json";
import { ColumnDef } from "./column";

const GlobalFiltering = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumn = useMemo(() => ColumnDef, []);

  const [filtering, setfiltering] = useState([]);

  //Hay que crear un instancia de la tabla
  const tableInstance = useReactTable({
    columns: finalColumn,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(), 
    //Se utiliza el globalFilter con la varaible para poder filtrar y se ocupo el metodo getFilteredRowModel
    state:{
        globalFilter : filtering
    }, 
    //El metodo para filtrar en la columna
    onGlobalFilterChange : setfiltering
  });
  return (
    <>
    <input type="text" name="filter" id="filter" value={filtering} onChange={e=> setfiltering(e.target.value)} />
    <hr/>
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
    </table></>
  );
};

export default GlobalFiltering;
