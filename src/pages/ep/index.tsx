import ProductList from "@/components/ep/ProductList";
import Search from "@/components/ep/Search";
import { useAppSelector } from "@/store/product";

const Index = () => {
  const { productList } = useAppSelector((state) => state.product);
  return (
    <div>
      <Search />
      <ProductList products={productList} />
    </div>
  );
};

export default Index;
