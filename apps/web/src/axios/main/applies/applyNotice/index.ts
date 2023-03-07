import { reissue } from "../../auth/reissue";
import request from "../..";
import cookie from "js-cookie";

export const applyNotice = async ({
  id,
  formData,
}: {
  formData: {
    fileName: string;
    contentType: string;
  };
  id: string;
}) => {
  if (typeof window !== "undefined") {
    if (cookie.get("accessToken")) {
      const data: { url: string; fileName: string } = await request({
        method: "POST",
        url: `/applies/${id}`,
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
        data: formData,
      });

      return data;
    }
  }
};
