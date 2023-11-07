import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import swal from 'sweetalert';
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
    const {createUser,  updateUser, logOut}=useContext(AuthContext)
    const navigate= useNavigate();


    const handleRegister =  e => {
        e.preventDefault()
    
        const name =e.target.name.value 
        const photoUrl = e.target.photoUrl.value
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(name, email, password, photoUrl)

    if (password.length < 6) {
        swal("Oops!", "Password must be at least 6 characters long.", "error");
        return;
      }
    
      if (!/[A-Z]/.test(password)) {
        swal("Oops!", "Password must contain at least one capital letter.", "error");
        return;
      }
    
      if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)) {
        swal("Oops!", "Password must contain at least one special character.", "error");
        return;
      }
      if (!/\d/.test(password)) {
        swal("Oops!", "Password must contain at least one numeric character.", "error");
        return;
    }

    
        // * create user===========================
createUser(email, password)
.then(result=>{
      console.log(result.user)
      swal("Good job!", "Registration Success!", "success");
      
      e.target.name.value= ""
      e.target.email.value= ""
      e.target.password.value= ""

       // * update user===========================
 updateUser(name, photoUrl)
 .then(() => {
console.log("User updated")
})
.catch((error) => {
  console.error(error);
});

// * logout user after register===========================
logOut()
            .then(() => {
               console.log('logged out')
            })
            .catch(error => {
                console.error(error)
            })

            navigate("/login");


  })
  .catch(err=>{
      console.error(err)
  })


    }


    return (
        <div>
            <Navbar></Navbar>
            <div >

                <div className="">
                    <h1 className="text-3xl mt-10 text-center">Please register Here</h1>
                    <div className="mx-auto justify-center flex mt-10">

                      <div className="flex lg:flex-row flex-col-reverse justify-center items-center">
<img className="flex-1 lg:w-1/4" src="https://i.ibb.co/mJktPXw/login.png" alt="" />
                      <div className="card flex-1 flex-shrink-0 w-full shadow-2xl hover:shadow-blue-500 bg-base-100">
<form onSubmit={handleRegister} className="shadow-2xl hover:shadow-cyan-600 rounded px-8 pt-6 pb-8 mb-4">

    <div className="form-control">
        <label className="label">
            <span className="label-text">Name</span>
        </label>
        <input type="text" name="name" placeholder="Name" className="input rounded-md input-bordered" required />
    </div>


    <div className="form-control">
        <label className="label">
            <span className="label-text">Photo Url</span>
        </label>
        <input type="text" name="photoUrl" placeholder="Photo URL" className="input rounded-md input-bordered" required />
    </div>


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
        <button className="btn rounded-md   hover:border-black hover:text-black bg-black text-white">Register</button>
    </div>
    <h1 className="text-center my-4">Already have an account ? <Link to={"/login"} className="text-black font-bold">Login Here</Link></h1>
</form>
</div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;