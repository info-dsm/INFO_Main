import axios from "axios";
import request from "../..";
export type getBaseListProps = [
  { technologyName: string }[],
  { languageName: string }[],
  { certificateName: string }[],
  { bigClassification: { bigClassificationName: string }; name: string }[],
  {
    process: string;
    meaning: string;
  }[]
];
export const getBaseList = async () => {
  const data = (await axios.all([
    request.get("/notice/technology"),
    request.get("/notice/language"),
    request.get("/notice/certificate"),
    request.get("/notice/classification"),
    request.get("/notice/interview"),
  ])) as getBaseListProps;
  console.log(data);
  return data;
};
