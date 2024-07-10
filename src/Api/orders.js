import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);



export const getOrders = async () => {
    try {
      const response = await axiosAdmin({
        url: `/orders`,
        method: "get",
        // headers: { Authorization : `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };

  export const getOrderView = async (orderId) => {
    try {
      const response = await axiosAdmin({
        url:`/vieworder?orderId=${orderId}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };

  export const cancelOrder = async (orderId) => {
    try {
      const response = await axiosAdmin({
        url:`/orderCancel?orderId=${orderId}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };

  export const changeStatus = async (orderId,orderStatus) => {
    try {
      const response = await axiosAdmin({
        url:`/orderstatus?orderId=${orderId}&orderStatus=${orderStatus}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };



  