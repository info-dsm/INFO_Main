import { useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import {
  CheckBox,
  Header,
  Logo,
  NoticeSelect,
  NumberInput,
  TextArea,
  BigCheck,
  InputNotice,
  OtherSearch,
  SelectPrime,
  MiniButton,
  FileManage,
  Spinner,
  Footer,
} from "ui";
import {
  createNoticeFile,
  editNotice,
  getBaseList,
  getBaseListProps,
  getNoticeDetail2,
  getNoticeDetailProps2,
} from "../../../axios/dist";
import open from "../../../hooks/addresshook";
import { AddressProps } from "../../../../@types/interface";
interface WriteNoticeProps {
  menu: {
    onClick: () => void;
    key: string;
    selected: boolean;
  }[];
  path: string;
  companyNumber: string;
  noticeId: string;
}
const WriteNotice = ({ menu, companyNumber, noticeId }: WriteNoticeProps) => {
  const data: [
    UseQueryResult<getBaseListProps>,
    UseQueryResult<getNoticeDetailProps2>
  ] = useQueries({
    queries: [
      { queryKey: ["getNoticedefaultData"], queryFn: () => getBaseList() },
      {
        queryKey: ["getNoticeDetail", noticeId],
        queryFn: () => {
          const data = getNoticeDetail2(noticeId);
          return data;
        },
      },
    ],
  }) as [
    UseQueryResult<getBaseListProps>,
    UseQueryResult<getNoticeDetailProps2>
  ];
  console.log(data);
  const [certificateList, setCertificateList] = useState<{
    list: {
      bigClassification: string;
      small: { name: string; on: boolean }[];
    }[];
    now: number;
  }>({
    list: [
      {
        bigClassification: "",
        small: [{ name: "", on: false }],
      },
    ],
    now: 0,
  });
  const [dateState, setDateState] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [checkState, setCheckState] = useState<{
    technologe: boolean[];
    language: boolean[];
    certificate: boolean[];
  }>({
    technologe: [false],
    language: [false],
    certificate: [false],
  });
  const [number, setNumber] = useState<{
    detailBusinessDescription: string;
    numberOfEmployee: number;
    gradeCutLine?: number;
    otherFeatures: string;
    check: boolean;
  }>({
    detailBusinessDescription: "",
    numberOfEmployee: 0,
    gradeCutLine: 0,
    otherFeatures: "",
    check: false,
  });
  const [file, setFile] = useState<(File | null)[] | null>([]);
  const [workTime, setWorkTime] = useState<{
    commuteStartTime: number;
    commuteEndTime: number;
    workTimePerDay: number;
    workTimePerWeek: number;
    isFlexible: boolean;
  }>({
    commuteStartTime: 0,
    commuteEndTime: 0,
    workTimePerDay: 0,
    workTimePerWeek: 0,
    isFlexible: false,
  });
  const [pay, setPay] = useState<{
    fieldTrainingPayPerMonth: number;
    fullTimeEmploymentPay: {
      yearPayStart: number;
      yearPayEnd: number;
    };
  }>({
    fieldTrainingPayPerMonth: 0,
    fullTimeEmploymentPay: {
      yearPayStart: 0,
      yearPayEnd: 0,
    },
  });
  const [address, setAddress] = useState<{
    isSameWithCompanyAddress: boolean;
    otherPlace: string;
  }>({
    isSameWithCompanyAddress: true,
    otherPlace: "",
  });
  const [welfare, setWelfare] = useState<{
    dormitorySupport: boolean;
    selfDevelopmentPay: boolean;
    equipmentSupport: boolean;
    youthTomorrowChaeumDeduction: boolean;
    alternativeMilitaryPlan: boolean;
    elseSupport: string;
  }>({
    dormitorySupport: false,
    selfDevelopmentPay: false,
    equipmentSupport: false,
    youthTomorrowChaeumDeduction: false,
    alternativeMilitaryPlan: false,
    elseSupport: "",
  });
  const [meal, setMeal] = useState<{
    mealSupportPay: number;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  }>({
    mealSupportPay: 0,
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [list, setList] = useState<{ process: string; meaning: string }[]>([
    {
      process: "",
      meaning: "클릭 시 선택",
    },
  ]);
  useLayoutEffect(() => {
    if (data[0].status === "success" && data[1].status === "success") {
      let arr = [
        {
          bigClassification:
            data[0].data[3][0].bigClassification.bigClassificationName,
          small: [{ name: data[0].data[3][0].name, on: false }],
        },
      ];
      let count = 0;
      for (let i = 1; i < data[0].data[3].length; i++) {
        count = arr.findIndex(
          (el) =>
            el.bigClassification ===
            data[0].data?.[3][i].bigClassification.bigClassificationName
        );
        if (count === -1) {
          arr.push({
            bigClassification:
              data[0].data[3][i].bigClassification.bigClassificationName,
            small: [
              {
                name: data[0].data[3][i].name,
                on:
                  data[1].data.classificationResponse.findIndex((e) => {
                    if (data[0].data?.[3]) {
                      return e.name === data[0].data[3][i].name;
                    } else {
                      return false;
                    }
                  }) !== -1,
              },
            ],
          });
          count++;
        } else {
          arr[count].small.push({
            name: data[0].data[3][i].name,
            on:
              data[1].data.classificationResponse.findIndex((e) => {
                if (data[0].data?.[3]) {
                  return e.name === data[0].data[3][i].name;
                } else {
                  return false;
                }
              }) !== -1,
          });
        }
      }
      console.log(data[1].data.classificationResponse[0]);
      let now =
        arr.findIndex((el) => {
          if (data[1].data?.classificationResponse[0] !== undefined) {
            return (
              el.bigClassification ===
              data[1].data.classificationResponse[0].bigClassification
                .bigClassificationName
            );
          } else {
            return false;
          }
        }) ?? 0;
      setCertificateList({ list: arr, now });
      setCheckState({
        technologe: new Array(data[0].data[0].length)
          .fill(false)
          .map((e, i) => {
            if (data[1].data?.technologyList.length !== 0) {
              return (
                data[1].data?.technologyList.findIndex((e) => {
                  if (data[0].data) {
                    return (
                      e.technologyName === data[0].data[0][i].technologyName
                    );
                  } else {
                    return false;
                  }
                }) !== -1
              );
            } else return e;
          }),
        language: new Array(data[0].data[1].length).fill(false).map((e, i) => {
          if (data[1].data?.languageList.length !== 0) {
            return (
              data[1].data?.languageList.findIndex((e) => {
                if (data[0].data) {
                  return e.languageName === data[0].data[1][i].languageName;
                } else {
                  return false;
                }
              }) !== -1
            );
          } else return e;
        }),
        certificate: new Array(data[0].data[0].length)
          .fill(false)
          .map((e, i) => {
            if (data[1].data?.certificateList.length !== 0) {
              return (
                data[1].data?.certificateList.findIndex((e) => {
                  if (data[0].data?.[2][i]?.certificateName !== undefined) {
                    return (
                      e.certificateName === data[0].data[2][i].certificateName
                    );
                  } else {
                    return false;
                  }
                }) !== -1
              );
            } else return e;
          }),
      });
      setDateState({
        startDate: data[1].data.noticeOpenPeriod.startDate,
        endDate: data[1].data.noticeOpenPeriod.endDate,
      });
      setNumber({
        detailBusinessDescription: data[1].data.detailBusinessDescription || "",
        numberOfEmployee: data[1].data.numberOfEmployee,
        gradeCutLine: data[1].data.gradeCutLine,
        otherFeatures: data[1].data.otherFeatures || "",
        check: data[1].data.gradeCutLine !== undefined,
      });
      setWorkTime({
        commuteStartTime: data[1].data.workTime.commuteStartTime || 0,
        commuteEndTime: data[1].data.workTime.commuteEndTime || 0,
        workTimePerDay: data[1].data.workTime.workTimePerDay || 0,
        workTimePerWeek: data[1].data.workTime.workTimePerWeek,
        isFlexible: data[1].data.workTime.isFlexible,
      });
      setAddress({
        isSameWithCompanyAddress:
          data[1].data.workPlace.isSameWithCompanyAddress,
        otherPlace: data[1].data.workPlace.otherPlace || "",
      });
      setMeal({
        mealSupportPay: data[1].data.mealSupport.mealSupportPay,
        breakfast: data[1].data.mealSupport.breakfast,
        lunch: data[1].data.mealSupport.lunch,
        dinner: data[1].data.mealSupport.dinner,
      });
      setWelfare({
        dormitorySupport: data[1].data.welfare.dormitorySupport,
        selfDevelopmentPay: data[1].data.welfare.selfDevelopmentPay,
        equipmentSupport: data[1].data.welfare.equipmentSupport,
        youthTomorrowChaeumDeduction:
          data[1].data.welfare.youthTomorrowChaeumDeduction,
        alternativeMilitaryPlan: data[1].data.welfare.alternativeMilitaryPlan,
        elseSupport: data[1].data.welfare.elseSupport || "",
      });
      //   let ar = Object.values(
      //     data[1].data.interviewProcessList as { [key: number]: string }
      //   ).map((e: string, i: number) => {
      //     if (i > 0 && data[0].data?.[4]) {
      //       return {
      //         process: e,
      //         meaning:
      //           data[0].data?.[4][
      //             data[0].data?.[4].findIndex((el) => el.process === e)
      //           ] || "클릭 시 선택",
      //       };
      //     }
      //   }) as unknown as { process: string; meaning: string }[];
      //   setList(ar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data[0].data, data[1].data]);
  const handleComplete = (data: AddressProps) => {
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
    ChangeAddress("otherPlace", fullAddress);
    document.body.removeChild(document.getElementById("daum_postcode_script")!);
  };
  const ChangeAddress = useCallback(
    (props: "isSameWithCompanyAddress" | "otherPlace", e: boolean | string) => {
      if (
        !address.isSameWithCompanyAddress ||
        props === "isSameWithCompanyAddress"
      ) {
        setAddress({ ...address, [props]: e });
      }
    },
    [address, setAddress]
  );
  const ChangeWel = useCallback(
    (
      props:
        | "dormitorySupport"
        | "selfDevelopmentPay"
        | "equipmentSupport"
        | "youthTomorrowChaeumDeduction"
        | "alternativeMilitaryPlan"
        | "elseSupport",
      e: string | boolean
    ) => {
      setWelfare({ ...welfare, [props]: e });
    },
    [welfare]
  );
  const changeFileArray = (fileLists: FileList | null) => {
    if (fileLists) {
      const files: (File | null)[] = [];
      for (let i = 0; i < fileLists.length; i++) {
        files.push(fileLists.item(i));
      }
      return files;
    } else return null;
  };
  const ChangeDate = useCallback(
    (props: "startDate" | "endDate", e: string) => {
      setDateState({ ...dateState, [props]: e });
    },
    [dateState]
  );
  const ChangeMeal = useCallback(
    (
      props: "mealSupportPay" | "breakfast" | "lunch" | "dinner",
      e: boolean | number | string
    ) => {
      setMeal({ ...meal, [props]: e });
    },
    [meal]
  );
  const AddList = useCallback(() => {
    setList((list) => [
      ...list,
      {
        process: "",
        meaning: "클릭 시 선택",
      },
    ]);
  }, [setList]);
  const ChangeList = useCallback(
    (props: string, index: number) => {
      if (data && data[0] && data[0].data?.[4] && data[0].data[4]) {
        const num = data[0].data[4].findIndex((v) => v.meaning === props);
        setList(
          list.map((v, i) =>
            i === index && data[0] && data[0].data?.[4]
              ? data[0].data[4][num]
              : v
          )
        );
      }
    },
    [data, list]
  );
  const RemoveList = useCallback(
    (index: number) => {
      setList(list.filter((e, i) => i !== index));
    },
    [list]
  );
  const RemoveFile = useCallback(
    (index: number) => {
      if (file) {
        setFile(file.filter((e, i) => i !== index));
      }
    },
    [file]
  );
  const AddFile = useCallback(
    (e: (File | null)[] | null) => {
      if (e) {
        setFile([...e, ...(file as File[] | [])]);
      }
    },
    [file]
  );
  const ChangeWork = useCallback(
    (
      props:
        | "commuteStartTime"
        | "commuteEndTime"
        | "workTimePerDay"
        | "workTimePerWeek"
        | "isFlexible",
      e: number | boolean | string
    ) => {
      if (props === "isFlexible" || !workTime.isFlexible) {
        setWorkTime({ ...workTime, [props]: e });
      }
    },
    [workTime]
  );
  const ChangeMoney = useCallback(
    (
      props: "fieldTrainingPayPerMonth" | "fullTimeEmploymentPay",
      e:
        | { yearPayStart: number | string; yearPayEnd: number | string }
        | number
        | string
    ) => {
      setPay({ ...pay, [props]: e });
    },
    [pay]
  );
  const ChangeAll = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCertificateList({
        ...certificateList,
        list: certificateList.list.map((v, i) => {
          if (i === certificateList.now) {
            return {
              small: certificateList.list[certificateList.now].small.map(
                (item) => {
                  return { name: item.name, on: e.target.checked };
                }
              ),
              bigClassification: v.bigClassification,
            };
          } else {
            return v;
          }
        }),
      });
    },
    [certificateList]
  );
  const ChangeDetail = useCallback(
    (index: number) => {
      setCertificateList({
        ...certificateList,
        list: certificateList.list.map((v, i) => {
          if (i === certificateList.now) {
            return {
              small: certificateList.list[certificateList.now].small.map(
                (item, i) => {
                  if (i === index) {
                    return { name: item.name, on: !item.on };
                  } else {
                    return item;
                  }
                }
              ),
              bigClassification: v.bigClassification,
            };
          } else {
            return v;
          }
        }),
      });
    },
    [certificateList]
  );
  const ChangeProps = useCallback(
    (props: "list" | "now", e: number) => {
      setCertificateList({ ...certificateList, [props]: e });
    },
    [certificateList]
  );
  const ChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    return e.target.value;
  };
  const ChangeSecond = useCallback(
    (
      props:
        | "detailBusinessDescription"
        | "numberOfEmployee"
        | "gradeCutLine"
        | "otherFeatures"
        | "check",
      e: number | string | boolean
    ) => {
      setNumber({ ...number, [props]: e });
    },
    [number]
  );
  const ChangeCheck = useCallback(
    (props: "technologe" | "language" | "certificate", i: number) => {
      setCheckState({
        ...checkState,
        [props]: checkState[props].map((e, index) => (i === index ? !e : e)),
      });
    },
    [checkState]
  );
  const Submit = () => {
    if (data) {
      let interProps = { 1: "DOCUMENT" };
      list
        .filter((v) => v.process !== "")
        .map((v, i: number) => {
          return (interProps = { ...interProps, [i + 2]: v.process });
        });
      let { check, ...props } = number;
      let { elseSupport, ...wel } = welfare;
      let { isSameWithCompanyAddress } = address;
      if (!check) {
        delete props.gradeCutLine;
      }
      if (data) {
        editNotice(
          companyNumber,
          noticeId,
          certificateList.list[certificateList.now].small
            .map((v) => {
              if (v.on) {
                return v.name;
              }
            })
            .filter((v) => v !== undefined) as string[],
          checkState.certificate
            .map((v, i) => {
              if (v && data[0].data?.[2]) {
                return data[0].data[2][i].certificateName;
              }
            })
            .filter((v) => v !== undefined) as string[],
          checkState.language
            .map((v, i) => {
              if (v && data[0].data?.[1]) {
                return data[0].data[1][i].languageName;
              }
            })
            .filter((v) => v !== undefined) as string[],
          checkState.technologe
            .map((v, i) => {
              if (v && data[0].data?.[0]) {
                return data[0].data[0][i].technologyName;
              }
            })
            .filter((v) => v !== undefined) as string[],
          workTime,
          pay,
          meal,
          interProps,
          dateState,
          props,
          elseSupport === "" ? wel : welfare,
          isSameWithCompanyAddress ? { isSameWithCompanyAddress } : address,
          file?.map((v) => {
            return { fileName: v?.name, contentType: v?.type };
          }) as {
            fileName: string;
            contentType: string;
          }[]
        ).then((res) => {
          console.log(res);
          createNoticeFile(res, file as File[]);
        });
      }
    }
  };
  return (
    <>
      <_BackGround>
        <Header bgColor="#fff" admin={true} {...{ menu }}>
          <Logo main={true} onClick={() => {}} />
        </Header>
        {data[0].status === "success" && data[1].status === "success" ? (
          <>
            <_Layout>
              <_Title>채용직무</_Title>
              <NoticeSelect
                onClick={(i) => ChangeProps("now", i)}
                onChange={ChangeAll}
                change={ChangeDetail}
                {...{ certificateList }}
              />
              <_Line />
              <_Title>채용인원</_Title>
              <_Flex>
                <NumberInput
                  text={"전체"}
                  onChange={(e) => {
                    ChangeSecond("numberOfEmployee", ChangeNumber(e));
                  }}
                  value={`${number.numberOfEmployee || ""}`}
                />
              </_Flex>
              <_Line />
              <_Title>상세직무</_Title>
              <TextArea
                onChange={(e) =>
                  ChangeSecond("detailBusinessDescription", e.target.value)
                }
                placeholder={"상세직무를 입력해주세요."}
                defaultValue={number.detailBusinessDescription}
              />
              <_Line />
              <_Title>자격요건</_Title>
              <_QualifiLayout>
                <_SmallTitle>필요언어</_SmallTitle>
                <_FlexWrap>
                  {data && data[0].data?.[1] ? (
                    data[0].data[1].map((item, i) => (
                      <CheckBox
                        onChange={() => ChangeCheck("language", i)}
                        text={item.languageName}
                        checked={checkState.language[i]}
                        key={item.languageName}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </_FlexWrap>
                <_SmallTitle>프레임워크</_SmallTitle>
                <_FlexWrap>
                  {data && data[0].data?.[0] ? (
                    data[0].data[0].map((item, i) => (
                      <CheckBox
                        onChange={() => ChangeCheck("technologe", i)}
                        text={item.technologyName}
                        checked={checkState.technologe[i]}
                        key={item.technologyName}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </_FlexWrap>
              </_QualifiLayout>
              <_LayoutDiv>
                <_SmallTitle>지원자격</_SmallTitle>
                <_Lay gap={30}>
                  <BigCheck
                    text={"성적"}
                    onChange={(e) => ChangeSecond("check", e.target.checked)}
                    checked={number.check}
                  />
                  <InputNotice
                    text={"상위"}
                    onChange={(e) =>
                      ChangeSecond(
                        "gradeCutLine",
                        parseInt(ChangeNumber(e)) > 100 ? 100 : ChangeNumber(e)
                      )
                    }
                    value={`${number.gradeCutLine || ""}`}
                    last={"% 이내"}
                  />
                </_Lay>
                <_FlexWrap>
                  국가자격증
                  {data && data[0].data?.[2] ? (
                    data[0].data[2].map((item, i) => (
                      <CheckBox
                        onChange={() => ChangeCheck("certificate", i)}
                        text={item.certificateName}
                        checked={checkState.certificate[i]}
                        key={item.certificateName}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </_FlexWrap>
              </_LayoutDiv>
              <_Line />
              <_Title>급여</_Title>
              <_QualifiLayout>
                <_Lay gap={20}>
                  <_BlueText>실습수당</_BlueText>
                  <InputNotice
                    text={""}
                    onChange={(e) =>
                      ChangeMoney("fieldTrainingPayPerMonth", ChangeNumber(e))
                    }
                    value={`${pay.fieldTrainingPayPerMonth || ""}`}
                    last={"만원"}
                  />
                </_Lay>
                <_Lay gap={20}>
                  <_BlueText>정규식 전환시(연봉)</_BlueText>
                  <_Lay gap={10}>
                    <InputNotice
                      text={""}
                      onChange={(e) =>
                        ChangeMoney("fullTimeEmploymentPay", {
                          yearPayStart: ChangeNumber(e),
                          yearPayEnd: pay.fullTimeEmploymentPay.yearPayEnd,
                        })
                      }
                      value={`${pay.fullTimeEmploymentPay.yearPayStart || ""}`}
                      last={"~"}
                    />
                    <InputNotice
                      text={""}
                      onChange={(e) =>
                        ChangeMoney("fullTimeEmploymentPay", {
                          yearPayStart: pay.fullTimeEmploymentPay.yearPayStart,
                          yearPayEnd: ChangeNumber(e),
                        })
                      }
                      value={`${pay.fullTimeEmploymentPay.yearPayEnd || ""}`}
                      last={"만원"}
                    />
                  </_Lay>
                </_Lay>
              </_QualifiLayout>
              <_Line />
              <_Title>복리후생</_Title>
              <_QualifiLayout>
                <_SmallTitle>식사</_SmallTitle>
                <_Lay gap={10}>
                  <InputNotice
                    text={"식대지원"}
                    onChange={(e) =>
                      ChangeMeal("mealSupportPay", ChangeNumber(e))
                    }
                    value={`${meal.mealSupportPay}`}
                    last={"원(월)"}
                  />
                  <BigCheck
                    text={"조식제공"}
                    onChange={(e) => ChangeMeal("breakfast", e.target.checked)}
                    checked={meal.breakfast}
                    key={"조식제공"}
                  />
                  <BigCheck
                    text={"중식제공"}
                    onChange={(e) => ChangeMeal("lunch", e.target.checked)}
                    checked={meal.lunch}
                    key={"중식제공"}
                  />
                  <BigCheck
                    text={"석식제공"}
                    onChange={(e) => ChangeMeal("dinner", e.target.checked)}
                    checked={meal.dinner}
                    key={"석식제공"}
                  />
                </_Lay>
              </_QualifiLayout>
              <_BokliLay>
                <_SmallTitle>복리후생</_SmallTitle>
                <_Lay gap={10}>
                  <BigCheck
                    text={"기숙사 지원"}
                    onChange={(e) =>
                      ChangeWel("dormitorySupport", e.target.checked)
                    }
                    checked={welfare.dormitorySupport}
                    key={"기숙사 지원"}
                  />
                  <BigCheck
                    text={"자기개발비"}
                    onChange={(e) =>
                      ChangeWel("selfDevelopmentPay", e.target.checked)
                    }
                    checked={welfare.selfDevelopmentPay}
                    key={"자기개발비"}
                  />
                  <BigCheck
                    text={"장비지원"}
                    onChange={(e) =>
                      ChangeWel("equipmentSupport", e.target.checked)
                    }
                    checked={welfare.equipmentSupport}
                    key={"장비지원"}
                  />
                  <BigCheck
                    text={"청년내일채움공제"}
                    onChange={(e) =>
                      ChangeWel(
                        "youthTomorrowChaeumDeduction",
                        e.target.checked
                      )
                    }
                    checked={welfare.youthTomorrowChaeumDeduction}
                    key={"청년내일채움공제"}
                  />
                  <BigCheck
                    text={"병특신청"}
                    onChange={(e) =>
                      ChangeWel("alternativeMilitaryPlan", e.target.checked)
                    }
                    checked={welfare.alternativeMilitaryPlan}
                    key={"병특신청"}
                  />
                </_Lay>
                <OtherSearch
                  placeholder={"기타 복리후생을 추가해주세요."}
                  onChange={(e) => ChangeWel("elseSupport", e.target.value)}
                  value={welfare.elseSupport || ""}
                />
              </_BokliLay>
              <_Line />
              <_Title>근무시간</_Title>
              <_QualifiLayout>
                <_Lay gap={10}>
                  <BigCheck
                    text={"고정 출근시간"}
                    onChange={(e) =>
                      ChangeWork("isFlexible", !workTime.isFlexible)
                    }
                    type={"checkbox"}
                    checked={!workTime.isFlexible}
                    status={true}
                  />
                  <InputNotice
                    text={""}
                    onChange={(e) =>
                      ChangeWork(
                        "commuteStartTime",
                        parseInt(ChangeNumber(e)) > 24 ? 24 : ChangeNumber(e)
                      )
                    }
                    value={`${workTime.commuteStartTime || ""}`}
                    last={"시"}
                    key={"start"}
                  />
                  <InputNotice
                    text={"~"}
                    onChange={(e) =>
                      ChangeWork(
                        "commuteEndTime",
                        parseInt(ChangeNumber(e)) > 24 ? 24 : ChangeNumber(e)
                      )
                    }
                    value={`${workTime.commuteEndTime || ""}`}
                    last={"시"}
                    key={"end"}
                  />
                  <NumberInput
                    text={"주당 근무시간"}
                    onChange={(e) =>
                      ChangeWork(
                        "workTimePerWeek",
                        parseInt(ChangeNumber(e)) > 24 ? 24 : ChangeNumber(e)
                      )
                    }
                    value={`${workTime.workTimePerWeek || ""}`}
                    last={"시"}
                    key={"week"}
                  />
                  <NumberInput
                    text={"일일 근무시간"}
                    onChange={(e) =>
                      ChangeWork(
                        "workTimePerDay",
                        parseInt(ChangeNumber(e)) > 24 ? 24 : ChangeNumber(e)
                      )
                    }
                    value={`${workTime.workTimePerDay || ""}`}
                    last={"시"}
                    key={"day"}
                  />
                </_Lay>
                <BigCheck
                  text={"유연근무제"}
                  onChange={(e) =>
                    ChangeWork("isFlexible", !workTime.isFlexible)
                  }
                  type={"checkbox"}
                  checked={workTime.isFlexible}
                  status={true}
                />
              </_QualifiLayout>
              <_Line />
              <_Title>모집 기간</_Title>
              <_Lay gap={10}>
                <_BlueText>시작일</_BlueText>
                <_Input
                  type={"date"}
                  value={dateState.startDate || ""}
                  onChange={(e) => ChangeDate("startDate", e.target.value)}
                  min={new Date().toISOString().substring(0, 10)}
                  key={"startDate"}
                />
                ~<_BlueText>마감일</_BlueText>
                <_Input
                  type={"date"}
                  value={dateState.endDate || ""}
                  onChange={(e) => ChangeDate("endDate", e.target.value)}
                  min={dateState.startDate}
                  key={"endDate"}
                />
              </_Lay>
              <_Line />
              <_Lay gap={20}>
                <_Title>전형절차</_Title>
                <MiniButton onClick={AddList}>추가</MiniButton>
              </_Lay>
              <_FlexWrap>
                <_BlueTextLay key={1}>1차전형</_BlueTextLay>
                <_BlackText>서류전형</_BlackText>
                {list.map((e, i) => (
                  <>
                    <_Lay gap={10} key={i + 2}>
                      <_BlueTextLay>{i + 2}차전형</_BlueTextLay>
                      <SelectPrime
                        list={data && data[0].data?.[4] ? data[0].data[4] : []}
                        onChange={(props) => ChangeList(props, i)}
                        write={e.meaning}
                        onClick={() => RemoveList(i)}
                      />
                    </_Lay>
                  </>
                ))}
              </_FlexWrap>
              <_Line />
              <_Title>제출양식</_Title>
              <FileManage
                multiple={true}
                accept={".pdf, .doc, .docx, .hwp"}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  AddFile(changeFileArray(e.target.files))
                }
                title={" "}
                list={file}
                onClick={RemoveFile}
              />
              <_Line />
              <_Lay gap={10}>
                <_Title>우대사항</_Title>
                <_BlueText>
                  *선택사항이므로 반드시 입력하지 않으셔도 괜찮습니다.
                </_BlueText>
              </_Lay>
              <TextArea
                onChange={(e) => ChangeSecond("otherFeatures", e.target.value)}
                placeholder={"우대사항을 입력해주세요."}
                defaultValue={number.otherFeatures}
              />
              <_Line />
              <_Title>근무지</_Title>
              <_Lay gap={30}>
                <BigCheck
                  text={"회사 주소와 동일"}
                  onChange={(e) =>
                    ChangeAddress("isSameWithCompanyAddress", e.target.checked)
                  }
                  type={"checkbox"}
                  checked={address.isSameWithCompanyAddress}
                  status={false}
                  id={"2"}
                />
                <BigCheck
                  text={"다른 주소"}
                  onChange={(e) =>
                    ChangeAddress("isSameWithCompanyAddress", !e.target.checked)
                  }
                  type={"checkbox"}
                  checked={!address.isSameWithCompanyAddress}
                  status={false}
                  id={"2"}
                />
                <_Address
                  type={"text"}
                  placeholder={
                    "클릭하신 후 팝업 창에 주소 입력 후 선택해주세요."
                  }
                  onClick={() => {
                    if (!address.isSameWithCompanyAddress) {
                      open({
                        onComplete: handleComplete,
                        width: 700,
                        height: 700,
                        left: 200,
                        animation: true,
                      });
                    }
                  }}
                  readOnly
                  value={address.otherPlace || ""}
                />
              </_Lay>
              <_Line />
              <_Submit>
                <button onClick={() => Submit()}>모집공고 수정</button>
              </_Submit>
            </_Layout>
          </>
        ) : (
          <>
            <Spinner />
          </>
        )}
        <Footer />
      </_BackGround>
    </>
  );
};

export default WriteNotice;
const _BackGround = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const _Flex = styled.div`
  display: flex;
`;
const _Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1136px;
`;
const _Title = styled.h2`
  width: max-content;
  font: 700 24px "Pretendard";
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
`;
const _Line = styled.div`
  width: 1136px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray};
  margin: 25px 0;
`;
const _SmallTitle = styled.div`
  font: 700 20px "Pretendard";
  color: ${({ theme }) => theme.colors.blue};
`;
const _QualifiLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const _FlexWrap = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  font: 500 16px "Pretendard";
  color: ${({ theme }) => theme.colors.black};
`;
const _LayoutDiv = styled(_QualifiLayout)`
  margin-top: 36px;
`;
const _Lay = styled.div<{ gap: number }>`
  display: flex;
  gap: ${({ gap }) => gap}px;
  font: 500 14px "Pretendard";
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
`;

const _BlueText = styled.div`
  font: 500 16px "Pretendard";
  color: ${({ theme }) => theme.colors.blue};
`;
const _BlueTextLay = styled(_BlueText)`
  height: 120px;
  line-height: 30px;
`;
const _BlackText = styled.div`
  font: 500 16px "Pretendard";
  color: ${({ theme }) => theme.colors.black};
  height: 120px;
  line-height: 30px;
`;
const _Input = styled.input`
  width: 150px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
`;
const _BokliLay = styled(_QualifiLayout)`
  margin-top: 20px;
`;
const _Address = styled.input`
  flex-grow: 1;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray};
  border: none;
  border-radius: 5px;
  font: 600 14px "Pretendard";
  color: ${(props) => props.theme.colors.black};
  padding: 16px;
  ::placeholder {
    color: ${(props) => props.theme.colors.black40};
  }
`;
const _Submit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 15px 0 40px 0;
    width: 150px;
    height: 30px;
    font: 700 normal 14px "pretendard", sans-serif;
    text-align: center;
    line-height: 25px;
    background-color: ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
    border-radius: 5px;
    border: none;
    :hover {
      filter: brightness(0.8);
    }
  }
`;
