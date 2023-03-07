import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import {
  CompanyTitle,
  Footer,
  Header,
  LabelButton,
  Logo,
  NoticeCompanyList,
  Table,
  Toast,
  Wait,
} from "ui";
import { NoticeCompanyDtoType } from "../../../axios/dist";
import { CompanyNoticeTitleData } from "../../../data/company";
interface ShowCompnayNoticeProps {
  data: NoticeCompanyDtoType | undefined;
  status: "success" | "loading" | "error";
}
const ShowCompanyNotice = ({ status, data }: ShowCompnayNoticeProps) => {
  const router = useRouter();
  const LabelData = [
    {
      onClick: () => router.push("/company"),
      text: "전체 모집 공고",
      status: (router.asPath as string) === ("/company/" || "/company"),
    },
    // {
    //   onClick: () => router.push("/company/notice/approve"),
    //   text: "승인된 모집공고",
    //   status:
    //     (router.asPath as string) ===
    //     ("/company/notice/approve/" || "/company/notice/approve"),
    // },
  ];
  const [remainCount, setRemainCount] = useState<number>(0);
  useLayoutEffect(() => {
    if (data && data.length < 11) {
      setRemainCount(11 - data.length);
    }
  }, [data]);
  return (
    <>
      <_BackGround>
        <Header
          bgColor={"#fff"}
          admin={true}
          {...{
            menu: [
              {
                onClick: () => {
                  router.push("/company");
                },
                key: "내가 등록한 모집공고",
                selected: true,
              },
              {
                onClick: () => {
                  router.push("/company/notice/write");
                },
                key: "모집공고 작성",
                selected:
                  router.asPath ===
                  ("/company/write/notice/" || "/company/write/notice"),
              },
              {
                onClick: () => {
                  router.push("/company/mypage");
                },
                key: "내 정보",
                selected:
                  router.asPath === ("/company/mypage/" || "/company/mypage"),
              },
            ],
          }}
        >
          <Logo main={true} onClick={() => router.push("/company")} />
        </Header>
        <_Layout>
          <div>
            <_ChangeSelectLayOut>
              <_ButtonLayout>
                {LabelData.map((props) => (
                  <LabelButton {...props} />
                ))}
              </_ButtonLayout>
            </_ChangeSelectLayOut>
            <Toast label="notice">
              <Table>
                <CompanyTitle data={CompanyNoticeTitleData} />
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
                    {data?.map((list, i) => (
                      <NoticeCompanyList
                        {...{ list }}
                        key={i}
                        onClick={() => {}}
                        onWatch={() => {
                          router.push({
                            pathname: "/company/notice/info",
                            query: {
                              companyNumber:
                                data[i].notice.company.companyNumber,
                              noticeId: data[i].notice.noticeId,
                            },
                          });
                        }}
                        onEdit={() => {
                          router.push(
                            `/company/notice/edit/${data[i].notice.noticeId}`
                          );
                        }}
                      />
                    ))}
                    {remainCount && data ? (
                      new Array(remainCount)
                        .fill("")
                        .map((a, i) => <Wait key={data.length + i} />)
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </Table>
            </Toast>
          </div>
        </_Layout>
        <Footer />
      </_BackGround>
    </>
  );
};
export default ShowCompanyNotice;
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
  height: max-content;
  flex-direction: column;
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
