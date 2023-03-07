import { getNoticeDetail, getSupportStatusProps } from "../../../axios/dist";
import styled from "styled-components";
import StatusDetail from "./StatusDetail";

const StudentSupportStatus = ({
  status,
}: {
  status: getSupportStatusProps[];
}) => {
  return (
    <SupportStatusDiv>
      <span>지원현황</span>
      <div>
        {status.length > 0 ? (
          <>
            {status.map((t, i) => (
              <div key={i}>
                <StatusDetail t={t}/>
              </div>
            ))}
          </>
        ) : (
          <span>지원한 이력이 없습니다.</span>
        )}
      </div>
    </SupportStatusDiv>
  );
};

export default StudentSupportStatus;


const SupportStatusDiv = styled.div`
  margin-top: 102px;
  width: 100%;
  > span {
    font-weight: 600;
    font-size: 24px;
  }
  > div {
    background-color: #f6f6f6;
    border-radius: 5px;
    margin-top: 20px;
    width: 100%;
    height: 426px;
    overflow: scroll;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 12px;

    > span {
      font-size: 18px;
      font-weight: 600;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > div {
      width: 100%;
      background-color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;

      > span {
        display: inline-flex;
        align-items: center;

        > span {
          color: #101112;
          font-size: 15px;
          font-weight: 500;
        }
        > div {
          font-size: 15px;
        }
      }

      padding: 24px;
    }

    &::-webkit-scrollbar {
      opacity: 0;
    }
  }
`;
