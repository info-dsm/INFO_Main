import { useRouter } from "next/router";
import styled from "styled-components";
import { Footer } from "ui";
import NoticeDetail from "../../../lib/components/notice/NoticeDetail";
const SpecificNoticeDetail = () => {
  const router = useRouter();
  return (
    <>
      <NoticeDetail
        {...{
          ...(router.query as { companyNumber: string; noticeId: string }),
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
          <_Button
            e={true}
            onClick={() =>
              router.push({
                pathname: "/notice/edit",
                query: router.query as {
                  companyNumber: string;
                  noticeId: string;
                },
              })
            }
          >
            수정하기
          </_Button>
          <_Button e={false} onClick={() => router.back()}>
            취소
          </_Button>
        </_ButtonLayout>
      </NoticeDetail>
      <Footer />
    </>
  );
};
export default SpecificNoticeDetail;
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
