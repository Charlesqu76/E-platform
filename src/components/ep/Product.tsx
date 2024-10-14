import Link from "next/link";
import Star from "../Star";

interface IProps {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  retailer: string;
  ratings: number;
}
const Product = ({
  id,
  name,
  description,
  images,
  price,
  retailer,
  ratings,
}: IProps) => {
  return (
    <Link href={{ pathname: "/ep/product", query: { id } }} target="_blank">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:cursor-pointer">
        <div className="flex justify-center">
          <img
            src={images[0]}
            alt={name}
            className="h-48 w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
          <p className="text-lg font-bold mb-2">${price.toFixed(2)}</p>
          <p className="text-gray-600 mb-2">Retailer: {retailer}</p>
          <Star ratings={ratings} />
        </div>
      </div>
    </Link>
  );
};

export default Product;
