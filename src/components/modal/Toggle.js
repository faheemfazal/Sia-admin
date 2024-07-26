import React, { useState } from 'react';

const ToggleSwitch = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="flex  ">
          Shop Closed <div 
                className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={handleToggle}
            >
                <div 
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform ${isOn ? 'translate-x-8' : 'translate-x-0'} transition-transform duration-300`}
                ></div>
            </div>Shop open
        </div>
    );
};

export default ToggleSwitch;
