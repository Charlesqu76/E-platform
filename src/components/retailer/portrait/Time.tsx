import { TTimeData } from "@/type/retailer";
import { Area, AreaChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const Time = ({ data }: { data: TTimeData[] }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2">AMOUNT VIEW AND BUY ON AVERAGE 7 DAYS</p>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="TIMESPAN" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="VIEW"
          stroke="#8884d8"
          fill="url(#colorUv)"
          fillOpacity={1}
        />
        <Area
          type="monotone"
          dataKey="BUY"
          stroke="#82ca9d"
          fill="url(#colorPv)"
          fillOpacity={1}
        />
      </AreaChart>
    </div>
  );
};

export default Time;
