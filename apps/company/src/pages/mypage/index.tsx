import { useRouter } from "next/router";
import styled from "styled-components";
import { Footer } from "ui";
import { getCompanyNumber } from "../../axios/dist";
import CompanyDetail from "../../lib/components/company/CompanyDetail";

const MyCompany = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <CompanyDetail
        {...{
          id: getCompanyNumber() as string,
          path: "/company/notice/info",
          menu: [
            {
              onClick: () => {
                router.push("/company");
              },
              key: "내가 등록한 모집공고",
              selected: false,
            },
            {
              onClick: () => {
                router.push("/company/notice/write");
              },
              key: "모집공고 작성",
              selected:
                router.asPath ===
                ("/company/notice/write/" || "/company/notice/write"),
            },
            {
              onClick: () => {
                router.push("/company/mypage");
              },
              key: "내 정보",
              selected:
                router.asPath === ("/company/mypage/" || "/company/mypage"),
            },
          ],
        }}
      >
        {/* <_ButtonLayout>
          <_Button e={true} onClick={() => router.back()}>
            확인
          </_Button>
        </_ButtonLayout> */}
      </CompanyDetail>
      <Footer />
    </>
  );
};
export default MyCompany;
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
