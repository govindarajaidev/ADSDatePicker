import { useEffect } from "react";
import { useImmer } from "use-immer";
import { DatePicker, Space, Segmented, ConfigProvider, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./ADSDatePicker.css";
import type { ADSPeriodType, ADSPickerProps } from "./ADSTypes";
import { CALENDAR_PICKER_THEME, SEGMENT_OPTIONS } from "./ADSConstant";
import { getPeriodData } from "./ADSUtils";

const ADSDatePicker: React.FC<ADSPickerProps> = ({ periodType = "month", periodDate = null, periodCBFn = () => {}, periodCBUrl = true }) => {
  const [pickerState, updatePickerState] = useImmer({
    open: false,
    date: periodDate ? dayjs(periodDate).toDate() : null,
    type: periodType as ADSPeriodType,
    selectedDate: periodDate ? dayjs(periodDate).toDate() : null,
    selectedType: periodType as ADSPeriodType,
    selectedKeys: [] as string[],
  });

  const handleCalendarIconClick = () => {
    updatePickerState((draft) => {
      draft.open = !draft.open;
    });
  };

  const handleSegmentChange = async (value: string) => {
    let newPickerType: ADSPeriodType = value == "Day" ? "date" : (value.toLowerCase() as ADSPeriodType);

    updatePickerState((draft) => {
      if (newPickerType === draft.selectedType) {
        draft.date = draft.selectedDate;
      } else {
        draft.date = null;
      }
      draft.type = newPickerType;
    });
  };

  const handleDateChange = async (date: Date) => {
    updatePickerState((draft) => {
      draft.date = date;
      draft.selectedDate = date;
      draft.selectedType = draft.type;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!pickerState.selectedDate) return;
      const dateInfo = await getPeriodData(pickerState.type, pickerState.selectedDate);

      if (periodCBUrl) {
        updatePickerState((draft) => {
          const keys = Object.keys(dateInfo) as Array<keyof typeof dateInfo>;
          draft.selectedKeys = [...keys];
        });

        const url = new URL(window.location.href);
        for (const key of pickerState.selectedKeys) {
          url.searchParams.delete(key);
        }
        for (const [key, value] of Object.entries(dateInfo)) {
          url.searchParams.set(key, (value as unknown as string) || "");
        }
        window.history.pushState({}, "", url);
      } else {
        periodCBFn(dateInfo);
      }
    };
    fetchData();
  }, [pickerState.selectedDate]);

  const segmentedValue = pickerState.type === "date" ? "Day" : pickerState.type.charAt(0).toUpperCase() + pickerState.type.slice(1);

  return (
    <ConfigProvider theme={CALENDAR_PICKER_THEME}>
      <Space direction="vertical">
        <div className="calendar-picker-wrapper">
          <Button
            type="text"
            icon={<CalendarOutlined />}
            onClick={handleCalendarIconClick}
            className="calendar-icon-button"
            size="large"
          />
          <DatePicker
            picker={pickerState.type}
            showWeek={false}
            open={pickerState.open}
            value={pickerState.date ? dayjs(pickerState.date) : null}
            onOpenChange={(open) => {
              updatePickerState((draft) => {
                draft.open = open;
              });
            }}
            renderExtraFooter={() => null}
            onChange={(date) => handleDateChange(date?.toDate() || null)}
            panelRender={(panel) => (
              <div className="calendar-picker-container">
                <Segmented<string>
                  options={SEGMENT_OPTIONS}
                  value={segmentedValue}
                  onChange={handleSegmentChange}
                  size="small"
                  style={{ width: "100%" }}
                />
                {panel}
              </div>
            )}
          />
        </div>
      </Space>
    </ConfigProvider>
  );
};

export default ADSDatePicker;
