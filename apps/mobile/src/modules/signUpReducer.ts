import { SignUpAction, SignUpState } from "../utils/interfaces";

export function signUpReducer(state: SignUpState, action: SignUpAction) {
  switch(action.type) {
    case "email":
      return {
        ...state,
        email: action.email
      };
    case "send":
      return {
        ...state,
        isSend: true
      };
    case "verify":
      return {
        ...state,
        isVerify: true
      }
    case "code":
      return {
        ...state,
        code: action.code
      };
    case "name":
      return {
        ...state,
        name: action.name
      };
    case "studentKey":
      return {
        ...state,
        studentKey: action.studentKey
      }
    case "password":
      return {
        ...state,
        password: action.password
      };
    case "password2":
      return {
        ...state,
        password2: action.password
      };
    case "github":
      return {
        ...state,
        github: action.github
      };
    default: 
      throw new Error("unHandle")
  }
}
