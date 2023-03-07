import requestApi from "../../token";
import { reissue } from "../../auth/reissue";

export interface getUserInfoProps {
  name: string;
  email: string;
}

export const getUserInfo = async () => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("accessToken")) {
      const data = reissue().then(async () => {
        return await requestApi({
          method: "get",
          url: "/user/info",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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
