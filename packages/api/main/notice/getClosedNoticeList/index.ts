import requestApi from "../../token";

export interface getClosedNoticeListContentProps {
  noticeId: string;
  company: {
    companyNumber: string;
    companyName: string;
    imageList: string[];
  };
  classificationResponse: {
    bigClassification: {
      bigClassificationName: string;
    };
    name: string;
  }[];
  detailBusinessDescription: string;
  numberOfEmployee: number;
  gradeCutLine: number;
  applicantCount: number;
  isPersonalContact: boolean;
  noticeOpenPeriod: {
    startDate: string;
    endDate: string;
  };
}

export interface getClosedNoticeListProps {
  content: getClosedNoticeListContentProps[];

  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  number: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export const getClosedNoticeList = async ({
  idx,
  size,
  status,
}: {
  idx: number;
  size: number;
  status: "APPROVE" | "WAITING";
}) => {
  const data: getClosedNoticeListProps = await requestApi({
    method: "get",
    url: "/notice/list/end",
    params: {
      idx: idx,
      size: size,
      status: status,
    },
  });

  return data;
};
