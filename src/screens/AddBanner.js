import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { addNewBanner } from "../Api/Banner";



export default function Banner() {

    const [loading,setLoading] = useState(false)
    const [bannerImage,setBannerImage]=useState("")
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const navigate = useNavigate()
    const upload_preset = 'vytol9u4';
    const cloud_name = 'djbokpgy8';

    const handleFile = async (event) => {
        try {
          setLoading(true);
    
          const file = event.target.files[0];
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', upload_preset);
          const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
          if (response?.data?.secure_url) {
            setBannerImage(response.data.secure_url);
            setLoading(false);
    
          }
        } catch (error) {
          console.log(error);
        }
      };

      const validateForm = () => {
        const newErrors = {};
      

      
        // Product image validation
        if (!bannerImage) {
                newErrors.bannerImage = "Image is required.";
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
      setIsSubmitting(true); // Disable the button

      console.log('Form submitted',bannerImage);
      addNewBanner(bannerImage).then((res) => {
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
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

return(
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
                    <label className="block font-medium">Product Image:</label>
                    <input type="file" onChange={handleFile} className="w-full" />
                  {loading ? (
          <div className="mt-2 w-32 h-32 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : (
            bannerImage && <img src={bannerImage} alt="Product" className="mt-2 w-32 h-32 object-cover" />
        )}
                    {errors.bannerImage && <p className="text-red-500">{errors.bannerImage}</p>}
                  </div>

                  <div className="mt-4">
                  <button
  type="submit"
  className={`px-4 py-2 rounded ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
  disabled={isSubmitting} // Disable the button when submitting
>
  Add Banner
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