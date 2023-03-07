import router from "next/router";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  AuthorizationInput,
  FileManage,
  InputText,
  ModalCompany,
  Password,
  SmallInput,
  Success,
} from "ui";
import { firstSignUpData, secondSignUpData } from "../../atom";
import {
  companySignUp,
  confirmCode,
  createNoticeFile,
  sendNumber,
} from "../../axios/dist";
import menu from "../../data/logindata/company";
import Background from "../../lib/components/Background";
type fileProps = "business" | "logo" | "photo" | "introduce";
type contactProps =
  | "contactorName"
  | "contactorRank"
  | "contactorPhone"
  | "email"
  | "password"
  | "passwordHint";
const LastSignUpPage = () => {
  const first = useRecoilValue(firstSignUpData);
  const second = useRecoilValue(secondSignUpData);
  const [companyContact, setCompanyContact] = useState<
    {
      [key in contactProps]: string;
    }
  >({
    contactorName: "",
    contactorRank: "",
    contactorPhone: "",
    email: "",
    password: "",
    passwordHint: "",
  });
  const [code, setCode] = useState<string>("");
  const [success, setSuccess] = useState<{
    email: boolean;
    name: boolean;
    password: boolean;
  }>({
    email: false,
    name: false,
    password: false,
  });
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
  const [file, setFile] = useState<
    {
      [key in fileProps]: (File | null)[] | null;
    }
  >({
    business: [],
    logo: [],
    photo: [],
    introduce: [],
  });
  const ChangeContact = useCallback(
    (props: contactProps, e: string) => {
      setCompanyContact({ ...companyContact, [props]: e });
    },
    [companyContact]
  );
  const OccuerSucces = useCallback(
    (type: "email" | "name" | "password") => {
      setSuccess({ ...success, [type]: true });
    },
    [success, setSuccess]
  );
  const RemoveFile = useCallback(
    (index: number, props: fileProps) => {
      setFile({ ...file, [props]: file[props]?.filter((e, i) => i !== index) });
    },
    [file]
  );
  const AddFile = useCallback(
    (props: fileProps, e: (File | null)[] | null, multi: boolean) => {
      if (e) {
        if (multi) {
          setFile({
            ...file,
            [props]: [...e, ...(file[props] as File[] | [])],
          });
          console.log(file);
        } else {
          setFile({ ...file, [props]: e });
          console.log(file);
        }
      }
    },
    [file]
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
  const changeFileArray = (fileLists: FileList | null) => {
    if (fileLists) {
      const files: (File | null)[] = [];
      for (let i = 0; i < fileLists.length; i++) {
        files.push(fileLists.item(i));
      }
      return files;
    } else return null;
  };
  const OccurError = useCallback(
    (comment: string, type: string) => {
      setError({ ...error, [type]: { error: true, comment } });
    },
    [error, setError]
  );
  const EmailRequest = () => {
    sendNumber(companyContact.email)
      .then(() => window.alert("전송되었습니다."))
      .catch(() => OccurError("중복된 이메일입니다.", "email"));
  };
  const CodeRequest = () => {
    confirmCode(companyContact.email, code, "SIGNUP_EMAIL")
      .then(() => {
        OccuerSucces("email");
      })
      .catch(() => OccurError("잘못된 인증코드입니다.", "code"));
  };
  const SubmitRequest = () => {
    if (
      file.business !== null &&
      file.introduce !== null &&
      file.logo !== null &&
      file.photo !== null
    ) {
      const companyPhotoList = file.photo.map((e: File | null) => {
        if (e !== null) {
          return { fileName: e.name as string, contentType: e.type as string };
        }
      });
      const companyIntroductionFile = file.introduce.map((e: File | null) => {
        if (e !== null) {
          return { fileName: e.name as string, contentType: e.type as string };
        }
      });
      companySignUp(code, second, companyContact, first, {
        businessRegisteredCertificate: {
          fileName: file.business[0]?.name as string,
          contentType: file.business[0]?.type as string,
        },
        companyIntroductionFile: {
          request: companyIntroductionFile as {
            fileName: string;
            contentType: string;
          }[],
        },
        companyLogo: {
          fileName: file.logo[0]?.name as string,
          contentType: file.logo[0]?.type as string,
        },
        companyPhotoList: {
          request: companyPhotoList as {
            fileName: string;
            contentType: string;
          }[],
        },
      }).then((res) => {
        createNoticeFile(res, [
          ...(file.business as File[]),
          ...(file.introduce as File[]),
          ...(file.logo as File[]),
          ...(file.photo as File[]),
        ]);
      });
    }
  };
  return (
    <>
      <>
        <Background {...menu} />
        <ModalCompany
          top={{
            text: "기존 회원이신가요?",
            direct: "로그인",
          }}
          href={() => router.push("/company/login")}
          confirm={"회원가입"}
          move={() => router.back()}
          onSubmit={() => SubmitRequest()}
          count={3}
        >
          <_Layout>
            <_Interval gap={12}>
              <FileManage
                multiple={false}
                accept={".pdf, .doc, .docx, .hwp"}
                onChange={(e) => {
                  AddFile("business", changeFileArray(e.target.files), false);
                }}
                title={"사업자 등록증"}
                list={file.business}
                onClick={(i) => RemoveFile(i, "business")}
              />
              <FileManage
                multiple={true}
                accept={".pdf, .doc, .docx, .hwp"}
                onChange={(e) => {
                  AddFile("introduce", changeFileArray(e.target.files), true);
                }}
                title={"기업 소개 파일"}
                list={file.introduce}
                onClick={(i) => RemoveFile(i, "introduce")}
              />
              <FileManage
                multiple={false}
                accept={"image/jpeg, image/png"}
                onChange={(e) => {
                  AddFile("logo", changeFileArray(e.target.files), false);
                }}
                title={"기업 로고"}
                list={file.logo}
                onClick={(i) => RemoveFile(i, "logo")}
              />
              <FileManage
                multiple={true}
                accept={"image/jpeg, image/png"}
                onChange={(e) => {
                  AddFile("photo", changeFileArray(e.target.files), true);
                }}
                title={"기업 사진 목록"}
                list={file.photo}
                onClick={(i) => RemoveFile(i, "photo")}
              />

              <_Flex>
                <SmallInput
                  onChange={(e) => {
                    ChangeContact("contactorName", e.target.value);
                  }}
                  text={"담당자"}
                  value={companyContact.contactorName}
                  placeholder={"담당자 명을 입력해주세요."}
                />
                <SmallInput
                  onChange={(e) => {
                    ChangeContact("contactorRank", e.target.value);
                  }}
                  text={"소속부서"}
                  value={companyContact.contactorRank}
                  placeholder={"소속부서를 입력해주세요."}
                />
              </_Flex>
              <InputText
                placeholder={
                  "(선택) 담당자 전화번호를 입력해주세요.  ex) xxx-xxxx-xxxx"
                }
                {...{ error: false }}
                onInput={(e) => {
                  ChangeContact("contactorPhone", e.target.value);
                }}
                onFocus={() => {}}
                defaultValue={companyContact.contactorPhone}
              />
              <Success text={"이메일 인증"} success={success.email} />
              <_Interval gap={10}>
                <AuthorizationInput
                  placeholder={"이메일을 입력해주세요."}
                  {...error.email}
                  onInput={(e) => ChangeContact("email", e.target.value)}
                  onFocus={() => ClearError("email")}
                  onClick={() => EmailRequest()}
                  value={companyContact.email}
                  aut={"안증번호 발송"}
                />
                <AuthorizationInput
                  placeholder={"인증번호 입력해주세요."}
                  {...error.code}
                  onInput={(e) => setCode(e.target.value)}
                  onFocus={() => {
                    ClearError("code");
                  }}
                  onClick={() => CodeRequest()}
                  value={code}
                  aut={"안증번호 확인"}
                />
              </_Interval>
              <Password
                placeholder={"비밀번호를 입력해주세요."}
                {...{ error: false }}
                onInput={(e) => ChangeContact("password", e.target.value)}
                onFocus={() => {}}
                defaultValue={companyContact.password}
              />
              <InputText
                placeholder={"비밀번호 힌트를 입력해주세요."}
                {...{ error: false }}
                onInput={(e) => ChangeContact("passwordHint", e.target.value)}
                onFocus={() => {}}
                defaultValue={companyContact.passwordHint}
              />
            </_Interval>
          </_Layout>
        </ModalCompany>
      </>
    </>
  );
};
export default LastSignUpPage;
const _Layout = styled.div`
  margin-top: 16px;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 26px;
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
