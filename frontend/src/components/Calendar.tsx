import * as React from "react";
import { TextField, Grid } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  PickersDayProps,
  PickersDay,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";

import { DateValue } from "../type/velmelazo";

type Props = {
  dateValue: DateValue;
};

const Calendar: React.FC<Props> = ({ dateValue }) => {
  const styles = {
    mobiledialogprops: {
      ".MuiDatePickerToolbar-title": {
        fontSize: "1.5rem",
      },
      'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(1)': {
        color: "rgba(255, 0, 0, 0.6)", // 日 = 赤
      },
      'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(7)': {
        color: "rgba(0, 0, 255, 0.6)", // 土 = 青
      },
    },
    paperprops: {
      'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(1)': {
        color: "rgba(255, 0, 0, 0.6)", // 日 = 赤
      },
      'div[class^="PrivatePickers"] div[class^="css-"]>span:nth-of-type(7)': {
        color: "rgba(0, 0, 255, 0.6)", // 土 = 青
      },
    },
  };
  const renderWeekEndPickerDay = (
    date: Date,
    _selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    const switchDayColor = (getday: number) => {
      switch (
        getday // Sun=0,Sat=6
      ) {
        case 0:
          return { color: "red" };
        case 6:
          return { color: "blue" };
        default:
          return {};
      }
    };
    const newPickersDayProps = {
      ...pickersDayProps,
      sx: switchDayColor(date.getDay()),
    };
    return <PickersDay {...newPickersDayProps} />;
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja} // ja追加
      dateFormats={{ monthAndYear: "yyyy年 MM月", year: "yyyy年" }} // カレンダー左上の日付表示 年選択を○○年表示
      localeText={{
        previousMonth: "前月を表示", // < のツールチップ
        nextMonth: "次月を表示", // > のツールチップ
        cancelButtonLabel: "キャンセル", // スマホ画面のCANCELボタン
        okButtonLabel: "選択", // スマホ画面のOKボタン
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12} sx={{ mb: "20px" }}>
          <DatePicker
            label={dateValue.calenderText}
            minDate={new Date("2023-01-01")} // 選択範囲は2021年～
            value={dateValue.date}
            onChange={dateValue.handleDateChange}
            inputFormat="yyyy年MM月dd日" // 選択済みの日付の表示
            mask="____年__月__日"
            toolbarFormat="yyyy年MM月dd日" // スマホ画面の左上 選択中日付表示
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "****年**月**日", // プレースホルダー（フォーカスを合わせたときに薄く表示される入力例）
                }}
              />
            )}
            DialogProps={{ sx: styles.mobiledialogprops }} // スマホ画面の左上 選択中日付表示 文字の大きさ調整
            PaperProps={{ sx: styles.paperprops }} // 見だしの "土" "日" 表示色調整
            renderDay={renderWeekEndPickerDay} // 週末の色調整
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default Calendar;
