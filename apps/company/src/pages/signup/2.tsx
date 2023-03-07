import { CheckInput, SecondModalCompany, Success, TextArea } from "ui";
import { useRouter } from "next/router";
import Background from "../../lib/components/Background";
import menu from "../../data/logindata/company";
import { useRecoilState } from "recoil";
import { firstSignUpData } from "../../atom";
import { useQuery } from "@tanstack/react-query";
import { getBusiness } from "../../axios/dist";
import { useCallback, useLayoutEffect, useState } from "react";
import styled from "styled-components";
const SecondPage = () => {
  const router = useRouter();
  const { status, data } = useQuery(["tag"], () => getBusiness());
  const [first, setFirst] = useRecoilState(firstSignUpData);
  const [state, setState] = useState<boolean[]>([false]);
  const ChangeInput = useCallback(
    (index: number) => {
      setState(
        state.map((item, i) => {
          if (i === index) {
            return !item;
          }
          return item;
        })
      );
    },
    [state]
  );
  useLayoutEffect(() => {
    if (data) {
      if (first.businessAreaList[0] !== "") {
        let AtStart = new Array(data.length).fill(false);
        first.businessAreaList.map(
          (item) => (AtStart[data.findIndex((v) => v.id === item)] = true)
        );
        setState(AtStart);
      } else {
        setState(new Array(data.length).fill(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const ChangeSecondData = useCallback(
    (props: "businessAreaList" | "introduction", e: string[] | string) => {
      setFirst({ ...first, [props]: e });
    },
    [first, setFirst]
  );
  const NextPart = useCallback(() => {
    if (!state.every((v) => v === false) && first.introduction !== "") {
      const arr: string[] = [];
      state.map((v, i) => {
        if (v && data) arr.push(data[i].id);
      });
      ChangeSecondData("businessAreaList", arr);
      router.push("/company/signup/3");
    }
  }, [ChangeSecondData, data, first.introduction, router, state]);
  return (
    <>
      <Background {...menu} />
      <SecondModalCompany
        top={{
          text: "기존 회원이신가요?",
          direct: "로그인",
        }}
        href={() => router.push("/company/login")}
        confirm={"다음"}
        onSubmit={NextPart}
        count={2}
        move={() => router.back()}
      >
        <_Layout>
          <Success
            text={"사업 분야를 선택해주세요."}
            success={!state.every((v) => v === false)}
          />
          <_LayoutTag>
            {status === "success" ? (
              data.map((item: { id: string }, i: number) => (
                <CheckInput
                  key={i}
                  id={item.id}
                  onChange={() => ChangeInput(i)}
                  checked={state[i]}
                />
              ))
            ) : (
              <></>
            )}
          </_LayoutTag>
          <Success
            text={"상세 설명을 입력해주새요"}
            success={first.introduction !== ""}
          />
          <TextArea
            onChange={(e) => ChangeSecondData("introduction", e.target.value)}
            placeholder={"회사 설명을 입력해주세요."}
            defaultValue={first.introduction}
          />
        </_Layout>
      </SecondModalCompany>
    </>
  );
};
export default SecondPage;
const _LayoutTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const _Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 36px 0 56px 0;
`;
