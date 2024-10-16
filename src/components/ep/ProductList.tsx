import React from "react";
import Product from "./Product";

interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  retailer: string;
  ratings: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 p-4">
      {products.map((product) => (
        <Product
          key={product.id}
          {...product}
          name={product.name}
          description={product.description}
          images={product.images}
          price={product.price}
          retailer={product.retailer}
          ratings={product.ratings}
        />
      ))}
    </div>
  );
};

export default ProductList;
