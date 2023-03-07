import { Modal, InputText, Password, AuthorizationInput, Success } from "ui";
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  confirmCode,
  login,
  sendNumber,
  teacherSignUp,
} from "../../axios/dist";
import Background from "../../lib/components/Background";
import menu from "../../data/logindata";
const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<{
    email: { error: boolean; comment: string };
    code: {
      error: boolean;
      comment: string;
    };
  }>({
    email: {
      error: false,
      comment: "",
    },
    code: {
      error: false,
      comment: "",
    },
  });
  const [data, setData] = useState<{
    email: string;
    code: string;
    name: string;
    teacherCode: string;
    password: string;
  }>({ email: "", code: "", name: "", teacherCode: "", password: "" });
  const [success, setSuccess] = useState<{
    email: boolean;
    name: boolean;
    password: boolean;
  }>({
    email: false,
    name: false,
    password: false,
  });
  const ChangeInput = useCallback(
    (
      e: string,
      props: "email" | "code" | "name" | "teacherCode" | "password"
    ) => {
      setData({ ...data, [props]: e });
    },
    [data, setData]
  );
  const OccurError = useCallback(
    (comment: string, type: string) => {
      setError({ ...error, [type]: { error: true, comment } });
    },
    [error, setError]
  );
  const ClearError = useCallback(
    (type: "email" | "code") => {
      setError({
        ...error,
        [type]: { error: false, comment: "" },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [error, setError]
  );
  const OccuerSucces = useCallback(
    (type: "email" | "name" | "password") => {
      setSuccess({ ...success, [type]: true });
    },
    [success, setSuccess]
  );
  const EmailRequest = () => {
    sendNumber(data.email)
      .then(() => window.alert("전송되었습니다."))
      .catch(() => OccurError("중복된 이메일입니다.", "email"));
  };
  const CodeRequest = () => {
    confirmCode(data.email, data.code, "SIGNUP_EMAIL")
      .then(() => OccuerSucces("email"))
      .catch(() => OccurError("잘못된 인증코드입니다.", "code"));
  };
  const Submit = () => {
    const { code, teacherCode, ...props } = data;
    teacherSignUp(code, teacherCode, props).then(() => router.push("/login"));
    // login(data, "user")
    //   .then((res: { accessToken: string; refreshToken: string }) => {
    //     console.log(res);
    //     cookie.set("accessToken", res.accessToken);
    //     cookie.set("refreshToken", res.refreshToken);
    //     router.push("/teacher/notice");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setError({ error: true, comment: err.response.data.message });
    //   });
  };
  return (
    <>
      <Background {...menu} />
      <Modal
        onClick={() => router.push("/")}
        href={() => {
          window.alert("서비스 준비 중입니다.");
        }}
        comment={"교사 회원가입"}
        confirm={"가입"}
        bottom={{
          text: "기존 회원이신가요?",
          direct: "로그인",
        }}
        top={{
          text: "학생이신가요?",
          direct: "학생 전용 로그인",
        }}
        move={() => router.push("/login")}
        onSubmit={() => Submit()}
      >
        {/*리펙토링 여지 있음 */}
        <_Layout>
          <Success text={"이메일"} success={success.email} />
          <_Interval gap={16}>
            <AuthorizationInput
              placeholder={"이메일을 입력해주세요."}
              {...error.email}
              onInput={(e) => ChangeInput(e.target.value, "email")}
              onFocus={() => ClearError("email")}
              onClick={() => EmailRequest()}
              value={data.email}
              aut={"안증번호 발송"}
            />
            <AuthorizationInput
              placeholder={"인증번호 입력해주세요."}
              {...error.code}
              onInput={(e) => ChangeInput(e.target.value, "code")}
              onFocus={() => {}}
              onClick={() => CodeRequest()}
              value={data.code}
              aut={"안증번호 확인"}
            />
          </_Interval>
        </_Layout>
        <_Layout>
          <Success text={"이름 • 인증코드"} success={false} />
          <_Interval gap={16}>
            <InputText
              placeholder={"이름을 입력해주세요."}
              {...{ error: false }}
              onInput={(e) => ChangeInput(e.target.value, "name")}
              onFocus={() => {}}
            />
            <Password
              placeholder={"인증코드를 입력해주세요."}
              {...{ error: false }}
              onInput={(e) => ChangeInput(e.target.value, "teacherCode")}
              onFocus={() => {}}
              author={true}
            />
          </_Interval>
        </_Layout>
        <_Last>
          <Success text={"비밀번호"} success={false} />
          <Password
            placeholder={"비밀번호를 입력해주세요."}
            {...{ error: false }}
            onInput={(e) => ChangeInput(e.target.value, "password")}
            onFocus={() => {}}
          />
        </_Last>
      </Modal>
    </>
  );
};
export default LoginPage;
const _Layout = styled.div`
  margin-top: 36px;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const _Last = styled(_Layout)`
  margin-bottom: 60px;
`;
const _Interval = styled.div<{ gap: number }>`
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
`;
