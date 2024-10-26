import React from "react";
import Product from "./Product";
import { useProdcutsStore } from "@/store/products";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  retailer: string;
  ratings: number;
}

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const { products = [] } = useProdcutsStore((state) => state);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 p-4">
      {products.map((product) => (
        <Product
          key={product.id}
          {...product}
          name={product.name}
          description={product.description}
          image={product.image}
          price={product.price}
          retailer={product.retailer}
          ratings={product.ratings}
        />
      ))}
    </div>
  );
};

export default ProductList;
