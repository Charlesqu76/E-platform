import ProductDetail from "@/components/ep/ProductDetail";
import { getProductDetail } from "@/fetch/product";
import { TProductDetail } from "@/type/product";
import { GetServerSidePropsContext } from "next";

interface IProps {
  detail: TProductDetail;
}

const Product = ({ detail }: IProps) => {
  return <ProductDetail {...detail} />;
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { id } = query;
  const data = await getProductDetail({ id: id as string });
  return {
    props: {
      detail: data,
    },
  };
};

export default Product;
