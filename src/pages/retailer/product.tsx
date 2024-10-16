import EditProduct from "@/components/retailer/EditProduct";
import ProductTable from "@/components/retailer/ProductTable";
import { getProducts } from "@/fetch/retailer";
import { useAppDispatch } from "@/store/retailer";
import { setMode, setModifyData, setOpen, setProducts } from "@/store/retailer";
import { EMode } from "@/type/retailer";
import { Button } from "antd";
import { useEffect } from "react";

const Product = () => {
  const dispatch = useAppDispatch();

  const getData = async () => {
    const data = await getProducts();
    dispatch(setProducts(data));
  };
  useEffect(() => {
    getData();
  }, []);

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

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Product;
