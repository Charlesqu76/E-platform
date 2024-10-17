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
    });

    res.push(r);
  }
  return res;
};

const getTimeString = (time: Dayjs, timeSpan: ETimeSpan) => {
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

export const generateTimeList = (
  startTime: string,
  endTime: string,
  timeSpan: ETimeSpan
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
