import ProductList from "@/components/ep/ProductList";
import Search from "@/components/ep/Search";
import { getProducts } from "@/fetch/product";
import { Context, init, storeApi } from "@/store/products";
import { TProduct } from "@/type/product";
import { GetServerSidePropsContext } from "next";
import { useRef } from "react";

interface IProps {
  products: TProduct[];
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const products = await getProducts({}, ctx);
  return {
    props: {
      products,
    },
  };
};

const Index = ({ products }: IProps) => {
  const ref = useRef<storeApi>();

  if (!ref.current) {
    ref.current = init({ products });
  }
  return (
    <Context.Provider value={ref.current}>
      <div className="flex flex-col items-center">
        <Search />
        <ProductList />
      </div>
    </Context.Provider>
  );
};

export default Index;
