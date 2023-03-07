import requestApi from "../../token";
import { getCompanyListProps } from "../getCompanyList";

export const getCompanySearch = async ({
  name,
  idx,
  size,
}: {
  name: string;
  idx: number;
  size: number;
}) => {
  const data: getCompanyListProps = await requestApi({
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
