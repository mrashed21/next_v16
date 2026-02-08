"use client";

import { getAllOrderForAdmin } from "@/actions/order-action";
import { getAllAdmins } from "@/actions/user-action";
import CustomSelect, { SelectOption } from "@/components/custom/custom-select";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hooks/use-serial";
import { useEffect, useState } from "react";
import AdminOrdersTable from "./all-order-table";

interface Option extends SelectOption {}

const statusOptions: Option[] = [
  { label: "Placed", value: "placed" },
  { label: "Preparing", value: "preparing" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const AllOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Option | null>(null);
  const [providerData, setProviderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();

  const [orders, setOrders] = useState<any>(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const fetchOrders = async () => {
    try {
      setIsLoadingOrders(true);
      const res = await getAllOrderForAdmin(
        page,
        limit,
        search,
        status?.value as any,
        userId as string,
      );

      if (!res?.data?.success) {
        throw new Error(res?.message || "Orders fetch failed");
      }

      setOrders(res.data);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setOrders(null);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, search, status, userId]);

  const serialNumber = useSerialNumber(page, limit);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getAllAdmins(1, 9999, "", "provider");

      if (!res?.data?.success) {
        throw new Error("Admins fetch failed");
      }

      setProviderData(res.data.data);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //! category options
  const usersOptions =
    providerData?.data
      ?.filter((item: any) => item.providerId)
      .map((item: any) => ({
        label: item.name,
        value: item.providerId,
      })) || [];

  return (
    <section className="space-y-6 w-full">
      {/* Header */}
      <Header title="Orders" description="Manage and search all orders" />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 max-w-4xl">
        <SearchField
          placeholder="Search by invoice, customer name, email"
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />

        <div className="w-52">
          <CustomSelect<Option>
            placeholder="Filter by status"
            options={statusOptions}
            value={status}
            onChange={(v) => {
              setPage(1);
              setStatus(v as Option);
            }}
            isClearable
          />
        </div>

        <div className="min-w-52">
          <CustomSelect<SelectOption>
            placeholder="Select provider"
            options={usersOptions}
            isClearable
            onChange={(opt) => {
              if (!opt || Array.isArray(opt)) {
                setUserId(undefined);
                return;
              }
              setUserId(opt.value as string);
            }}
          />
        </div>
      </div>

      {/* Orders table will go here */}
      <AdminOrdersTable
        orders={orders?.data?.data}
        isLoading={isLoading}
        serialNumber={serialNumber}
      />
    </section>
  );
};

export default AllOrders;
