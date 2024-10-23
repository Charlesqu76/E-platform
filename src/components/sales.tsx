import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IProps {
  data: any[];
}

const Sales = ({ data = [] }: IProps) => {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2">SALES DATA</p>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          data={data || []}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line key={"value"} dataKey={"value"} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sales;
