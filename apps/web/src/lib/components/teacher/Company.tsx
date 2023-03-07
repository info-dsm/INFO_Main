// 리펙토링 필요. 상태관리를 이용하여 associate, leading 관리해야함.
import { useRouter } from "next/router";
import {
  Pagination,
  Table,
  Toast,
  Title,
  List,
  Header,
  Logo,
  SearchBar,
  LittleSelectComplete,
  Wait,
  Button,
  Footer,
} from "ui";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { CompanyTitleData } from "../../../data/teacher/company";
import styled from "styled-components";
import { companyAssosiate, getCompanyListProps } from "../../../axios/dist";
import TeahcerCompanyModal from "../../../lib/components/Modal";
const TeacherCompany = ({
  status,
  data,
  ChangeIndex,
  getIndex,
  queryKey,
  result = "",
}: {
  status: "success" | "loading" | "error";
  data: getCompanyListProps | undefined;
  ChangeIndex: (num: number) => void;
  getIndex: number;
  queryKey: string;
  result?: string;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [now, setNow] = useState<"기본" | "년도 검색">("기본");
  const [remainCount, setRemainCount] = useState<number>(0);
  const [check, setCheck] = useState<boolean[]>([false]);
  const [modal, setModal] = useState<string>("");
  const [id, setId] = useState<string>("");
  useLayoutEffect(() => {
    if (data) {
      setRemainCount(11 - data.content.length);
      setCheck(new Array(data.content.length).fill(false));
    }
  }, [data]);
  const onClick = () => {
    if (now === "기본") {
      router.push(`/company/search/${id}`);
    } else {
      router.push(`/company/year/${id}`);
    }
  };
  const ChangeProps = useCallback(
    (item: "기본" | "년도 검색") => {
      setNow(item);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [now, setNow]
  );
  const CheckAll = useCallback(() => {
    console.log(check);
    if (check.every((v) => v === true)) {
      setCheck(new Array(check.length).fill(false));
    } else {
      setCheck(new Array(check.length).fill(true));
    }
  }, [check]);
  const ChangeCheck = useCallback(
    (index: number) => {
      setCheck(
        check.map((item, i) => {
          if (i === index) {
            return !item;
          }
          return item;
        })
      );
    },
    [check]
  );
  const GetCompanyNumberList = useCallback(
    (grant: "isLeading" | "isAssociated") => {
      const companyNumberArr: string[] = [];
      check.map((v: boolean, i: number) => {
        if (v && data && !data.content[i][grant]) {
          companyNumberArr.push(data.content[i].companyNumber);
        }
      });
      return companyNumberArr;
    },
    [check, data]
  );
  const grantList = [
    {
      text: "선도기업 등록",
      onClick: () => {
        companyAssosiate(GetCompanyNumberList("isLeading"), "leading").then(
          () =>
            queryClient.refetchQueries({
              queryKey: [queryKey, getIndex],
            })
        );
      },
    },
    {
      text: "협약 등록",
      onClick: () => {
        companyAssosiate(
          GetCompanyNumberList("isAssociated"),
          "associate"
        ).then(() => {
          console.log(queryKey);
          queryClient.refetchQueries({
            queryKey: [queryKey, getIndex],
          });
        });
      },
    },
  ];
  return (
    <>
      <_BackGround>
        <Header
          bgColor="#fff"
          admin={true}
          menu={[
            {
              onClick: () => router.push("/notice"),
              key: "모집공고",
              selected: false,
            },
            {
              onClick: () => router.push("/company"),
              key: "회사",
              selected: true,
            },
          ]}
        >
          <Logo main={true} onClick={() => router.push("/notice")} />
        </Header>
        <_Layout>
          <_Sort>
            <LittleSelectComplete
              {...{
                now,
                list: ["기본", "년도 검색"],
                onClick: (item: "기본" | "년도 검색") => {
                  ChangeProps(item);
                },
              }}
            />
            <SearchBar
              {...{
                onClick,
                onInput: (e) => {
                  setId(e.target.value);
                },
                placeholder:
                  now === "기본"
                    ? "해당 입력이 기업 이름에 들어있는 목록을 조회합니다."
                    : "입력년도에 모집공고를 등록한 회사를 조회합니다. (ex 2022",
              }}
            />
          </_Sort>
          <_Result>
            {result === "" ? result : `${result}의 검색 결과입니다.`}
          </_Result>
          <Toast label={"company"}>
            <Table>
              <Title
                checked={
                  check.length !== 0 && check.every((value) => value === true)
                }
                data={CompanyTitleData}
                onChange={CheckAll}
              />
              {status === "loading" ? (
                new Array(11).fill("").map((a, i) => (
                  <>
                    <Wait key={`${i}qwe`} />
                  </>
                ))
              ) : status === "error" ? (
                new Array(11).fill("").map((a, i) => (
                  <>
                    <Wait key={`${i}qwe`} />
                  </>
                ))
              ) : (
                <>
                  {data?.content.map((list, i) => (
                    <List
                      onChange={() => {
                        ChangeCheck(i);
                      }}
                      {...{ list }}
                      key={`${i}qwe`}
                      checked={check[i]}
                      onClick={() => {
                        if (list.totalEmployedCount > 0) {
                          setModal(list.companyNumber);
                        } else {
                          window.alert("재직자가 없습니다.");
                        }
                      }}
                      onWrite={() => {
                        router.push(
                          `/company/notice/${data.content[i].companyNumber}`
                        );
                      }}
                      onWatch={() => {
                        router.push(
                          `/company/info/${data.content[i].companyNumber}`
                        );
                      }}
                    />
                  ))}
                  {remainCount && data ? (
                    new Array(remainCount)
                      .fill("")
                      .map((a, i) => (
                        <Wait key={`${data.content.length + i}qwe`} />
                      ))
                  ) : (
                    <></>
                  )}
                </>
              )}
              <_Bottom>
                {check.filter((b: boolean) => b).length}개 선택됨
                <_ButtonLayout>
                  {grantList.map((props) => (
                    <Button {...props} key={props.text} />
                  ))}
                </_ButtonLayout>
              </_Bottom>
            </Table>
            <Pagination
              nowIndex={getIndex + 1}
              lastIndex={data ? data.totalPages : 3}
              changeIndex={ChangeIndex}
            />
          </Toast>
        </_Layout>
        <Footer />
      </_BackGround>
      {modal !== "" ? (
        <TeahcerCompanyModal
          onClick={() => setModal("")}
          companyName={"김진건회사"}
          companyNumber={modal}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default TeacherCompany;
const _Layout = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  gap: 1rem;
  @media (max-width: 1000px) {
    margin-bottom: 150px;
  }
`;
const _BackGround = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;
const _Sort = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 70rem;
  line-height: 60px;
  height: 60px;
`;
const _Result = styled.div`
  width: 55rem;
  font: 700 1.2rem "Pretendard";
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.blue};
`;

const _Bottom = styled.div`
  width: 60rem;
  height: 2rem;
  font: 700 1rem "Pretendard";
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.black};
  line-height: 2rem;
`;
const _ButtonLayout = styled.div`
  display: flex;
  width: max-content;
  align-items: center;
  gap: 0.5rem;
`;
