import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { addNewProduct } from "../Api/product";
import { addNewCategory } from "../Api/Category";
import {useNavigate} from 'react-router-dom'
import { message } from "antd";

export default function AddCategory() {

  const [category,setCategory]=useState('')
  const [subCategory,setSubCategory]=useState('')

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [msg,setMsg]= useState('')


  // const [singleSelect, setSingleSelect] = useState('First option');


  // const handleMultiSelectChange = (e) => {
    
  // };


  // useEffect(()=>{

  // },[formData.category])






  const validateForm = () => {
    const newErrors = {};

    if (!category.trim()) {
        newErrors.category = "category is required.";
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    
    addNewCategory(category,subCategory).then((res)=>{
      console.log(res,'oooooooooooooooooooooo')
      if(res.status === 202){
        message.error(res.data.message);

        setMsg(res.data.message)
      }else{
        setMsg('')
        navigate('/viewCategory')

      }
    })
  };
  

  return (
    <>
      <Navbar />
      <div id="content bg-[#f5f5f5]" className="p-4">
        <div id="content-header" className="mb-4">
          <h1 className="text-2xl font-bold">Add New Category</h1>
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
                      value={category}
                      onChange={(e)=>setCategory(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Category"
                    />
                    {errors.category && <p className="text-red-500">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium">Sub category:</label>
                    <input
                      type="text"
                      name="subCategory"
                      value={subCategory}
                      onChange={(e)=>setSubCategory(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Sub Category"
                    />
                  
                  <h1 className="text-red-700">{msg}</h1>
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
  );
  
}
