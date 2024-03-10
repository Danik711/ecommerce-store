import Link from "next/link";
import Logo from "../ui/logo";
import TextInput from "../ui/text-input";

function Footer() {
  return (
    <footer
      className={
        "flex max-my-900:flex-col flex-row w-full justify-between px-10 pt-4 pb-8 self-end"
      }
    >
      <Link className={"flex items-start"} href={"/"}>
        <Logo
          firstTextSize={"text-3xl text-left"}
          secondTextSize={"text-4xl"}
          thirdTextSize={"text-lg self-start text-left"}
        />
      </Link>
      <div className={"max-my-900:mt-4"}>
        <p className={"text-xl text-mainBlue mb-4 font-bold"}>Ссылки</p>
        <ul>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/"}
            >
              Главная
            </Link>
          </li>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/accessories"}
            >
              Аксессуары
            </Link>
          </li>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/about-us"}
            >
              О нас
            </Link>
          </li>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/contact-us"}
            >
              Контакты
            </Link>
          </li>
        </ul>
      </div>
      <div className={"max-my-900:mt-4"}>
        <p className={"text-xl text-mainBlue mb-4 font-bold"}>Категории</p>
        <ul>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/"}
            >
              Выхлопные Системы
            </Link>
          </li>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/accessories"}
            >
              Троссы
            </Link>
          </li>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/about-us"}
            >
              В салон
            </Link>
          </li>
          <li className={"py-1"}>
            <Link
              className={
                "lg:active:text-mainBlue hover:text-mainBlue transition-all"
              }
              href={"/contact-us"}
            >
              Чехлы
            </Link>
          </li>
        </ul>
      </div>
      <div className={"max-my-900:mt-4"}>
        <p className={"text-xl text-mainBlue mb-4 font-bold"}>Наши Контакты</p>
        <p className={"py-1"}>
          Микрорайон Баянаул,
          <br />
          57А (ТЦ Carcity), 2 ярус, бутик 200А
          <br />
          г. Алматы
        </p>

        <Link
          className={
            "lg:active:text-mainBlue hover:text-mainBlue transition-all py-1"
          }
          href={"tel:+77772353136"}
        >
          Телефон: +7 777 235 3136
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
