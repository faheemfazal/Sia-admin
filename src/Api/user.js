import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);



export const getUser = async () => {
    try {
      const response = await axiosAdmin({
        url: "/userlist",
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const blockUser = async (userId) => {
    try {
      const response = await axiosAdmin({
        url: `/blockuser?userId=${userId}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const UnblockUser = async (userId) => {
    try {
      const response = await axiosAdmin({
        url: `/unblockuser?userId=${userId}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };