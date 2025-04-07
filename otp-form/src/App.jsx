import { useState } from 'react';
import './App.css'
import OtpForm from './components/otp-form'


function App() {
  const [isLoading, setLoading] = useState(false);
  const otpLength = 4
  const onOtpSubmit = (otpVal) => {
    setLoading(true);
    if(otpVal.length !== otpLength) return;
    setTimeout(() => {
        alert("Recieved OTP  :: " , otpVal)
        setLoading(false);

    } , 2 *1000)
  }
  return <>
    <h1>OTP SUBMIT FORM</h1>
    <OtpForm length={otpLength} onOtpSubmit={onOtpSubmit} />
    <button disabled={isLoading} onClick={onOtpSubmit}>Submit OTP</button>
  </>
}

export default App
