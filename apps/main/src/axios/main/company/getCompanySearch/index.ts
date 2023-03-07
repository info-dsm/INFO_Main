import request from "../..";
import { getCompanyList1Props } from "../getCompanyList copy";

export const getCompanySearch = async ({
  name,
  idx,
  size,
}: {
  name: string;
  idx: number;
  size: number;
}) => {
  const data: getCompanyList1Props = await request({
    method: "get",
    url: "/company/search",
    params: {
      name: name,
      idx: idx,
      size: size,
    },
  });
  console.log(data);
  return data;
};
