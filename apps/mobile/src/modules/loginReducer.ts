import { LoginAction, LoginState } from "../utils/interfaces";

export function loginReducer(state: LoginState ,action: LoginAction) {
  switch(action.type) {
    case "email":
      return {
        ...state,
        email: action.email
      }
    case "password":
      return {
        ...state,
        password: action.password
      }
    default: 
      throw new Error("unHandle")
  }
}
