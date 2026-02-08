"use client";
import { getAllAdmins } from "@/actions/user-action";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hooks/use-serial";
import { useEffect, useState } from "react";
import UserTable from "../user-table/user-table";

const Admin = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await getAllAdmins(page, limit, search, "admin");

      if (!res?.data?.success) {
        throw new Error("Admins fetch failed");
      }

      setData(res.data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page, limit]);

  // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  return (
    <section>
      {/* //? Header  */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* //? Header */}
          <Header
            title={"Admins"}
            description={"Manage and search all admins"}
          />
        </div>
      </div>

      {/* //? Search  */}
      <div className="w-full max-w-sm overflow-hidden my-5">
        <SearchField
          placeholder="Search admins..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      <UserTable
        users={data?.data}
        serialNumber={serialNumber}
        isLoading={isLoading}
        fetchData={fetchData}
      />
    </section>
  );
};

export default Admin;
