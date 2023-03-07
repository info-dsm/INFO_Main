import request from "../..";
import { createNoticeProps } from "../create";
export const editNotice = async (
  companyNumber: string,
  noticeId: string,
  smallClassificationList: string[],
  needCertificateList: string[],
  languageList: string[],
  technologyList: string[],
  workTime: {
    commuteStartTime: number;
    commuteEndTime: number;
    workTimePerDay: number;
    workTimePerWeek: number;
    isFlexible: boolean;
  },
  pay: {
    fieldTrainingPayPerMonth: number;
    fullTimeEmploymentPay: {
      yearPayStart: number;
      yearPayEnd: number;
    };
  },
  mealSupport: {
    mealSupportPay: number;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  },
  interviewProcessMap: { [key: number]: string },
  noticeOpenPeriod: {
    startDate: string;
    endDate: string;
  },
  props: {
    detailBusinessDescription: string;
    numberOfEmployee: number;
    gradeCutLine?: number;
    otherFeatures: string;
  },
  welfare: {
    dormitorySupport: boolean;
    selfDevelopmentPay: boolean;
    equipmentSupport: boolean;
    youthTomorrowChaeumDeduction: boolean;
    alternativeMilitaryPlan: boolean;
    elseSupport?: string;
  },
  workPlace: {
    isSameWithCompanyAddress: boolean;
    otherPlace?: string;
  },
  generateFileListRequest: {
    fileName: string;
    contentType: string;
  }[]
) => {
  console.log({
    smallClassificationList,
    needCertificateList,
    languageList,
    technologyList,
    workTime,
    pay,
    mealSupport,
    interviewProcessMap,
    noticeOpenPeriod,
    ...props,
    welfare,
    workPlace,
    generateFileListRequest,
    isPeronalContact: false,
  });
  const data: createNoticeProps = await request({
    method: "patch",
    url: `/notice/${companyNumber}/${noticeId}`,
    data: {
      smallClassificationList,
      needCertificateList,
      languageList,
      technologyList,
      workTime,
      pay,
      mealSupport,
      interviewProcessMap,
      noticeOpenPeriod,
      ...props,
      welfare,
      workPlace,
      generateFileListRequest,
      isPeronalContact: false,
    },
  });
  console.log(data);
  return data;
};
