import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);


export const addNewProduct = async (data,productImageUrl) => {
    try {
        Object.assign(data,{productImageUrl})
        console.log(data,'123.........');
      const response = await axiosAdmin({
        url: "/addproduct",
        method: "POST",
        data: data
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };
export const getProduct = async () => {
    try {
      const response = await axiosAdmin({
        url: "/getproducts",
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };
export const deleteproduct = async (data) => {
    try {
      const response = await axiosAdmin({
        url:`/deleteproduct?id=${data}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };



export const editproduct = async (data) => {
    try {
      const response = await axiosAdmin({
        url: `/getproducts?id=${data}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const getEditProduct = async (id) => {
    try {
      const response = await axiosAdmin({
        url: `/editProduct?id=${id}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh...')
      return response;
    } catch (err){
        console.log(err)
    }
  };



  export const updateProduct = async (data,productImageUrl) => {
    try {
        Object.assign(data,{productImageUrl})
        console.log(data,'123');
      const response = await axiosAdmin({
        url: `/editproduct?id=${data._id}`,
        method: "POST",
        data: data
        
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };
  