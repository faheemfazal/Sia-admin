import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { addNewProduct } from "../Api/product";
import { getCategory } from "../Api/Category";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    itemBehaviour: "",
    price: '',
    quantity: "",
    unit: "",
    subCategory: "",
    description: "", // New field for description
    brand: "", // New field for brand
    coin100g: "",
    coinType100g: "",
    coin250g: "",
    coinType250g: "",
    coin500g: "",
    coinType500g: "",
    coin1kg: "",
    coinType1kg: "",
    coin: "", // New field for non-Kg items
    coinType: "" // New field for non-Kg items
  });

  const [productImage, setProductImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const upload_preset = 'vytol9u4';
  const cloud_name = 'djbokpgy8';

  useEffect(() => {
    getCategory().then((res) => {
      setCategories(res?.data?.categories);
    });
  }, []);

  // const handleFile = async (event) => {
  //   try {
  //     const file = event.target.files[0];
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('upload_preset', upload_preset);
  //     const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
  //     if (response?.data?.secure_url) {
  //       setProductImage(response.data.secure_url);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


    const handleFile = async (event) => {
    try {
      setLoading(true);

      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', upload_preset);
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
      if (response?.data?.secure_url) {
        setProductImage(response.data.secure_url);
        setLoading(false);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat.categoryName === value);
      setSubCategories(selectedCategory ? selectedCategory.subCategory : []);
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Basic validations (already defined in previous response)
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required.";
    }
  
    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }
  
    // Price validation
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Valid price is required.";
    }
  
    // Quantity validation
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
      newErrors.quantity = "Valid quantity is required.";
    }
  
    // Unit validation for KG based items
    if (formData.itemBehaviour === "Kg" && !formData.unit) {
      newErrors.unit = "Unit is required for KG Based items.";
    }
  
    // Brand validation
    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required.";
    }
  
    // Product image validation
    if (!productImage) {
            newErrors.productImage = "Product image is required.";
          }
  
    // Validate coin values and types based on itemBehaviour
    if (formData.itemBehaviour === "Kg") {
      // Validate coin values for KG items
      if (!formData.coin100g || isNaN(formData.coin100g) || formData.coin100g < 0) {
        newErrors.coin100g = "Valid coin value for 100g is required.";
      }
      if (!formData.coin250g || isNaN(formData.coin250g) || formData.coin250g < 0) {
        newErrors.coin250g = "Valid coin value for 250g is required.";
      }
      if (!formData.coin500g || isNaN(formData.coin500g) || formData.coin500g < 0) {
        newErrors.coin500g = "Valid coin value for 500g is required.";
      }
      if (!formData.coin1kg || isNaN(formData.coin1kg) || formData.coin1kg < 0) {
        newErrors.coin1kg = "Valid coin value for 1kg is required.";
      }
  
      // Validate coin types for KG items
      if (!formData.coinType100g) {
        newErrors.coinType100g = "Coin type for 100g is required.";
      }
      if (!formData.coinType250g) {
        newErrors.coinType250g = "Coin type for 250g is required.";
      }
      if (!formData.coinType500g) {
        newErrors.coinType500g = "Coin type for 500g is required.";
      }
      if (!formData.coinType1kg) {
        newErrors.coinType1kg = "Coin type for 1kg is required.";
      }
    } else {
      // Validate coin value for non-KG items
      if (!formData.coin || isNaN(formData.coin) || formData.coin < 0) {
        newErrors.coin = "Valid coin value is required.";
      }
  
      // Validate coin type for non-KG items
      if (!formData.coinType) {
        newErrors.coinType = "Coin type is required.";
      }
    }
  
    // Set errors state and return validity
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      console.log('Form submitted',formData,productImage);
      addNewProduct(formData, productImage).then((res) => {
        console.log(res, 'Product added');
        if (res.status === 200) {
          message.success('Product successfully added').then(() => {
            navigate('/viewProduct');
          })
        } else {
          message.error('Product name already existed');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <div id="content bg-[#f5f5f5]" className="p-4">
        <div id="content-header" className="mb-4">
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>
        <div className="md:mx-10 mx-3 ">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="p-4 rounded shadow bg-[#f5f5f5]">
                <div className="border-b pb-2 mb-4 bg-[#efefef]">
                  <span className="icon mr-2">
                    <i className="icon-align-justify"></i>
                  </span>
                  <h5 className="inline font-bold">Product-info</h5>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block font-medium">Product name:</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Product name"
                    />
                    {errors.productName && <p className="text-red-500">{errors.productName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium">Category:</label>
                    <select
                      value={formData.category}
                      onChange={handleChange}
                      name="category"
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select a category</option>
                      {categories.map((data, i) => (
                        <option key={i} value={data.categoryName}>
                          {data.categoryName}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500">{errors.category}</p>}
                  </div>

                  {subCategories.length !== 0 && (
                    <div className="space-y-2">
                      <label className="block font-medium">Sub Category:</label>
                      <select
                        value={formData.subCategory}
                        onChange={handleChange}
                        name="subCategory"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select a sub category</option>
                        {subCategories.map((subCat, i) => (
                          <option key={i} value={subCat}>
                            {subCat}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block font-medium">Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Price"
                    />
                    {errors.price && <p className="text-red-500">{errors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium">Item behaviour:</label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="itemBehaviour"
                        value="Kg"
                        checked={formData.itemBehaviour === "Kg"}
                        onChange={handleChange}
                      />
                      <span>KG Based (Vegetables, Fruits)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="itemBehaviour"
                        value="Packaged"
                        checked={formData.itemBehaviour === "Packaged"}
                        onChange={handleChange}
                      />
                      <span>Packaged Items (Milk, Oil)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="itemBehaviour"
                        value="Piece"
                        checked={formData.itemBehaviour === "Piece"}
                        onChange={handleChange}
                      />
                      <span>Piece Items (Pen, Pencil)</span>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <div className="space-y-2 flex-1">
                      <label className="block font-medium">Quantity:</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Quantity"
                      />
                      {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                    </div>
                    {formData.itemBehaviour === "Kg" && (
                      <div className="space-y-2 flex-1 pl-4">
                        <label className="block font-medium">Unit:</label>
                        <div className="space-y-1">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="unit"
                              value="KG"
                              checked={formData.unit === "KG"}
                              onChange={handleChange}
                            />
                            <span>KG</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="unit"
                              value="G"
                              checked={formData.unit === "G"}
                              onChange={handleChange}
                            />
                            <span>G</span>
                          </label>
                        </div>
                        {errors.unit && <p className="text-red-500">{errors.unit}</p>}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium">Brand:</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Brand"
                    />
                    {errors.brand && <p className="text-red-500">{errors.brand}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium">Description:</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Description"
                    />
                  </div>






                  {formData.itemBehaviour === "Kg" ? (
                    <>
                      <div className="space-y-2">
                        <label className="block font-medium">100g Coin:</label>
                        <input
                          type="number"
                          name="coin100g"
                          value={formData.coin100g}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder="Coin value for 100g"
                        />
                        {errors.coin100g && <p className="text-red-500">{errors.coin100g}</p>}
                        <div className="space-y-2">
                          <label className="block font-medium">Coin Type:</label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType100g"
                              value="Platinum"
                              checked={formData.coinType100g === "Platinum"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType100g"
                              value="Silver"
                              checked={formData.coinType100g === "Silver"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType100g"
                              value="Gold"
                              checked={formData.coinType100g === "Gold"}
                              onChange={handleChange}
                            />
                            <span>Gold</span>
                          </label>
                          {errors.coinType100g && <p className="text-red-500">{errors.coinType100g}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-medium">250g Coin:</label>
                        <input
                          type="number"
                          name="coin250g"
                          value={formData.coin250g}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder="Coin value for 250g"
                        />
                        {errors.coin250g && <p className="text-red-500">{errors.coin250g}</p>}
                        <div className="space-y-2">
                          <label className="block font-medium">Coin Type:</label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType250g"
                              value="Platinum"
                              checked={formData.coinType250g === "Platinum"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType250g"
                              value="Silver"
                              checked={formData.coinType250g === "Silver"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType250g"
                              value="Gold"
                              checked={formData.coinType250g === "Gold"}
                              onChange={handleChange}
                            />
                            <span>Gold</span>
                          </label>
                          {errors.coinType250g && <p className="text-red-500">{errors.coinType250g}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-medium">500g Coin:</label>
                        <input
                          type="number"
                          name="coin500g"
                          value={formData.coin500g}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder="Coin value for 500g"
                        />
                        {errors.coin500g && <p className="text-red-500">{errors.coin500g}</p>}
                        <div className="space-y-2">
                          <label className="block font-medium">Coin Type:</label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType500g"
                              value="Platinum"
                              checked={formData.coinType500g === "Platinum"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType500g"
                              value="Silver"
                              checked={formData.coinType500g === "Silver"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType500g"
                              value="Gold"
                              checked={formData.coinType500g === "Gold"}
                              onChange={handleChange}
                            />
                            <span>Gold</span>
                          </label>
                          {errors.coinType500g && <p className="text-red-500">{errors.coinType500g}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-medium">1kg Coin:</label>
                        <input
                          type="number"
                          name="coin1kg"
                          value={formData.coin1kg}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder="Coin value for 1kg"
                        />
                        {errors.coin1kg && <p className="text-red-500">{errors.coin1kg}</p>}
                        <div className="space-y-2">
                          <label className="block font-medium">Coin Type:</label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType1kg"
                              value="Platinum"
                              checked={formData.coinType1kg === "Platinum"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType1kg"
                              value="Silver"
                              checked={formData.coinType1kg === "Silver"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType1kg"
                              value="Gold"
                              checked={formData.coinType1kg === "Gold"}
                              onChange={handleChange}
                            />
                            <span>Gold</span>
                          </label>
                          {errors.coinType1kg && <p className="text-red-500">{errors.coinType1kg}</p>}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                    <label className="block font-medium">Coin:</label>
                    <input
                      type="number"
                      name="coin"
                      value={formData.coin}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Coin"
                    />
                    {errors.coin && <p className="text-red-500">{errors.coin}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium">Coin Type:</label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="coinType"
                        value="Platinum"
                        checked={formData.coinType === "Platinum"}
                        onChange={handleChange}
                      />
                      <span>Platinum</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="coinType"
                        value="Silver"
                        checked={formData.coinType === "Silver"}
                        onChange={handleChange}
                      />
                      <span>Silver</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="coinType"
                        value="Gold"
                        checked={formData.coinType === "Gold"}
                        onChange={handleChange}
                      />
                      <span>Gold</span>
                    </label>
                    {errors.coinType && <p className="text-red-500">{errors.coinType}</p>}
                  </div>
                    </>
                  )}

<div className="space-y-2">
                    <label className="block font-medium">Product Image:</label>
                    <input type="file" onChange={handleFile} className="w-full" />
                  {loading ? (
          <div className="mt-2 w-32 h-32 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : (
          productImage && <img src={productImage} alt="Product" className="mt-2 w-32 h-32 object-cover" />
        )}
                    {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
            



          </div>
        </div>
      </div>
    </>
  );
}




// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { addNewProduct } from "../Api/product";
// import { getCategory } from "../Api/Category";
// import { useNavigate } from 'react-router-dom';
// import { message } from 'antd';

// export default function AddProduct() {
//   const [formData, setFormData] = useState({
//     productName: "",
//     category: "",
//     itemBehaviour: "",
//     price: '',
//     quantity: "",
//     unit: "",
//     subCategory: "",
//     description: "", // New field for description
//     brand: "" ,// New field for brand
//     coin:"",
//     coinType:''
//   });

//   const [productImage, setProductImage] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const upload_preset = 'vytol9u4';
//   const cloud_name = 'djbokpgy8';

//   useEffect(() => {
//     getCategory().then((res) => {
//       setCategories(res?.data?.categories);
//     });
//   }, []);

//   const handleFile = async (event) => {
//     try {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', upload_preset);
//       const response = await axios.post(https://api.cloudinary.com/v1_1/${cloud_name}/image/upload, formData);
//       if (response?.data?.secure_url) {
//         setProductImage(response.data.secure_url);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     if (name === 'category') {
//       const selectedCategory = categories.find(cat => cat.categoryName === value);
//       setSubCategories(selectedCategory ? selectedCategory.subCategory : []);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.productName.trim()) {
//       newErrors.productName = "Product name is required.";
//     }
//     if (!formData.category) {
//       newErrors.category = "Category is required.";
//     }
//     if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
//       newErrors.price = "Valid price is required.";
//     }
//     if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
//       newErrors.quantity = "Valid quantity is required.";
//     }
//     if (formData.itemBehaviour === "Kg" && !formData.unit) {
//       newErrors.unit = "Unit is required for KG Based items.";
//     }
//     if (!formData.brand.trim()) { // Validation for brand
//       newErrors.brand = "Brand is required.";
//     }
//     if (!productImage) {
//       newErrors.productImage = "Product image is required.";
//     }
//     if (!formData.coin || isNaN(formData.coin) || formData.coin <= 0) {
//       newErrors.coin = "Valid coin value is required.";
//     }
//     if (!formData.coinType) {
//       newErrors.coinType = "Coin type is required.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     try{
//       e.preventDefault();
//       if (!validateForm()) {
//         return;
//       }
//       console.log('Form submitted');
//       addNewProduct(formData, productImage).then((res) => {
//         console.log(res, 'Product added');
//         if (res.status === 200) {
//           message.success('Product successfully added').then(()=>{
//             navigate('/viewProduct');
//           })
//         } else {
//           message.error('Product name already existed');
//         }
//       });
//     }catch(e){
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div id="content bg-[#f5f5f5]" className="p-4">
//         <div id="content-header" className="mb-4">
//           <h1 className="text-2xl font-bold">Add New Product</h1>
//         </div>
//         <div className="md:mx-10 mx-3 ">
//           <div className="flex flex-wrap -mx-2">
//             <div className="w-full md:w-1/2 px-2 mb-4">
//               <div className="p-4 rounded shadow bg-[#f5f5f5]">
//                 <div className="border-b pb-2 mb-4 bg-[#efefef]">
//                   <span className="icon mr-2">
//                     <i className="icon-align-justify"></i>
//                   </span>
//                   <h5 className="inline font-bold">Product-info</h5>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="block font-medium">Product name:</label>
//                     <input
//                       type="text"
//                       name="productName"
//                       value={formData.productName}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                       placeholder="Product name"
//                     />
//                     {errors.productName && <p className="text-red-500">{errors.productName}</p>}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block font-medium">Category:</label>
//                     <select
//                       value={formData.category}
//                       onChange={handleChange}
//                       name="category"
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map((data, i) => (
//                         <option key={i} value={data.categoryName}>
//                           {data.categoryName}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.category && <p className="text-red-500">{errors.category}</p>}
//                   </div>

//                   {subCategories.length !== 0 && (
//                     <div className="space-y-2">
//                       <label className="block font-medium">Sub Category:</label>
//                       <select
//                         value={formData.subCategory}
//                         onChange={handleChange}
//                         name="subCategory"
//                         className="w-full p-2 border rounded"
//                       >
//                         <option value="">Select a sub category</option>
//                         {subCategories.map((subCat, i) => (
//                           <option key={i} value={subCat}>
//                             {subCat}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   <div className="space-y-2">
//                     <label className="block font-medium">Price:</label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                       placeholder="Price"
//                     />
//                     {errors.price && <p className="text-red-500">{errors.price}</p>}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block font-medium">Item behaviour:</label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="itemBehaviour"
//                         value="Kg"
//                         checked={formData.itemBehaviour === "Kg"}
//                         onChange={handleChange}
//                       />
//                       <span>KG Based (Vegetables, Fruits)</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="itemBehaviour"
//                         value="Packaged"
//                         checked={formData.itemBehaviour === "Packaged"}
//                         onChange={handleChange}
//                       />
//                       <span>Packaged Items (Milk, Oil)</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="itemBehaviour"
//                         value="Piece"
//                         checked={formData.itemBehaviour === "Piece"}
//                         onChange={handleChange}
//                       />
//                       <span>Piece Items (Pen,Pencil)</span>
//                     </label>
                    
//                   </div>

//                   <div className="flex items-center">
//                     <div className="space-y-2 flex-1">
//                       <label className="block font-medium">Quantity:</label>
//                       <input
//                         type="number"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleChange}
//                         className="w-full p-2 border rounded"
//                         placeholder="Quantity"
//                       />
//                       {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
//                     </div>
                
//                     {formData.itemBehaviour === "Kg" && (
//                       <div className="space-y-2 flex-1 pl-4">
//                         <label className="block font-medium">Unit:</label>
//                         <div className="space-y-1">
//                           <label className="flex items-center space-x-2">
//                             <input
//                               type="radio"
//                               name="unit"
//                               value="KG"
//                               checked={formData.unit === "KG"}
//                               onChange={handleChange}
//                             />
//                             <span>KG</span>
//                           </label>
//                           <label className="flex items-center space-x-2">
//                             <input
//                               type="radio"
//                               name="unit"
//                               value="G"
//                               checked={formData.unit === "G"}
//                               onChange={handleChange}
//                             />
//                             <span>G</span>
//                           </label>
//                         </div>
//                         {errors.unit && <p className="text-red-500">{errors.unit}</p>}
//                       </div>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block font-medium">Brand:</label>
//                     <input
//                       type="text"
//                       name="brand"
//                       value={formData.brand.toUpperCase()}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                       placeholder="Brand"
//                     />
//                     {errors.brand && <p className="text-red-500">{errors.brand}</p>}
//                   </div>

                  


//                   <div className="space-y-2">
//                     <label className="block font-medium">Description:</label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                       placeholder="Description"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block font-medium">Coin:</label>
//                     <input
//                       type="number"
//                       name="coin"
//                       value={formData.coin}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                       placeholder="Coin"
//                     />
//                     {errors.coin && <p className="text-red-500">{errors.coin}</p>}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block font-medium">Coin Type:</label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="coinType"
//                         value="Platinum"
//                         checked={formData.coinType === "Platinum"}
//                         onChange={handleChange}
//                       />
//                       <span>Platinum</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="coinType"
//                         value="Silver"
//                         checked={formData.coinType === "Silver"}
//                         onChange={handleChange}
//                       />
//                       <span>Silver</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="coinType"
//                         value="Gold"
//                         checked={formData.coinType === "Gold"}
//                         onChange={handleChange}
//                       />
//                       <span>Gold</span>
//                     </label>
//                     {errors.coinType && <p className="text-red-500">{errors.coinType}</p>}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block font-medium">Product Image:</label>
//                     <input type="file" onChange={handleFile} className="w-full" />
//                     {productImage && <img src={productImage} alt="Product" className="mt-2 w-32 h-32 object-cover" />}
//                     {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
//                   </div>






//                   <div className="mt-4">
//                     <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//                       Add Product
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div className="w-full md:w-1/2 px-2">
//               {/* Placeholder for additional content */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }