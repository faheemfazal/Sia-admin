import { UnblockUser, blockUser, getUser } from "../Api/user";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { message, Modal, Input,Button } from "antd";
import Silver from "../components/assets/img/SILVER.png";
import platinum from "../components/assets/img/PLATINUM.png";
import Gold from "../components/assets/img/GOLD.png";
import { clearCoin, setDateForCoin } from "../Api/coin";
import withReactContent from "sweetalert2-react-content";
// import 'antd/dist/antd.css';

export default function UserDetails() {
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [coinValue, setCoinValue] = useState("");
  const [date, setDate] = useState("");
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getUser().then((res) => {
      if (res?.status === 200) {
        setUser(res.data);
      }
    });
  }, [load]);

  const handleBlock = async (userId) => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "This will block the user. Do you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, block it!",
        cancelButtonText: "No, keep it",
        customClass: {
          container: "fixed inset-0 flex justify-center items-center",
          popup: "w-full max-w-xs p-4 rounded-lg bg-white",
          title: "text-lg",
          content: "text-sm",
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded m-2",
          cancelButton: "bg-gray-500 text-white px-4 py-2 rounded ml-2 m-2",
        },
      });

      if (result.isConfirmed) {
        const res = await blockUser(userId);
        if (res.status === 200) {
          setLoad(!load);
          message.success("User blocked successfully");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClear = async (coin) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will clear the coin. Do you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, clear it!",
        cancelButtonText: "No, keep it",
        customClass: {
          container: "fixed inset-0 flex justify-center items-center",
          popup: "p-4 rounded-lg bg-white",
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded m-2",
          cancelButton: "bg-gray-500 text-white px-4 py-2 rounded ml-2 m-2",
        },
      });

      if (result.isConfirmed) {
        const res = await clearCoin(coin, selectedUser._id);
        if (res.status === 200) {
          setSelectedUser(res.data.user);
          message.success("Coin cleared successfully");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnBlock = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will unblock the user. Do you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, unblock it!",
        cancelButtonText: "No, keep it",
        customClass: {
          container: "fixed inset-0 flex justify-center items-center",
          popup: "p-4 rounded-lg bg-white",
          confirmButton: "bg-green-500 text-white px-4 py-2 rounded m-2",
          cancelButton: "bg-gray-500 text-white px-4 py-2 rounded ml-2 m-2",
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
    setIsModalOpen(false);

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
          <h1 className="md:text-2xl text-xl font-semibold mt-2">User Details</h1>
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
                  <th className="px-4 py-2 border-b text">Name</th>
                  <th className="px-4 py-2 border-b text">
                    Number or Email
                  </th>
                  <th className="px-4 py-2 border-b text-"></th>
                </tr>
              </thead>
              <tbody>
                {user.map((row, index) => (
                  <tr
                    key={index}
                    className={ `text-sm md:text-base ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="px-4 py-2 border-b text-sm md:text-base">
                      {row.name}
                    </td>
                    <td className="px-4 py-2 border-b text-sm md:text-base">
                      {row.phoneNumber ? row.phoneNumber : row.email}
                    </td>
                    <td className="px-4 py-2 border-b text-">
                      <button
                        className="bg-orange-500 text-white px-4 py-2 rounded text- whitespace-nowrap"
                        onClick={() => handleCoinAndPay(row)}
                      >
                        Coin & Pay
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b text-">
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
 {isModalOpen  &&    
  <Modal
  visible={isModalOpen}
  onCancel={handleCancel}
  onOk={handleOk}
  centered
  width="90%"
  bodyStyle={{
    padding: "16px",
    backgroundColor: "#f0f2f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
  className="rounded-lg"
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
  maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
>
  <div style={{ width: "100%" }}>
    <h2 style={{ marginBottom: "20px", textAlign: "center" }}>{selectedUser ? `User: ${selectedUser.name}` : ""}</h2>
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
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ cursor: "pointer" }}
                onClick={() => handleClear("platinum")}
              >
                Clear
              </button>
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
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ cursor: "pointer" }}
                onClick={() => handleClear("silver")}
              >
                Clear
              </button>
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
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ cursor: "pointer" }}
                onClick={() => handleClear("gold")}
              >
                Clear
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mt-4" style={{ width: "100%", maxWidth: "300px" }}>
      <label className="block font-semibold text-lg mb-2">
        Date for Coin:<span className="font-normal text-sm">{date}</span>
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border-2 border-gray-300 rounded p-2"
      />
    </div>
  </div>
  <div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    style={{
      backgroundColor: "green",
      color: "white",
      padding: "10px 20px",
      margin: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "inline-block",
    }}
    onClick={handleOk}
  >
    OK
  </button>
  <button
    style={{
      backgroundColor: "red",
      color: "white",
      padding: "10px 20px",
      margin: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "inline-block",
    }}
    onClick={handleCancel}
  >
    Cancel
  </button>
</div>
</Modal>
}


    </>
  );
}
