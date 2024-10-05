import React, { useState } from 'react'; // Import React and useState hook
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; 
import { Link } from 'react-router-dom';
import Logo from '../assets/shopping-list.png'



const Navbar = ({ id, onLogout }) => {
   
    const [openNav, setOpenNav] = useState(true);

    const ToggleNavBar = () => {
        setOpenNav(!openNav);
    };

    return (
        <>
            {/* Main Navigation Bar */}
            <nav className=' border shadow-[#B1C98D] shadow-md flex justify-between items-center h-20 mx-auto px-5 text-[#C087BF]'>
                
                <img src={Logo} alt="Logo"  
                className='h-12 w-16'/>
                
                {/* Desktop Navigation Links */}
                <ul className='hidden md:flex space-x-6 text-xl  font-semibold'>

                   <li className='hover:text-[#B1C98D] active:bg-teal-700'> <Link to={"/"}> Home </Link> </li>
                   <li className='hover:text-[#B1C98D]'> <Link to={"/DisplayShoppingList"}> Shopping-List </Link> </li>
                    <li className='hover:text-[#B1C98D]'><Link to={"/AddNew"}> Add To List </Link></li>
                    {/* <li><Link to={"/Homelist"}> Homelist </Link></li> */}
                   
                </ul>
                
                {/* Desktop Buttons */}
                {id ? (
                    <>
                    <div className='hidden space-x-4 md:flex'>
                    <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded">
                      Logout
                    </button>
                    </div>
                  </>
                ) : (
                  <>
                <div className='hidden space-x-4 md:flex'>
                <Link to={"/Login"}><button className='border border-[#B1C98D] text-[#B1C98D]  py-2  hover:bg-[#B1C98D] hover:text-white px-4 font-bold rounded-md'>Login</button></Link>
                <Link to={"/Register"}><button className='border border-[#B1C98D] text-[#B1C98D] px-4 py-2 hover:bg-[#B1C98D] hover:text-white font-bold rounded-md'>Register</button></Link>
                </div>
                </>
          )}
                
                {/* Hamburger Menu Icon for Mobile */}
                <div className='fixed md:hidden right-6' onClick={ToggleNavBar}>
                    {/* Toggle between open and close icons based on openNav state */}
                    {!openNav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
                </div>

                {/* Mobile Navigation Menu */}
                <div className={!openNav ? 'left-[0%] fixed top-0 w-[60%] bg-slate-100 h-full block pl-4 pt-4 ease-in-out duration-500 md:hidden' : "fixed left-[100%] ease-in-out duration-500"}>
                    {/* Logo in Mobile Menu */}
                    <h1 className='text-[27px]  font-bold'>logo</h1>
                    
                    {/* Mobile Navigation Links */}
                    <ul className='block pt-8 space-y-4'>
                        <li className='border-b border-[#B1C98D]'> <Link to={"/"}> Home </Link>  </li>
                        <li className='border-b border-[#B1C98D]'> <Link to={"/RecipeList"}> Shopping-List </Link>  </li>
                        <li className='border-b border-[#B1C98D]'> <Link to={"/AddNew"}> Add To List </Link> </li>
                        {/* <li className='border-b border-[#B1C98D]'> <Link to={"/Homelist"}> Homelist </Link> </li> */}
                    </ul>
                    
                    {/* Mobile Buttons */}
                    {id ? (
                    <>
                    <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className='block pt-5 space-y-4'>
                    <Link to={'/LogIn'}><button className='border border-[#B1C98D] hover:bg-[#B1C98D] hover:text-white bg-violet-200 w-full py-2 text-[black] font-bold rounded-md block'>Login</button></Link>
                    <Link to={"/Register"}><button className='border border-[#B1C98D] hover:bg-[#B1C98D] hover:text-white bg-violet-200 w-full py-2 text-[black] font-bold rounded-md'>Register</button></Link>
                    </div>
                    </>
          )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;