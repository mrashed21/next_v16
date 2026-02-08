import Category from "@/components/admin/category/category";

export const metadata = {
  title: "Categories",
};

const CategoriesPage = () => {
  return (
    <section className="px-5">
      <Category />
    </section>
  );
};

export default CategoriesPage;

