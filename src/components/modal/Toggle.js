import React, { useState } from 'react';

const ToggleSwitch = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="flex  ">
          <h1 className={`font-bold  ${isOn ? 'bg-green-500' : 'bg-red-500'}`}>{isOn?'OPEN':'CLOSED'}</h1>
          <div 
                className={`relative w-28 h-12 flex items-center rounded-full p-1 cursor-pointer ${isOn ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={handleToggle}
            >
                <div 
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform ${isOn ? 'translate-x-8' : 'translate-x-0'} transition-transform duration-300`}
                ></div>
            </div>
            
        </div>
    );
};

export default ToggleSwitch;
