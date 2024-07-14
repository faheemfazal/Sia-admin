import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../Api/Category";

export default function ViewCategory() {
  const [category, setCategory] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getCategory().then((res) => {
      console.log("theeeeeee", res);
      setCategory(res?.data?.categories);
    });
  }, []);

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
          <div className="">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-2 py-2 border-b text-start">Category</th>
                  <th className="px-2 py-2 border-b text-start">View Category</th>
                </tr>
              </thead>
              <tbody>
                {category.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-4 py-2 border-b items-start text-start">{row.categoryName}</td>
                    <td className="px-4 py-2 border-b text-start relative">
                      <div 
                        onClick={() => toggleDropdown(index)} 
                        className="w-full flex items-center justify-between space-x-2 cursor-pointer"
                      >
                        <span className="flex items-center space-x-2 whitespace-nowrap">
                          <span>Subcategories</span>
                        </span>
                        <FaAngleDown className="p-1 text-2xl" />
                      </div>
                      {openDropdown === index && (
                        <div className="absolute mt-2 left-0 bg-white text-gray-800 shadow-lg rounded-md w-32 z-50">
                          {row.subCategory.map((sub, i) => (
                            <div className="hover:bg-gray-600 p-2 rounded bg-slate-100" key={i}>
                              <div className="w-full">{sub}</div>
                            </div>
                          ))}
                          {row.subCategory.length === 0  && (
                            <div className="hover:bg-gray-600 p-2 rounded bg-slate-100">
                              <div className="w-full">empty</div>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="w-full h-80"></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
