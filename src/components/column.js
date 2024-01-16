import {createColumnHelper} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

export const ColumnDef = [
    columnHelper.accessor("id",{
        header: "ID"
    }),
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
  },
];
