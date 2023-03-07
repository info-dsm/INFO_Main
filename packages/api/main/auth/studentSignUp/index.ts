import requestApi from "../../token";

export const studentSignUp = async ({
  req,
}: {
  req: {
    email: string;
    password: string;
    emailCode: string;
    name: string;
    studentKey: string;
    githubLink: string;
    passwordCheck: string;
  };
}) => {
  await requestApi({
    method: "post",
    url: "/auth/signup/student",
    params: {
      emailCode: req.emailCode,
    },
    data: {
      studentKey: req.studentKey,
      name: req.name,
      email: req.email,
      password: req.password,
      githubLink: req.githubLink,
    },
  }).catch((err) => {
    console.log(err)
  })
};
