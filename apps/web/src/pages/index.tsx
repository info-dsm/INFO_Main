import TeacherNotice from "../lib/components/teacher/Notice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  deleteNoRemainNotice,
  deleteNotice,
  getWaitList,
  postAcceptNotice,
} from "../axios/dist";
const TeacherNoticePage = () => {
  const [getIndex, setIndex] = useState<number>(0);
  const { status, data } = useQuery(
    ["notice", getIndex],
    async () => getWaitList(getIndex),
    { keepPreviousData: true }
  );
  const queryClient = useQueryClient();
  const ChangeIndex = useCallback(
    (num: number) => {
      setIndex(num - 1);
    },
    [setIndex]
  );
  const GetElementList = (check: boolean[]) => {
    const companyNumberArr: {
      noticeId: string;
      companyNumber: string;
    }[] = [];
    check.map((v: boolean, i: number) => {
      if (v && data) {
        companyNumberArr.push({
          noticeId: data.content[i].noticeId,
          companyNumber: data.content[i].company.companyNumber,
        });
      }
    });
    return companyNumberArr;
  };
  const grantList = [
    {
      text: "접수",
      onClick: (check: boolean[]) => {
        postAcceptNotice(GetElementList(check)).then(() =>
          queryClient.refetchQueries({
            queryKey: ["notice", getIndex],
          })
        );
      },
    },
    {
      text: "모집 종료",
      onClick: (check: boolean[]) => {
        deleteNotice(GetElementList(check)).then(() =>
          queryClient.refetchQueries({
            queryKey: ["notice", getIndex],
          })
        );
      },
    },
    {
      text: "삭제",
      onClick: (check: boolean[]) => {
        deleteNoRemainNotice(GetElementList(check)).then(() =>
          queryClient.refetchQueries({
            queryKey: ["notice", getIndex],
          })
        );
      },
    },
  ];
  return (
    <>
      <TeacherNotice
        {...{
          status,
          data,
          getIndex,
          ChangeIndex,
          grantList,
          listStatus: "WAITING",
        }}
      />
    </>
  );
};
export default TeacherNoticePage;
