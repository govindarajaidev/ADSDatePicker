import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import type { ADSPeriodData, ADSPeriodType } from "./ADSTypes";

dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);

export async function getPeriodData(periodType: ADSPeriodType = "month", periodDate: Date = new Date()): Promise<ADSPeriodData> {
  const baseData: { periodType: ADSPeriodType; date: string } = { periodType, date: dayjs(periodDate).format("YYYY-MM-DD") };
  switch (periodType) {
    case "date":
      return {
        ...baseData,
        date: dayjs(periodDate).format("YYYY-MM-DD"),
      };
    case "week":
      return {
        ...baseData,
        weekNumber: dayjs(periodDate).week(),
        weekStartDate: dayjs(periodDate).startOf("week").format("YYYY-MM-DD"),
        weekEndDate: dayjs(periodDate).endOf("week").format("YYYY-MM-DD"),
        weekMonth: dayjs(periodDate).format("MMM"),
        weekYear: dayjs(periodDate).year(),
        weekName: `${dayjs(periodDate).startOf("week").format("MMM DD")}-${dayjs(periodDate).endOf("week").format("DD")}`,
      };
    case "month":
      return {
        ...baseData,
        monthStartDate: dayjs(periodDate).startOf("month").format("YYYY-MM-DD"),
        monthEndDate: dayjs(periodDate).endOf("month").format("YYYY-MM-DD"),
        monthNumber: dayjs(periodDate).format("MM"),
        monthName: dayjs(periodDate).format("MMMM"),
        monthShortName: dayjs(periodDate).format("MMM"),
        monthYear: dayjs(periodDate).year(),
      };
    case "quarter":
      return {
        ...baseData,
        quarterYear: dayjs(periodDate).year(),
        quarterNumber: dayjs(periodDate).quarter(),
        quarterStartDate: dayjs(periodDate).startOf("quarter").format("YYYY-MM-DD"),
        quarterEndDate: dayjs(periodDate).endOf("quarter").format("YYYY-MM-DD"),
      };
    case "year":
      return {
        ...baseData,
        year: dayjs(periodDate).year(),
        yearStartDate: dayjs(periodDate).startOf("year").format("YYYY-MM-DD"),
        yearEndDate: dayjs(periodDate).endOf("year").format("YYYY-MM-DD"),
      };
    default:
      return { ...baseData };
  }
}
