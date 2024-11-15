import ProductTable from "@/components/retailer/ProductTable";
import { getProducts } from "@/fetch/retailer";
import { init, RetailerContext, storeApi } from "@/store/retailer";
import { IProduct } from "@/type/retailer";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";

const EditProduct = dynamic(() => import("@/components/retailer/EditProduct"), {
  ssr: false,
});

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const products = await getProducts(ctx);
  return {
    props: {
      products,
    },
  };
};

interface IProps {
  products: IProduct[];
}

const Product = ({ products }: IProps) => {
  const ref = useRef<storeApi>();
  if (!ref.current) {
    ref.current = init({ products });
  }
  return (
    <RetailerContext.Provider value={ref.current}>
      <div className=" overflow-y-scroll">
        <ProductTable />
        <EditProduct />
      </div>
    </RetailerContext.Provider>
  );
};

export default Product;
