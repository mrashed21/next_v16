import Category from "@/components/admin/category/category";

export const metadata = {
  title: "Categories",
};

const CategoriesPage = () => {
  return (
    <section>
      <Category />
    </section>
  );
};

export default CategoriesPage;

// import { getcategoryForAdmin } from "@/actions/category-action";
// import Category from "@/components/admin/category/category";

// export default async function CategoryPage() {
//   const search = "";
//   const page = 1;
//   const limit = 10;

//   const res = await getcategoryForAdmin(search, page, limit);
//   console.log(res);

//   if (!res?.success) {
//     return <div>Failed to load categories</div>;
//   }

//   console.log(res.data);

//   return <Category data={res.data} />;
// }
