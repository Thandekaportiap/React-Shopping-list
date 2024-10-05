
import { NavLink } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLoginData, setLoginErrors } from '../features/Login/LoginSlice';

const Login = ({ onLogin }) => {
  const dispatch = useDispatch();
  const { loginData, loginErrors } = useSelector(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (loginData.username === "") {
      isValid = false;
      validationErrors.username = "Username is required";
    }

    if (loginData.password === "") {
      isValid = false;
      validationErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password length must be at least 6 characters";
    }

    dispatch(setLoginErrors(validationErrors));

    if (isValid) {
      axios.get('http://localhost:5000/users')
        .then(result => {
          const user = result.data.find(user => user.username === loginData.username);
          if (user) {
            if (user.password === loginData.password) {
              alert("Login Successfully: " + user.id);
              localStorage.setItem('loggedInUser', user.username);
              navigate('/DisplayShoppingList');
              onLogin(user.id);
            } else {
              dispatch(setLoginErrors({ password: "Wrong Password" }));
            }
          } else {
            dispatch(setLoginErrors({ username: "User not found" }));
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-1/2 p-5 rounded shadow">
        <h1 className="mb-2 text-3xl font-bold text-center">Welcome Back!</h1>
        <p className="mb-8 text-center text-white">Login Using Your UserName and Password</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="user-name" className="block mb-1 font-medium">UserName</label>
            <div className="flex items-center border-b-2 border-pink-500">
              <FaRegUser className="mr-2 text-pink-500" size={20} />
              <input
                type="text"
                id="user-name"
                placeholder="Enter your UserName"
                className="w-full p-2 outline-none"
                onChange={(e) => dispatch(setLoginData({ username: e.target.value }))}
              />
            </div>
            {loginErrors.username && <p className="text-sm text-red-500">{loginErrors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <div className="flex items-center border-b-2 border-pink-500">
              <RiLockPasswordLine className="mr-2 text-pink-500" size={20} />
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="w-full p-2 outline-none"
                onChange={(e) => dispatch(setLoginData({ password: e.target.value }))}
              />
            </div>
            {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password}</p>}
          </div>
          <a href="#" className="text-sm text-gray-600 underline">Forget password?</a>
          <button type="submit" className="bg-[#B1C98D] text-white px-4 py-2 rounded-md mt-8 w-full">Login</button>
        </form>
        <h3 className="mt-4">Don't have an Account?</h3>
        <NavLink to="/Register">
          <button className="bg-[#C087BF] hover:bg-[#B1C98D] text-white px-4 py-2 rounded-md mt-4 w-full">Signup</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
