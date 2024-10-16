import React from "react";
import Star from "../Star";
import Comments from "./Comments";
import { TComment } from "@/type/product";
import Image from "next/image";
import { DEFAULT_PIC } from "@/const";

interface ProductDetailProps {
  name: string;
  description: string;
  images: string[];
  price: number;
  retailer: string;
  ratings: number;
  comments: TComment[];
  AISummary: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  name = "",
  description = "",
  images,
  price = 0,
  retailer = "",
  ratings = 0,
  comments = [],
  AISummary = "",
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-center">
        <div className="relative h-96 w-full">
          <Image
            src={images?.[0] || DEFAULT_PIC}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
        <p className="text-lg font-bold mb-2">${price.toFixed(2)}</p>
        <p className="text-gray-600 mb-2">Retailer: {retailer}</p>
        <Star ratings={ratings} />
        <Comments comments={comments} AISummary={AISummary} />
      </div>
    </div>
  );
};

export default ProductDetail;
