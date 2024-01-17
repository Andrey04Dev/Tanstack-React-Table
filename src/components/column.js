import {createColumnHelper} from '@tanstack/react-table'
import moment from 'moment'
const columnHelper = createColumnHelper()

export const ColumnDef = [
    columnHelper.accessor("id",{
        header: "ID"
    }),
    {
      header:"Name", 

    },
  {
    accessorFn: (row) => `${row.first_name}`,
    header: " First Name",
  },
  {
    accessorKey: "last_name",
    header: " Last Name",
  },
  {
    accessorKey: "email",
    header: " Email",
  },
  {
    accessorKey: "date",
    header: " Date",
    cell: ({getValue}) =>  moment( new Date(getValue())).format("MMM Do YY")
  },
];

//Cell columnDefWithCellMerge
const columnDefWithCellMerge = [
{
  accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  header: " First Name",
},
];

//Agrupa columnas
export const columnDefWithGrouping = [
  columnHelper.accessor("id",{
      header: "ID"
  }),
  {
    header:"Name", 
    columns: [
      {
        accessorFn: (row) => `${row.first_name}`,
        header: " First Name",
      },
      {
        accessorKey: "last_name",
        header: " Last Name",
      },
    ]
  },
{
  accessorKey: "email",
  header: " Email",
},
{
  accessorKey: "date",
  header: " Date",
},
];