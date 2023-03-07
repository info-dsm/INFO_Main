import styled from "styled-components";

export const Body = styled.div `
  width: 100%;
  height: auto;
  background: #FFFFFF;

  border: 1px solid #EAEAEA;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  display: inline-flex;

  padding: 10px;

  margin-top: 24px;
  transition: all .35s ease-out;
`

export const Image = styled.img `
  width: 76px !important;
  height: 76px !important;
  border-radius: 6px;
`

export const NotImage = styled.div `
  width: 76px !important;
  height: 76px !important;
  border-radius: 6px;
  background-color: #EAEAEA;
  text-align: center;
`

export const CompanyContent = styled.div `
  color: #343A40;

  h1 {
    margin: 5px 0 0 12px;
    font-weight: 700;
    font-size: 18px;
    line-height: 15px;
  }

  div {
    margin: 10px 0 37px 12px;
    font-weight: 500;
    font-size: 12px;
  }

  ul {
    padding: 0 0 0 12px;
    font-weight: 600;
    font-size: 11px;
    display: flex;
    list-style: none;
  }

  ul li {
    margin-right: 5px;
  }
`

export const NoticeContent = styled.div `
  color: #343A40;

  h1 {
    margin: 5px 0 0 12px;
    font-weight: 700;
    font-size: 18px;
    line-height: 15px;
  }

  div {
    margin: 10px 0 0 5px;
    font-weight: 500;
    font-size: 12px;
  }

  
  p {
    margin: 6px 6px 7px 8px;
  }
  
  ul {
    margin-left: 12px;
    padding: 0;
    font-weight: 600;
    font-size: 11px;
    display: flex;
    list-style: none;
  }

  ul li {
    color: #6750F8;
    padding-top: 2px;
    text-align: center;
    width: 70px;
    height: 20px;
    border: 0.4px solid #6750F8;
    border-radius: 10px;
    margin-right: 4px;
  }
`
