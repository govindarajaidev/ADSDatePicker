import { useState } from "react";
import ADSDatePicker from "./ADSDatePicker";
import type { ADSPeriodType, ADSPeriodData } from "./ADSTypes";

const App: React.FC = () => {
  const [periodType, setPeriodType] = useState<ADSPeriodType>("month");
  const [periodDate, setPeriodDate] = useState<string | "">("");

  const datepickerCbFn = (data: ADSPeriodData) => {
    console.log("Selected Period Data:", data);
    setPeriodType(data.periodType);
    setPeriodDate(data.date || "");
  };

  return (
    <div>
      <ADSDatePicker
        periodType={periodType}
        periodDate={periodDate ? periodDate : undefined}
        periodCBUrl={false}
        periodCBFn={datepickerCbFn}
      />
    </div>
  );
};

export default App;
