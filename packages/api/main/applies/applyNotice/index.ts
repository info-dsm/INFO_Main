import { reissue } from "../../auth/reissue";
import requestApi from "../../token";

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
    if (sessionStorage.getItem("accessToken")) {
      const data = await requestApi({
        method: "POST",
        url: `/applies/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: formData,
      });

      return data;
    }
  }
};
