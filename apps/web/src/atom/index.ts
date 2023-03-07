import { atom, RecoilState } from "recoil";
export const firstSignUpData: RecoilState<{
  companyNumber: string;
  companyNameRequest: {
    companyName: string;
  };
  businessAreaList: string[];
  introduction: string;
}> = atom({
  key: "firstSignUpData",
  default: {
    companyNumber: "",
    companyNameRequest: {
      companyName: "",
    },
    businessAreaList: [""],
    introduction: "",
  },
});
export const secondSignUpData: RecoilState<{
  homeAddress: {
    fullAddress: string;
    addressNumber: string;
  };
  agentAddress: {
    fullAddress: string;
    addressNumber: string;
  };
  representativeName: string;
  establishedAt: string;
  workerCount: string;
  annualSales: string;
  companyPhone: string;
}> = atom({
  key: "secodSignUpData",
  default: {
    homeAddress: {
      fullAddress: "",
      addressNumber: "",
    },
    agentAddress: {
      fullAddress: "",
      addressNumber: "",
    },
    representativeName: "",
    establishedAt: "",
    workerCount: "",
    annualSales: "",
    companyPhone: "",
  },
});
