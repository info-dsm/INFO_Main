export const getCompanyNumber = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("companyNumber");
  }
};
