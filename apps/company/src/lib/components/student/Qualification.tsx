// import { getCompanyDetailProps, getNoticeDetailProps } from "apis";
import { getCompanyDetailProps, getNoticeDetailProps } from "../../../axios/dist";
import React from "react";
import styled from "styled-components";
import NoticeDetailClassification from "./Classification";

const QualificationRequirements = ({
  noticeInfo,
}: {
  noticeInfo: getNoticeDetailProps;
}) => {
  console.log(noticeInfo);
  return (
    <>
      <MainDiv>
        <NoticeDetailClassification name={"자격 요건"} />
        <GridDiv>
          <div>
            <div>자격증</div>
            {noticeInfo.certificateList.length > 0 ? (
              <div>
                {noticeInfo.certificateList.map((t, i) => (
                  <div>• {t.certificateName}</div>
                ))}
              </div>
            ) : (
              <span>필요한 자격증이 없습니다.</span>
            )}
          </div>
          <div>
            <div>기술 스택</div>
            {noticeInfo.languageList.length > 0 ||
            noticeInfo.technologyList.length > 0 ? (
              <div>
                {noticeInfo.languageList.map((t) => (
                  <div>• {t.languageName}</div>
                ))}
                {noticeInfo.technologyList.map((t) => (
                  <div>• {t.technologyName}</div>
                ))}
              </div>
            ) : (
              <span>필요한 기술 스택이 없습니다.</span>
            )}
          </div>
          <div>
            <div>성적</div>
            <div>
              {noticeInfo.gradeCutLine === null || noticeInfo.gradeCutLine === 0
                ? "무관"
                : `${noticeInfo.gradeCutLine}% 이내`}
            </div>
          </div>
          <div>
            <div>우대사항</div>
            <span>우대사항이 없습니다.</span>
          </div>
        </GridDiv>
      </MainDiv>
    </>
  );
};

export default QualificationRequirements;

const MainDiv = styled.div`
  margin-top: 120px;
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 40px;
  grid-row-gap: 62px;
  > div {
    width: 400px;
    color: #6750f8;
    font-size: 16px;
    font-weight: 600;
    div {
      margin-bottom: 16px;
    }

    > div:nth-child(2),
    > span {
      color: #101112;
      font-weight: 500;
    }
    > div:nth-child(2) {
      margin-bottom: 0px;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
