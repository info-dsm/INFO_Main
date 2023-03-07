import {
  PropsOption,
  PopUpOptionsProps,
  OpenProps,
  postCodeOptionProps,
} from "../../@types/interface";
type PostCodeProps = postCodeOptionProps &
  Omit<PopUpOptionsProps, "q"> &
  OpenProps;

const open = (options?: PostCodeProps) => {
  const {
    defaultQuery,
    left,
    top,
    popupKey,
    popupTitle,
    autoClose,
    onComplete,
    onResize,
    onClose,
    onSearch,
    onError,
    ...others
  } = {
    ...options,
  };
  const loadPostcode = (): Promise<PropsOption> => {
    let promise: Promise<PropsOption> | null = null;
    if (promise) return promise;

    promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => {
        if (window?.daum?.Postcode) {
          return resolve(window.daum.Postcode);
        }
        reject(new Error("error"));
      };
      script.onerror = (error) => reject(error);
      script.id = "daum_postcode_script";
      document.body.appendChild(script);
    });

    return promise;
  };
  return loadPostcode()
    .then((Postcode) => {
      const postcode = new Postcode({
        ...others,
        oncomplete: onComplete,
        onsearch: onSearch,
        onresize: onResize,
        onclose: onClose,
      });
      postcode.open({
        q: defaultQuery,
        left,
        top,
        popupTitle,
        popupKey,
        autoClose,
      });
    })
    .catch(onError);
};
export default open;
