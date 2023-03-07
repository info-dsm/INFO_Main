import styled from "styled-components";
import Image from "next/image";
import { getWaitingNoticeListContentProps } from "../../../axios/dist";
import { useRouter } from "next/router";

const StudentMainNotice = ({
  condition,
  info,
}: {
  condition: boolean;
  info: getWaitingNoticeListContentProps;
}) => {
  const router = useRouter();
  return (
    <Notice
      color={condition ? "1" : "0.3"}
      onClick={() => {
        router.push(`/notice/detail/${info.noticeId}`);
      }}
    >
      <img src={info.company.imageList[0]} alt="" />
      <div>{info.detailBusinessDescription}</div>
      <span>{info.company.companyName}</span>
      <SubData>
        <div>
          <div>채용 인원</div> <div>{info.numberOfEmployee}명</div>
        </div>
        <div>
          <div>지원자</div> <div>{info.applicantCount}명</div>
        </div>
        <br />
        {/* <div>
          <div>학력</div>{" "}
          <div>
            {info.gradeCutLine === 0 ? "무관" : `${info.gradeCutLine}%`}
          </div>
        </div> */}
      </SubData>
    </Notice>
  );
};

export default StudentMainNotice;

const SubData = styled.div`
  > div {
    display: inline-flex;
    gap: 5px;
    font-size: 13px;
    margin-right: 20px;
  }
`;

const Notice = styled.div<{ color: string }>`
  width: 380px;
  height: 222px;
  background-color: #fff;
  opacity: ${(props) => props.color};
  cursor: pointer;
  border-radius: 5px;
  padding: 26px 19px;

  img {
    width: 128px;
    height: 50px;
    object-fit: cover;
    margin-bottom: 15px;
  }
  > div {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: -6px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > span {
    font-weight: 600;
    font-size: 13px;
    margin-left: 3px;
  }
`;
