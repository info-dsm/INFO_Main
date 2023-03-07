import request from "../..";
export type TagProps = { id: string }[];
export const getBusiness = async () => {
  const data: TagProps = await request.get("/company/business-area");
  console.log(data);
  return data;
};
