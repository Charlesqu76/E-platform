import { getHistorySalesData } from "@/fetch/retailer";
import { TSales } from "@/type/product";
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
  return (
    <div className="flex flex-col">
      <SalesGraph data={historySalesData} />
    </div>
  );
};

export default Sales;
