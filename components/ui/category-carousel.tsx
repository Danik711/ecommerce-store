import Carousel from "react-multi-carousel";
import CategoryItem from "@/components/ui/category-item";

export default function CategoryCarousel() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1300, min: 850 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 850, min: 650 },
      items: 3,
    },
    mobile1: {
      breakpoint: { max: 650, min: 350 },
      items: 2,
    },
    mobile2: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={"w-full self-center"}>
      <Carousel
        ssr
        infinite
        autoPlay
        swipeable
        draggable
        showDots={false}
        autoPlaySpeed={5000}
        responsive={responsive}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {arr.map((el) => {
          return (
            <CategoryItem
              key={el}
              href={"/"}
              title={"New Items"}
              imagePath={`/images/categories/collection${el + 1}.jpg`}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
