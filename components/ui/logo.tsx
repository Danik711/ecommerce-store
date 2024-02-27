import Image from "next/image";

type LogoType = {
  width: number;
  height: number;
};

export default function Logo({ width, height }: LogoType) {
  return (
    <div className={"flex flex-col max-w-40 justify-center items-center"}>
      <p className={"text-sky-500 font-bold"}>
        <span className={"text-xl"}>General</span>{" "}
        <span className={"text-2xl"}>ADI</span>
      </p>
      <Image
        width={width}
        height={height}
        className={"py-1"}
        alt={"Image of a car"}
        src={"/svgs/sport-car.svg"}
      />

      <p className={"text-xs font-bold"}>Car Accessory Store</p>
    </div>
  );
}
