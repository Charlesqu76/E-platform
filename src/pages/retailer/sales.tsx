import { getHistorySalesData } from "@/fetch/retailer";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const SalesGraph = dynamic(() => import("@/components/retailer/SalesGraph"), {
  ssr: false,
});

const Sales = () => {
  useEffect(() => {
    getHistorySalesData();
  }, []);
  return (
    <div>
      <SalesGraph
        labels={["name", "test", "test2"]}
        data={[{ name: 1, test: 2, TIMESPAN: "2" }]}
      />
    </div>
  );
};

export default Sales;
