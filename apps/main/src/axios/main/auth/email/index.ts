import request from "../../index";
export const sendNumber = (email: string) => {
  const data = request({
    method: "put",
    url: "/auth/code",
    params: { email },
  });
  return data;
};
export const confirmCode = (email: string, data: string, type: string) => {
  const res = request({
    method: "post",
    url: "/auth/code",
    data: {
      email,
      data,
      type,
    },
  });
  return res;
};
