import { useRouter } from "next/router";
import styled from "styled-components";
import { Footer } from "ui";
import { getCompanyNumber } from "../../../axios/dist";
import NoticeDetail from "../../../lib/components/notice/NoticeDetail";
const CompanySpecificNoticeDetail = () => {
  const router = useRouter();
  return (
    <>
      <NoticeDetail
        {...{
          ...(router.query as { noticeId: string; companyNumber: string }),
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
                ("/company/write/notice/" || "/company/write/notice"),
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
        <_ButtonLayout>
          <_Button
            e={true}
            onClick={() =>
              router.push(`/company/notice/edit/${router.query.noticeId}`)
            }
          >
            수정하기
          </_Button>
          <_Button e={false} onClick={() => router.back()}>
            취소
          </_Button>
        </_ButtonLayout>
      </NoticeDetail>
    </>
  );
};
export default CompanySpecificNoticeDetail;
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
