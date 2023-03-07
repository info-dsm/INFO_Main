import { NextPage } from "next";
import TeacherCompany from "../../lib/components/teacher/Company";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getCompanyList } from "../../axios/dist";
const TeacherCompanyPage: NextPage = () => {
  const [getIndex, setIndex] = useState<number>(0);
  const { status, data } = useQuery(
    ["list", getIndex],
    async () => getCompanyList(getIndex),
    { keepPreviousData: true }
  );
  const ChangeIndex = useCallback(
    (num: number) => {
      setIndex(num - 1);
    },
    [setIndex]
  );
  return (
    <>
      <TeacherCompany
        {...{ status, data, getIndex, queryKey: "list", ChangeIndex }}
      />
    </>
  );
};
export default TeacherCompanyPage;
