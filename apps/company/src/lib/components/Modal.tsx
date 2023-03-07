import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { isPropertyDeclaration } from "typescript";
import { ModalHeader } from "ui";
import { getEmployList } from "../../axios/dist";
const Arr: { key: "name" | "studentEmail"; value: string; width: number }[] = [
  { key: "name", value: "이름", width: 3 },
  { key: "studentEmail", value: "이메일", width: 10 },
];
const TeahcerCompanyModal = ({
  companyNumber,
  ...props
}: {
  companyNumber: string;
  companyName: string;
  onClick: () => void;
}) => {
  const { status, data } = useQuery(["employlment", companyNumber], async () =>
    getEmployList(companyNumber)
  );
  return (
    <_Container>
      <_Layout>
        <ModalHeader {...props} />{" "}
        <_BackGround>
          <_SmallBox>
            {status === "loading" ? (
              <></>
            ) : status === "error" ? (
              <>지원자가 존재하지 않습니다.</>
            ) : (
              data.data.map((item) => (
                <_Box>
                  <div>{item.student.generation} 기</div>
                  {Arr.map((v) => (
                    <>
                      <div>{v.value}</div>
                      <_SpanWidth width={v.width}>
                        {item.student[v.key]}
                      </_SpanWidth>
                    </>
                  ))}
                </_Box>
              ))
            )}
          </_SmallBox>
        </_BackGround>
      </_Layout>
    </_Container>
  );
};
export default TeahcerCompanyModal;
const _Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black60};
`;
const _BackGround = styled.div`
  position: relative;
  width: 50rem;
  top: -2rem;
  background-color: ${({ theme }) => theme.colors.white};
  height: 25rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
`;
const _SmallBox = styled.div`
  display: flex;
  width: 46.5rem;
  gap: 1rem;
  height: 20rem;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
  align-content: flex-start;
  ::-webkit-scrollbar {
    background-color: ${(props) => props.theme.colors.gray};
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #6141cc;
    border-radius: 3px;
    width: 10px;
  }
`;
const _Layout = styled.div`
  position: absolute;
  width: 50rem;
  height: 30rem;
`;
const _Box = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 22rem;
  height: max-content;
  font: 700 0.8rem "Pretendard";
  padding: 0 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray};
  div {
    color: ${({ theme }) => theme.colors.blue};
    width: max-content;
  }
  div + span {
    color: ${({ theme }) => theme.colors.black};
  }
  line-height: 2.5rem;
`;
const _SpanWidth = styled.span<{ width: number }>`
  width: ${(props) => props.width}rem;
`;
