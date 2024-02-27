import Link from "next/link";
import Logo from "../ui/logo";
import Image from "next/image";

function MainNavigation() {
  return (
    <header className={"flex flex-row w-full px-10 py-4 justify-center"}>
      <div className={"flex justify-start flex-1"}>
        <Link href={"/"}>
          <Logo width={50} height={50} />
        </Link>
      </div>
      <nav className={"flex flex-3"}>
        <ul className={"flex flex-row w-full justify-center items-center"}>
          <li>
            <Link className={"px-8"} href={"/"}>
              Главная
            </Link>
          </li>
          <li>
            <Link className={"px-8"} href={"/accessories"}>
              Аксессуары
            </Link>
          </li>
          <li>
            <Link className={"px-8"} href={"/about-us"}>
              О нас
            </Link>
          </li>
          <li>
            <Link className={"px-8"} href={"/contact-us"}>
              Контакты
            </Link>
          </li>
        </ul>
      </nav>
      <div className={"flex flex-row flex-1 justify-end items-center"}>
        <Link href={"/"}>
          <Image
            width={30}
            height={30}
            className={"mx-2"}
            alt={"User Profile"}
            src={"/svgs/user.svg"}
          />
        </Link>
        <Link href={"/"}>
          <Image
            width={30}
            height={30}
            className={"mx-2"}
            alt={"Shopping Cart"}
            src={"/svgs/shopping-cart.svg"}
          />
        </Link>
      </div>
    </header>
  );
}

export default MainNavigation;
