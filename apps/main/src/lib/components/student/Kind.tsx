import styled from "styled-components";

const StudentCompanyKind = () => {
  return (
    <Kind>
      <div>
        <div>회사 목록</div>
        <span>마감 일자순 정렬</span>
      </div>
    </Kind>
  );
};

export default StudentCompanyKind;

const Kind = styled.div`
  padding: 80px 256px 30px 236px;
  @media (max-width: 1700px) {
    padding: 80px 256px 30px 176px;
  }
  width: 100vw;
  display: inline-flex;
  justify-content: space-between;
  > div {
    display: inline-flex;
    align-items: center;
    gap: 20px;
    font-weight: 600;
    font-size: 24px;
    color: #101112;
    span {
      font-weight: 400;
      font-size: 17px;
    }
    + div {
      width: 274px;
      display: inline-flex;
      justify-content: space-between;
      div {
        display: inline-flex;
        align-items: center;
        + div {
          gap: 5px;
          svg:nth-child(1) {
            transform: scale(-1, 1);
          }
        }
      }
    }
  }
`;
