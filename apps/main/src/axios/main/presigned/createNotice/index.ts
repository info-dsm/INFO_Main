import axios from "axios";
import { createNoticeProps, presigned } from "../../../dist";

export const createNoticeFile = async (
  data: createNoticeProps,
  files: File[]
) => {
  await axios.all([
    data.response.map((data, i) => presigned(data.url, files[i])),
  ]);
};
