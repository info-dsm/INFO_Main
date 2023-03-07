import request from "../..";
export interface loginProps {
  accessToken: string;
  refreshToken: "string";
}
export const login = async (
  data: { company?: string; email?: string; password: string },
  endpoint: string
) => {
  const res: loginProps = await request({
    method: "post",
    url: `/auth/login/${endpoint}`,
    data,
  });
  return res;
};
