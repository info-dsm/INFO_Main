import request from "../../";

export const codeSend = async ({ email }: { email: string }) => {
  await request({
    method: "PUT",
    url: "/auth/code",
    params: {
      email: email,
    },
  }).catch((err) => {
    console.log(err);
  });
};
