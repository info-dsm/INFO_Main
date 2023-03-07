import request from "../..";

export interface getCompanyList1Props {
  totalPages: number;
  totalElements: number;
  size: number;
  content: getCompanyList1ContentProps[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface getCompanyList1ContentProps {
  companyNumber: string;
  contactorEmail: string;
  companyName: string;
  homeAddressInfo: {
    fullAddress: string;
    addressNumber: string;
  };
  businessTagged: {
    name: string;
  }[];
  workerCount: number;
  annualSales: bigint;
  isLeading: boolean;
  isAssociated: boolean;
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

export const getCompanyList1 = async ({
  idx,
  size,
}: {
  idx: number;
  size: number;
}) => {
  const data: getCompanyList1Props = await request({
    method: "get",
    url: "/company/list",
    params: {
      idx: idx,
      size: size,
    },
  });
  console.log(data);
  return data;
};
