import request from "../..";

export interface getWaitingNoticeListContentProps {
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

export interface getWaitingNoticeListProps {
  content: getWaitingNoticeListContentProps[];
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

export const getWaitingNoticeList = async ({
  idx,
  size,
}: {
  idx: number;
  size: number;
}) => {
  const data: getWaitingNoticeListProps = await request({
    method: "get",
    url: "/notice/list/on",
    params: {
      idx: idx,
      size: size,
    },
  });
  return data;
};
