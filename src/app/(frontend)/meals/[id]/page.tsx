// import Container from "@/common/container/container";
// import MealDetails from "@/components/frontend/meals/meal-details";
 export const metadata = {
  title: "Meals Details",
};
interface Props {
  params: {
    id: string;
  };
}

const MealDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <section className="py-10">
      {/* <Container>
        <MealDetails id={id} />
      </Container> */}
    </section>
  );
};

export default MealDetailsPage;
