import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {  updateProduct } from "../Api/product";
import { editCategory, updateCategory } from "../Api/Category";

export default function EditCategory(){


   
    const [category,setCategory]=useState('')
    const [subCategory,setSubCategory]=useState('')
    const [errors, setErrors] = useState({});
  
 
      const navigate = useNavigate()

     useEffect(()=>{
        editCategory(id).then((res)=>{
    setCategory(res.data.category.category)
    setSubCategory(res.data.category.subCategory)


        })
     },[]) 


    const { id } = useParams();


      const validateForm = () => {
        const newErrors = {};
    
        if (!category.trim()) {
            newErrors.productName = "Product name is required.";
        }
 
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
          }
        
      
          updateCategory(category,subCategory,id).then((res)=>{
            console.log(res)
            navigate('/viewProduct')
          })
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
                    <label className="block font-medium">Category:</label>
                    <input
                      type="text"
                      name="category"
                      value={subCategory}
                      onChange={(e)=>setCategory(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Category"
                    />
                    {errors.price && <p className="text-red-500">{errors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium">Sub category:</label>
                    <input
                      type="text"
                      name="subCategory"
                      value={category}
                      onChange={(e)=>setSubCategory(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Sub Category"
                    />
                 
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