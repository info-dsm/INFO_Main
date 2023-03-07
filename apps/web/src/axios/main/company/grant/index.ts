import request from "../..";
import axios from "axios";
export const companyAssosiate = async (
  companyNumber: string[],
  grant: "associate" | "leading"
) => {
  return companyNumber.length === 0
    ? window.alert("선택된 값이 없습니다.")
    : await axios.all(
        companyNumber.map((num: string) =>
          request.post(`/company/${grant}/${num}`)
        )
      );
};
