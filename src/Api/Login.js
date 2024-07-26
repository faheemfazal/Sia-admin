import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);


export const login = async (email, password) => {
  try {
    const res = await axiosAdmin({ 
      url: '/adminlogin',
      method: "post",
      data:{email, password}
      // headers: { Authorization : `Bearer ${token}` },
    });

    const token = res.data.adminToken;
    console.log(token,'opo', res     );
    if (token) {
      localStorage.setItem("adminToken", token);
      return res;
    } else {
      return false;
    }
  } catch {
    
  }
};

export const getOpenOrClose = async () => {
  try {
    const res = await axiosAdmin({ 
      url: '/openorclose',
      method: "get",
   
      // headers: { Authorization : `Bearer ${token}` },
    });

  
 
      return res;
    
  } catch {
    
  }
};


export const postOpenOrClose = async (isONorOFF) => {
  try {
    const res = await axiosAdmin({ 
      url: '/postopenorclose',
      method: "post",
      data:{isONorOFF}
      // headers: { Authorization : `Bearer ${token}` },
    });

  
      return res;

  } catch {
    
  }
};

