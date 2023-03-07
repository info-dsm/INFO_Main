import { NoticeCompanyDtoType } from "./data";
import request from "../..";

export const getCompanyNoticeEvery = async (companyNumber: string) => {
  const data: NoticeCompanyDtoType = await request.get(
    `/notice/list/every/${companyNumber}`
  );
  console.log(data);
  return data;
};
