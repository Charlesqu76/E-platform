import { Fragment, ReactElement } from "react";
import RetailerLayout from "./retailer/RetailerLayout";
import ProdcutLayout from "./ep/ProductLayout";
import { getFirstPathSegment } from "@/utils";

interface IProps {
  children: ReactElement;
  pathname: string;
}

const Layout = ({ children, pathname }: IProps) => {
  const firstPathname = getFirstPathSegment(pathname);
  const LayoutMap = {
    retailer: RetailerLayout,
    ep: ProdcutLayout,
  };
  const C = LayoutMap[firstPathname as keyof typeof LayoutMap] || Fragment;
  return <C pathname={pathname}>{children}</C>;
};

export default Layout;
