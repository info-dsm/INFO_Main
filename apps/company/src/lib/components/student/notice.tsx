import { getWaitingNoticeListContentProps } from "../../../axios/dist";
import Image from "next/image";
import styled from "styled-components";

const StudentNotice = ({
  info,
}: {
  info: getWaitingNoticeListContentProps;
}) => {
  return (
    <NoticeDiv href={`detail/${info.noticeId}`}>
      <img src={info.company.imageList[0]} alt="" />
      <h1>
        {info.classificationResponse.map((t, i, a) => (
          <>
            {t.name}
            {a.length - 1 !== i ? ", " : " "}
          </>
        ))}
        개발자 모집합니다.
      </h1>
      <span>{info.company.companyName}</span>
      {/* <Address>
        <span>주소</span>
        <span>광주광역시 광산구 송정동</span>
      </Address> */}
      <br />
      <Part>
        {info.classificationResponse.map((t) => (
          <div>{t.name}</div>
        ))}
      </Part>
    </NoticeDiv>
  );
};

export default StudentNotice;

const NoticeDiv = styled.a`
  text-decoration: none;
  * {
    color: #101112;
  }
  cursor: pointer;
  width: 280px;

  img {
    width: 100%;
    height: 169px;
    margin-bottom: 17px;
    object-fit: cover;
  }
  > h1 {
    font-weight: 600;
    font-size: 20px;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > span {
    font-size: 13px;
    font-weight: 600;
  }
`;

const Address = styled.div`
  margin-top: 16px;
  span {
    font-weight: 600;
    font-size: 14px;
    color: #101112;
  }
  span:nth-child(2) {
    margin-left: 5px;
    color: rgba(16, 17, 18, 0.65);
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
