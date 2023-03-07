import styled from "styled-components";
import { SmallLogo } from "../src";
import {
  _Container,
  _Locate,
  _Title,
  _Switch,
  _BottomLayout,
  _Button,
  _Or,
} from ".";
import { ReactNode } from "react";
export interface SecondModalCompanyProps {
  children: ReactNode;
  confirm: string;
  count: number;
  top: {
    text: string;
    direct: string;
  };
  href: () => void;
  move?: () => void;
  onSubmit: () => void;
}
export const SecondModalCompany = ({
  confirm,
  top,
  href,
  move,
  onSubmit,
  count,
  children,
}: SecondModalCompanyProps) => {
  return (
    <_Container>
      <_Box>
        <_Layout>
          <_Locate>
            <SmallLogo {...{ onClick: () => {} }} />
          </_Locate>
          <_Title>기업 등록</_Title>
          <_Switch size={13} opac={"black60"}>
            {top.text} <span onClick={href}>{top.direct}</span>
          </_Switch>
          {children}
          <_BottomLayoutProps>
            <_Button onClick={onSubmit}>{confirm}</_Button>
            <_Or>or</_Or>
            <_Switch size={14} opac={"black80"}>
              <span onClick={move}>이전</span>
            </_Switch>
          </_BottomLayoutProps>
        </_Layout>
        <_Bottom>{count}/3</_Bottom>
      </_Box>
    </_Container>
  );
};
const _Box = styled.div`
  padding: 40px 36px 20px 36px;
  width: 800px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.colors.black40} 0 0 0 999999px;
  border-radius: 5px;
  max-height: 95vh;
  overflow: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    padding: 10px;
    background-color: ${(props) => props.theme.colors.white};
    width: 10px;
  }
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    margin: 30px;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 3px;
  }
`;
const _Bottom = styled.div`
  text-align: center;
  font: 600 14px "Pretendard";
  color: ${(props) => props.theme.colors.black60};
`;
const _Layout = styled.div`
  text-align: center;
`;
const _BottomLayoutProps = styled(_BottomLayout)`
  align-items: center;
`;
