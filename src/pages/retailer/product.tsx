import EditProduct from "@/components/retailer/EditProduct";
import ProductTable from "@/components/retailer/ProductTable";
import { useAppDispatch } from "@/store/retailer";
import { setMode, setModifyData, setOpen } from "@/store/retailer";
import { EMode } from "@/type/retailer";
import { Button } from "antd";

const Product = (props) => {
  console.log(props);
  const dispatch = useAppDispatch();
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

export const getServerSideProps = () => {
  return { props: { test: 1 } };
};

export default Product;
