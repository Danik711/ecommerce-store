import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export type BestSellerItemType = {
  href: string;
  price: number;
  title: string;
  images: string[];
};

export default function BestSellerItem({
  href,
  title,
  price,
  images,
}: BestSellerItemType) {
  const [focusedImg, setFocusedImg] = useState(0);

  function switchImage(index: number) {
    setFocusedImg(index);
  }

  return (
    <div className={"flex flex-col px-4 mb-4"}>
      <Link className={"flex flex-col w-full "} href={href}>
        <div
          className={
            "relative w-full max-2xs:w-60 max-2xs:h-52 max-my-450:h-80 max-my-550:h-48 max-md:h-60 my-1400:h-96 h-80"
          }
        >
          <Image fill src={images[focusedImg]} alt={"Image of a category"} />
        </div>

        <p className={"my-4 my-1400:text-xl"}>{title}</p>
        <p className={"my-1400:text-xl text-mainBlue"}>{price.toFixed(2)} ₸</p>
      </Link>
      <div className={"flex flex-row mt-4"}>
        {images.map((imgPath, index) => {
          const cssClasses =
            "relative my-1400:w-16 my-1400:h-16 w-10 h-10 cursor-pointer border-2 rounded-full mr-2 " +
            (focusedImg === index ? "border-mainBlue" : "border-disabled");

          return (
            <div
              key={index}
              className={cssClasses}
              onClick={() => switchImage(index)}
            >
              <Image
                fill
                src={imgPath}
                alt="accessory"
                className={"rounded-full"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
