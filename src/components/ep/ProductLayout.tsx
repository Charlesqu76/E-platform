import { ReactElement } from "react";
import Header from "./Header";

interface IProps {
  pathname: string;
  children: ReactElement | ReactElement[];
}

const ProdcutLayout = ({ children }: IProps) => {
  return (
    <div>
      <Header />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default ProdcutLayout;
