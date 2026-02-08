import Customer from "@/components/admin/customer/customer";

export const metadata = {
  title: "Customes",
};

const CustomesPage = () => {
  return (
    <section className="px-5">
      <Customer />
    </section>
  );
};

export default CustomesPage;
