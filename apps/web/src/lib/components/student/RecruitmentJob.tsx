// import { getCompanyDetailProps, getNoticeDetailProps } from "apis";
import { getCompanyDetailProps,getNoticeDetailProps } from "../../../axios/dist";
import React from "react";
import styled from "styled-components";
import NoticeDetailClassification from "./Classification";

const DetailRecruitmentJob = ({
  noticeInfo,
  companyInfo,
}: {
  noticeInfo: getNoticeDetailProps;
  companyInfo: getCompanyDetailProps;
}) => {
  return (
    <>
      <MainDiv>
        <NoticeDetailClassification name={"채용 직무"} />
        <InfoDiv>
          <div>
            <div>직무</div>
            <span>
              {noticeInfo.classificationResponse.map((t) => (
                <>{t.name} </>
              ))}
            </span>
          </div>
          <div>
            <div>채용직원</div>
            <span>{noticeInfo.numberOfEmployee}명</span>
          </div>
          <div>
            <div>근무시간</div>
            <span>주 {noticeInfo.workTime.workTimePerWeek}시간</span>
          </div>
          <div>
            <div>근무지</div>
            <span>
              {noticeInfo.workPlace.isSameWithCompanyAddress
                ? `${companyInfo.companyInformation.agentAddress?.fullAddress}`
                : noticeInfo.workPlace.otherPlace}
            </span>
          </div>
          <div>
            <div>상세직무</div>
            <span>{noticeInfo.detailBusinessDescription}</span>
          </div>
          <div>
            <div>채용직원</div>
            <span>
              {Object.values(noticeInfo.interviewProcessList).map(
                (t: string, i: number) => (
                  <div>
                    <div>{i + 1}차</div>
                    <div>{t}</div>
                  </div>
                )
              )}
            </span>
          </div>
        </InfoDiv>
      </MainDiv>
    </>
  );
};

export default DetailRecruitmentJob;

const MainDiv = styled.div`
  margin-top: 120px;
`;

const InfoDiv = styled.div`
  margin-top: 40px;

  font-size: 17px;
  display: block;
  > div {
    margin-bottom: 16px;
    display: flex;
    font-weight: 500;
    > div {
      font-weight: 600;
      width: 114px;
      color: #6750f8;
    }
    span {
      width: 898px;
    }
  }

  > div:nth-child(6) {
    span {
      display: inline-flex;
      white-space: nowrap;
      > div {
        margin-right: 52px;
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        font-weight: 400;
        div:nth-child(1) {
          font-weight: 500;
          font-size: 17px;
        }
      }
    }
  }
`;
