import Navbar from "../components/Navbar";



export default function ViewBanner(){
    return(
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
            <th className="px-4 py-2 border-b text-sm md:text-base">Product </th>
            <th className="px-4 py-2 border-b text-sm md:text-base">Image</th>
            {/* <th className="px-4 py-2 border-b text-sm md:text-base">Quantity</th>
            <th className="px-4 py-2 border-b text-sm md:text-base">Category </th> */}
            <th className="px-4 py-2 border-b text-sm md:text-base">Delete</th>
            {/* <th className="px-4 py-2 border-b text-sm md:text-base">Edit</th> */}
          </tr>
        </thead>
        <tbody>
          {/* {products.map((row, index) => ( */}
            <tr 
            // key={index} 
            className=
            // {index % 2 === 0 ?
             "bg-gray-100" 
            //  : 
            //  "bg-white"
            // }
            >
              <td className="px-4 py-2 border-b text-sm md:text-base">{1}</td>
          

          
              <td className="px-4 py-2 border-b text-center text-sm md:text-base">
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                //   onClick={() => deleteProduct(row._id)}
                >
                  Delete
                </button>
              </td>
       
            </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  </div>
</div>
        </>
    )
}