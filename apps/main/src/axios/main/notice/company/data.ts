export type NoticeCompanyDtoType = {
  notice: {
    noticeId: string;
    company: {
      companyNumber: string;
      companyName: string;
      imageList: string[];
    };
    classificationResponse: (
      | {
          bigClassification: {
            bigClassificationName: string;
          };
          name: string;
        }
      | undefined
    )[];
    detailBusinessDescription: string;
    numberOfEmployee: number;
    gradeCutLine: number;
    applicantCount: number;
    isPersonalContact: boolean;
    noticeOpenPeriod: {
      startDate: string;
      endDate: string;
    };
    workPlace: {
      isSameWithCompanyAddress: boolean;
      otherPlace: string;
    };
  };
  approveStatus: "APPROVE" | "WAITING";
}[];
