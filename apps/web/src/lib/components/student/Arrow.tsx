import styled from "styled-components";
import Arrow from "../../../../public/assets/images/arrow";

const ArrowText = ({ text, link }: { text: string; link: string }) => {
  return (
    <ArrowDiv>
      <a href={link}>{text}</a>
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
  position: absolute;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
