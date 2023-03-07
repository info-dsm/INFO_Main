export interface NoticeProps {
  content: {
    noticeId: string;
    company: {
      companyNumber: string;
      companyName: string;
    };
    classificationResponse: {
      bigClassification: {
        bigClassificationName: string;
      };
      name: string;
    }[];
    numberdetailBusinessDescription: string;
    numberOfEmployee: number;
    gradeCutLine: number;
    applicantCount: number;
    isPersonalContact: boolean;
    noticeOpenPeriod: {
      startDate: string;
      endDate: string;
    };
    approveStatus?: "WAITING" | "APPROVE";
  }[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: false;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: true;
    unpaged: false;
  };
  last: true;
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
