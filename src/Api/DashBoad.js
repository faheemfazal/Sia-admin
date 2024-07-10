import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);


export const getDashData = async () => {
    try {
      const response = await axiosAdmin({
        url: "/revenue_user",
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (err){
        console.log(err)
    }
  };

  export const salesChart = async () => {
    try {
      const response = await axiosAdmin({
        url: "/revenue_user",
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const Sales = async () => {
    try {
      const response = await axiosAdmin({
        url: "/salesreport",
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'..')
      return response;
    } catch (err){
        console.log(err)
    }
  };