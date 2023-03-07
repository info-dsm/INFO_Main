import cookie from "js-cookie";
import request from "../../";

export const reissue = async () => {
  const res: { accessToken: string; refreshToken: string } = await request.put(
    "/auth/reissue",
    {
      accessToken: cookie.get("accessToken"),
      refreshToken: cookie.get("refreshToken"),
    }
  );
  console.log(res, "fltmdldp리승버야메");
  request.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${res.accessToken}`;
  cookie.set("accessToken", res.accessToken, { expires: 7 });
  cookie.set("refreshToken", res.refreshToken, { expires: 7 });
};
