import { TSales } from "@/type/product";
import { ETimeSpan } from "@/type/retailer";
import {
  formatSalesData,
  generateTimeList,
  getLabelColors,
} from "@/utils/retailer";
import { useMemo, useState } from "react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface IProps {
  data: TSales;
  labels: string[];
}

const Sales = ({ data = {}, labels = [] }: IProps) => {
  const a = formatSalesData(
    data,
    generateTimeList("2023-1-1", "2027-1-1", ETimeSpan.YEAR),
    ETimeSpan.YEAR
  );

  labels = Object.keys(data || {});

  const [visibleLines, setVisibleLines] = useState<
    { label: string; visible: boolean }[]
  >(
    labels.map((v) => {
      return { label: v, visible: true };
    })
  );

  const labelsColor = useMemo(() => getLabelColors(labels), []);

  const handleLegendClick = (dataKey: string) => {
    const item = visibleLines.find(({ label }) => label === dataKey);
    if (!item) return;
    item["visible"] = !item.visible;
    setVisibleLines([...visibleLines]);
  };

  const CustomizedLegend = () => {
    return (
      <ul className="flex flex-wrap justify-center list-none p-0">
        {visibleLines.map(({ label, visible }) => {
          const color = visible ? labelsColor[label] : "#ccc";
          return (
            <li
              key={label}
              className="inline-flex items-center mx-2 cursor-pointer"
              onClick={() => handleLegendClick(label)}
            >
              <span
                className="inline-block w-3 h-3 mr-1 rounded-full"
                style={{
                  backgroundColor: color,
                }}
              ></span>
              <span
                style={{
                  color: color,
                }}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2">HISTORY SALES DATA</p>
      <LineChart
        width={730}
        height={250}
        data={a || []}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="TIMESPAN" />
        <YAxis />
        <Tooltip />
        <Legend content={<CustomizedLegend />} />
        {visibleLines.map(
          ({ label, visible }) =>
            visible && (
              <Line
                key={label}
                dataKey={label}
                type="monotone"
                stroke={labelsColor[label]}
              />
            )
        )}
      </LineChart>
    </div>
  );
};

export default Sales;
