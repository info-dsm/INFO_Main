import request from "../../";

export const reissue = async () => {
  await request({
    method: "put",
    url: "/auth/reissue",
    data: {
      accessToken: `${sessionStorage.getItem("accessToken")}`,
      refreshToken: `${sessionStorage.getItem("refreshToken")}`,
    },
  }).then((res: any) => {
    sessionStorage.setItem("accessToken", res.accessToken);
    sessionStorage.setItem("refreshToken", res.refreshToken);
  });
};
