import { useRouter } from "next/router";
import styled from "styled-components";
import { Footer } from "ui";
import CompanyDetail from "../../../lib/components/company/CompanyDetail";

const TeacherCompanyInfo = () => {
  const router = useRouter();
  return (
    <>
      <CompanyDetail
        {...{
          ...(router.query as { id: string }),
          path: "/teacher/notice/specific",
          menu: [
            {
              onClick: () => router.push("/notice"),
              key: "모집공고",
              selected: false,
            },
            {
              onClick: () => router.push("/company"),
              key: "회사",
              selected: false,
            },
          ],
        }}
      >
        <_ButtonLayout>
          <_Button e={true} onClick={() => router.back()}>
            확인
          </_Button>
        </_ButtonLayout>
      </CompanyDetail>
      <Footer />
    </>
  );
};
export default TeacherCompanyInfo;
const _Button = styled.button<{ e: boolean }>`
  border-radius: 5px;
  background-color: ${({ theme, e }) =>
    e ? theme.colors.blue : theme.colors.gray};
  color: ${({ theme, e }) => (e ? theme.colors.white : theme.colors.black)};
  cursor: pointer;
  width: 200px;
  height: 40px;
  font: 500 normal 16px "pretendard", sans-serif;
  border: none;
`;
const _ButtonLayout = styled.div`
  width: 1000px;
  height: 40px;
  display: flex;
  margin-top: 100px;
  justify-content: center;
  gap: 10px;
`;
