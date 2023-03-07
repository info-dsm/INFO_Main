import { getSupportStatusProps,getNoticeDetail,getNoticeDetailProps } from "../../../axios/dist";
import styled from "styled-components";
import {useState, useEffect} from "react"

const StatusDetail = ({t}: {t:getSupportStatusProps}) => {
    const [notice, setNotice] = useState<getNoticeDetailProps>()

    useEffect(() => {
        getNoticeDetail({id: t.noticeId})
        .then((res: getNoticeDetailProps) => {
            setNotice(res)
        })
    },[])

    return (
        <>
        {notice ? <>
        <span>
                  <Status
                    color={t.status === "WAITING" ? "rgba(16, 17, 18, 0.6)" : "#fff" }
                    background={t.status === "WAITING" ? "#e7e7e7" : t.status === "APPROVE" ? "#6750F8": "#E84045" }
                  >
                    {t.status === "WAITING" ? "대기중" : t.status === "APPROVE" ? "승인됨": "거절됨" }
                  </Status>
                  <Field>
                    <div>{notice.classificationResponse.map((t, i, a) => (
                     <>
                      {t.name}
                      {a.length - 1 !== i ? ", " : " "}
                       
                    </>
                    ))}</div>
                  </Field>
                  <span>채용인원 {notice.numberOfEmployee}명</span>
                </span>
                <span>
                  {/* <div>2022.12.29</div> */}
                  <a href={`notice/detail/${t.noticeId}`}>
                  <Status color={"#fff"} background={"#6750F8"}>
                    모집공고 정보
                  </Status>
                  </a>
                </span>
        </>: <></>}
        </>
    )
}

export default StatusDetail;

const Field = styled.div`
  width: 446px;
    
  div {
    font-size: 17px;
    font-size: 700;
    width:50%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div:nth-child(2) {
    font-size: 15px;
    font-weight: 500;
  }
  
`;

const Status = styled.div<{ color: string; background: string }>`
  padding: 5px 14px;
  border-radius: 17px;
  font-size: 13px;
  font-weight: 600;
  margin-right: 24px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  margin-left: 20px;
  cursor: pointer;
`;