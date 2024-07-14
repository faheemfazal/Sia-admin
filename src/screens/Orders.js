import { getOrders } from "../Api/orders";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment'

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  console.log(orders,'ff');

  useEffect(() => {
    getOrders().then((res) => {
      console.log(res, "orders");
      if (res.status === 200) {
        setOrders(res.data);
      }
    });
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mt-2">Order Details</h1>
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
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Date</th>


                  <th className="px-4 py-2 border-b">Phone Number</th>
                  <th className="px-4 py-2 border-b">Payment Method </th>

                  <th className="px-4 py-2 border-b">Order Status </th>

                  <th className="px-4 py-2 border-b">View</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b text-center text-sm md:text-base">
                      {order.userId.name}
                    </td>
                    <td className="px-4 py-2 border-b text-center text-sm md:text-base">
                      {moment(order.createdAt).format(' h:mm a,MMMM Do YYYY')}
                    </td>
                    <td className="px-4 py-2 border-b text-center text-sm md:text-base">
                      {order.userId.phoneNumber ? order.userId.phoneNumber : order.userId.email},
                      {order.userId.secondPhoneNumber}
                    </td>
                    <td className="px-4 py-2 border-b text-center text-sm md:text-base">
                      {order.paymentMethod}
                    </td>
                    <td className={`px-4 py-2 border-b text-center text-sm md:text-base `}>
                      <h1
                        className={`${
                          order.status == "Cancelled" &&
                          " font-bold text-red-600 "
                        } 
                    ${order.status == "Pending" && " font-bold text-gray-500 "}
                     ${
                       order.status == "Completed" &&
                       " font-bold text-green-600 "
                     } 
                      ${
                        order.status == "Confirmed" &&
                        " font-bold text-blue-500 "
                      }`}
                      >
                        {order.status}
                      </h1>
                    </td>

                    <td className="px-4 py-2 border-b text-center text-sm md:text-base">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => navigate(`/order-detail/${order._id}`)}
                      >
                        View
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
