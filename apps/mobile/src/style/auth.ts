import styled, { keyframes } from "styled-components"

export const LoginPage = styled.div `
  background-color: #6750F8;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  color: white;
  z-index: 9999;
`

export const LoginIcon1xDiv = styled.div `
  margin: 104px auto 109px auto;
  text-align: center;
`

const auth = keyframes `
  from {
    top: 700px;
  }

  to {
    top: 0px;
  }
`

export const Auth = styled.div `
  position: relative;
  top: 700px;
  border-radius: 30px 30px 0px 0px;
  width: 100%;
  height: 75%;
  background-color: white;
  padding: 40px;
  overflow-y:scroll;
  color: black;
  animation: ${auth} .47s forwards;

  h1 {
    font-weight: 800;
    font-size: 26px;
    line-height: 31px;
    margin: 0;
    margin-top: 6px;
  }
`

export const LoginForm = styled.form `
  margin-top: 78px;
  
  p {
    font-size: 13.5px;
    font-weight: 600;
    line-height: 12px;
    color: rgba(95, 95, 95, 1);
    margin-top: 24px;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="password"] {
    background-color: #EAEAEA;
    width: 100%;
    height: 36px;
    border-radius: 10px;
    border: 0;
    padding: 22px 15px;

    font-weight: 500;
    font-size: 12px;
    line-height: 11px;
  }
`

export const SubmitBtn = styled.input `
  background-color: #6750F8;
  border-radius: 10px;
  border: 0;
  color: white;
  width: 100%;
  height: 44px;
  margin-top: 48px;
  margin-bottom: 6px;
`

export const Accountfooter = styled.div `
  margin-top: 8px;
  text-align: center;
  color: #343A40;
  font-size: 12px;
  font-weight: 500;
  line-height: 11px;

  a {
    color: #6750F8;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
`

export const SignUpPage = styled.div `
  background-color: #fff; 
  width: 100vw;
  height: 100vh;
  overflow: auto;
`

export const SignUpForm = styled.form `
  color: #000;
  padding: 52px 42px;

  p {
    font-size: 13px;
    font-weight: 600;
    line-height: 12px;
    color: #5F5F5F;
    margin-top: 36px;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="url"] {
    background-color: #EAEAEA;
    width: 100%;
    height: 36px;
    border-radius: 10px;
    border: 0;
    padding: 22px 15px;

    font-weight: 500;
    font-size: 12px;
    line-height: 11px;
    margin-bottom: 8px;
  }
`

export const EmailLabel = styled.label `
  display: flex;

  input[type="text"],
  input[type="password"],
  input[type="email"] {
    background-color: ${(props: { disable: boolean }) => (props.disable ? "#D0D0D0" : "#EAEAEA")};
    width: 100%;
    height: 36px;
    border-radius: 10px;
    border: 0;
    padding: 22px 15px;

    font-weight: 500;
    font-size: 12px;
    line-height: 11px;
    margin-bottom: 8px;
  }

  button {
    width: 140px;
    height: 44px;
    text-align: center;
    border-radius: 0px 10px 10px 0px;
    padding: 13px 12px 13px 12px;
    background-color: ${(props: { disable: boolean }) => (props.disable ? "#D0D0D0" : "#EAEAEA")};
    color: rgba(103, 80, 248, 1);
    font-weight: 500;
    font-size: 11px;
    line-height: 10px;
  }
`

export const SignUpFormTitle = styled.h1 `
  font-weight: 800;
  font-size: 26px;
  line-height: 31px;
  color: #343A40;
  margin-top: 10px;
`
