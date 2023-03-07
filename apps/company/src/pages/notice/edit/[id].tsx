import { useRouter } from "next/router";
import { Footer } from "ui";
import { getBaseList, getCompanyNumber } from "../../../axios/dist";
import EditNotice from "../../../lib/components/company/EditNotice";

const EditNoticeCompany = () => {
  const router = useRouter();
  return (
    <>
      <EditNotice
        {...{
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
          path: "/company",
          noticeId: router.query.id as string,
          companyNumber: getCompanyNumber() as string,
        }}
      />
    </>
  );
};
export default EditNoticeCompany;
