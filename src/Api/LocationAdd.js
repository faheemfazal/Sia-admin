import adminAxiosIntercepter from "../axiosLink/axios";

const url = "admin"
const  axiosAdmin= adminAxiosIntercepter(url);

// export const getLocations = async (token) => {
//   try {
//     const response = await axiosAdmin.get("/findLocation", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch {}
// };

export const createLocation = async (hubName,image,latitude,longitude) => {
  try {
    const response = await axiosAdmin({
      url: "/hublocation",
      method: "POST",
      data: {
        hubName,image,latitude,longitude
      },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch {}
};

// export const deleteLocation = async (token, deleteId) => {
//   const response = await axiosAdmin({
//     url: `/locationDelete?id=${deleteId}`,
//     headers: { Authorization: `Bearer ${token}` },
//     method: "POST",
//   });

//   return response;
// };

// export const getLandingLocations = async () => {
//   try {
//     const response = await axiosuser.get("/landinglocation");

//     return response.data.city;
//   } catch (e) {}
// };
