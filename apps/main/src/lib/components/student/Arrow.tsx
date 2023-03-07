import styled from "styled-components";
import Arrow from "../../../../public/assets/images/arrow";
import { useRouter } from "next/router";

const ArrowText = ({ text, link }: { text: string; link: string }) => {
  const router = useRouter()
  return (
    <ArrowDiv>
      <a onClick={() => {router.push(link)}}>{text}</a>
      <Arrow color={"#fff"} />
    </ArrowDiv>
  );
};

export default ArrowText;

const ArrowDiv = styled.span`
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
  }
  margin-top: 1vh;
  position: absolute;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
