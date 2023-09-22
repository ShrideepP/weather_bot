import { useQuery } from "react-query";
import axios from "axios";

import DataTable from "./DataTable";
import { columns } from "@/components/Columns";
import { Icons } from "./Icons";

export default function Subscribers() {
  const { data, isLoading } = useQuery('users', () => {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/subscriptions`, {
      headers: { 'Content-Type': 'application/json' },
    });
  });

  return (
    <section className="w-full h-fit grid place-items-center">
      {isLoading ? (
        <Icons.loader className="animate-spin" />
      ) : (
        <DataTable 
          data={data?.data} 
          columns={columns} 
        />
      )}
    </section>
  );
};
