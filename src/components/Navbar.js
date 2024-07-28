import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [msgDropdown, setMsgDropdown] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({
    forms: false,
    category: false,
  });
  const [load,setLoad]=useState(false)
  

  useEffect(()=>{

  },[load])


  const [submenuPosition, setSubmenuPosition] = useState({
    forms: { top: 0, left: 0 },
    category: { top: 0, left: 0 },
  });

  const navigate = useNavigate();
  const formsRef = useRef(null);
  const categoryRef = useRef(null);
  const scrollDivRef = useRef(null);

  const handleLogout =()=>{
    localStorage.removeItem('adminToken')
    console.log(';;;');
    navigate('/')
    setLoad(!load)
  }

  const toggleSubmenu = (name, ref) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSubmenuPosition((prevState) => ({
        ...prevState,
        [name]: { top: rect.bottom, left: rect.left },
      }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setSubmenuOpen({
        forms: false,
        category: false,
      });
    };

    const scrollDiv = scrollDivRef.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-gray-800 text-white flex justify-between px-4 items-center">
        <h1 className="text-[#81c408] text-4xl">Sia</h1>

        <ul className="flex p-4 gap-1">
          {/* <li>
            <a title="" className="flex items-center space-x-2" href="#">
              <i className="icon icon-user"></i>
              <span className="text">Profile</span>
            </a>
          </li> */}
          {/* <li className="relative dropdown" id="menu-messages">
            <button
              onClick={() => setMsgDropdown(!msgDropdown)}
              className="dropdown-toggle flex items-center space-x-2"
            >
              <i className="icon icon-envelope"></i>
              <span className="text">Messages</span>
              <span className="label label-important bg-red-500 text-white rounded-full px-2">
                5
              </span>
              <b className="caret ml-2"></b>
            </button>
            {msgDropdown && (
              <ul className="dropdown-menu absolute mt-2 bg-white text-gray-800 shadow-lg rounded-md">
                <li className="p-2 hover:bg-gray-100">
                  <a className="sAdd" title="">
                    new message
                  </a>
                </li>
                <li className="p-2 hover:bg-gray-100">
                  <a className="sInbox" title="">
                    inbox
                  </a>
                </li>
                <li className="p-2 hover:bg-gray-100">
                  <a className="sOutbox" title="">
                    outbox
                  </a>
                </li>
                <li className="p-2 hover:bg-gray-100">
                  <a className="sTrash" title="">
                    trash
                  </a>
                </li>
              </ul>
            )}
          </li> */}

          <li>
     <div  className="flex items-center space-x-2" onClick={handleLogout} >
              <i className="icon icon-share-alt"></i>
              <span className="text">Logout</span>
            </div>
          </li>
        </ul>
      </div>

      <div ref={scrollDivRef} className="bg-gray-800 text-white h-full overflow-auto">
        <ul className="p-2 flex flex-row gap-2">
          <li
            className="active p-2 rounded hover:bg-gray-700"
            onClick={() => navigate("/home")}
          >
            <div className="w-full flex items-center space-x-2">
              <i className="icon icon-home"></i>
              <span>Dashboard</span>
            </div>
          </li>
          <li
            className="active p-2 rounded hover:bg-gray-700"
            onClick={() => navigate("/users")}
          >
            <div className="w-full flex items-center space-x-2">
              <i className="icon icon-home"></i>
              <span>Users</span>
            </div>
          </li>
          <li ref={formsRef} className="submenu p-2 rounded hover:bg-gray-700 relative">
            <div
              onClick={() => toggleSubmenu("forms", formsRef)}
              className="w-full flex items-center justify-between space-x-2"
            >
              <span className="flex items-center space-x-2 whitespace-nowrap">
                <i className="icon icon-th-list"></i>
                <span> Products</span>
              </span>
              <FaAngleDown className="p-1 text-2xl" />
            </div>
          </li>
          <li ref={categoryRef} className="p-2 rounded hover:bg-gray-700 relative">
            <div
              className="w-full flex items-center space-x-2"
              onClick={() => toggleSubmenu("category", categoryRef)}
            >
              <i className="icon icon-inbox"></i>
              <span>Category</span>
              <FaAngleDown className="p-1 text-2xl" />
            </div>
          </li>
          <li className="p-2 rounded hover:bg-gray-700">
            <div className="w-full flex items-center space-x-2" onClick={() => navigate("/orders")}>
              <i className="icon icon-th"></i>
              <span>Orders</span>
            </div>
          </li>
          <li className="p-2 rounded hover:bg-gray-700">
            <div className="w-full flex items-center space-x-2 whitespace-nowrap" onClick={() => navigate("/sales-report")}>
              <i className="icon icon-fullscreen"></i>
              <span>Sales Report</span>
            </div>
          </li>
        </ul>
      </div>

      {submenuOpen.forms && (
        <div
          style={{ top: submenuPosition.forms.top, left: submenuPosition.forms.left }}
          className="absolute z-10 bg-white text-gray-800 shadow-lg rounded-md"
        >
          <ul>
            <li className="hover:bg-gray-600 p-2 rounded">
              <div className="w-full" onClick={() => navigate("/viewProduct")}>
                View Product
              </div>
            </li>
            <li className="hover:bg-gray-600 p-2 rounded">
              <div className="w-full" onClick={() => navigate("/addProduct")}>
                Add Product
              </div>
            </li>
          </ul>
        </div>
      )}
      {submenuOpen.category && (
        <div
          style={{ top: submenuPosition.category.top, left: submenuPosition.category.left }}
          className="absolute z-10 bg-white text-gray-800 shadow-lg rounded-md"
        >
          <ul>
            <li className="hover:bg-gray-600 p-2 rounded">
              <div className="w-full" onClick={() => navigate("/viewCategory")}>
                View Category
              </div>
            </li>
            <li className="hover:bg-gray-600 p-2 rounded">
              <div className="w-full" onClick={() => navigate("/addCategory")}>
                Add Category
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
