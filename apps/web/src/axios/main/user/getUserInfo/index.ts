import Cookies from 'js-cookie';
import  cookie  from 'js-cookie';
import request from "../..";
import { reissue } from "../../auth/reissue";

export interface getUserInfoProps {
  name: string;
  email: string;
}

export const getUserInfo = async () => {
  if (typeof window !== "undefined") {
    if (cookie.get("accessToken")) {
      const data = reissue().then(async () => {
        return await request({
          method: "get",
          url: "/user/info",
          headers: {
            Authorization: `Bearer ${cookie.get("accessToken")}`,
          },
        });
      });
      return data;
    }
  }
  return {
    name: "",
    email: "",
  };
};
