import { useContext } from "react";
import Navbar from "../Components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import swal from 'sweetalert';



const Login = () => {
  const { googleLogin, signIn } = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password)

    // * sign in user
    signIn(email, password)
      .then(result => {
        console.log(result.user)
        swal("Good job!", "Login Success!", "success");
        navigate(location?.state ? location.state : '/')
      })
      .catch(err => {
        console.log(err.code)
        if (err.code) {
          swal("Oops!", err.code, "error");
        }
        console.error(err)
      })
  }


  // * google section================================================================
  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        console.log(result.user)
        swal("Good job!", "Login Success!", "success");
        navigate(location?.state ? location.state : '/')
      })
      .catch(error => {
        console.error(error)

      })
  }
  // !============================================================================================

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div >

          <div className="">
            <h1 className="text-3xl mt-10 text-center">Please Login Here</h1>
           <div className="flex lg:flex-row flex-col-reverse justify-center items-center">
            <img className="lg:w-1/4" src="https://i.ibb.co/87m17ZT/add-blog.png" alt="" />
           <div className=" mt-10">

<div className="card flex-shrink-0 shadow-2xl ">

  <form onSubmit={handleLogin} className="shadow-2xl hover:shadow-purple-500  rounded px-8 pt-6 pb-8 mb-10">



    <div className="form-control ">
      <label className="label">
        <span className="label-text text-gray-700 font-bold">Email</span>
      </label>
      <input type="email" name="email" placeholder="email" className="input rounded-md input-bordered border-gray-400" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text text-gray-700 font-bold">Password</span>
      </label>
      <input type="password" placeholder="password" name="password" className="input rounded-md input-bordered border-gray-400" required />

    </div>
    <div className="form-control mt-6">
      <button className="btn rounded-md   hover:border-black hover:text-black bg-black text-white">Login</button>
    </div>
    <button onClick={handleGoogleLogin} className="btn btn-sm btn-outline w-fit mx-auto mt-2 rounded-md">Login with google</button>
    <h1 className="text-center">Have no account ? <Link to={"/register"} className="text-black font-bold hover:underline">Register Here</Link></h1>
  </form>
</div>
</div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;