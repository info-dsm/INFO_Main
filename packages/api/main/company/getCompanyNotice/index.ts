import { getWaitingNoticeListContentProps } from "apis";
import requestApi from "../../token";

export const getCompanyNotice = async ({ id }: { id: string }) => {
  const data: getWaitingNoticeListContentProps[] = await requestApi({
    method: "GET",
    url: `/notice/list/${id}`,
  });

  return data;
};
