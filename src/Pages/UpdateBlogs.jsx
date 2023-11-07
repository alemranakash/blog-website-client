import { useLoaderData } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios'; 

const UpdateBlogs = () => {
  const blogs = useLoaderData();
  const { _id, image, title, category, short_description, long_description } = blogs;
  console.log(image, title, category, short_description, long_description);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedImage = e.target.image.value;
    const updatedTitle = e.target.title.value;
    const updatedCategory = e.target.category.value;
    const updatedShort_description = e.target.short_description.value;
    const updatedLong_description = e.target.long_description.value;

    const updatedBlog = {
      image: updatedImage,
      title: updatedTitle,
      category: updatedCategory,
      short_description: updatedShort_description,
      long_description: updatedLong_description,
    };

    console.log(updatedBlog);

    swal({
      title: 'Are you sure?',
      text: "Want to update this blog ?",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        axios.put(`http://localhost:5000/allBlogs/${_id}`, updatedBlog, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
              swal({
                title: 'Blog Updated',
                text: 'Blog updated successfully',
                icon: 'success',
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="">
          <h1 className="text-center text-4xl my-10">Update Blog</h1>
         <div className="flex">
          <img className="flex-1" src="https://i.ibb.co/dP4yYcV/update.png" alt="" />
         <div className="w-full mx-auto flex-1">
            <form onSubmit={handleUpdateProduct} className=" shadow-2xl hover:shadow-cyan-600 rounded px-8 pt-6 pb-8 mb-4">
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
                  defaultValue={image} 
                />
              </div>

              {/* title */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Blog title"
                  name="title"
                  defaultValue={title} 
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
                  defaultValue={category} 
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
                  defaultValue={short_description}  
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
                  defaultValue={long_description}  
                ></textarea>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogs;
