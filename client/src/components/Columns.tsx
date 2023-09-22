import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./TableActions";

export type Subscriber = {
  _id: string;
  chatId: string;
  name: string;
  location: string;
  isBlocked: boolean;
};

export const columns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: 'chatId',
    header: 'Chat ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'isBlocked',
    header: 'Status',
    cell: ({ row }) => <p>{row.original.isBlocked ? 'Blocked' : 'Active'}</p>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <TableActions 
        _id={row.original._id} 
        name={row.original.name}
        isBlocked={row.original.isBlocked} 
      />
    ),
  },
];
