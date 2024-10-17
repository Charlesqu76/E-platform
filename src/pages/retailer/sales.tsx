import { AUTH_COOKID } from "@/const";
import { getHistorySalesData } from "@/fetch/retailer";
import { TSales } from "@/type/product";
import { Button } from "antd";
import dynamic from "next/dynamic";

const SalesGraph = dynamic(() => import("@/components/retailer/SalesGraph"), {
  ssr: false,
});

export const getServerSideProps = async (ctx: any) => {
  const historySalesData = await getHistorySalesData(ctx);
  return {
    props: {
      historySalesData: historySalesData || {},
    },
  };
};

interface IProps {
  data: TSales;
}

const Sales = ({ data }: IProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-4">
        <Button>Generate Prediction Sales</Button>
      </div>
      <SalesGraph labels={["name", "test", "test2"]} data={data} />
    </div>
  );
};

export default Sales;
