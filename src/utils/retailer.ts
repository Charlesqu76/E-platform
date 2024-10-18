import { TSales } from "@/type/product";
import { generateRandomHexColor } from ".";
import dayjs, { Dayjs } from "dayjs";
import { ETimeSpan } from "@/type/retailer";

export const getLabelColors = (labels: string[]) => {
  const labelColors = labels.reduce((acc, cur) => {
    acc[cur] = generateRandomHexColor();
    return acc;
  }, {} as { [name: string]: string });
  return labelColors;
};

const getTimeString = (time: Dayjs, timeSpan = ETimeSpan.MONTH) => {
  let format;
  switch (timeSpan) {
    case ETimeSpan.DAY:
      format = "YYYY-MM-DD";
      break;
    case ETimeSpan.MONTH:
      format = "YYYY-MM";
      break;
    case ETimeSpan.YEAR:
      format = "YYYY";
      break;
  }
  return time.format(format);
};

export const formatSalesData = (
  data: TSales,
  timeList: String[],
  timeSpan = ETimeSpan.MONTH
) => {
  if (!data) return [];
  const res = [];
  for (const time of timeList) {
    const r = {} as Record<string, any>;
    r["TIMESPAN"] = time;
    Object.entries(data || {}).forEach(([key, value]) => {
      Object.entries(value || {}).forEach(([date, { quantity }]) => {
        const formatDate = getTimeString(dayjs(date), timeSpan);
        if (formatDate === time) {
          r[key] = quantity;
        }
      });
      if (!r[key]) {
        r[key] = 0;
      }
    });

    res.push(r);
  }
  return res;
};

export const generateTimeList = (
  startTime: Dayjs,
  endTime: Dayjs,
  timeSpan = ETimeSpan.MONTH
): String[] => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const result: String[] = [];
  let current = start;
  while (current.isBefore(end) || current.isSame(end)) {
    result.push(getTimeString(current, timeSpan));
    current = current.add(1, timeSpan);
  }

  return result;
};

export const getFormatSalesData = ({
  data,
  startTime,
  endTime = dayjs(),
  timeSpan,
}: {
  data: TSales;
  startTime: Dayjs;
  endTime: Dayjs;
  timeSpan: ETimeSpan;
}) => {
  return formatSalesData(
    data,
    generateTimeList(startTime, endTime, timeSpan),
    timeSpan
  );
};

export const getPickerType = (timespan: ETimeSpan) => {
  let t_ = "";
  switch (timespan) {
    case ETimeSpan.DAY:
      t_ = "";
      break;
    case ETimeSpan.MONTH:
      t_ = "month";
      break;
    case ETimeSpan.YEAR:
      t_ = "year";
      break;
  }
  return t_;
};

export const getMaxAndMinDate = (data: TSales) => {
  let minDate = dayjs("2999");
  let maxDate = dayjs("1999");

  Object.entries(data || {}).forEach(([key, value]) => {
    Object.entries(value || {}).forEach(([date]) => {
      // const dDate = dayjs(date);
      minDate = minDate.isBefore(date) ? minDate : dayjs(date);
      maxDate = maxDate.isAfter(date) ? maxDate : dayjs(date);
    });
  });
  return {
    minDate,
    maxDate,
  };
};
