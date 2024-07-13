import { UnblockUser, blockUser, getUser } from "../Api/user";
import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { message, Modal, Input } from 'antd';
import Silver from '../components/assets/img/SILVER.png';
import platinum from '../components/assets/img/PLATINUM.png';
import Gold from '../components/assets/img/GOLD.png';
import { clearCoin, setDateForCoin } from "../Api/coin";



export default function UserDetails() {
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [coinValue, setCoinValue] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getUser().then((res) => {
      if (res?.status === 200) {
        setUser(res.data);
      }
    });
  }, [load]);

  const handleBlock = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will block the user. Do you want to proceed?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, block it!',
        cancelButtonText: 'No, keep it',
        customClass: {
          container: 'swal-container',
        },
      });

      if (result.isConfirmed) {
        const res = await blockUser(userId);
        if (res.status === 200) {
          setLoad(!load);
          message.success('User blocked successfully');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClear = async (coin) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will clear the coin. Do you want to proceed?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, clear it!',
        cancelButtonText: 'No, keep it',
        customClass: {
          container: 'swal-container',
        },
      });

      if (result.isConfirmed) {
        const res = await clearCoin(coin, selectedUser._id);
        if (res.status === 200) {
          setSelectedUser(res.data.user);
          message.success('Coin cleared successfully');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnBlock = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will unblock the user. Do you want to proceed?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, unblock it!',
        cancelButtonText: 'No, keep it',
        customClass: {
          container: 'swal-container',
        },
      });

      if (result.isConfirmed) {
        const res = await UnblockUser(userId);
        if (res.status === 200) {
          setLoad(!load);
          message.success(res?.message);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCoinAndPay = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const res = await setDateForCoin(date, selectedUser._id);
    if (res?.status === 200) {
      message.success(res.data.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCoinValue("");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mt-2">User Details</h1>
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
                  <th className="px-4 py-2 border-b text-center">Name</th>
                  <th className="px-4 py-2 border-b text-center">Number or Email</th>
                  <th className="px-4 py-2 border-b text-center"></th>
                </tr>
              </thead>
              <tbody>
                {user.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-4 py-2 border-b text-center">{row.name}</td>
                    <td className="px-4 py-2 border-b text-center">{row.phoneNumber ? row.phoneNumber : row.email}</td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        className="bg-orange-500 text-white px-4 py-2 rounded text-center whitespace-nowrap"
                        onClick={() => handleCoinAndPay(row)}
                      >
                        Coin & Pay
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {row.block ? (
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded text-center"
                          onClick={() => handleUnBlock(row._id)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded text-center"
                          onClick={() => handleBlock(row._id)}
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title="Coin & Pay"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <h2>{selectedUser ? `User: ${selectedUser.name}` : ""}</h2>
          <div className="container mx-auto py-10">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#81c408] text-white">
                  <tr>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Coin</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Coins in Number</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-3 px-4 text-center">
                      <img src={platinum} alt="Platinum Coin" className="w-12 h-12 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="text-center">
                        <p className="font-bold text-lg">{selectedUser?.platinum}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleClear('platinum')}>Clear</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-center">
                      <img src={Silver} alt="Silver Coin" className="w-12 h-12 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="text-center">
                        <p className="font-bold text-lg">{selectedUser?.silver}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleClear('silver')}>Clear</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-center">
                      <img src={Gold} alt="Gold Coin" className="w-12 h-12 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="text-center">
                        <p className="font-bold text-lg">{selectedUser?.gold}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleClear('gold')}>Clear</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
     
          <div className="mt-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
            <input
              name='pickUpDate'
              type="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            {/* <button
              type="button"
              onClick={handleOk}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            >
              Submit
            </button> */}
          </div>
        </div>
      </Modal>
    </>
  );
}
