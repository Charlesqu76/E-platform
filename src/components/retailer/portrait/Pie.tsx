import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface IProps {
  data: any[];
  dataKey: string;
}

const MyPie = ({ data, dataKey = "name" }: IProps) => {
  const COLORS = [
    "#A1C3D1",
    "#F67280",
    "#C06C84",
    "#6C5B7B",
    "#355C7D",
    "#99B898",
    "#FECEA8",
    "#FF847C",
    "#E84A5F",
    "#2A363B",
    "#E8A87C",
    "#C38D9E",
    "#41B3A3",
    "#2E8BC0",
    "#0A3D62",
    "#6A0572",
    "#1B98E0",
    "#FDCB9E",
    "#F0A500",
    "#D63447",
  ];

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
        <Pie
          data={data}
          dataKey={"count"}
          nameKey={dataKey}
          legendType="none"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPie;
