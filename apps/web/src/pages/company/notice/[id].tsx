import { useRouter } from "next/router";
import WriteNotice from "../../../lib/components/company/WriteNotice";

const WriteNoticeCompany = () => {
  const router = useRouter();
  return (
    <>
      <WriteNotice
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
          companyNumber: router.query.id as string,
          path: "/company",
        }}
      />
    </>
  );
};
export default WriteNoticeCompany;
