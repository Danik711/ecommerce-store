import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className={"flex flex-col max-lg:mt-20"}>
      <h2
        className={
          "self-center max-my-450:mx-5 max-my-800:flex-col my-8 text-black text-4xl max-lg:mx-10 max-lg:text-2xl"
        }
      >
        Добро пожаловать{" "}
        <span className={"text-mainBlue font-bold"}>General ADI</span> онлайн
        магазин!
      </h2>

      <div
        className={
          "flex flex-row max-my-800:flex-col max-my-450:px-5 max-lg:px-10 max-lg:w-full w-3/4 self-center items-center my-8"
        }
      >
        <div className={"my-800:mr-8 max-my-800:mb-8"}>
          <h3 className={"text-black text-2xl mb-4"}>Наша миссия</h3>

          <p className={"text-black text-base mt-4"}>
            Если вы считаете, что ваша машина более чем средсво для
            передвижения, то у нас есть чем вас порадовать.
            <br />
            <br />
            Мы стремимся предоставить вам аксесуар лучшего качества для
            повышения эстетики и комфорта вашего автомобиля. Мы считаем, что
            наши машины, это продолжение индивидуальности и стиля
          </p>
        </div>
        <Image
          width={400}
          height={400}
          alt={"Image of a car"}
          src={"/images/about-us.jpg"}
        />
      </div>

      <div
        className={
          "flex flex-row max-my-800:flex-col max-my-450:px-5 max-lg:px-10 max-lg:w-full w-3/4 self-center items-center my-8"
        }
      >
        <Image
          width={400}
          height={400}
          alt={"Image of a car"}
          src={"/images/about-us-2.jpg"}
        />
        <div className={"my-800:ml-8 max-my-800:mt-8"}>
          <h3 className={"text-black text-2xl mb-4"}>Что мы предлагаем</h3>

          <p className={"text-black text-base mt-4"}>
            От элегантных обновлений экстерьера и интерьера до авариаварийного
            оборудования. Мы предлагаем широкий спекрт товаров, которые сделают
            ваши поездки комфортными и надёжными.
            <br />
            <br />
            Посетите наш интернет-магазин или свяжитесь с нами, чтобы
            ознакомиться с полным ассортиментом нашего магазина.
          </p>
        </div>
      </div>
    </div>
  );
}
