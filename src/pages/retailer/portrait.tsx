import { getBuyData, getViewData } from "@/fetch/retailer";
import { TTimeData } from "@/type/retailer";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

const Time = dynamic(() => import("@/components/retailer/portrait/Time"), {
  ssr: false,
});
const Month = dynamic(() => import("@/components/retailer/portrait/Month"), {
  ssr: false,
});

const generateTimeData = (): TTimeData[] => {
  const data: TTimeData[] = [];
  for (let i = 0; i <= 24; i += 2) {
    data.push({
      VIEW: Math.floor(Math.random() * 1000) + 500,
      BUY: Math.floor(Math.random() * 500) + 100,
      TIMESPAN: `${i.toString().padStart(2, "0")}:00`,
    });
  }
  return data;
};

const generateMonthlyData = (): TTimeData[] => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month) => ({
    TIMESPAN: month,
    VIEW: Math.floor(Math.random() * 1000) + 500,
    BUY: Math.floor(Math.random() * 500) + 100,
  }));
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [buyData, vieData] = await Promise.all([
    getBuyData(ctx),
    getViewData(ctx),
  ]);
  return {
    props: {
      buyData,
      vieData,
    },
  };
};

const Portrait = () => {
  return (
    <div className="flex flex-wrap">
      <Time data={generateTimeData()} />
      <Month data={generateMonthlyData()} />
    </div>
  );
};

export default Portrait;
