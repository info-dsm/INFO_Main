import menu from "../../data/logindata";
import Background from "../../lib/components/Background";
import LoginPage from "../../lib/components/LoginPage";
import Head from "next/head";
const props = {
  member: true,
  comment: "교사 로그인",
  path: {
    signUp: "/teacher/signup",
    direct: "/teacher/notice",
  },
};

const TeacherLogin = () => {
  return (
    <>
      <Head>
        <meta name="description" content="teacher page by info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Background {...menu} />
      <LoginPage {...props} />
    </>
  );
};
export default TeacherLogin;
