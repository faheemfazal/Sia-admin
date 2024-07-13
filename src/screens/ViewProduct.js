import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProduct, editproduct, deleteproduct } from "../Api/product";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [msgDropdown, setMsgDropdown] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({});
  const navigate = useNavigate();

  const toggleSubmenu = (name) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const deleteProduct = async(data) => {
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
        confirmButton: "bg-green-500 text-white px-4 py-2 rounded m-2",
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded ml-2 m-2",
      },
    });

    if (result.isConfirmed) {

    deleteproduct(data).then((res) => {
      alert(res.data.message);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== data));
    });
  }
  };

  useEffect(() => {
    getProduct().then((res) => {
      setProducts(res.data.products);
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Product </th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Category </th>
                  <th className="px-4 py-2 border-b">Delete</th>
                  <th className="px-4 py-2 border-b">Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 border-b">{row.productName}</td>
                    <td className="px-4 py-2 border-b">{row.price}</td>
                    <td className="px-4 py-2 border-b text-center">{row.quantity}</td>
                    <td className="px-4 py-2 border-b text-center">{`${row.category}`}</td>

                
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => deleteProduct(row._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                        onClick={() => navigate(`/editproduct/${row._id}`)}
                      >
                        Edit
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
