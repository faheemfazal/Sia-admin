// import { axiosAdmin } from "../axiosLink/axios";

import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);



export const addNewCategory = async (category,subCategory) => {
    try {
      const response = await axiosAdmin({
        url: "/addcategory",
        method: "POST",
        data: {
          categoryName: category,subCategory:subCategory
        },
        // headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
  
      return response;
    } catch {}
  };



  export const getCategory = async () => {
  try {
    const response = await axiosAdmin.get("/getcategory", {
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch {}
};


// export const deleteCategory = async (deleteId) => {
//   const response = await axiosAdmin({
//     url: `/locationDelete?id=${deleteId}`,
//     // headers: { Authorization: `Bearer ${token}` },
//     method: "POST",
//   });

//   return response;
// };


// export const editCategory = async (id) => {
//     try {
//       const response = await axiosAdmin({
//         url: `/geteditcategory?id=${id}`,
//         method: "get",
//         // headers: { Authorization: `Bearer ${token}` },
//       });
//   console.log(response,'khkhkh')
//       return response;
//     } catch (err){
//         console.log(err)
//     }
//   };


  
  // export const updateCategory = async (category,updateCategory,id) => {
  //   try {

  //     const response = await axiosAdmin({
  //       url: `/editproduct?id=${id}`,
  //       method: "POST",
  //       data: {category,updateCategory}
  //       // headers: { Authorization: `Bearer ${token}` },
  //     });
  // console.log(response,'khkhkh')
  //     return response;
  //   } catch (err){
  //       console.log(err)
  //   }
  // };