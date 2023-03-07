import TeacherNotice from "../../../lib/components/teacher/Notice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  getOnList,
  deleteNoRemainNotice,
  deleteNotice,
} from "../../../axios/dist";
import { Footer } from "ui";
const TeacherNoticePage = () => {
  const [getIndex, setIndex] = useState<number>(0);
  const queryClient = useQueryClient();
  const { status, data } = useQuery(
    ["noticeProgress", getIndex],
    async () => getOnList(getIndex),
    { keepPreviousData: true }
  );
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
      text: "모집 종료",
      onClick: (check: boolean[]) => {
        deleteNotice(GetElementList(check)).then(() =>
          queryClient.refetchQueries({
            queryKey: ["noticeProgress", getIndex],
          })
        );
      },
    },
    {
      text: "삭제",
      onClick: (check: boolean[]) => {
        deleteNoRemainNotice(GetElementList(check)).then(() =>
          queryClient.refetchQueries({
            queryKey: ["noticeProgress", getIndex],
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
          listStatus: "APPROVE",
        }}
      />
    </>
  );
};
export default TeacherNoticePage;
