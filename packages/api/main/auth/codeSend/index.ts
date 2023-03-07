import requestApi from "../../token";

export const codeSend = async ({ email }: { email: string }) => {
  await requestApi({
    method: "PUT",
    url: "/auth/code",
    params: {
      email: email,
    },
  }).catch((err) => {
    console.log(err);
  });
};
