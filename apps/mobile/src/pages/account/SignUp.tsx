import { useIonAlert } from "@ionic/react"
import axios from "axios"
import { useReducer } from "react"
import { Icon2n } from "../../components/icons/Icon2n"
import { signUpReducer } from "../../modules/signUpReducer"
import { Accountfooter, EmailLabel, SignUpForm, SignUpFormTitle, SignUpPage, SubmitBtn } from "../../style/auth"

export const SignUp: React.FC = () => {
  const [preventAlert] = useIonAlert();
  const [event, updateEvent] = useReducer(signUpReducer, { 
    email: "", 
    code: "", 
    isSend: false,
    isVerify: false,
    name: "",
    studentKey: "",
    password: "", 
    password2: "", 
    github: "" 
  })

  async function emailSend(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    await axios.post(process.env.REACT_APP_BASE_URL + `/auth/code?email=${event.email}`)
      .then(() => {
        updateEvent({ type: "send" })
        preventAlert({
          header: "Success!",
          message: "정상적으로 처리되었습니다.",
          buttons: ['OK']
        })
      })
      .catch(() => {
        preventAlert({
          header: "Error!",
          message: "다시 시도 해주세요!",
          buttons: ['OK']
        })
      })
  }

  async function emailVerify(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await axios.post(process.env.REACT_APP_BASE_URL + "/auth/code", {
      email: event.email,
      data: event.code,
      type: "SIGNUP_EMAIL"
    })
      .then((response) => {
        if (!response.data)
          preventAlert({
            header: "Error!",
            message: "인증번호가 정확하지 않아요!",
            buttons: ['OK']
          });
        else {
          updateEvent({ type: "verify" })
          preventAlert({
            header: "Success!",
            message: "인증이 완료되었습니다.",
            buttons: ['OK']
          });
        }
      })
      .catch(() => {
        return preventAlert({
          header: "Error!",
          message: "다시 시도 해주세요!",
          buttons: ['OK']
        });
      })
  }

  async function signUpSubmit() {
    if (!event.isVerify) return preventAlert({
      header: "Error!",
      message: "이메일 인증을 해주세요.",
      buttons: ['OK']
    }) 
    else if (!event.name) return preventAlert({
      header: "Error!",
      message: "이름을 작성 해주세요.",
      buttons: ['OK']
    })
    else if (event.password !== event.password2) return preventAlert({
      header: "Error!",
      message: "비밀번호가 일치하지 않습니다.",
      buttons: ['OK']
    })
    else if (!event.studentKey) return preventAlert({
      header: "Error!",
      message: "학번을 작성 해주세요.",
      buttons: ['OK']
    })
    else {
      await axios.post(process.env.REACT_APP_BASE_URL + `/auth/signup/student?emailCode=${event.code}`, {
        studentKey: event.studentKey,
        name: event.name,
        email: event.email,
        password: event.password,
        githubLink: event.github
      })
        .then(() => {
          window.location.href = "/"
        })
        .catch(() => {
          preventAlert({
            header: "Error!",
            message: "다시 시도 해주세요!",
            buttons: ['OK']
          })
        })
    }
  }

  return (
    <SignUpPage>
      <SignUpForm onSubmit={signUpSubmit}>
        <Icon2n />
        <SignUpFormTitle >학생 회원가입</SignUpFormTitle>
        <p>이메일</p>
        <EmailLabel disable={event.isSend}>
          <input style={{ borderRadius: "10px 0 0 10px" }} required type={"email"} placeholder="이메일을 입력해주세요" value={event.email} onChange={(e) => updateEvent({ type: "email", email: e.target.value })} />
          <button onClick={(e) => emailSend(e)}>인증번호 발송</button>
        </EmailLabel>
        <EmailLabel disable={!event.isSend}>
          {event.isSend ? 
            <>
              <input style={{ borderRadius: "10px 0 0 10px" }} type={"text"} placeholder="인증번호를 입력해주세요." value={event.code} onChange={(e) => updateEvent({ type: "code", code: e.target.value })} />
              <button onClick={(e) => emailVerify(e)}>인증번호 확인</button>
            </>
          :
            <>
              <input style={{ borderRadius: "10px 0 0 10px" }} type={"text"} placeholder="인증번호를 입력해주세요." disabled />
              <button disabled>인증번호 확인</button>
            </>
          }
        </EmailLabel>
        <p>이름 · 학번</p>
        <input type={"text"} placeholder="이름을 입력해주세요" onChange={(e) => updateEvent({ type: "name", name: e.target.value })} />
        <input type={"text"} placeholder="학번을 입력해주세요" onChange={(e) => updateEvent({ type: "studentKey", studentKey: e.target.value })} />
        <p>비밀번호</p>
        <input type={"password"} onChange={(e) => updateEvent({ type: "password", password: e.target.value })} placeholder="비밀번호를 입력해주세요" />
        <input type={"password"} onChange={(e) => updateEvent({ type: "password2", password: e.target.value })} placeholder="비밀번호를 재입력 입력해주세요" />
        <p>깃허브 주소</p>
        <input type={"url"} onChange={(e) => updateEvent({ type: "github", github: e.target.value })} placeholder="깃허브 주소를 입력해주세요" />
        <SubmitBtn type={"submit"} value="회원가입" />
        <Accountfooter>
          기존 회원이신가요?&nbsp;
          <a href="/account/login">로그인</a>
        </Accountfooter>
      </SignUpForm>
    </SignUpPage>
  )
}
