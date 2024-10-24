import ProductDetail from "@/components/ep/ProductDetail";
import { getComments, getProductDetail } from "@/fetch/product";
import { TComment, TProductDetail } from "@/type/product";
import { GetServerSidePropsContext } from "next";

interface IProps {
  detail: TProductDetail;
  comments: TComment[];
  id: string;
}

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { id } = query;
  const [detail, comments] = await Promise.all([
    getProductDetail({ id: id as string }),
    getComments({ id: id as string }),
  ]);
  return {
    props: {
      detail,
      comments,
      id,
    },
  };
};

const Product = ({ detail, id, comments }: IProps) => {
  return <ProductDetail {...detail} comments={comments} id={id} />;
};

export default Product;
