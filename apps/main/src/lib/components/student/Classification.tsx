import React from "react";
import styled from "styled-components";

const NoticeDetailClassification = ({ name }: { name: string }) => {
  return (
    <>
      <MainDiv>{name}</MainDiv>
    </>
  );
};

export default NoticeDetailClassification;

const MainDiv = styled.span`
  background-color: #6750f8;
  border-radius: 0px 34px 34px 55px;
  padding: 10px 24px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
`;
