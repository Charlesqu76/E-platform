import ProductDetail from "@/components/ep/ProductDetail";
import { buy, getComments, getProductDetail, view } from "@/fetch/product";
import { TComment, TProductDetail } from "@/type/product";
import { Button, message } from "antd";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    view({ product_id: Number(id) });
  }, []);

  const clickBuy = async () => {
    try {
      setLoading(true);
      await buy({ product_id: Number(id), price: detail.price });
      message.success("success");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ProductDetail {...detail} comments={comments} id={id} />
      <footer className="w-full fixed bottom-0 rounded-lg flex justify-center">
        <div className="w-full  max-w-2xl flex justify-end bg-slate-200 p-2 mb-2">
          <Button
            type="primary"
            className="mr-2"
            loading={loading}
            onClick={clickBuy}
          >
            Buy
          </Button>
        </div>
      </footer>
    </>
  );
};

export default Product;
