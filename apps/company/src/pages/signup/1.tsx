import Background from "../../lib/components/Background";
import menu from "../../data/logindata/company";
import { InputText, ModalCompany, Success, SmallInput, AddressInput } from "ui";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { firstSignUpData, secondSignUpData } from "../../atom";
import { ChangeEvent, useCallback } from "react";
import { AddressProps } from "../../../@types/interface";
import open from "../../hooks/addresshook";
const FirstSignUp = () => {
  const router = useRouter();
  const [data, setData] = useRecoilState(firstSignUpData);
  const [secondData, setSecondeData] = useRecoilState(secondSignUpData);
  const ChangeInput = useCallback(
    function (
      props: "companyNumber" | "companyNameRequest",

      e: string | { companyName: string }
    ) {
      console.log(data);
      setData({ ...data, [props]: e });
    },
    [data, setData]
  );
  function handleComplete(
    data: AddressProps,
    props: "homeAddress" | "agentAddress"
  ) {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    ChangeSecond(props, { fullAddress, addressNumber: data.zonecode });
    document.body.removeChild(document.getElementById("daum_postcode_script")!);
  }
  const CheckNumber = (
    props: "workerCount" | "establishedAt" | "annualSales",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    ChangeSecond(props, e.target.value);
  };
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
        ChangeInput("companyNumber", e.target.value);
      } else {
        e.target.value = e.target.value.slice(0, 12);
      }
    },
    [ChangeInput]
  );
  const ChangeSecond = useCallback(
    (
      props:
        | "homeAddress"
        | "agentAddress"
        | "workerCount"
        | "establishedAt"
        | "annualSales"
        | "representativeName"
        | "companyPhone",
      e: { fullAddress: string; addressNumber: string } | string
    ) => {
      setSecondeData({ ...secondData, [props]: e });
    },
    [secondData, setSecondeData]
  );

  return (
    <>
      <Background {...menu} />
      <ModalCompany
        top={{
          text: "기존 회원이신가요?",
          direct: "로그인",
        }}
        href={() => router.push("/company/login")}
        confirm={"다음"}
        onSubmit={() => router.push("/company/signup/2")}
        count={1}
      >
        <_Layout>
          <Success text={"회사정보 입력"} success={false}></Success>
          <_Interval gap={12}>
            <InputText
              placeholder={"기업 명을 입력해주세요."}
              {...{ error: false }}
              onInput={(e) =>
                ChangeInput("companyNameRequest", {
                  companyName: e.target.value,
                })
              }
              defaultValue={data.companyNameRequest.companyName}
              onFocus={() => {}}
            />
            <InputText
              placeholder={"사업자번호를 입력해주세요. ex)000-00-00000"}
              {...{ error: false }}
              onInput={ChangeCompanyNumber}
              defaultValue={data.companyNumber}
              onFocus={() => {}}
            />
            <InputText
              placeholder={
                "기업 전화번호를 입력해주세요. ex) 02 or 0xx-xxxx-xxxx"
              }
              {...{ error: false }}
              onInput={(e) => ChangeSecond("companyPhone", e.target.value)}
              defaultValue={secondData.companyPhone}
              onFocus={() => {}}
            />
            <_Interval gap={10}>
              <_Flex>
                <SmallInput
                  onChange={(e) =>
                    ChangeSecond("representativeName", e.target.value)
                  }
                  text={"대표자"}
                  value={secondData.representativeName}
                  placeholder={"대표 명을 입력해주세요."}
                />
                <SmallInput
                  onChange={(e) => CheckNumber("workerCount", e)}
                  text={"근로자 수"}
                  value={`${secondData.workerCount}`}
                  placeholder={"ex) 50"}
                />
              </_Flex>
              <_Flex>
                <SmallInput
                  onChange={(e) => CheckNumber("establishedAt", e)}
                  text={"설립년도"}
                  value={`${secondData.establishedAt}`}
                  placeholder={"ex) 2022"}
                />
                <SmallInput
                  onChange={(e) => CheckNumber("annualSales", e)}
                  text={"연매출액"}
                  value={`${secondData.annualSales}`}
                  placeholder={"ex) 500000000"}
                />
              </_Flex>
            </_Interval>
            <AddressInput
              text={"본사"}
              defaultValue={secondData.homeAddress.fullAddress}
              onClick={() =>
                open({
                  onComplete: (data) => handleComplete(data, "homeAddress"),
                  width: 700,
                  height: 700,
                  left: 200,
                  animation: true,
                })
              }
              number={secondData.homeAddress.addressNumber}
              placeholder={"클릭 시 주소를 추가하실 수 있습니다."}
            />
            <AddressInput
              text={"연구소/지점 (선택)"}
              defaultValue={secondData.agentAddress.fullAddress}
              onClick={() =>
                open({
                  onComplete: (data) => handleComplete(data, "agentAddress"),
                  width: 700,
                  height: 700,
                  left: 200,
                  animation: true,
                })
              }
              number={secondData.agentAddress.addressNumber}
              placeholder={"클릭 시 주소를 추가하실 수 있습니다."}
            />
          </_Interval>
        </_Layout>
      </ModalCompany>
    </>
  );
};
export default FirstSignUp;
const _Layout = styled.div`
  margin-top: 36px;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 56px;
`;
const _Interval = styled.div<{ gap: number }>`
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
`;
const _Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
