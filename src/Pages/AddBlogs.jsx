import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import swal from 'sweetalert';
import axios from 'axios';


const AddBlogs = () => {

    const { user } = useContext(AuthContext);
    const blogOwnerEmail = user.email;
    const blogOwnerPhoto = user.photoURL;
    const blogOwnerName = user.displayName;
    console.log(user);

    const handleFormSubmit = (e) => {
        e.preventDefault();
      
        // Extract form field values
        const image = e.target.image.value;
        const title = e.target.title.value;
        const category = e.target.category.value;
        const short_description = e.target.short_description.value;
        const long_description = e.target.long_description.value;
        const createdAt = new Date();
      
     const addBlogs = {image, title, category, short_description, long_description, createdAt, blogOwnerEmail: blogOwnerEmail, blogOwnerPhoto: blogOwnerPhoto, blogOwnerName: blogOwnerName};
     console.log(addBlogs);




     axios
     .post('http://localhost:5000/allBlogs', addBlogs, {
       headers: {
         'Content-Type': 'application/json',
       },
     })
     .then((response) => {
       console.log(response.data);
 
      
       if (response.data.insertedId) {
         swal({
           title: 'Blog Added',
           text: 'Blog added successfully',
           icon: 'success',
         });
       }
     })
     .catch((error) => {
       console.error(error);
       
     });

    }








    return (
        <div>
            <div className=''>
            <h1 className="text-center text-4xl my-10">Add Blog</h1>
   <div className="flex justify-center items-center my-10">
    <img className="" src="https://i.ibb.co/87m17ZT/add-blog.png" alt="" />
   <div className="shadow-2xl hover:shadow-purple-600 rounded-md w-1/2 mx-auto ">
  <form onSubmit={handleFormSubmit} className=" rounded px-8 pt-6 pb-8 mb-4">
    
    {/* img */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
        Image URL
      </label>
      <input
        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="image"
        type="text"
        placeholder="Image URL"
        name="image"
      />
    </div>

{/* title */}
    <div className="mb-4">
      <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Blog title"
        name="title"
      />
    </div>

{/* category */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
        Category
      </label>
      <select
        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="category"
        name="category"
      >
        <option value="Technology">Technology</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Food and Cooking">Food and Cooking</option>
        <option value="Health">Health</option>
      </select>
    </div>

{/* short description */}
<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="short_description">
        Short Description
      </label>
      <textarea
        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="short_description"
        placeholder="Short Description"
        name="short_description"
        rows="3"
      ></textarea>
    </div>

{/* long description */}
<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="long_description">
        Long Description
      </label>
      <textarea
        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="long_description"
        placeholder="Long Description"
        name="long_description"
        rows="3"
      ></textarea>
    </div>


   


   


    <div className="flex items-center justify-between">
      <button
        className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
        type="submit"
      >
        Submit
      </button>
    </div>


  </form>
</div>
   </div>
  
        </div>
        </div>
    );
};

export default AddBlogs;