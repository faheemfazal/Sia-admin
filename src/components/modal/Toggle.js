import React, { useEffect, useState } from 'react';
import { getOpenOrClose, postOpenOrClose } from '../../Api/Login';
import { TailSpin } from "react-loader-spinner";

const ToggleSwitch = () => {
    const [isOn, setIsOn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
     getOpenOrClose().then((res)=>{
            if(res.status===200){
                setIsOn(res.data.openORclosed)
                console.log(res);
            }else{
                alert('something went wrong')
            }
        })
    },[])

    const handleToggle = async() => {
        setLoading(true);
        const res = await postOpenOrClose(isOn)
        if(res.status===200){
            setIsOn(res.data.openORclosed)
            console.log(res,'p;p;p;');
        }else{
            alert('something went wrong')
        }
        setLoading(false);
    };

    return (
        <>
        <div className="flex gap-5 w-full justify-center items-center">
          <h1 className={`font-bold text-2xl flex justify-center items-center ${isOn? 'text-green-500' : 'text-red-500'}`}>{isOn?'OPEN':'CLOSED'}</h1>
          <div 
                className={`relative w-28 h-12 flex items-center rounded-full p-1 cursor-pointer ${isOn? 'bg-green-500' : 'bg-red-500'}`}
                onClick={handleToggle}
            >
                {loading? (
                    <TailSpin color="white" height={25} width={25} className="w-10 h-10 text-white"/>
                ) : (
                    <div 
                        className={`bg-white w-10 h-10 rounded-full shadow-md transform ${isOn? 'translate-x-16' : 'translate-x-0'} transition-transform duration-300`}
                    ></div>
                )}
            </div>
            
        </div>
        
        </>
    );
};

export default ToggleSwitch;