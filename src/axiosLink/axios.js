
// import axios from "axios";


// export const axiosAdmin = axios.create({
//   baseURL: "http://localhost:5000/admin/",

//   headers: {
//     "Content-Type": "application/json",
//   },
// });
  



import axios from "axios";




// Create an instance of axios
const axiosAdmin = axios.create({
  baseURL: "https://sia-backend-eight.vercel.app/admin/",
  headers: {
    "Content-Type": "application/json",
  },
});

const adminAxiosIntercepter = (url) => {
  axiosAdmin.interceptors.request.use(
    config => {
      const tokenData = localStorage.getItem('adminToken');
      console.log(tokenData,'ooooo');
      if (tokenData) {
        config.headers['Authorization'] = `Bearer ${tokenData}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosAdmin.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('adminToken');
        
        window.location.href='/'
        // Redirect to login or appropriate page

      }
      //  else if (error.response && error.response.status === 500) {
      //   window.location.href = "/error500";
      // } else if (error.response) {
      //   console.log("HTTP ERROR CODE:", error.response.status);
      // } else if (error.request) {
      //   console.log("Network Error:", error.message);
      // } else {
      //   console.log("Error:", error.message);
      // }
      return Promise.reject(error);
    }
  );

  return axiosAdmin;
}

export default adminAxiosIntercepter;
