import { useRouter } from "next/router";
import { Footer } from "ui";
import { getBaseList, getBaseListProps } from "../../../axios/dist";
import EditNotice from "../../../lib/components/company/EditNotice";

const EditNoticeCompany = () => {
  const router = useRouter();
  return (
    <>
      <EditNotice
        {...{
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
          path: "/company",
        }}
        {...(router.query as { companyNumber: string; noticeId: string })}
      />
    </>
  );
};
export default EditNoticeCompany;
