import { NoticeProps } from "./../index";
import request from "../..";

export const getWaitList = async (idx: number) => {
  const data: NoticeProps = await request.get("/notice/waiting-list", {
    params: { idx, size: 11 },
  });
  console.log(data);
  return data;
};
