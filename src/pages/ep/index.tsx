import ProductList from "@/components/ep/ProductList";
import Search from "@/components/ep/Search";
import { getProducts } from "@/fetch/product";
import { setProducts, useAppDispatch, useAppSelector } from "@/store/product";
import { useEffect } from "react";

const Index = () => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const ss = async () => {
    dispatch(setProducts(await getProducts()));
  };
  useEffect(() => {
    ss();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <Search />
      <ProductList products={products} />
    </div>
  );
};

export default Index;
