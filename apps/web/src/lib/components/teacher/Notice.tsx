// 리펙토링 필요. 상태관리를 이용하여 associate, leading 관리해야함.
import { useRouter } from "next/router";
import {
  Pagination,
  Table,
  Toast,
  Title,
  Header,
  Logo,
  Wait,
  Button,
  LabelButton,
  NoticeList,
  ChangeSelect,
  Footer,
} from "ui";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { NoticeTitleData } from "../../../data/teacher/notice";
import styled from "styled-components";
import { NoticeProps } from "../../../axios/dist";
import TeahcerCompanyModal from "../../../lib/components/Modal";
const TeacherNotice = ({
  status,
  data,
  ChangeIndex,
  getIndex,
  grantList,
  listStatus,
  approveStatus,
  result = "",
}: {
  status: "success" | "loading" | "error";
  data: NoticeProps | undefined;
  ChangeIndex: (num: number) => void;
  getIndex: number;
  grantList: {
    text: string;
    onClick: (check: boolean[]) => void;
  }[];
  approveStatus?: {
    now: "승인된" | "미승인";
    list: ["승인된", "미승인"];
    onClick: (item: "승인된" | "미승인") => void;
  };
  listStatus?: string;
  result?: string;
}) => {
  const router = useRouter();
  console.log(router.asPath);
  const [remainCount, setRemainCount] = useState<number>(0);
  const [check, setCheck] = useState<boolean[]>([false]);
  const [modal, setModal] = useState<string>("");
  useLayoutEffect(() => {
    if (data) {
      setRemainCount(11 - data.content.length);
      setCheck(new Array(data.content.length).fill(false));
    }
  }, [data]);
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
  const LabelData = [
    {
      onClick: () => router.push("/notice"),
      text: "대기 중인 모집공고",
      status: (router.asPath as string) === ("/notice/" || "/notice"),
    },
    {
      onClick: () => router.push("/notice/progress"),
      text: "모집 중인 모집공고",
      status:
        (router.asPath as string) ===
        ("/notice/progress/" || "/notice/progress"),
    },
    {
      onClick: () => router.push("/notice/gone"),
      text: "마감 된 모집공고",
      status:
        (router.asPath as string) === ("/notice/gone/" || "r/notice/gone"),
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
              selected: true,
            },
            {
              onClick: () => router.push("/company"),
              key: "회사",
              selected: false,
            },
          ]}
        >
          <Logo main={true} onClick={() => router.push("/notice")} />
        </Header>
        <_Layout>
          <_Result>
            {result === "" ? result : `${result}의 검색 결과입니다.`}
          </_Result>
          <div>
            <_ChangeSelectLayOut>
              <_ButtonLayout>
                {LabelData.map((props) => (
                  <LabelButton {...props} />
                ))}
              </_ButtonLayout>
              {approveStatus ? (
                <ChangeSelect {...approveStatus}></ChangeSelect>
              ) : (
                <></>
              )}
            </_ChangeSelectLayOut>
            <Toast label={"notice"}>
              <Table>
                <Title
                  checked={
                    check.length !== 0 && check.every((value) => value === true)
                  }
                  data={NoticeTitleData}
                  onChange={CheckAll}
                />
                {status === "loading" ? (
                  new Array(11).fill("").map((a, i) => (
                    <>
                      <Wait key={i} />
                    </>
                  ))
                ) : status === "error" ? (
                  new Array(11).fill("").map((a, i) => (
                    <>
                      <Wait key={i} />
                    </>
                  ))
                ) : (
                  <>
                    {data?.content.map((list, i) => (
                      <NoticeList
                        onChange={() => {
                          ChangeCheck(i);
                        }}
                        {...{ list }}
                        key={i}
                        checked={check[i]}
                        onClick={() => {}}
                        onWatch={() => {
                          router.push({
                            pathname: "/notice/specific",
                            query: {
                              companyNumber:
                                data.content[i].company.companyNumber,
                              noticeId: data.content[i].noticeId,
                            },
                          });
                        }}
                        onEdit={() => {
                          router.push({
                            pathname: "/notice/edit",
                            query: {
                              compayNumber:
                                data.content[i].company.companyNumber,
                              noticeId: data.content[i].noticeId,
                            },
                          });
                        }}
                        {...{ listStatus }}
                      />
                    ))}
                    {remainCount && data ? (
                      new Array(remainCount)
                        .fill("")
                        .map((a, i) => <Wait key={data.content.length + i} />)
                    ) : (
                      <></>
                    )}
                  </>
                )}
                <_Bottom>
                  {check.filter((b: boolean) => b).length}개 선택됨
                  <_ButtonLayout>
                    {grantList.map((props) => (
                      <Button
                        {...{ text: props.text }}
                        onClick={() => props.onClick(check)}
                      />
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
          </div>
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
export default TeacherNotice;
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
  justify-content: flex-end;
  gap: 0.5rem;
`;

const _ChangeSelectLayOut = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 1rem;
`;
