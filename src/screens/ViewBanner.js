import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { deleteBanner, getBanner } from "../Api/Banner";
import Swal from 'sweetalert2';
import { message } from 'antd';

export default function ViewBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoading(true); // Optional: set loading state while fetching
    getBanner().then((res) => {
      if (res.status === 200) {
        setBanners(res.data.banner);
      } else {
        setBanners([]);
      }
      setLoading(false); // Reset loading state after fetching
    });
  }, [load]);

  const handleDelete = async(data) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the product. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        container: "fixed inset-0 flex justify-center items-center",
        popup: "p-4 rounded-lg bg-white",
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded m-2",
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded ml-2 m-2",
      },
    });

    if (result.isConfirmed) {
      deleteBanner(data).then((res) => {
        if (res.status === 200) {
          message.success('Banner deleted successfully');
          setLoad(prevLoad => !prevLoad); // Toggle load to trigger useEffect
        } else {
          message.error('An error occurred while deleting the banner');
        }
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mt-2">View Product</h1>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden border-2 border-gray-300">
          <div className="border-b border-gray-400 px-4 py-2 flex items-center bg-gray-200">
            <i className="icon-th mr-2"></i>
            <h5 className="font-semibold">Data table</h5>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-sm md:text-base">Product</th>
                  <th className="px-4 py-2 border-b text-sm md:text-base">Image</th>
                  <th className="px-4 py-2 border-b text-sm md:text-base">Delete</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((row, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b text-sm md:text-base">{index + 1}</td>
                    <td>
                      <img src={row.bannerImage} alt="Banner" className="mt-2 w-32 h-32 object-cover" />
                    </td>
                    <td className="px-4 py-2 border-b text-center text-sm md:text-base">
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => handleDelete(row._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
