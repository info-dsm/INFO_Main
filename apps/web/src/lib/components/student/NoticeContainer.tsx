import { useEffect, useState } from "react";
import styled from "styled-components";
import StudentMainNotice from "./mainNotice";
import {
  getWaitingNoticeList,
  getWaitingNoticeListContentProps,
  getWaitingNoticeListProps,
} from "../../../axios/dist";

const StudentMainNoticeContainer = () => {
  const [companyKind, setCompanyKind] = useState<
    getWaitingNoticeListContentProps[]
  >([
    {
      noticeId: "string",
      company: {
        companyNumber: "string",
        companyName: "string",
        imageList: [""],
      },
      classificationResponse: [
        {
          bigClassification: {
            bigClassificationName: "string",
          },
          name: "string",
        },
      ],

      detailBusinessDescription: "string",
      numberOfEmployee: 0,
      gradeCutLine: 0,
      applicantCount: 0,
      isPersonalContact: false,
      noticeOpenPeriod: {
        startDate: "string",
        endDate: "string",
      },
    },
  ]);

  function chunk({
    data,
    size,
  }: {
    data: getWaitingNoticeListContentProps[];
    size: number;
  }) {
    const arr = [];

    if (data)
      for (let i = 0; i < data.length; i += size) {
        arr.push(data.slice(i, i + size));
      }

    return arr;
  }

  useEffect(() => {
    getWaitingNoticeList({ idx: 0, size: 8 }).then(
      (res: getWaitingNoticeListProps) => {
        setCompanyKind(res.content);
      }
    );
  }, []);

  return (
    <NoticeCompany>
      <NoticeContainer sort={"flex-start"}>
        {chunk({ data: companyKind, size: 4 })[0].map(
          (t: getWaitingNoticeListContentProps, i: number, a) => (
            <StudentMainNotice condition={i >= a.length - 2} info={t} />
          )
        )}
      </NoticeContainer>
      <NoticeContainer sort={"flex-end"}>
        {chunk({ data: companyKind, size: 2 })[1] ? (
          <>
            {chunk({ data: companyKind, size: 4 })[1].map((t, i, a) => (
              <StudentMainNotice condition={i <= 1} info={t} />
            ))}
          </>
        ) : (
          <></>
        )}
      </NoticeContainer>
    </NoticeCompany>
  );
};

export default StudentMainNoticeContainer;

const NoticeCompany = styled.div`
  background-color: #101112;
  padding-bottom: 300px;
`;

const NoticeContainer = styled.div<{ sort: string }>`
  margin-bottom: 40px;
  width: 105vw;
  display: inline-flex;
  justify-content: ${(props) => props.sort};
  margin-left: ${(props) => (props.sort === "flex-start" ? "-100px" : "")};
  gap: 20px;
`;
