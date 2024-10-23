import {
  getBuyData,
  getDeviceData,
  getGenderData,
  getGeoData,
  getViewData,
} from "@/fetch/retailer";
import { formatData, formatGenderToPie } from "@/utils/retailer";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

const Time = dynamic(() => import("@/components/retailer/portrait/Time"), {
  ssr: false,
});

const MyPie = dynamic(() => import("@/components/retailer/portrait/Pie"), {
  ssr: false,
});

interface IProps {
  buyData: any;
  viewData: any;
  geoData: any;
  deviceData: any;
  genderData: any;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [buyData, viewData, geoData, deviceData, genderData] =
    await Promise.all([
      getBuyData(ctx),
      getViewData(ctx),
      getGeoData(ctx),
      getDeviceData(ctx),
      getGenderData(ctx),
    ]);
  return {
    props: {
      buyData,
      viewData,
      geoData,
      deviceData,
      genderData,
    },
  };
};

const Portrait = ({
  buyData,
  viewData,
  genderData,
  geoData,
  deviceData,
}: IProps) => {
  const formatGenderData = formatGenderToPie(genderData);
  const l = [
    { name: "gender", data: formatGenderData },
    { name: "geo", data: geoData },
    { name: "device", data: deviceData },
  ];

  const clickAnalyze = () => {
    console.log("clickAnalyze");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center mb-4">
        {l.map(({ name, data }) => (
          <div
            key={name}
            className="w-1/3 min-w-48 h-48 flex flex-col items-center"
          >
            <h3 className="font-bold mb-1">{name.toUpperCase()}</h3>
            <MyPie data={data} dataKey={name} />
          </div>
        ))}
      </div>
      <div className="w-full h-96">
        <Time data={formatData({ buyData, viewData })} />
      </div>
    </div>
  );
};

export default Portrait;
