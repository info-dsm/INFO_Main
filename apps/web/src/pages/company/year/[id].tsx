import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import TeacherCompany from "../../../lib/components/teacher/Company";
import { useRouter } from "next/router";
import { getYearCompany } from "../../../axios/dist";
import { Footer } from "ui";
const CompanySearchResult = () => {
  const id = useRouter().query.id as string;
  const [getIndex, setIndex] = useState<number>(0);
  const { status, data } = useQuery(
    ["listYear", getIndex],
    async () => getYearCompany(id, getIndex),
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
        {...{
          status,
          data,
          getIndex,
          ChangeIndex,
          queryKey: "listYear",
          result: id,
        }}
      />
    </>
  );
};
export default CompanySearchResult;
