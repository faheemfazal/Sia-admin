import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { cancelOrder, changeStatus, getOrderView } from '../Api/orders';
import { message } from 'antd';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import img from "../components/assets/img/empty.jpg";
import moment from 'moment';
import Gold from '../components/assets/img/GOLD.png';


Modal.setAppElement('#root');

export default function OrderDetails() {
  const [order, setOrder] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    console.log(orderId, 'oo......0');
    getOrderView(orderId).then((res) => {
      console.log(res, 'order data');
      setOrder(res.data[0]);
    });
  }, [orderId]);
  console.log(order, 'mmmm');

  const handleCancelOrder = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will cancel the order. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        container: "fixed inset-0 flex justify-center items-center",
        popup: "p-4 rounded-lg bg-white",
        confirmButton: "bg-green-500 text-white px-4 py-2 rounded m-2",
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded ml-2 m-2",
      },
    });

    if (result.isConfirmed) {
      try {
        console.log('Order cancelled');
        const res = await cancelOrder(order._id);
        if (res.status === 200) {
          message.success('Order successfully cancelled');
          setOrder({ ...order, status: 'Cancelled' });
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
        message.error('Failed to cancel the order');
      }
    }
  };

  const handleConfirmOrComplete = async (status) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `This will mark the order as ${status === "Packed" ? "Packed" : status === 'Completed' ? 'complete' : 'confirm'}. Do you want to proceed?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${status === "Packed" ? "Packed" : status === 'Completed' ? 'complete' : 'confirm'} it!`,
      cancelButtonText: 'No, keep it pending'
    });

    if (result.isConfirmed) {
      try {
        const res = await changeStatus(order._id, status);
        if (res.status === 200) {
          message.success(`Order successfully ${status}`);
          setOrder({ ...order, status: status });
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
        message.error('Failed to cancel the order');
      }
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:mx-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='lg:flex justify-between p-4 border rounded-lg shadow-md'>
            <div>
              <h2 className="text-xl font-bold">User Details</h2>
              <p><span className="font-bold">Phone Number: </span>{order.userId?.phoneNumber || order.userId?.secondPhoneNumber}</p>
              <p><span className="font-bold">Date: </span>{moment(order.createdAt).format(' h:mm a,MMMM Do YYYY')}</p>

              <p><span className="font-bold">Order ID: </span>{order._id ? order._id.slice(0, 4) : ''}</p>
              <p><span className="font-bold">Total Amount: </span>₹ {order.totalAmount}</p>
              <p><span className="font-bold">Total Products: </span>{order.items ? order.items.length : 0}</p>
            </div>
            { order?.transationId && (
              <div>
                <img 
                  src={order?.paymentImg} 
                  alt="Product Image" 
                  className="w-24 h-24 object-cover mb-4 text-end cursor-pointer"
                  onClick={openModal} 
                />
                <p><span className="font-bold">Transaction ID: </span>{order?.transationId}</p>
              </div>
            )}
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Your Rewards</h2>
            <div className="flex items-center space-x-4">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/lockinEarlyAccess_e0bd6e.png" alt="Coin" className="w-12 h-12" />
              <div>
                <p>Early Access to this Sale</p>
                <p>For Sia Plus Members</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              {order.status !== 'Cancelled' && order.status !== 'Completed' ? (
                <button
                  onClick={handleCancelOrder}
                  className="bg-red-500 text-white px-2 py-2 rounded whitespace-nowrap"
                >
                  Cancel Order
                </button>
              ) : (
                <h1 className={`${order.status === 'Cancelled' ? 'text-red-600' : 'text-green-600'} px-2 py-2 rounded whitespace-nowrap`}>Orders {order.status}</h1>
              )}
              
              {order.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleConfirmOrComplete('Confirmed')}
                    className="bg-blue-500 text-white px-2 py-2 rounded whitespace-nowrap"
                  >
                    Confirm Order
                  </button>
                </>
              )}
              {order.status === 'Confirmed' && (
                <>
                  <button
                    onClick={() => handleConfirmOrComplete('Packed')}
                    className="bg-blue-500 text-white px-2 py-2 rounded whitespace-nowrap"
                  >
                    Packed
                  </button>
                </>
              )}
              {order.status === 'Packed' && (
                <>
                  <button
                    onClick={() => handleConfirmOrComplete('Completed')}
                    className="bg-green-500 text-white whitespace-nowrap px-2 py-2 rounded"
                  >
                    Complete Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.items && order.items.map((item) => (
              <div key={item._id} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{item.product.productName}</h2>
                  <p><span className="font-bold">Category: </span>{item.product.category}</p>
                  <p><span className="font-bold">Sub-Category: </span>{item.product.subCategory}</p>
                  <p><span className="font-bold">Quantity: </span>{item.quantity} {item.unitType}</p>
                  <p><span className="font-bold">count: </span>{item.quantity/ item.unit}</p>
                  <p><span className="font-bold">unit: </span>{item.unit} {item.unitType}</p>
                  <p><span className="font-bold">Price: </span>₹ {item.price}</p>
                  <p><span className="font-bold">Total: </span>₹ {item.total}</p>
             
              
                </div>
                <img src={item.product.productImageUrl} alt={item.product.productName} className="w-20 h-20 object-cover rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Transaction Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto">
          <img src={order?.paymentImg} alt="Transaction Image" className="w-full h-auto" />
          <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </Modal>
    </>
  );
}
