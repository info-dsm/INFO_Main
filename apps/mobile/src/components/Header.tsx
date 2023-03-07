import styled from "styled-components";
import { Icon2n } from "./icons/Icon2n";

export const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <a href="/">
        <Icon2n />
      </a>
    </HeaderDiv>
  )
}

const HeaderDiv = styled.div`
  position: fixed;
  text-align: center; 
  width: 100%;
  background-color: white;
  margin: 0;
  padding-top: 17px;
  padding-bottom: 15px;
  border-bottom: 1px solid #EAEAEA;
`
