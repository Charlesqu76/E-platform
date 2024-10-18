import ProductList from "@/components/ep/ProductList";
import Search from "@/components/ep/Search";
import { getProducts } from "@/fetch/product";
import { TProduct } from "@/type/product";

export const getServerSideProps = async () => {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
};

interface IProps {
  products: TProduct[];
}

const Index = ({ products }: IProps) => {
  return (
    <div className="flex flex-col items-center">
      <Search />
      <ProductList products={products} />
    </div>
  );
};

export default Index;
