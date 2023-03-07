import TeacherNotice from "../../../lib/components/teacher/Notice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { deleteNoRemainNotice, getGoneList } from "../../../axios/dist";
import { Footer } from "ui";
const TeacherNoticePage = () => {
  const [getIndex, setIndex] = useState<number>(0);
  const [now, setNow] = useState<"승인된" | "미승인">("승인된");
  const { status, data } = useQuery(
    ["noticeGone", getIndex, now],
    async () => getGoneList(getIndex, now === "승인된" ? "APPROVE" : "WAITING"),
    { keepPreviousData: true }
  );
  const queryClient = useQueryClient();
  const ChangeIndex = useCallback(
    (num: number) => {
      setIndex(num - 1);
    },
    [setIndex]
  );
  const onClick = useCallback(
    (item: "승인된" | "미승인") => {
      setNow(item);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [now, setNow]
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
      text: "삭제",
      onClick: (check: boolean[]) => {
        deleteNoRemainNotice(GetElementList(check)).then(() =>
          queryClient.refetchQueries({
            queryKey: ["noticeGone", getIndex, now],
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
          approveStatus: {
            now,
            list: ["승인된", "미승인"],
            onClick,
          },
        }}
      />
    </>
  );
};
export default TeacherNoticePage;
