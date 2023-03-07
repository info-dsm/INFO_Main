// axios instance 를 생성해주었습니다.
import axios from "axios";
import cookie from "js-cookie";
const request = axios.create({
  baseURL: "https://api.info-dsm.info/",
});
const accessToken = cookie.get("accessToken");
if (accessToken !== undefined) {
  request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
