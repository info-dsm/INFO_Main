import { getCompanyDetailProps, getWaitingNoticeListContentProps } from "../../../axios/dist";
import styled from "styled-components";

const StudentCompanyNoticeList = ({
  companyInfo,
  info,
}: {
  companyInfo: getCompanyDetailProps;
  info: getWaitingNoticeListContentProps[];
}) => {
  console.log(info);
  return (
    <NoticeList>
      <span>모집공고</span>
      <div>
        {info.map((t) => (
          <a href={`../../notice/detail/${t.noticeId}`}>
            <div>
              <img
                src={
                  companyInfo.companyIntroductionResponse.companyLogo.fileUrl
                    ? companyInfo.companyIntroductionResponse.companyLogo
                        .fileUrl
                    : ""
                }
                alt="Company Logo"
              />
              <h1>
                {t.classificationResponse.map((_t, _i, _a) => (
                  <>
                    {_t.name}
                    {_a.length - 1 !== _i ? ", " : " "}
                  </>
                ))}
                개발자 모집합니다.
              </h1>
              <h6>{t.company.companyName}</h6>
              <Part>
                {t.classificationResponse.map((_t) => (
                  <div>{_t.name}</div>
                ))}
              </Part>
            </div>
          </a>
        ))}
      </div>
    </NoticeList>
  );
};

export default StudentCompanyNoticeList;

const NoticeList = styled.div`
  margin-top: 80px;
  > span {
    font-size: 24px;
    font-weight: 600;
  }
  > div {
    color: #101112;
    margin-top: 16px;
    width: 100%;
    height: 300px;
    background-color: #ececec;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: none;
    padding: 12px 13px;
    border: 1px solid #d6d6d7;
    border-radius: 5px;

    &::-webkit-scrollbar {
      display: none;
    }

    a {
      text-decoration: none;
    }

    a > div {
      color: #101112;
      width: 100%;
      height: 160px;
      background-color: #fff;
      margin-bottom: 5px;
      border-radius: 5px;
      border: 1px solid rgba(16, 17, 18, 0.2);

      padding: 14px 24px;
      img {
        width: 100px;
        height: 40px;
        object-fit: contain;
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }

      h1 {
        margin: 0;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      h6 {
        margin: 0;
        margin-top: 3px;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
`;

const Part = styled.div`
  margin-top: 18px;
  display: inline-flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 20px;
  line-height: 0px;
  margin-bottom: 65px;
`;
