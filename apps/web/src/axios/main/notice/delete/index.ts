import request from "../..";
import axios from "axios";
export const deleteNotice = async (
  props: {
    noticeId: string;
    companyNumber: string;
  }[]
) => {
  return await axios.all(
    props.map((el) =>
      request.delete(`/notice/${el.companyNumber}/${el.noticeId}/conclude`)
    )
  );
};
