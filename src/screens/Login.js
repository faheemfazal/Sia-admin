import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Api/Login";


export default function Login({setAdminToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError('Both fields are required');
    } else if (!validateEmail(email)) {
      setError('Invalid email format');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long');
    } else {
      setError('');
      // Perform login logic (e.g., API call)
      // Assuming axiosAdmin is properly set up for API calls
      login(  email, password )
        .then(response => {
          if(response?.status==200){
            setAdminToken(localStorage.getItem('adminToken'))
            console.log(';;;;;;;;;;;;;;;;;;;;');
            navigate('/home');

          }else{

          }
          // Handle successful login
        })
        .catch(error => {
          // Handle login error
          setError('Login failed. Please check your credentials.');
        });
    }
  };

  return (
    <div id="loginbox" className="flex justify-center items-center h-screen bg-gray-100">
      <form
        id="recoverform"
        className="form-vertical w-full max-w-sm bg-white p-6 rounded shadow-md"
        onSubmit={handleLogin}
      >
        <p className="normal_text text-center mb-6">Enter your e-mail and password.</p>
        <div className="control-group mb-4">
          <div className="controls gap-5">
            <div className="main_input_box flex items-center border border-gray-300 rounded p-2">
              <input
                type="text"
                placeholder="E-mail"
                className="flex-1 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="main_input_box mt-3 flex items-center border border-gray-300 rounded p-2">
              <input
                type="password"
                placeholder="Password"
                className="flex-1 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="form-actions flex justify-end items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
