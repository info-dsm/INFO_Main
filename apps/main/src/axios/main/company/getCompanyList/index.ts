import request from "../../";
export interface getCompanyListProps {
  totalPages: number;
  totalElements: number;
  size: number;
  content: {
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
        fileType: string;
        extension: string;
        fileName: string;
        companyNumber: string;
        companyFileClassificationType: string;
      };
      companyIntroductionFile: {
        fileId: string;
        fileUrl: string;
        fileType: string;
        extension: string;
        fileName: string;
        companyNumber: string;
        companyFileClassificationType: string;
      }[];
      companyLogo: {
        fileId: string;
        fileUrl: string;
        fileType: string;
        extension: string;
        fileName: string;
        companyNumber: string;
        companyFileClassificationType: string;
      };
      companyPhotoList: {
        fileId: string;
        fileUrl: string;
        fileType: string;
        extension: string;
        fileName: string;
        companyNumber: string;
        companyFileClassificationType: string;
      }[];
    };
  }[];
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
export const getCompanyList = async (idx: number) => {
  const data: getCompanyListProps = await request({
    method: "get",
    url: "/company/list",
    params: {
      idx: idx,
      size: 11,
    },
  });
  console.log(data);
  return data;
};
