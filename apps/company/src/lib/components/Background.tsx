import styled from "styled-components";
import { Header, Logo } from "ui";
import React from "react";
import { BackImg } from "../../../public/assets";
import Image from "next/image";
import cloudflareLoader from "./loader";
const Background = (props: {
  menu: {
    onClick: () => void;
    key: string;
    selected: boolean;
  }[];
}) => {
  return (
    <>
      {/* 어쩔 수 없는 나중에 로더설정 */}
      <Image src={BackImg} alt="" placeholder="blur" fill></Image>
      <_Layout>
        <Header bgColor="rgba(16, 17, 18, 0.5);" admin={false} {...props}>
          <Logo main={false} onClick={() => {}} />
        </Header>
      </_Layout>
    </>
  );
};
export default Background;
const _Layout = styled.div`
  position: fixed;
`;
