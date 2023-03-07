import { NoticeAction, NoticeState } from "../utils/interfaces";

export function noticeReducer(state: NoticeState, action: NoticeAction) {
  switch (action.type) {
    case "access":
      return {
        ...state,
        idx: state.idx + 1,
        totalPages: action.total,
        notice: [...(state.notice ?? []), ...action.notice]
      };
    default: 
      throw new Error("unHandle");
  }
}
