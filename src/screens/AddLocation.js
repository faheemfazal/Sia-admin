import axios from "axios";
import Navbar from "../components/Navbar";


import {useState} from 'react'
import { createLocation } from "../Api/LocationAdd";


export default function AddLocation(){


      const [hubName,setHubName] = useState('')
      const [hubImage,setHubImage]=useState('')
      const [hubNameErr,setHubNameErr]=useState('')

      
      const upload_preset = 'vytol9u4'
      const cloud_name = 'djbokpgy8'



      const [latitude, setLatitude] = useState('');
      const [longitude, setLongitude] = useState('');
      
      const [msg, setMsg] = useState('');
      const [errors, setErrors] = useState({});
      const [error,setError] = useState('')



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
            setHubImage(response.data.secure_url)
            console.log(hubImage,'product image ')
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    
      const handleGetLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              setError('');
            },
            (error) => {
              setError('Error getting location');
              setLatitude('');
              setLongitude('');
            }
          );
        } else {
          setError('Geolocation is not supported by this browser');
        }
      };


      const validateForm = () => {
        const newErrors = {};
    
        if(!hubImage){
          newErrors.hubName ='Hub name is required'
        }
  
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
         

        if (!validateForm()) {
          return;
        }

        if (!latitude || !longitude ) {
          setError('Location is required')
        }else{
          setErrors('');
          setMsg(`Location submitted: Latitude ${latitude}, Longitude ${longitude}`);
          console.log(latitude,longitude,hubName,hubImage,'ppppppppppppppppp');
          const res = await createLocation(hubName,hubImage,latitude,longitude)
         
          if(res.message){
            alert(res.message)
          }

        }
          // Add your form submission logic here
        
      };


    
      // useEffect(()=>{
    
      // },[formData.category])

    
      // const handleSubmit = (e) => {
      //   e.preventDefault();
      //   // Handle form submission logic here
      //   console.log(formData);
      // };

    return (
        <>
        <Navbar />
        <div id="content bg-[#f5f5f5]" className="p-4">
          <div id="content-header" className="mb-4">
            <h1 className="text-2xl font-bold">Add New Hub</h1>
          </div>
          <div className="md:mx-10 mx-3 ">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <div className="p-4 rounded shadow bg-[#f5f5f5]">
                  <div className="border-b pb-2 mb-4 bg-[#efefef]">
                    <span className="icon mr-2">
                      <i className="icon-align-justify"></i>
                    </span>
                    {/* <h5 className="inline font-bold">Hub-info</h5> */}
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block font-medium">Hub Name (location):</label>
                      <input
                        type="text"
                        name="productName"
                        value={hubName}
                        onChange={(e)=>setHubName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Product name"
                      />
                    </div>
              <h1 className="text-red-600">{hubNameErr}</h1>

  
      
  
        
  
                    <div className="space-y-2">
                          <p className="normal_text text-center mb-6">Add your live location.</p>
        <div className="control-group mb-4">
          <div className="controls gap-5">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
              onClick={handleGetLocation}
            >
              Get Location
            </button>
            <div className="main_input_box flex items-center border border-gray-300 rounded p-2 mb-2">
              <input
                type="text"
                placeholder="Latitude"
                className="flex-1 outline-none"
                value={latitude}
                readOnly
              />
            </div>
            <div className="main_input_box flex items-center border border-gray-300 rounded p-2">
              <input
                type="text"
                placeholder="Longitude"
                className="flex-1 outline-none"
                value={longitude}
                readOnly
              />
            </div>
              <h1 className="text-red-600">{error}</h1>
          </div>
        </div>
                    </div>
  
                    <div className='flex items-center'>
  
  

                    </div>
                    <div className="space-y-2">
                      <label className="block font-medium">Upload hub image:</label>
                      <input
                        type="file"
                        name="file"
                        onChange={handleFile}
                        className="w-full p-2 border rounded"
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