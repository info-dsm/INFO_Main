import request from "../..";
import { createNoticeProps } from "../../notice/create";
type contactProps =
  | "contactorName"
  | "contactorRank"
  | "contactorPhone"
  | "email"
  | "password"
  | "passwordHint";
export interface companySignUpProps {}
export const companySignUp = async (
  emailCheckCode: string,
  companyInformation: {
    homeAddress: {
      fullAddress: string;
      addressNumber: string;
    };
    agentAddress: {
      fullAddress: string;
      addressNumber: string;
    };
    representativeName: string;
    establishedAt: string;
    workerCount: string;
    annualSales: string;
    companyPhone: string;
  },
  companyContact: {
    [key in contactProps]: string;
  },
  others: {
    companyNumber: string;
    companyNameRequest: {
      companyName: string;
    };
    businessAreaList: string[];
    introduction: string;
  },
  photos: {
    businessRegisteredCertificate: {
      fileName: string;
      contentType: string;
    };
    companyIntroductionFile: {
      request: {
        fileName: string;
        contentType: string;
      }[];
    };
    companyLogo: {
      fileName: string;
      contentType: string;
    };
    companyPhotoList: {
      request: {
        fileName: string;
        contentType: string;
      }[];
    };
  }
) => {
  const data: createNoticeProps = await request({
    method: "post",
    url: "company/signup",
    params: {
      emailCheckCode,
    },
    data: {
      companyInformation,
      companyContact,
      ...others,
      ...photos,
    },
  });
  console.log(data);
  return data;
};
