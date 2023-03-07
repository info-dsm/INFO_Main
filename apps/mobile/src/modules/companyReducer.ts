import { CompanyState, CompanyAction } from "../utils/interfaces";

export function companyReducer(state: CompanyState, action: CompanyAction) {
  switch(action.type) {
    case "access":
      return {
        ...state,
        idx: state.idx + 1,
        totalPages: action.total,
        company: [...(state.company ?? []), ...action.company]
      }
    default: 
      throw new Error("unHandle")
  }
}
