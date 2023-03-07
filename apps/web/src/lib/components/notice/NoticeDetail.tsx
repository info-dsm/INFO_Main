import {
  getCompanyDetail,
  getCompanyDetailProps,
  getNoticeDetail2,
  getNoticeDetailProps2,
} from "../../../axios/dist";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import DetailInfo from "../student/NoticeDetailInfo";
import {
  DetailRecruitmentJob,
  Welfare,
  QualificationRequirements,
  Spinner,
} from "ui";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Header, Logo } from "ui";
const NoticeDetail = ({
  menu,
  companyNumber,
  noticeId,
  children,
}: PropsWithChildren<{
  companyNumber: string;
  noticeId: string;
  menu: {
    onClick: () => void;
    key: string;
    selected: boolean;
  }[];
}>) => {
  const { status, data } = useQuery(
    ["getNoticeDetail", companyNumber, noticeId],
    async () => {
      const data = (await axios.all([
        getNoticeDetail2(noticeId) as unknown as getNoticeDetailProps2,
        getCompanyDetail({
          id: companyNumber,
        }) as unknown as getCompanyDetailProps,
      ])) as [getNoticeDetailProps2, getCompanyDetailProps];
      return data;
    }
  );

  return (
    <>
      <Header bgColor="#fff" admin={true} {...{ menu }}>
        <Logo main={true} onClick={() => {}} />
      </Header>
      <MainDiv>
        <DetailDiv>
          <ImageLayout>
            {data && data[1] ? (
              <Image
                src={
                  data[1].companyIntroductionResponse.companyPhotoList[0]
                    ? data[1].companyIntroductionResponse.companyPhotoList[0]
                        .fileUrl
                    : ""
                }
                priority={true}
                object-fit="contain"
                fill
                alt="asdf"
                placeholder="empty"
              />
            ) : (
              <></>
            )}
          </ImageLayout>
          <h1>
            {data && data[0]
              ? data[0].classificationResponse.map((t, i, a) => (
                  <>
                    {t.name}
                    {a.length - 1 !== i ? ", " : " "}
                  </>
                ))
              : ""}
            개발자 모집합니다.
          </h1>
          <h6>㈜ {data && data[0] ? data[0].company.companyName : ""}</h6>
          {data && data[0] && data[1] ? (
            <>
              <DetailInfo
                companyInfo={data[1]}
                subData={`${
                  data && data[0] ? data[0].noticeOpenPeriod.startDate : ""
                } ~ ${data && data[0] ? data[0].noticeOpenPeriod.endDate : ""}`}
              />
              <DetailRecruitmentJob
                noticeInfo={data[0]}
                companyInfo={data[1]}
              />
              <QualificationRequirements noticeInfo={data[0]} />
              <Welfare noticeInfo={data[0]} />
            </>
          ) : (
            <>
              <Spinner />
            </>
          )}
          {children}
        </DetailDiv>
      </MainDiv>
    </>
  );
};

export default NoticeDetail;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  background-color: #f4f4f5;
`;

const DetailDiv = styled.div`
  width: 1200px;
  height: 100%;
  background-color: #fff;
  padding: 100px 100px;

  > h1 {
    margin: 0;
    margin-top: 32px;
    font-size: 40px;
    font-weight: 600;
  }

  > h6 {
    margin: 0;
    margin-top: 8px;
    font-size: 18px;
    font-weight: 600;
  }
`;
const ImageLayout = styled.div`
  position: relative;
  width: 1000px;
  height: 600px;
  object-fit: contain;
`;
