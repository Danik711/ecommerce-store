import Link from "next/link";
import Logo from "../ui/logo";
import TextInput from "../ui/text-input";

function Footer() {
  return (
    <footer
      className={
        "flex flex-row w-full justify-between px-10 pt-4 pb-8 self-end"
      }
    >
      <div className={"flex justify-center"}>
        <Link className={"flex items-start"} href={"/"}>
          <Logo width={100} height={100} />
        </Link>
      </div>
      <div>
        <p className={"text-xl text-sky-500 mb-4 font-bold"}>Ссылки</p>
        <ul>
          <li className={"py-1"}>
            <Link href={"/"}>Главная</Link>
          </li>
          <li className={"py-1"}>
            <Link href={"/accessories"}>Аксессуары</Link>
          </li>
          <li className={"py-1"}>
            <Link href={"/about-us"}>О нас</Link>
          </li>
          <li className={"py-1"}>
            <Link href={"/contact-us"}>Контакты</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className={"text-xl text-sky-500 mb-4 font-bold"}>Наши Контакты</p>
        <p className={"py-1"}>
          Микрорайон Баянаул,
          <br />
          57А (ТЦ Carcity), 2 ярус, бутик 200А
          <br />
          г. Алматы
        </p>

        <Link className={"py-1"} href={"tel:+77772353136"}>
          Телефон: +7 777 235 3136
        </Link>
      </div>

      <div>
        <p className={"text-xl text-sky-500 mb-4 font-bold"}>
          Поиск Аксессуаров
        </p>
        <TextInput type={"text"} />
      </div>
    </footer>
  );
}

export default Footer;
