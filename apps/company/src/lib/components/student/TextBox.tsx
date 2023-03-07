import styled from "styled-components";
import ArrowText from "./Arrow";

const TextBox = ({
  top,
  bottom,
  title,
  subTitle,
  arrow,
}: {
  top: number;
  bottom: number;
  title: string;
  subTitle: string;
  arrow: {
    text: string;
    link: string;
  };
}) => {
  return (
    <TextDiv top={top} bottom={bottom}>
      <div>{title}</div>
      <div>{subTitle}</div>
      <ArrowText text={arrow.text} link={arrow.link} />
    </TextDiv>
  );
};

export default TextBox;

const TextDiv = styled.div<{ top: number; bottom: number }>`
  padding-top: ${(props) => props.top}px;
  padding-bottom: ${(props) => props.bottom}px;
  color: #fff;
  position: relative;
  background-color: #101112;
  div {
    font-size: 48px;
    font-weight: 700;
    line-height: 57.28px;
    + div {
      margin-top: 20px;
      font-size: 22px;
      font-weight: 600;
      line-height: 15.25px;
      color: rgba(255, 255, 255, 0.58);
      white-space: pre-wrap;
      text-align: start;
    }
  }

  > span {
    margin-top: 35px;
    color: rgba(255, 255, 255, 0.58);
  }
`;
