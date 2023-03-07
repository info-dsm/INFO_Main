import { Modal, InputText, Password } from "ui";
import React, { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { getCompanyNumber, login } from "../../axios/dist/index";
import cookie from "js-cookie";
import request from "../../axios/main";
const LoginPage = ({
  member,
  comment,
  path,
}: {
  member: boolean;
  comment: string;
  path: { signUp: string; direct: string };
}) => {
  const router = useRouter();
  const [error, setError] = useState<{ error: boolean; comment: string }>({
    error: false,
    comment: "",
  });
  const [data, setData] = useState<{
    email: string;
    companyNumber: string;
    password: string;
  }>({
    email: "",
    companyNumber: getCompanyNumber() ?? "",
    password: "",
  });
  const ChangeInput = useCallback(
    (e: string, props: string) => {
      setData({ ...data, [props]: e });
    },
    [data]
  );
  const ClearError = useCallback(() => {
    setError({ error: false, comment: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, setError]);
  const ChangeCompanyNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 13) {
        switch (e.target.value.length) {
          case 1:
          case 2:
          case 3:
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
            if (e.target.value.length === 3) {
              e.target.value += "-";
            }
            break;
          case 5:
          case 6:
            e.target.value =
              e.target.value.slice(0, 4) +
              e.target.value
                .slice(3, e.target.value.length)
                .replace(/[^0-9]/g, "");
            if (e.target.value.length === 6) {
              e.target.value += "-";
            }
            break;
          case 4:
          case 7:
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
            break;
          default:
            e.target.value =
              e.target.value.slice(0, 7) +
              e.target.value
                .slice(7, e.target.value.length)
                .replace(/[^0-9]/g, "");
            break;
        }
        ChangeInput(e.target.value, "companyNumber");
      } else {
        e.target.value = e.target.value.slice(0, 12);
      }
    },
    [ChangeInput]
  );
  const Submit = () => {
    const { email, companyNumber, password } = data;
    const loginData = member
      ? { email, password }
      : { companyNumber, password };
    login(loginData, member ? "user" : "company")
      .then((res: { accessToken: string; refreshToken: string }) => {
        console.log(res);
        request.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.accessToken}`;
        if (!member) {
          localStorage.setItem("companyNumber", data.companyNumber);
        }
        cookie.set("accessToken", res.accessToken, { expires: 7 });
        cookie.set("refreshToken", res.refreshToken, { expires: 7 });
        router.push(path.direct);
      })
      .catch((err) => {
        console.log(err);
        setError({
          error: true,
          comment: err.response
            ? err.response.data.message
            : "서버 에러입니다.",
        });
      });
  };
  return (
    <>
      <Modal
        onClick={() => router.push("/")}
        href={() => {
          window.alert("서비스 준비 중입니다.");
        }}
        bottom={{
          text: "info가 처음이신가요?",
          direct: member ? "회원가입" : "회사등록",
        }}
        confirm={"로그인"}
        {...{ comment }}
        move={() => router.push(path.signUp)}
        onSubmit={() => Submit()}
      >
        <_Layout>
          <InputText
            placeholder={
              member
                ? "이메일을 입력해주세요."
                : "사업자번호를 입력해주세요. ex) 000-00-00000"
            }
            {...{ error: error.error }}
            onInput={(e) =>
              member
                ? ChangeInput(e.target.value, "email")
                : ChangeCompanyNumber(e)
            }
            defaultValue={member ? data.email : data.companyNumber}
            onFocus={() => ClearError()}
          />
          <Password
            placeholder={"비밀번호를 입력해주세요."}
            {...{ error: error.error }}
            onInput={(e) => ChangeInput(e.target.value, "password")}
            onFocus={() => ClearError()}
          />
          <_ErrorComent>{error.comment}</_ErrorComent>
        </_Layout>
      </Modal>
    </>
  );
};
export default LoginPage;
const _Layout = styled.div`
  margin: 46px 0 89px 0;
  height: 196px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const _ErrorComent = styled.div`
  font: 500 13px "Pretendard";
  line-height: 16px;
  color: ${({ theme }) => theme.colors.red};
`;
