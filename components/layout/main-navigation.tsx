import Link from "next/link";
import Logo from "../ui/logo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Boolean to prevent spamming
let didAnimationStart = false;

// Boolean to remove mobile menu when window is resized
let isMobileMenuOpen = false;

function MainNavigation() {
  const [show, setShow] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function triggerSlidingMenu() {
    if (!didAnimationStart) {
      didAnimationStart = true;

      // It means that wrapper if the mobile UI is not visible
      if (!show) {
        // Make it visible
        setShow(true);
        isMobileMenuOpen = true;

        // Animate mobile menu after 150ms
        setTimeout(() => {
          setMobileMenuOpen((prevVal) => !prevVal);
          didAnimationStart = false;
        }, 150);
      } else {
        // Hide mobile menu
        setMobileMenuOpen((prevVal) => !prevVal);

        // Hide wrapper of th emobile meenu after 150ms
        setTimeout(() => {
          setShow(false);
          didAnimationStart = false;
          isMobileMenuOpen = true;
        }, 150);
      }
    }
  }

  useEffect(() => {
    // Check that ref is not null
    if (!headerRef.current) return;

    // Create observer that listens to size changes of
    // the header
    const headerObserver = new ResizeObserver(() => {
      if (isMobileMenuOpen) {
        isMobileMenuOpen = false;
        setMobileMenuOpen(false);
        setShow(false);
      }
    });
    headerObserver.observe(headerRef.current);

    return () => headerObserver.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={"flex flex-col"}>
      <div
        className={
          "fixed lg:relative bg-white flex flex-row w-full h-20 max-my-xs:px-5 px-10 justify-between z-[2000]"
        }
      >
        <div className={"flex flex-row"}>
          {/* Burger Menu for Tablets/Mobile */}
          <div
            onClick={triggerSlidingMenu}
            className={
              "lg:hidden flex flex-col self-center max-my-xs:mr-2 mr-8 cursor-pointer"
            }
          >
            <div className={"w-7 h-1 bg-mainBlue"} />
            <div className={"w-7 h-1 bg-mainBlue my-1"} />
            <div className={"w-7 h-1 bg-mainBlue"} />
          </div>

          {/* Logo of the website */}
          <div className={"flex justify-start self-center"}>
            <Link href={"/"}>
              <Logo
                firstTextSize={"3xs:text-sm my-xs:text-lg md:text-2xl"}
                secondTextSize={"3xs:text-base my-xs:text-lg md:text-3xl"}
                thirdTextSize={"3xs:text-[10px] my-xs:text-xs md:text-s"}
              />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={"lg:flex hidden"}>
          <ul className={"flex flex-row w-full justify-center items-center"}>
            <li className={"px-10 mt-4 mb-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all whitespace-nowrap lg:text-lg"
                }
                href={"/"}
              >
                Главная
              </Link>
            </li>
            <li className={"px-10 my-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all whitespace-nowrap lg:text-lg"
                }
                href={"/accessories"}
              >
                Аксессуары
              </Link>
            </li>
            <li className={"px-10 my-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all whitespace-nowrap lg:text-lg"
                }
                href={"/about-us"}
              >
                О нас
              </Link>
            </li>
            <li className={"px-10 my-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all whitespace-nowrap lg:text-lg"
                }
                href={"/contact-us"}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logos of the website */}
        <div className={"flex flex-row justify-end items-center"}>
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
      </div>

      {/* Nav Menu for Mobile */}
      <div
        className={`${
          show ? "flex" : "hidden"
        } h-full w-full fixed z-[2000] top-20 transition-all duration-150`}
      >
        {/* Sliding Menu */}
        <div
          className={`w-80 h-full bg-white z-[2000] transition-all duration-150 ${
            mobileMenuOpen ? "translate-x-[80]" : "translate-x-[-320px]"
          }`}
        >
          <ul className={"flex flex-col w-full justify-start items-start"}>
            <li className={"px-10 mt-4 mb-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all font-bold"
                }
                href={"/"}
              >
                Главная
              </Link>
            </li>
            <li className={"px-10 my-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all font-bold"
                }
                href={"/accessories"}
              >
                Аксессуары
              </Link>
            </li>
            <li className={"px-10 my-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all font-bold"
                }
                href={"/about-us"}
              >
                О нас
              </Link>
            </li>
            <li className={"px-10 my-2"}>
              <Link
                className={
                  "lg:active:text-mainBlue hover:text-mainBlue transition-all font-bold"
                }
                href={"/contact-us"}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        {/* Transparent Background */}
        <div
          onClick={triggerSlidingMenu}
          className={`w-full h-full bg-black absolute transition-all duration-150 ${
            mobileMenuOpen ? "opacity-75" : "opacity-0"
          }`}
        />
      </div>
    </header>
  );
}

export default MainNavigation;
