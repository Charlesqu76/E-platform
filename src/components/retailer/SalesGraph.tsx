import { TSales } from "@/type/product";
import { ETimeSpan } from "@/type/retailer";
import {
  getFormatSalesData,
  getLabelColors,
  getMaxAndMinDate,
  getPickerType,
} from "@/utils/retailer";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;

import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface IProps {
  data: TSales;
}

const Sales = ({ data = {} }: IProps) => {
  const [timespan, setTimeSpan] = useState(ETimeSpan.MONTH);

  const [range, setRange] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(1, "month"),
    dayjs(),
  ]);
  const showData = getFormatSalesData({
    data,
    startTime: range[0],
    endTime: range[1],
    timeSpan: timespan,
  });

  const { minDate, maxDate } = useMemo(() => getMaxAndMinDate(data), []);

  const labels = Object.keys(data || {});

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
      <div className="mb-4">
        <Select
          className="mr-4 w-32"
          value={timespan}
          onChange={(value) => {
            setTimeSpan(value);
          }}
          options={[
            { value: ETimeSpan.DAY, label: ETimeSpan.DAY },
            { value: ETimeSpan.MONTH, label: ETimeSpan.MONTH },
            { value: ETimeSpan.YEAR, label: ETimeSpan.YEAR },
          ]}
        />
        <RangePicker
          value={range}
          picker={getPickerType(timespan) as any}
          maxDate={maxDate}
          minDate={minDate}
          onChange={(range) => {
            setRange(range as any);
          }}
        />
      </div>
      <p className="mb-2">HISTORY SALES DATA</p>
      <LineChart
        width={730}
        height={250}
        data={showData || []}
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
