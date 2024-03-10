"use client";

import KakaoMapForm from "@/components/Forms/KakaoMapForm";
import TypesButtonGroup from "@/components/Forms/TypesButtonGroup";
import MatchDto from "@/types/matchDto.type";
import { matchCreateIcons } from "@/utils/matchIcons";
import matchTypes from "@/utils/matchTypes";
import dayjs from "dayjs";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import SubmitButton from "../../Buttons/SubmitButton";
import CalendarForm from "../CalendarForm/CalendarForm";
import DropDownGroup from "../DropDownGroup";
import InputForm from "../InputForm/InputForm";
import TextareaForm from "../TextAreaForm/TextAreaForm";

//* 수정데이터가 있다면(editValues) 해당 values를 defaultValues로, 아니면 {}로
interface MatchFormProps {
  editValues?: MatchDto;
}

function MatchForm({ editValues }: MatchFormProps) {
  const methods = useForm<FieldValues>({
    defaultValues: editValues || {},
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const matchDate =
      dayjs(data.date).format("YYYY-MM-DD") +
      " " +
      data.time.hour +
      ":" +
      data.time.minute;

    //* 1. date 날짜 formatting
    if (data.hasOwnProperty("date")) {
      data.date = dayjs(data.date).format("YYYY-MM-DD");
    }

    const requestData = {
      ...data,
      matchDate: matchDate,
      // hour: undefined,
      // minute: undefined,
    };

    // 2. hour과 minute을 합쳐 matchTime 생성
    // const matchTime = `${data.hour}:${data.minute}`;

    // 3. hour과 minute 제외
    // const { hour, minute, ...restOfMatchData } = data;

    //  4. hour과 minute 제외하고, matchTime를 추가한 새로운 객체 생성
    // const requestData = {
    //   ...restOfMatchData,
    //   matchTime: matchTime,
    // };

    console.log(requestData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TypesButtonGroup
          iconSrc={matchCreateIcons.post}
          id="sport"
          label="종목"
          typeString={matchTypes.sports}
        />
        <InputForm label="제목" id="title" placeholder="제목을 입력해주세요." />
        <TextareaForm
          label="내용"
          id="content"
          placeholder="내용을 입력해주세요."
        />
        <TypesButtonGroup
          iconSrc={matchCreateIcons.gender}
          id="gender"
          label="모집성별"
          typeString={matchTypes.gender}
        />
        <TypesButtonGroup
          iconSrc={matchCreateIcons.players}
          id="players"
          label="매치유형"
          typeString={matchTypes.players}
        />
        <CalendarForm />
        <DropDownGroup id="time" label="경기 시작 시간" />
        <KakaoMapForm />
        <SubmitButton
          buttonLabel={editValues ? "수정 완료" : "작성 완료"}
          isValid={isValid}
          type="submit"
        />
      </form>
    </FormProvider>
  );
}

export default MatchForm;
