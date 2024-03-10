import Footer from "./footer";
import { ReactNode } from "react";
import MainNavigation from "./main-navigation";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
