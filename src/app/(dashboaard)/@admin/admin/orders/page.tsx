import AllOrders from "@/components/admin/order/all-orders";

export const metadata = {
  title: "Orders",
};

const OrdersPage = () => {
  return (
    <section className="px-5">
      <AllOrders />
    </section>
  );
};

export default OrdersPage;
