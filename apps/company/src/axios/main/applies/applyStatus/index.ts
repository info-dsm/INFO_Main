import request from "../..";
import { reissue } from "../../auth/reissue";

export interface getSupportStatusProps {
  appliesId: string;
  applier: {
    email: string;
    name: string;
  };
  noticeId: string;
  status: "WAITING" | "APPROVE" | "REJECT";
  resumeList: {
    fileId: string;
    fileUrl: string;
    fileType: "IMAGE" | "DOCS" | "UNKNOWN";
    extension: string;
    fileName: string;
  }[];
}

export const getSupportStatus = async () => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("accessToken")) {
      const data = await request({
        method: "get",
        url: "/applies/student",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      return data;
    }
  }
  return [];
};
