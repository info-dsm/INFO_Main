import styled from "styled-components";

export const BannersBackground = styled.div`
  width: 100%;
  height: 130px;
  color: #fff;
  background: ${(props: { bannerType: boolean }) => (props.bannerType ? "#6750F8" : "#9291FC")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 17px 28px 17px 26px;
  margin-top: 40px;
  margin-bottom: 21px;
  display: flex;
  justify-content: space-between;

  img {
    float: right;
    width: 62px;
    height: 85.38px;
  }

  div > h1 {
    margin: 20px 52px 5px 0px;
    font-size: 14px;
    font-weight: 800;
    line-height: 17px;
  }

  div > p {
    font-weight: 500;
    font-size: 11px;
    margin: 0 52px 20px 0;
  }
`
