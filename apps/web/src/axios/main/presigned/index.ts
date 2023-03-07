import axios from "axios";

export const presigned = async (url: string, file: File) => {
  await axios({
    method: "put",
    url,
    data: file,
    headers: {
      Accept: file.type,
      "Content-Type": file.type,
    },
  });
};
