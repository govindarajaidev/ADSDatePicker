export type ADSPeriodType = "date" | "week" | "month" | "quarter" | "year";

export type ADSPickerProps = {
  periodType?: ADSPeriodType;
  periodDate?: string | "";
  periodCBFn?: (data: ADSPeriodData) => void;
  periodCBUrl?: boolean;
};

export type ADSPickerState = {
  isOpen: boolean;
  selectedDate: Date | null;
  pickerType: ADSPeriodType;
  initialPeriodType: ADSPeriodType;
  initialDate: Date | null;
};

export type ADSPeriodData = {
  periodType: ADSPeriodType;
  date?: string;
  startDate?: string;
  endDate?: string;
  weekNumber?: number;
  weekStartDate?: string;
  weekEndDate?: string;
  weekName?: string;
  weekMonth?: string;
  weekYear?: number;
  monthStartDate?: string;
  monthEndDate?: string;
  monthNumber?: string;
  monthName?: string;
  monthShortName?: string;
  monthYear?: number;
  quarterNumber?: number;
  quarterStartDate?: string;
  quarterEndDate?: string;
  quarterYear?: number;
  year?: number;
  yearStartDate?: string;
  yearEndDate?: string;
};
