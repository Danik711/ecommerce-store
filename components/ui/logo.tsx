import Image from "next/image";

type LogoType = {
  thirdTextSize: string;
  firstTextSize: string;
  secondTextSize: string;
};

export default function Logo({
  firstTextSize,
  secondTextSize,
  thirdTextSize,
}: LogoType) {
  return (
    <div className={"flex flex-col justify-center items-center"}>
      <p className={"text-mainBlue font-bold"}>
        <span className={firstTextSize}>General</span>{" "}
        <span className={secondTextSize}>ADI</span>
      </p>
      <p className={"font-bold " + thirdTextSize}>Car Accessory Store</p>
    </div>
  );
}
