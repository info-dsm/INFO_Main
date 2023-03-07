import Background from "../../lib/components/Background";
import LoginPage from "../../lib/components/LoginPage";
import { NextPage } from "next";
import menu from "../../data/logindata/company";
import Head from "next/head";
const props = {
  member: false,
  comment: "회사 로그인",
  path: {
    signUp: "/company/signup/1",
    direct: "/company",
  },
};

const CompanyLogin: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="company page by info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Background {...menu} />
      <LoginPage {...props} />
    </>
  );
};
export default CompanyLogin;
