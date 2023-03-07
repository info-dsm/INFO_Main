import { getClosedNoticeListContentProps } from "../../../axios/dist";
// import Image from "next/image";
import styled from "styled-components";

const StudentClosedNotice = ({
  info,
}: {
  info: getClosedNoticeListContentProps;
}) => {
  return (
    <Link href={`detail/${info.noticeId}`}>
      <NoticeDiv>
        <NoticeLogo>
          <img src={info.company.imageList[0]} alt="" />
          <span>마감</span>
        </NoticeLogo>
        <div>
          <div>
            {info.classificationResponse.map((t, i, a) => (
              <>
                {t.name}
                {a.length - 1 !== i ? ", " : " "}
              </>
            ))}
            개발자 모집합니다.
          </div>
          <span>{info.company.companyName}</span>
        </div>
        <SubData>
          {/* <div>
            <span>경력</span>
            <span>무관</span>
          </div> */}
          <div>
            <span>학력</span>
            <span>
              {info.gradeCutLine === 0 ? "무관" : `${info.gradeCutLine}%`}
            </span>
          </div>
          {/* <div>
            <span>주소</span>
            <span>강남</span>
          </div> */}
        </SubData>
      </NoticeDiv>
    </Link>
  );
};

export default StudentClosedNotice;

const Link = styled.a`
  text-decoration: none;
`;

const SubData = styled.div`
  gap: 20px;
  margin-top: 14px;
  display: inline-flex;
  font-size: 14px;
  font-weight: 600;
  color: rgba(16, 17, 18, 0.65);
  div {
    gap: 5px;
    display: inline-flex;
  }
`;

const NoticeDiv = styled.div`
  * {
    color: #101112;
  }
  cursor: pointer;

  width: 280px;
  height: 180px;
  background-color: #fff;
  border: 1px solid rgba(16, 17, 18, 0.1);
  border-radius: 5px;
  margin-bottom: 6px;
  padding: 15px 24px;
`;

const NoticeLogo = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  margin-bottom: 25px;
  img {
    width: 100px;
    height: 40px;
    object-fit: cover;
    border-radius: 3px;
  }
  span {
    font-size: 14px;
    font-weight: 600;
  }

  + div {
    font-weight: 600;
    line-height: 20px;

    div {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 30px;
      font-size: 20px;
    }
    span {
      font-size: 13px;
    }
  }
`;
