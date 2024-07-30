import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);



export const addNewBanner = async (BannerImage) => {
    try {
      const response = await axiosAdmin({
        url: "/addBanner",
        method: "POST",
        data: {
            BannerImage
        },
        // headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
  
      return response;
    } catch {}
  };


  
  export const getBanner = async () => {
    try {
      const response = await axiosAdmin.get("/getBanner", {
        // headers: { Authorization: `Bearer ${token}` },
      });
  
      return response;
    } catch {}
  };


  export const deleteBanner = async (data) => {
    try {
      const response = await axiosAdmin({
        url:`/deleteBanner?id=${data}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };