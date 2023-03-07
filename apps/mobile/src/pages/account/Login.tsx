import { useIonAlert } from '@ionic/react'
import axios from 'axios'
import { useReducer } from 'react'
import { Icon1n } from '../../components/icons/Icon1n'
import { Icon2n } from '../../components/icons/Icon2n'
import { loginReducer } from '../../modules/loginReducer'
import { Accountfooter, Auth, LoginForm, LoginIcon1xDiv, LoginPage, SubmitBtn } from '../../style/auth'
import { setCookie } from '../../utils/cookies'

export const Login: React.FC = () => {
  const [preventAlert] = useIonAlert();
  const [event, updateEvent] = useReducer(loginReducer, {
    email: '', password: ''
  })

  async function loginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!event.email) return preventAlert({
      header: 'Error!',
      message: '이메일을 입력 해주세요.',
      buttons: ['OK']
    })
    else if (!event.password) return preventAlert({
      header: 'Error!',
      message: '비밀번호를 입력 해주세요.',
      buttons: ['OK']
    })
    else {
      await axios(process.env.REACT_APP_BASE_URL + '/auth/login/user', {
        method: 'POST',
        data: {
          email: event.email,
          password: event.password
        }
      })
        .then((res) => {
          setCookie('dsmAccessToken', res.data.accessToken, { path: '/' })
          setCookie('dsmRefreshToken', res.data.refreshToken, { path: '/' })
        })
        .catch(() => {
          preventAlert({
            header: 'Error!',
            message: '다시 시도 해주세요!',
            buttons: ['OK']
          })
        })
    }
  }

  return (
    <LoginPage>
      <LoginIcon1xDiv>
        <Icon1n />
      </LoginIcon1xDiv>
      <Auth>
        <Icon2n />
        <h1>학생 로그인</h1>
        <LoginForm onSubmit={loginSubmit}>
          <p>이메일</p>
          <input type={'text'} required placeholder={'이메일을 입력해주세요'} onChange={(e) => updateEvent({ type: 'email', email: e.target.value })} />
          <p>비밀번호</p>
          <input type={'password'} required placeholder={'비밀번호를 입력해주세요'} onChange={(e) => updateEvent({ type: 'password', password: e.target.value })} />
          <SubmitBtn type={'submit'} value={'로그인'} />
          <Accountfooter>
            비밀번호를 잊어버리셨나요? &nbsp;
            <a href='/'>비밀번호 찾기</a>
          </Accountfooter>
          <Accountfooter>
            info가 처음이신가요? &nbsp;
            <a href='/account/signup'>회원가입</a>
          </Accountfooter>
        </LoginForm>
      </Auth>
    </LoginPage>
  )
}
