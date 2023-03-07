import request from "../..";
import { getCompanyListProps } from "../getCompanyList";
export const getYearCompany = async (name: string, idx: number) => {
  const data: getCompanyListProps = await request.get(`/company/list/${name}`, {
    params: { idx, size: 11 },
  });
  console.log(data);
  return data;
};
