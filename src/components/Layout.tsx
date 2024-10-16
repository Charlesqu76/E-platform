import { ReactElement } from "react";
import RetailerLayout from "./retailer/RetailerLayout";
import ProdcutLayout from "./product/ProductLayout";
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
  const C = LayoutMap[firstPathname as keyof typeof LayoutMap];
  return <C pathname={pathname}>{children}</C>;
};

export default Layout;
