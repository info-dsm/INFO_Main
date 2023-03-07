import { useRouter } from "next/router";
import { Footer } from "ui";
import {
  getBaseList,
  getBaseListProps,
  getCompanyNumber,
} from "../../../axios/dist";
import WriteNotice from "../../../lib/components/company/WriteNotice";

const WriteNoticeCompany = () => {
  const router = useRouter();
  return (
    <>
      <WriteNotice
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
          path: "/company",
          companyNumber: getCompanyNumber() as string,
        }}
      />
    </>
  );
};
export default WriteNoticeCompany;
