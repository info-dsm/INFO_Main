import React, { ReactNode } from "react";
import styled from "styled-components";
import { SmallLogo } from "../src";
export interface ModalProps {
  children: ReactNode;
  comment: string;
  confirm: string;
  bottom: {
    text: string;
    direct: string;
  };
  top?: {
    text: string;
    direct: string;
  };
  onClick: () => void;
  href: () => void;
  move: () => void;
  onSubmit: () => void;
}
export const Modal = ({
  children,
  comment,
  confirm,
  href,
  bottom,
  top = {
    text: "비밀번호를 잊어버리셨나요?",
    direct: "비밀번호 찾기",
  },
  move,
  onSubmit,
  ...props
}: ModalProps) => {
  return (
    <_Container>
      <_Box>
        <_Layout>
          <_Locate>
            <SmallLogo {...props} />
          </_Locate>
          <_Title>{comment}</_Title>
          <_Switch size={13} opac={"black60"}>
            {top.text} <span onClick={href}>{top.direct}</span>
          </_Switch>
          {children}
          <_BottomLayout>
            <_Button onClick={onSubmit}>{confirm}</_Button>
            <_Or>or</_Or>
            <_Switch size={14} opac={"black80"}>
              {bottom.text} <span onClick={move}>{bottom.direct}</span>
            </_Switch>
          </_BottomLayout>
        </_Layout>
      </_Box>
    </_Container>
  );
};
export const _Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(16, 17, 18, 0.2) 4.95%,
    #101112 95.05%
  );
`;
const _Box = styled.div`
  padding: 40px 36px 56px 36px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.colors.black40} 0 0 0 999999px;
  border-radius: 5px;
`;
export const _Layout = styled.div`
  width: 408px;
  text-align: center;
`;
export const _Locate = styled.div`
  display: inline-block;
`;
export const _Title = styled.h1`
  font: 600 24px "Pretendard";
  line-height: 29px;
  color: ${(props) => props.theme.colors.black};
`;
export const _Switch = styled.div<{ size: number; opac: string }>`
  color: ${(props) => props.theme.colors[`${props.opac}`]};
  font: 500 ${(props) => props.size}px "Pretendard";
  span {
    color: ${(props) => props.theme.colors.blue};
    cursor: pointer;
    :hover {
      border-bottom: 1px solid ${(props) => props.theme.colors.blue};
    }
  }
`;
export const _BottomLayout = styled.div`
  height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const _Button = styled.div`
  width: 408px;
  height: 48px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue};
  border-radius: 5px;
  font: 600 20px "Pretendard";
  line-height: 48px;
  cursor: pointer;
  :hover {
    filter: brightness(0.8);
  }
`;
export const _Or = styled.div`
  font: 600 14px "Pretendard";
  line-height: 17px;
  color: ${(props) => props.theme.colors.black40};
`;
