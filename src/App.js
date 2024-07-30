import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import   {useEffect,useState} from 'react'
import AddProduct from './screens/AddProduct';
import HomeScreen from './screens/HomeScreen';
import ViewProduct from './screens/ViewProduct';
import ViewLocation from './screens/ViewLocation';
import AddLocation from './screens/AddLocation';
import UserDetails from './screens/UserDetails';
import Login from './screens/Login';
import EditProduct from './screens/EditProduct';
import AddCategory from './screens/AddCategory';
import ViewCategory from './screens/ViewCategory';
import Orders from './screens/Orders';
import OrderDetails from './screens/OrderView';
import SalesReport from './screens/SalesReport';
import Banner from './screens/AddBanner';
import ViewBanner from './screens/ViewBanner';

function App() {
  const  [adminToken,setAdminToken]=useState(localStorage.getItem('adminToken'))
  useEffect(()=>{

  },[adminToken])
console.log('dfdfd',adminToken);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {adminToken ? (
            <>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/users" element={<UserDetails />} />
              <Route path="/viewProduct" element={<ViewProduct />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/viewLocation" element={<ViewLocation />} />
              <Route path="/addLocation" element={<AddLocation />} />
              <Route path="/addCategory" element={<AddCategory />} />
              <Route path="/addBanner" element={<Banner />} />
              <Route path="/viewBanner" element={<ViewBanner />} />
              <Route path="/viewCategory" element={<ViewCategory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/sales-report" element={<SalesReport />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />
              <Route path="/order-detail/:orderId" element={<OrderDetails />} />
              <Route path="*" element={<Navigate to="/home" />} />

            </>
          ) : (
            <>
              <Route path="/" element={<Login   setAdminToken={setAdminToken}/>} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
