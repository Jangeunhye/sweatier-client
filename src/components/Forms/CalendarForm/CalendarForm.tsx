"use client";
import FormOuter from "@/components/Forms/FormOuter";
import Label from "@/components/Forms/Label";
import { MatchResonseType } from "@/types/match.response.type";
import { matchCreateIcons } from "@/utils/matchIcons";
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Controller, useFormContext } from "react-hook-form";
import CustomCaption from "./CustomCaption";
import "./calendar.css";

interface CalendarFormProps {
  editValue?: Date;
}

function CalendarForm({ editValue }: CalendarFormProps) {
  const { control, setValue, getValues } = useFormContext<MatchResonseType>();

  // 컴포넌트가 마운트될 때, editValue가 있는 경우 해당 값을 사용하여 matchDay 필드를 초기화
  useEffect(() => {
    if (editValue) {
      setValue("matchDay", editValue);
    }
  }, [editValue, setValue]);

  console.log("editValue", editValue); // Mon Apr 15 2024 21:30:00 GMT+0900 (한국 표준시)

  return (
    <FormOuter>
      <Label label="날짜" id="matchDay" iconSrc={matchCreateIcons.post} />
      <Controller
        name="matchDay"
        control={control}
        rules={{ required: "이 필드는 필수입니다." }}
        render={({ field: { onChange, value } }) => {
          const selectedDay = value || getValues("matchDay") || new Date();
          return (
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={onChange}
              fromDate={new Date()}
              showOutsideDays
              classNames={{
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-1 w-full font-normal text-sm",
                row: "w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-base p-0 m-1 mb-2 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-natural-40 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-primary-40 rounded-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-primary-100 text-white hover:bg-primary-60 hover:text-white focus:bg-primary-100 focus:text-white text-center",
                day_today: "text-primary-100 bg-red-400",
                day_outside:
                  "day-outside text-natural-40 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10 cursor-not-allowed",
                day_disabled: "text-natural-40 cursor-not-allowed",
                day_hidden: "invisible",
              }}
              components={{
                Caption: CustomCaption,
              }}
            />
          );
        }}
      />
    </FormOuter>
  );
}

export default CalendarForm;
