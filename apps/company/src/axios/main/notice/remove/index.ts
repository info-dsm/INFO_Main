import axios from "axios";
import request from "../..";

export const deleteNoRemainNotice = async (
  props: {
    noticeId: string;
    companyNumber: string;
  }[]
) => {
  return await axios.all(
    props.map((el) =>
      request.delete(`/notice/${el.companyNumber}/${el.noticeId}`)
    )
  );
};
