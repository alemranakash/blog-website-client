import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import swal from 'sweetalert';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)


    const authenticatedNavLinks = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/addBlogs"}>Add Blogs</NavLink></li>
        <li><NavLink to={"/allBlogs"}>All Blogs</NavLink></li>
        <li><NavLink to={"/featuredBlogs"}>Featured Blogs</NavLink></li>
        <li><NavLink to={"/wishlist"}>WishList</NavLink></li>

    </>

    const normalNavLinks =
        <>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/addBlogs"}>Add Blogs</NavLink></li>
            <li><NavLink to={"/allBlogs"}>All Blogs</NavLink></li>
            <li><NavLink to={"/featuredBlogs"}>Featured Blogs</NavLink></li>
            <li><NavLink to={"/wishlist"}>WishList</NavLink></li>
        </>


    const handleLogout = () => {
        logOut()
            .then(() => {
                swal("Oops!", "Log Out User!", "error");
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100  rounded-box w-52">
                            {user ? authenticatedNavLinks : normalNavLinks}
                        </ul>
                    </div>

                    <img className="w-36" src="https://i.ibb.co/dLm7Cf6/sarkari-blog-removebg-preview.png" alt="" />


                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        {user ? authenticatedNavLinks : normalNavLinks}
                    </ul>
                </div>
                <div className="navbar-end flex lg:gap-5">
                    <div className="">
                        {
                            user ? <div className="flex lg:flex-row flex-col lg:gap-5  items-center">
                                {
                                    user.photoURL ?
                                        <img className="w-10 h-10 rounded-full flex-1" src={user.photoURL} alt="" />
                                        :
                                        <img className="w-10 h-10 rounded-full flex-1" src="https://i.ibb.co/Yjtd198/user.png" alt="" />
                                }

                                {
                                    user.displayName ?
                                        <p className="text-black font-bold">{user.displayName}</p>
                                        :
                                        <p className="text-black font-bold">User</p>
                                }

                            </div>

                                :
                                <p></p>
                        }

                    </div>
                    <div>
                        {
                            user ?
                                <Link onClick={handleLogout} className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black">Logout</Link>
                                :
                                <div className="flex gap-10">
                                    <Link to={"/register"} className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black">Register</Link>

                                    <Link to={"/login"} className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black">Login</Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;