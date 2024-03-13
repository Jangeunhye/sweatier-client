"use client";
import ContentTextarea from "@/components/Forms/ContentTextarea/ContentTextarea";
import GenderSelector from "@/components/Forms/GenderSelector/GenderSelector";
import MatchCalendar from "@/components/Forms/MatchCalendar/MatchCalendar";
import MatchSubmitButton from "@/components/Forms/MatchSubmitButton/MatchSubmitButton";
import MatchTime from "@/components/Forms/MatchTime/MatchTime";
import MatchTypeSelector from "@/components/Forms/MatchTypeSelector/MatchTypeSelector";
import SportTypeSelector from "@/components/Forms/SportTypeSelector/SportTypeSelector";
import TitleInput from "@/components/Forms/TitleInput/TitleInput";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

interface MatchFormProps {
  matchId: string;
  editValues?: any;
}

function EditMatchForm({ matchId, editValues }: MatchFormProps) {
  const [kakaoMapResult, setKakaoMapResult] = useState({
    placeName: "웅진IT 본사",
    region: "",
    address: "",
    latitude: 37.5685159133492,
    longitude: 126.98020965303,
  }); // 기본 위치 설정 (웅진 본사)

  const router = useRouter();

  // todo : 주소 받으면 setKakaoMapResult <- 에 기본 값으로 설정

  const methods = useForm({
    defaultValues: {
      ...editValues,
      sportsTypeName: editValues.sportType[0],
      matchDay: editValues ? dayjs(editValues.matchDay).toDate() : new Date(),
      hour: editValues ? dayjs(editValues.matchDay).format("HH") : "",
      minute: editValues ? dayjs(editValues.matchDay).format("mm") : "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const matchDateTime = dayjs(data.matchDay)
      .hour(parseInt(data.hour))
      .minute(parseInt(data.minute))
      .toISOString();

    const { hour, minute, ...rest } = data;

    const finalData = {
      ...rest,
      ...kakaoMapResult,
      matchDay: matchDateTime,
    };

    console.log("finalData", finalData);

    try {
      // const { id } = await api.match.updateMatch(matchId, finalData);
      // toast.success("게시물이 수정되었습니다!");
      // router.replace(`/matches/${id}`);
    } catch (error) {
      console.error("Match creation failed:", error);
      toast.success("게시물 수정에 실패했습니다.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SportTypeSelector />
        <TitleInput />
        <ContentTextarea />
        <GenderSelector />
        <MatchTypeSelector />
        <MatchCalendar />
        <MatchTime />
        {/* <MatchKakaoMap
          kakaoMapResult={kakaoMapResult}
          setKakaoMapResult={setKakaoMapResult}
        /> */}
        <MatchSubmitButton isValid={isValid} />
      </form>
    </FormProvider>
  );
}

export default EditMatchForm;

// const {
//   sportType,
//   title,
//   content,
//   address,
//   capability,
//   region,
//   placeName,
//   matchDay,
//   latitude,
//   longitude,
// } = editMatches;

// console.log(editMatches);

// const editValues = {
//   sportsTypeName: sportType[0],
//   title: title,
//   content: content,
//   address: address || "서울특별시 중구 청계천로 24",
//   capability: capability,
//   gender: "both",
//   latitude: latitude,
//   longitude: longitude,
//   matchDay: matchDay,
//   placeName: placeName || "웅진IT 본사",
//   region: region || "서울",
// };
