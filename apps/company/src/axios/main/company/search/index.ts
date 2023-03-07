import request from "../..";
import { getCompanyListProps } from "../getCompanyList";
export const getSearchCompany = async (name: string, idx: number) => {
  const data: getCompanyListProps = await request.get("/company/search", {
    params: { name, idx, size: 11 },
  });
  console.log(data);
  return data;
};
