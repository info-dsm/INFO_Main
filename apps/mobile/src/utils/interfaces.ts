export interface LoadProps {
  status: boolean
}

export interface LoginState {
  email: string,
  password: string
}

export type LoginAction = 
  | { type: "email", email: string }
  | { type: "password", password: string }

export interface SignUpState {
  email: string,
  name: string,
  studentKey: string,
  password: string,
  password2: string,
  isSend: boolean,
  isVerify: boolean,
  code: string,
  github: string
}

export type SignUpAction =
  | { type: "name", name: string }
  | { type: "studentKey", studentKey: string }
  | { type: "email", email: string }
  | { type: "password", password: string }
  | { type: "password2", password: string }
  | { type: "send" }
  | { type: "verify" }
  | { type: "code", code: string } 
  | { type: "github", github: string }

export interface searchBarProps {
  url: string,
  placeholder: string,
};

export interface CompanyTags {
  id: string
}

export interface CompanyCardProps {
  title: string,
  desc: string,
  image?: string | null,
  tags: CompanyTags[]
}

export interface NoticeTags {
  bigClassification: {
    bigClassificationName: string
  },
  name: string
}

export interface NoticeCardProps {
  title: string,
  company: string,
  address: string,
  image?: string | null,
  tags: NoticeTags[]
}

export interface SearchBarProps {
  url: string,
  placeholder: string
}

interface Tags {
  id: string  
}

type FileType = 
  | "IMAGE"
  | "DOCS"
  | "UNKNOWN"

type CompanyFileClassificationType = 
  | "BUSINESS_CERTIFICATE"
  | "COMPANY_INTRODUCTION"
  | "COMPANY_LOGO"
  | "COMPANY_PHOTO"

interface File {
  fileId: string,
  fileUrl: string,
  fileType: FileType,
  extension: string,
  fileName: string,
  companyNumber: string,
  companyFileClassificationType: CompanyFileClassificationType
}

export interface Company {
  companyNumber: string,
  contactorEmail: string,
  companyName: string,
  homeAddressInfo: {
    fullAddress: string,
    addressNumber: string
  },
  businessTagged: Tags[],
  workerCount: number,
  annualSales: number,
  isLeading: boolean,
  isAssociated: boolean,
  latestNoticeYear?: number,
  totalEmployedCount: number,
  companyIntroductionResponse: {
    introduction: string,
    businessCertificate: File,
    companyIntroductionFile: File[],
    companyLogo: File,
    companyPhotoList: File[],
  }
}

export interface CompanyState {
  totalPages: number,
  idx: number,
  company?: Company[] | null
}

export type CompanyAction = 
  | { type: "access", company: Company[], total: number }

export interface Notice {
  notice_Id: string,
  company: {
    companyNumber: string,
    companyName: string
    imageList: string[]
  },
  classificationResponse: NoticeTags[],
  detailBusinessDescription: string,
  numberOfEmployee: number,
  gradeCutLine: number,
  applicantCount: number,
  isPersonalContact: boolean,
  noticeOpenPeriod: {
    startDate: string,
    endDate: string
  }
}

export interface NoticeState {
  totalPages: number,
  idx: number,
  notice? : Notice[] | null
}

export type NoticeAction = 
  | { type: "access", notice: Notice[], total: number }
