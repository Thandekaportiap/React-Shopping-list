import React from 'react';
import { FaRegUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAttachEmail } from "react-icons/md";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setErrors, setValid, resetForm } from '../features/Signup/SignupSlice';
import { NavLink } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, errors, valid } = useSelector(state => state.register);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    // Validation logic
    if (formData.username === "") {
      isValid = false;
      validationErrors.username = "Username is required";
    }
    if (formData.email === "") {
      isValid = false;
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email is not valid";
    }
    if (formData.password === "") {
      isValid = false;
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password length must be at least 6 characters";
    }
    if (formData.confirmpassword !== formData.password) {
      isValid = false;
      validationErrors.confirmpassword = "Passwords do not match";
    }

    dispatch(setErrors(validationErrors));
    dispatch(setValid(isValid));

    if (isValid) {
      axios.post('http://localhost:5000/users', formData)
        .then(result => {
          alert("Registered Successfully");
          dispatch(resetForm());
          navigate('/Login');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-1/2 p-3 rounded shadow">
        <h1 className="mb-2 text-3xl font-bold text-center">Register</h1>
        <p className="mb-8 text-center text-white">Create your new account with TDList</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block mb-1 font-medium">User Name</label>
            <div className="flex items-center border rounded-md" style={{ backgroundColor: 'pink' }}>
              <FaRegUser className="p-2" />
              <input 
                type="text" 
                id="userName" 
                placeholder="Enter Your New UserName" 
                className="w-full p-2 bg-pink-200 border-none outline-none" 
                value={formData.username}
                onChange={(e) => dispatch(setFormData({ ...formData, username: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
            <div className="flex items-center border rounded-md" style={{ backgroundColor: 'pink' }}>
              <MdOutlineAttachEmail className="p-2" />
              <input 
                type="email" 
                id="email" 
                placeholder="Enter Your E-mail" 
                className="w-full p-2 bg-pink-200 border-none outline-none" 
                value={formData.email}
                onChange={(e) => dispatch(setFormData({ ...formData, email: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <div className="flex items-center border rounded-md" style={{ backgroundColor: 'pink' }}>
              <RiLockPasswordLine className="p-2" />
              <input 
                type="password" 
                id="password" 
                placeholder="Create Your Password" 
                className="w-full p-2 bg-pink-200 border-none outline-none" 
                value={formData.password}
                onChange={(e) => dispatch(setFormData({ ...formData, password: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-1 font-medium">Confirm Password</label>
            <div className="flex items-center border rounded-md" style={{ backgroundColor: 'pink' }}>
              <RiLockPasswordLine className="p-2" />
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="Confirm Password" 
                className="w-full p-2 bg-pink-200 border-none outline-none" 
                value={formData.confirmpassword}
                onChange={(e) => dispatch(setFormData({ ...formData, confirmpassword: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <input type="checkbox" id="keep-signed-in" className="mr-2" />
            <label htmlFor="keep-signed-in">Remember my password</label>
          </div>
          
          <button type="submit" className="w-full px-4 py-2 mt-8 text-white bg-[#B1C98D] rounded-md">Register</button>
          
          <h3 className="mt-4">Already have an Account?</h3>
          <NavLink to={'/logIn'}>
            <button className="w-full px-4 py-2 mt-2 rounded-md bg-[#C087BF] hover:bg-[#B1C98D] text-white">Log In</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
