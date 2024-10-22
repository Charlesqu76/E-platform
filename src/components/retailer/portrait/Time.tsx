import { TTimeData } from "@/type/retailer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <text
      x={x + width / 2}
      y={y - radius}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

const Time = ({ data }: { data: TTimeData[] }) => {
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        height={600}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="buy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="view" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="TIMESPAN" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            if (props.dataKey === "VIEW1") {
              return [props.payload["VIEW"], "VIEW"];
            }
            return [value, name];
          }}
        />
        <Legend />
        <Bar type="monotone" dataKey="BUY" fill="url(#buy)" stackId="a" />
        <Bar type="monotone" dataKey="VIEW1" fill="url(#view)" stackId="a">
          <LabelList dataKey="PERCENTAGE" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Time;
