import axios from "axios";
import request from "../..";

export const postAcceptNotice = async (
  props: {
    noticeId: string;
    companyNumber: string;
  }[]
) => {
  return await axios.all(
    props.map((el) =>
      request.post(`/notice/${el.companyNumber}/${el.noticeId}`)
    )
  );
};
