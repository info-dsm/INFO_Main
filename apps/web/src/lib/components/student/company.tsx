import { getCompanyList1ContentProps } from "../../../axios/dist";
import styled from "styled-components";
import Checked2 from "../../../../public/assets/images/checked2";

const StudentCompany = ({ info }: { info: getCompanyList1ContentProps }) => {
  return (
    <NoticeDiv href={`detail/${info.companyNumber}`}>
      <img src={info.companyIntroductionResponse.companyLogo.fileUrl} alt="" />
      <h1>㈜ {info.companyName}</h1>
      <span>{info.companyIntroductionResponse.introduction}</span>
      <br />
      <div>
        {info.isLeading ? (
          <div>
            <Checked2 />
            <span>선도기업</span>
          </div>
        ) : (
          <></>
        )}
        {info.isAssociated ? (
          <div>
            <Checked2 />
            <span>협력기업</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </NoticeDiv>
  );
};

export default StudentCompany;

const NoticeDiv = styled.a`
  text-decoration: none;
  height: 381px;
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
  font-weight: 600;
  > h1 {
    margin: 0;
    font-size: 20px;
  }
  > div {
    margin-top: 18px;
    display: flex;
    font-size: 13px;
    margin-bottom: 65px;
    gap: 20px;
    > div {
      display: flex;
      gap: 4px;
    }
  }
  > span {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
  }
`;
