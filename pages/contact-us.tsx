import DG from "2gis-maps";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    // @ts-ignore
    let map;

    map = DG.map("map-container", {
      center: [43.238, 76.822],
      zoom: 16,
    });
    DG.marker([43.23851989120149, 76.82212712607205]).addTo(map);

    // @ts-ignore
    return () => map && map.remove();
  }, []);

  return (
    <div
      id={"map-container"}
      className={
        "w-[500px] h-[500px] max-my-600:w-[300px] max-my-600:h-[300px] max-my-300:w-[250px] max-my-300:h-[250px]"
      }
    ></div>
  );
};

export default function ContactUs() {
  return (
    <div className={"flex justify-center my-20"}>
      <div
        className={
          "flex flex-row max-my-1200:w-full w-3/4 max-my-xs:px-5 px-10 max-my-900:flex-col"
        }
      >
        <div className={"mr-8"}>
          <h1 className={"text-black text-3xl mb-4"}>Свяжитесь с Нами</h1>
          <p className={"text-black text-base mb-8"}>
            Если у вас есть вопросы о наших товарах, способах оплаты или
            какие-нибудь иные вопросы, не стесняйтесь позвонить или написать
            нам. Мы так же будем рады вас видеть.
          </p>

          <div className={"flex flex-row mb-10"}>
            <Image
              width={30}
              height={30}
              alt={"Shopping Cart"}
              src={"/svgs/map-marker.svg"}
              className={"mr-4 self-start"}
            />
            <div>
              <h4>Адрес</h4>
              <p className={"py-1"}>
                Микрорайон Баянаул, 57А (ТЦ Carcity), 2 ярус, бутик 200А г.
                Алматы
              </p>
            </div>
          </div>

          <div className={"flex flex-row mb-10"}>
            <Image
              width={30}
              height={30}
              alt={"Shopping Cart"}
              src={"/svgs/whatsapp.svg"}
              className={"mr-4 self-start"}
            />
            <div>
              <h4>Whatsapp</h4>
              <Link
                className={"pointer hover:text-mainBlue transition-all"}
                href={"https://wa.me/77772353136"}
              >
                +7 777 2353136
              </Link>
            </div>
          </div>

          <div className={"flex flex-row mb-10"}>
            <Image
              width={30}
              height={30}
              alt={"Shopping Cart"}
              src={"/svgs/clock.svg"}
              className={"mr-4 self-start"}
            />
            <div>
              <h4>Время Работы</h4>
              <p className={"py-1"}>Вторник по Суботту 09:00 - 17:00</p>
            </div>
          </div>
        </div>
        <div
          className={
            "w-[500px] h-[500px] max-my-600:w-[300px] max-my-600:h-[300px] max-my-300:w-[250px] max-my-300:h-[250px]"
          }
        >
          {window != undefined ? <Map /> : null}
        </div>
      </div>
    </div>
  );
}
