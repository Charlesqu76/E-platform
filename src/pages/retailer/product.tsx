import EditProduct from "@/components/retailer/EditProduct";
import ProductTable from "@/components/retailer/ProductTable";
import { getProducts } from "@/fetch/retailer";
import { useAppDispatch } from "@/store/retailer";
import { setMode, setModifyData, setOpen, setProducts } from "@/store/retailer";
import { EMode, IProduct } from "@/type/retailer";
import { Button } from "antd";
import { useEffect } from "react";

export const getServerSideProps = async () => {
  const products = await getProducts();
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
  const dispatch = useAppDispatch();

  // const getData = async () => {
  //   dispatch(setProducts(data));
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const clickAdd = () => {
    dispatch(setModifyData({}));
    dispatch(setOpen(true));
    dispatch(setMode(EMode.ADD));
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
