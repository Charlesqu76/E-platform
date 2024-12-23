import Link from "next/link";
import Star from "../Star";
import Image from "next/image";
import { DEFAULT_PIC } from "@/const";

interface IProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  retailer: string;
  ratings: number;
}
const Product = ({
  id,
  name,
  description,
  image,
  price,
  retailer,
  ratings,
}: IProps) => {
  return (
    <Link href={{ pathname: "/ep/product", query: { id } }} target="_blank">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:cursor-pointer">
        <div className="flex justify-center">
          <div className="relative h-48 w-full">
            <Image
              src={image || DEFAULT_PIC}
              alt={name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-1">{name}</h2>
          <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
          <p className="text-lg font-bold mb-2">${price.toFixed(2)}</p>
          <Star ratings={ratings} />
        </div>
      </div>
    </Link>
  );
};

export default Product;
