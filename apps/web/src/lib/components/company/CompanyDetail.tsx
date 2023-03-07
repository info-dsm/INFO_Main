import styled from "styled-components";
import React, { PropsWithChildren } from "react";
import {
  getCompanyDetail,
  getCompanyDetailProps,
  getCompanyNoticeEvery,
  NoticeCompanyDtoType,
} from "../../../axios/dist";
import DetailInfo from "../student/NoticeDetailInfo";
import CompanyNoticeList from "./NoticeList";
import Image from "next/image";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { Header, Logo, Spinner } from "ui";

const CompanyDetail = ({
  id,
  path,
  menu,
  children,
}: PropsWithChildren<{
  id: string;
  path: string;
  menu: {
    onClick: () => void;
    key: string;
    selected: boolean;
  }[];
}>) => {
  const data: [
    UseQueryResult<getCompanyDetailProps>,
    UseQueryResult<NoticeCompanyDtoType>
  ] = useQueries({
    queries: [
      {
        queryKey: ["companyInfo", id],
        queryFn: () => getCompanyDetail({ id }),
      },
      {
        queryKey: ["companyNoticeEvery", id],
        queryFn: () => getCompanyNoticeEvery(id),
      },
    ],
  }) as [
    UseQueryResult<getCompanyDetailProps>,
    UseQueryResult<NoticeCompanyDtoType>
  ];
  return (
    <>
      <Header bgColor="#fff" admin={true} {...{ menu }}>
        <Logo main={true} onClick={() => {}} />
      </Header>
      <MainDiv>
        {data[0].status === "success" && data[1].status === "success" ? (
          <DetailDiv>
            <_ImageLayout>
              {data[0].status === "success" ? (
                <Image
                  src={
                    data[0]?.data?.companyIntroductionResponse?.companyLogo
                      .fileUrl
                      ? data[0].data.companyIntroductionResponse?.companyLogo
                          .fileUrl
                      : ""
                  }
                  priority={true}
                  fill
                  object-fit="contain"
                  alt="company logo"
                  placeholder="empty"
                />
              ) : (
                <></>
              )}
            </_ImageLayout>
            <h1>㈜ {data[0]?.data?.companyName}</h1>
            <DetailInfo
              companyInfo={data[0].data as getCompanyDetailProps}
              subData={""}
            />
            <CompanyNoticeList
              companyInfo={data[0].data as getCompanyDetailProps}
              info={data[1].data as NoticeCompanyDtoType}
              {...{ path }}
            />
            {children}
          </DetailDiv>
        ) : (
          <>
            <Spinner />
          </>
        )}
      </MainDiv>
    </>
  );
};

export default CompanyDetail;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: #f4f4f5;
`;
const DetailDiv = styled.div`
  width: 1200px;
  height: 100%;
  background-color: #fff;
  padding: 100px 100px;

  > img {
    width: 1000px;
    height: 600px;
    object-fit: contain;
  }

  > h1 {
    margin: 0;
    margin-top: 32px;
    font-size: 40px;
    font-weight: 600;
  }
`;
const _ImageLayout = styled.div`
  position: relative;
  width: 1000px;
  height: 600px;
`;
