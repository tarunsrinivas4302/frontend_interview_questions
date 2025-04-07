import React, { useEffect, useRef, useState } from 'react'

const OtpForm = ({length  , onOtpSubmit}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);
    
    useEffect(() => {
        if(inputRefs.current[0]) inputRefs.current[0].focus();
    }, [])
    
    const handleInputChange = (e , index) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        
        // Setting the Input value to that index
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length -1);
        setOtp(newOtp);
    
        // Auto Submitting the trigger when it fills with the given length
        const combinedOtp =  newOtp.join("");
        if(combinedOtp.length === length) onOtpSubmit(newOtp)

        // Focus to Next Index when the Value is Present and index is with in range and next Ref avaliable  
        if(value && index < length - 1 && inputRefs.current[index + 1])inputRefs.current[index + 1].focus();
    }
    
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1);
    }
    const handleKeyDown = (e , index) => {
        if(e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index -1]) inputRefs.current[index -1].focus();
    }
    return (
        <div className='otp-container'>
            {
                otp.map((val , index) => (
                    <input type='text' 
                        key={index}
                        ref={(input) => (inputRefs.current[index] = input)} 
                        value={val} 
                        onChange={(e) => handleInputChange(e , index)}
                        onClick={() => handleClick()}
                        onKeyDown={handleKeyDown}
                    /> 
                ))
            }            
        </div>
  )
}

export default OtpForm
