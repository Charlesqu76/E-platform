import { Pie, PieChart, ResponsiveContainer } from "recharts";

interface IProps {
  data: any[];
  dataKey: string;
}

const MyPie = ({ data, dataKey = "name" }: IProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
        <Pie
          data={data}
          dataKey={"count"}
          legendType="none"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          labelLine={false}
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPie;
