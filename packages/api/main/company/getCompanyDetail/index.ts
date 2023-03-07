import requestApi from "../../token";

export interface getCompanyDetailProps {
  companyNumber: string;
  companyName: string;
  contactor: {
    name: string;
    email: string;
    rank: string;
    phoneNumber?: string;
    passwordHint?: string;
    companyNumber: string;
  };
  companyInformation: {
    homeAddress?: {
      fullAddress: string;
      addressNumber: string;
    };
    agentAddress?: {
      fullAddress: string;
      addressNumber: string;
    };
    representativeName: string;
    establishedAt: number;
    workerCount: number;
    annualSales: number;
    companyPhone: string;
  };
  businessTagged: {
    id: string;
  }[];
  isLeading: true;
  isAssociated: true;
  latestNoticeYear?: number;
  totalEmployedCount: number;
  companyIntroductionResponse: {
    introduction: string;
    businessCertificate: {
      fileId: string;
      fileUrl: string;
      fileType: "IMAGE" | "DOCS" | "UNKNOWN";
      extension: string;
      fileName: string;
      companyNumber: string;
      companyFileClassificationType:
        | "BUSINESS_CERTIFICATE"
        | "COMPANY_INTRODUCTION"
        | "COMPANY_LOGO"
        | "COMPANY_PHOTO";
    };
    companyIntroductionFile: {
      fileId: string;
      fileUrl: string;
      fileType: "IMAGE" | "DOCS" | "UNKNOWN";
      extension: string;
      fileName: string;
      companyNumber: string;
      companyFileClassificationType:
        | "BUSINESS_CERTIFICATE"
        | "COMPANY_INTRODUCTION"
        | "COMPANY_LOGO"
        | "COMPANY_PHOTO";
    }[];
    companyLogo: {
      fileId: string;
      fileUrl: string;
      fileType: "IMAGE" | "DOCS" | "UNKNOWN";
      extension: string;
      fileName: string;
      companyNumber: string;
      companyFileClassificationType:
        | "BUSINESS_CERTIFICATE"
        | "COMPANY_INTRODUCTION"
        | "COMPANY_LOGO"
        | "COMPANY_PHOTO";
    };
    companyPhotoList: {
      fileId: string;
      fileUrl: string;
      fileType: "IMAGE" | "DOCS" | "UNKNOWN";
      extension: string;
      fileName: string;
      companyNumber: string;
      companyFileClassificationType:
        | "BUSINESS_CERTIFICATE"
        | "COMPANY_INTRODUCTION"
        | "COMPANY_LOGO"
        | "COMPANY_PHOTO";
    }[];
  };
}

export const getCompanyDetail = async ({ id }: { id: string }) => {
  const data: getCompanyDetailProps = await requestApi({
    method: "GET",
    url: `/company/${id}`,
  });

  return data;
};
