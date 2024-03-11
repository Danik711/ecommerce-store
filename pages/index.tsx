import Link from "next/link";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import GridThreeCols from "@/components/ui/grid-three-cols";
import CategoryCarousel from "@/components/ui/category-carousel";

export default function Home() {
  return (
    <div className={"flex flex-col max-lg:mt-20"}>
      <div
        className={
          "flex xl:h-[600px] lg:h-[500px] md:h-[400px] h-[300px] max-my-xs:h-[200px] relative"
        }
      >
        <Image fill alt={"Image of a car"} src={"/images/car-slider-1.jpg"} />
        <div
          className={
            "flex flex-col absolute max-my-xs:top-0 max-md:top-8 lg:top-32 top-20 max-my-xs:ml-5 ml-10"
          }
        >
          <p
            className={
              "text-white max-my-xs:text-xs max-md:text-sm text-base my-2 tracking-widest"
            }
          >
            АВТОАКСЕСУАРЫ
          </p>
          <p
            className={
              "text-white max-my-xs:text-xl max-md:text-4xl text-6xl my-2 text-left"
            }
          >
            Комфорт и Надёжность
          </p>
          <p
            className={
              "text-white max-my-xs:text-xs max-md:text-base text-xl max-my-xs:my-2 mt-2 mb-8 stroke-2 stroke-black w-3/4"
            }
          >
            Широкий ассортимент разных товаров для улучшения вашего автомобиля и
            ухода за ним
          </p>

          <Link
            className={"self-start hover:bg-white transition-colors"}
            href={"/"}
          >
            <p
              className={
                "text-white border-2 border-white w-40 py-2 text-center hover:text-black transition-colors"
              }
            >
              Перейти
            </p>
          </Link>
        </div>
      </div>

      <div className={"flex flex-col max-my-xs:mx-5 mx-10"}>
        <h1 className={"text-mainBlue my-8 text-center text-4xl tracking-wide"}>
          Категории
        </h1>

        <CategoryCarousel />

        <h1 className={"text-mainBlue my-8 text-center text-4xl tracking-wide"}>
          Популярные
        </h1>
        <p className={"text-black mb-8 text-center text-base"}>
          Популярные на данный момент
        </p>

        <GridThreeCols
          bestSellers={[
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best1.jpg",
                "/images/best-seller/best2.jpg",
                "/images/best-seller/best3.jpg",
              ],
            },
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best2.jpg",
                "/images/best-seller/best3.jpg",
                "/images/best-seller/best4.jpg",
              ],
            },
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best3.jpg",
                "/images/best-seller/best4.jpg",
                "/images/best-seller/best5.jpg",
              ],
            },
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best4.jpg",
                "/images/best-seller/best5.jpg",
                "/images/best-seller/best6.jpg",
              ],
            },
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best5.jpg",
                "/images/best-seller/best7.jpg",
                "/images/best-seller/best8.jpg",
              ],
            },
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best6.jpg",
                "/images/best-seller/best7.jpg",
                "/images/best-seller/best8.jpg",
              ],
            },
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best7.jpg",
                "/images/best-seller/best8.jpg",
                "/images/best-seller/best1.jpg",
              ],
            },
            {
              title: "In search of lost time",
              price: 16000,
              href: "/",
              images: [
                "/images/best-seller/best8.jpg",
                "/images/best-seller/best1.jpg",
                "/images/best-seller/best2.jpg",
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
