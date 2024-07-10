import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);



export const clearCoin = async (coin,userId) => {
    try {
      const response = await axiosAdmin({
        url: `/clearcoin?coin=${coin}&userId=${userId}`,
        method: "get",
        // headers: { Authorization : `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const setDateForCoin = async (date,userId) => {
    try {
      const response = await axiosAdmin({
        url: `/setDate?date=${date}&userId=${userId}`,
        method: "get",
        // headers: { Authorization : `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };