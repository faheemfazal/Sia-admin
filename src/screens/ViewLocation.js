
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProduct ,editproduct,deleteproduct} from "../Api/product";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";




export default function ViewLocation(){

  const [products,setProducts]= useState([])
  const [msgDropdown,setMsgDropdown] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState({ forms: false, location: false });


  const navigate = useNavigate()
  

  const deleteProduct=(data)=>{
    deleteproduct(data).then((res)=>{
      alert(res.data.message)
    })
  }
  const editProduct =(data)=>{
editproduct(data).then((res)=>{
  console.log(res.data.message)
  alert(res.data.message)
})

  }

//   useEffect(()=>{
// getLocation().then((res)=>{
//   console.log('theeeeeee',res)
//   setProducts(res.data.products)
//   console.log(products,'hhhh')
// })
//   },[])
   
    return (
        <>
        <Navbar />

        <div className="container  mx-auto p-4">
      <div className="mb-4">
  
        <h1 className="text-2xl font-semibold mt-2">View Product</h1>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden border-2 border-gray-300" >
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
              


              </tr>
            </thead>
            <tbody>
              {products.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="px-4 py-2 border-b">{row.productName}</td>
                  <td className="px-4 py-2 border-b">{row.price}</td>
                  <td className="px-4 py-2 border-b text-center">{row.quantity}</td>
      
        <td className="px-4 py-2 border-b text-center"><button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={()=>deleteProduct(row._id)}  >Red</button>
</td>
        <td className="px-4 py-2 border-b text-center"><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        onClick={()=>navigate(`/editproduct/${row._id}`)}>Red</button>
</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </>
    )
}