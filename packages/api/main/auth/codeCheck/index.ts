import requestApi from "../../token";

export const codeCheck = async ({
  email,
  data,
  type,
}: {
  email: string;
  data: string;
  type:
    | "SIGNUP_EMAIL"
    | "CHANGE_EMAIL"
    | "CHANGE_PASSWORD"
    | "TEACHER"
    | "REFRESH";
}) => {
  await requestApi({
    method: "POST",
    url: "/auth/code",
    data: {
      email: email,
      data: data,
      type: type,
    },
  }).catch((err) => {
    console.log(err);
  });
};
