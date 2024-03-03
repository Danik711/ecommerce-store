import Footer from "./footer";
import { ReactNode } from "react";
import MainNavigation from "./main-navigation";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className={"flex flex-col w-screen h-screen justify-between"}>
      <MainNavigation />
      <main className={"w-full"}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
