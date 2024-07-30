import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);



export const addNewBanner = async (BannerImage) => {
    try {
      const response = await axiosAdmin({
        url: "/addcategory",
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