import { getHistorySalesData, getPredictSalesData } from "@/fetch/retailer";
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
  historySalesData: TSales;
}

const Sales = ({ historySalesData }: IProps) => {
  const clickButton = async () => {
    const data = await getPredictSalesData();
    console.log(data);
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={clickButton}>
          Generate Prediction Sales
        </Button>
      </div>
      <SalesGraph data={historySalesData} />
    </div>
  );
};

export default Sales;
