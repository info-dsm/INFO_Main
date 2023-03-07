export {};
export type CompanyTitleProps = {
  title: string;
  width: number;
  key: string;
}[];
export type EmailProps = {
  e: string | null;
  props: "email" | "password";
};
export interface OptionsProps {
  oncomplete?: (address: AddressProps) => void;
  onresize?: (size: { width: number; height: number }) => void;
  onclose?: (state: "FORCE_CLOSE" | "COMPLETE_CLOSE") => void;
  onsearch?: (search: { q: string; count: number }) => void;
}
export interface AddressProps {
  zonecode: string;
  address: string;
  addressEnglish: string;
  addressType: "R" | "J";
  userSelectedType: "R" | "J";
  noSelected: "Y" | "N";
  userLanguageType: "K" | "E";
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: "Y" | "N";
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  roadnameEnglish: string;
  bname: string;
  bnameEnglish: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  hname: string;
  query: string;
}
export interface PopUpOptionsProps {
  q?: string;
  left?: number | string;
  top?: number | string;
  popupTitle?: string;
  popupKey?: string;
  autoClose?: boolean;
}
export interface PropsOption {
  new (options: PostcodeOptions): Postcode;
}
export interface Postcode {
  open(postcodeOptions?: PopUpOptionsProps): void;
}
export interface OpenProps {
  onComplete?: (data: AddressProps) => void;
  onResize?: (size: { width: number; height: number }) => void;
  onClose?: (state: "FORCE_CLOSE" | "COMPLETE_CLOSE") => void;
  onSearch?: (search: { q: string; count: number }) => void;
  onError?: (error: Error) => void;
  defaultQuery?: string;
}
export interface postCodeOptionProps {
  width?: string | number;
  height?: string | number;
  animation?: boolean;
  focusInput?: boolean;
  focusContent?: boolean;
  autoMapping?: boolean;
  autoMappingRoad?: boolean;
  autoMappingJibun?: boolean;
  shorthand?: boolean;
  pleaseReadGuide?: number;
  pleaseReadGuideTimer?: number;
  maxSuggestItems?: number;
  showMoreHName?: boolean;
  hideMapBtn?: boolean;
  hideEngBtn?: boolean;
  alwaysShowEngAddr?: boolean;
  submitMode?: boolean;
  useBannerLink?: boolean;
  useSuggest?: boolean;
}
export interface PostcodeOptions extends postCodeOptionProps {
  oncomplete?: (data: AddressProps) => void;
  onresize?: (size: { width: number; height: number }) => void;
  onclose?: (state: "FORCE_CLOSE" | "COMPLETE_CLOSE") => void;
  onsearch?: (search: { q: string; count: number }) => void;
}
