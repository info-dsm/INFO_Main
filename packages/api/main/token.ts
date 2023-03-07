// axios instance 를 생성해주었습니다.
import axios from "axios";
import { reissue } from "./auth/reissue";
const requestApi = axios.create({
  baseURL: "http://13.124.184.185",
});
requestApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
requestApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default requestApi;
