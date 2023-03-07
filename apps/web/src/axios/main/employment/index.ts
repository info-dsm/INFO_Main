import request from "..";
export interface getEmployProps {
  data: {
    id: string;
    notice: {
      noticeId: string;
    };
    student: {
      studentEmail: string;
      name: string;
      generation: number;
    };
    company: {
      companyNumber: string;
    };
    contactor: {
      contactorEmail: string;
    };
  }[];
}

export const getEmployList = async (email: string) => {
  const data: getEmployProps = await request.get("/employ", {
    params: { email },
  });
  return data;
};
