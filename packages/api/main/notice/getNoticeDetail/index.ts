import requestApi from "../../token";

export interface getNoticeDetailProps {
  noticeId: string;
  company: {
    companyNumber: string;
    companyName: string;
  };
  classificationResponse: {
    bigClassification: {
      bigClassification: string;
    };
    name: string;
  }[];
  detailBusinessDescription?: string;
  numberOfEmployee: number;
  gradeCutLine?: number;
  interviewProcessList: { [key: number]: string };
  languageList: { languageName: string }[];
  technologyList: { technologyName: string }[];
  certificateList: { certificateName: string }[];
  workTime: {
    commuteStartTime?: number;
    commuteEndTime?: number;
    workTimePerDay: number;
    workTimePerWeek: number;
    isFlexible: Boolean;
  };
  mealSupport: {
    mealSupportPay: number;
    breakfast: Boolean;
    lunch: Boolean;
    dinner: Boolean;
  };
  welfare: {
    dormitorySupport: Boolean;
    selfDevelopmentPay: Boolean;
    equipmentSupport: Boolean;
    youthTomorrowChaeumDeduction: Boolean;
    alternativeMilitaryPlan: Boolean;
    elseSupport?: string;
  };
  noticeOpenPeriod: {
    startDate: string;
    endDate: string;
  };
  needDocuments?: string;
  otherFeatures?: string;
  workPlace: {
    isSameWithCompanyAddress: Boolean;
    otherPlace?: string;
  };
  applicantCount: number;
  attachmentFileList: [
    {
      fileId: string;
      fileUrl: string;
      fileType: "IMAGE" | "DOCS" | "UNKNOWN";
      extension: string;
      fileName: string;
      noticeId: string;
    }
  ];
  isPersonalContact: Boolean;
}

export const getNoticeDetail = async ({ id }: { id: string }) => {
  const data: getNoticeDetailProps = await requestApi({
    method: "GET",
    url: `notice/${id}`,
  });
  console.log(data);

  return data;
};
