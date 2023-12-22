import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>

const logOutNotify = () => toast.success("Log out successfully!", {position: "top-center",autoClose: 1000});

    const handleLogout = () => {
        logOut()
            .then(result => {
                console.log(result)
                logOutNotify();
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/">
                        <img className="h-11 w-11 lg:block hidden" src={logo} alt="logo" />
                        <h2 className="font-bold font-rslab text-[#173D7B] text-2xl lg:text-base"><span className="text-[#FF2D9B]">D</span>task</h2>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end z-10">
                    {
                        user
                            ?
                            <div className="flex gap-2 items-center">
                                <img className="h-11 w-11 rounded-full" src={user?.photoURL} alt="" />
                                <h4 className="uppercase font-semibold md:text-base text-xs">{user?.displayName}</h4>
                                <button onClick={handleLogout} className="btn btn-sm md:btn-md bg-[#173D7B] hover:bg-[#FF2D9B] uppercase font-semibold text-white">Log Out</button>
                            </div>
                            :
                            <div>
                                <Link className="btn bg-[#FF2D9B] hover:text-[#FF2D9B] hover:border-[#FF2D9B] hover:bg-transparent uppercase font-semibold text-white" to="/login">Login</Link>
                                <Link to="/register"><button className="btn bg-[#173D7B] hover:text-[#173D7B] hover:border-[#173D7B] ml-2 hover:bg-transparent uppercase font-semibold text-white">Register</button></Link>
                            </div>
                    }
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Navbar;