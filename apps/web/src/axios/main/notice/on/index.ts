import { NoticeProps } from "./../index";
import request from "../..";

export const getOnList = async (idx: number) => {
  const data: NoticeProps = await request.get("/notice/list/on", {
    params: { idx, size: 11 },
  });
  console.log(data);
  return data;
};
