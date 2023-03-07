import request from "../..";

export const teacherSignUp = async (
  emailCode: string,
  teacherCode: string,
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  await request({
    method: "post",
    url: "/auth/signup/teacher",
    params: {
      emailCode,
      teacherCode,
    },
    data,
  });
};
