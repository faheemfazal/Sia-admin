import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { editproduct, getEditProduct, updateProduct } from "../Api/product";
import { message } from 'antd';

export default function EditProduct(){


    const [productImage,setProductImage]=useState('')
    const [errors, setErrors] = useState({});
    const [availableHub, setAvailableHub] = useState([]);
    const [formData, setFormData] = useState({
        // productName: "",
        // category: "",
        // price: "",
        // quantity: "",
        // unit: "",
    
      });
      console.log(formData.category,'ooooooooooooooooooooo');
      const navigate = useNavigate()

     useEffect(()=>{
        getEditProduct(id).then((res)=>{
    setFormData(res.data.product)
    setAvailableHub(res.data.product.availableHub)
    setProductImage(res.data.product.productImageUrl)
        })
     },[]) 

      const upload_preset = 'vytol9u4'
      const cloud_name = 'djbokpgy8'
    const { id } = useParams();
    // console.log(row,'ppppppppppppppppp',row.productName);

    // console.log(row);
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value,'oo');
        setFormData({
          ...formData,
          [name]:  value,
        });
      };

      const validateForm = () => {
        const newErrors = {};
    
        if (!formData.productName.trim()) {
            newErrors.productName = "Product name is required.";
        }
        if (!formData.category) {
            newErrors.category = "Category is required.";
        }
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            newErrors.price = "Valid price is required.";
        }
        if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
            newErrors.quantity = "Valid quantity is required.";
        }
        if (formData.category === "KgBased" && !formData.unit) {
            newErrors.unit = "Unit is required for KG Based items.";
        }
        if (!productImage) {
            newErrors.productImage = "Product image is required.";
        }
        if (!formData.brand.trim()) { // Validation for brand
          newErrors.brand = "Brand is required.";
        }
        if (formData.itemBehaviour === "KG") {
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
    console.log(newErrors,'error');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleMultiSelectChange = (e) => {

        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setAvailableHub(prevState => {
          const newSelection = selectedOptions.filter(option => !prevState.includes(option));
          return [...prevState, ...newSelection];
        });
      };

      const handleFile = async (event) => {
        try {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            console.log(formData,'jijjij')
            formData.append('upload_preset', upload_preset)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            console.log(response.data.secure_url,'response')
            if (response?.data?.secure_url) {
            setProductImage(response.data.secure_url)
            console.log(productImage,'product image ')
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = (e) => {
      try{

        e.preventDefault();
        console.log(!validateForm(),'opop');
        if (!validateForm()) {
            return;
          }

          console.log('ppppp..');
        
          console.log('Multiple Select:', availableHub);
          console.log(formData);
          updateProduct(formData, productImage).then((res)=>{
            console.log(res)
            if(res?.status===200){
              message.success('Product successfully updated').then(()=>{
                navigate('/viewProduct');
              })

            }
          })
      }catch{

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
                      <div className="space-y-1">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="itemBehaviour"
                            value="KG"
                            checked={formData.itemBehaviour === "KG"}
                            onChange={handleChange}
                          />
                          <span>KG Based (Vegetables, Fruits)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="itemBehaviour"
                            value="PACKAGED"
                            checked={formData.itemBehaviour === "PACKAGED"}
                            onChange={handleChange}
                          />
                          <span>Packaged Items (Milk, Oil)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="itemBehaviour"
                        value="PIECE"
                        checked={formData.itemBehaviour === "PIECE"}
                        onChange={handleChange}
                      />
                      <span>Piece Items (Pen,Pencil)</span>
                    </label>
                      </div>
                      {errors.category && <p className="text-red-500">{errors.category}</p>}
                    </div>
    
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
    
                    <div className="flex items-center">
                      <div className="space-y-2 flex-1">
                        <label className="block font-medium">Quantity:</label>
                        <input
                          type="number"
                          name="quantity"
                          disabled={!formData.category}
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder="Quantity"
                        />
                        {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                      </div>
    
                      {formData.itemBehaviour === "KG" && (
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
    
                    {formData.itemBehaviour === "KG" ? (
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
                              value="PLATINUM"
                              checked={formData.coinType100g === "PLATINUM"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType100g"
                              value="SILVER"
                              checked={formData.coinType100g === "SILVER"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType100g"
                              value="GOLD"
                              checked={formData.coinType100g === "GOLD"}
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
                              value="PLATINUM"
                              checked={formData.coinType250g === "PLATINUM"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType250g"
                              value="SILVER"
                              checked={formData.coinType250g === "SILVER"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType250g"
                              value="GOLD"
                              checked={formData.coinType250g === "GOLD"}
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
                              value="PLATINUM"
                              checked={formData.coinType500g === "PLATINUM"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType500g"
                              value="SILVER"
                              checked={formData.coinType500g === "SILVER"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType500g"
                              value="GOLD"
                              checked={formData.coinType500g === "GOLD"}
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
                              value="PLATINUM"
                              checked={formData.coinType1kg === "PLATINUM"}
                              onChange={handleChange}
                            />
                            <span>Platinum</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType1kg"
                              value="SILVER"
                              checked={formData.coinType1kg === "SILVER"}
                              onChange={handleChange}
                            />
                            <span>Silver</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="coinType1kg"
                              value="GOLD"
                              checked={formData.coinType1kg === "GOLD"}
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
                        value="PLATINUM"
                        checked={formData.coinType === "PLATINUM"}
                        onChange={handleChange}
                      />
                      <span>Platinum</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="coinType"
                        value="SILVER"
                        checked={formData.coinType === "SILVER"}
                        onChange={handleChange}
                      />
                      <span>Silver</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="coinType"
                        value="GOLD"
                        checked={formData.coinType === "GOLD"}
                        onChange={handleChange}
                      />
                      <span>Gold</span>
                    </label>
                    {errors.coinType && <p className="text-red-500">{errors.coinType}</p>}
                  </div>
                    </>
                  )}


  
    {console.log(productImage,'opopop',productImage?.length)}
                    <div className="space-y-2">
                      <label className="block font-medium">File upload input:</label>
                      <img src={productImage?.length?productImage[0]:productImage} className=" "/>
                      <input
                        type="file"
                        onChange={handleFile}
                        className="w-full p-2 border rounded"
                      />
                      {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
                    </div>
    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}