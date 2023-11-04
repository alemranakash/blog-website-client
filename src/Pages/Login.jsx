import { useContext } from "react";
import Navbar from "../Components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import swal from 'sweetalert';



const Login = () => {
    const {googleLogin, signIn}=useContext(AuthContext)
    const location= useLocation();
    const navigate= useNavigate();

    const handleLogin = e => {
        e.preventDefault()
    
    const email = e.target.email.value
    const password = e.target.password.value
    console.log( email, password)

       // * sign in user
       signIn(email, password)
       .then(result=>{
           console.log(result.user)
           swal("Good job!", "Login Success!", "success");
           navigate(location?.state ? location.state : '/')
       })
       .catch(err=>{
         console.log(err.code)
         if(err.code){
           swal("Oops!", err.code, "error");
         } 
           console.error(err)
       })
    }


   // * google section================================================================
const handleGoogleLogin = ()=>{
    googleLogin()
    .then(result=>{
         console.log(result.user)
         swal("Good job!", "Login Success!", "success");
         navigate(location?.state ? location.state : '/')
    })
    .catch(error=>{
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
<div className="mx-auto justify-center flex mt-10">

  <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      
    <form onSubmit={handleLogin} className="card-body">

     

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" name="email" placeholder="email" className="input rounded-md input-bordered" required />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" placeholder="password" name="password" className="input rounded-md input-bordered" required />
        
      </div>
      <div className="form-control mt-6">
        <button className="btn rounded-md   hover:hover:border-blue-700 hover:text-blue-700 bg-blue-700 text-white">Login</button>
      </div>
      <button onClick={handleGoogleLogin} className="btn btn-sm btn-outline w-fit mx-auto mt-2 rounded-md">Login with google</button>
      <h1 className="text-center">Have no account ? <Link to={"/register"} className="text-blue-500 font-bold hover:underline">Register Here</Link></h1>
    </form>
  </div>
</div>
</div>
      </div>
      </div>
      </div>
    );
};

export default Login;