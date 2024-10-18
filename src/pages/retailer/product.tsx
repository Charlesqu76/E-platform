import EditProduct from "@/components/retailer/EditProduct";
import ProductTable from "@/components/retailer/ProductTable";
import { getProducts } from "@/fetch/retailer";
import { useProductsStore } from "@/store/retailer";
import { EMode, IProduct } from "@/type/retailer";
import { Button } from "antd";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";

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
  const { setMode, setModifyData, setOpen, setProducts } = useProductsStore();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const clickAdd = () => {
    setModifyData({} as any);
    setMode(EMode.ADD);
    setOpen(true);
  };

  return (
    <div className=" overflow-y-scroll">
      <div className="flex justify-end">
        <Button type="primary" onClick={clickAdd}>
          ADD
        </Button>
      </div>
      <ProductTable />
      <EditProduct />
    </div>
  );
};

export default Product;
