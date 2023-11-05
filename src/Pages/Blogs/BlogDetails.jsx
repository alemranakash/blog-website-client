import { useParams } from "react-router-dom";
import  { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from 'axios';

const BlogDetails = () => {
    const {user}= useContext(AuthContext)
  console.log(user);

  const userEmail = user.email
  console.log(userEmail);
  const blogs = useLoaderData();
  const [blogDetails, setBlogDetails] = useState(blogs);
  const { id } = useParams();


  useEffect(() => {

    const findBlogDetails = blogs.find((blog) => blog._id === id);
    setBlogDetails(findBlogDetails);
  }, [id, blogs]);

console.log(blogDetails);

  const { title, image, short_description, long_description, category, blogOwnerEmail, _id  } = blogDetails;
  const isOwner = userEmail === blogOwnerEmail;




  const handleFormSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment);

    const addComment= {
        comment, _id, commentOwnerName: user.displayName, commentOwnerPhoto: user.photoURL
    }
    console.log(addComment);

    axios
    .post('http://localhost:5000/allComments', addComment, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(response.data);

     
      if (response.data.insertedId) {
        swal({
          title: 'Comment Added',
          text: 'Comment added successfully',
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
      <h1 className="text-4xl text-center">Blog Details</h1>
      <div className="card lg:card-side bg-blue-200 shadow-xl my-20">
        <figure className="p-4">
          <img className="rounded-lg w-full h-full" src={image} alt="Blog" />
        </figure>
        <div className="card-body">
          <h2 className="font-bold text-xl text-blue-700">{title}</h2>
          <h2 className="border-red-500 text-red-500 border-[1px] w-fit px-2 rounded-xl">
            {category}
          </h2>
          <h2>{short_description}</h2>
          <p>{long_description}</p>
          {isOwner && (
            <button className="btn btn-secondary">
              Update
            </button>
          )}
        </div>
      </div>

<div>
<div className="mb-4">
<form onSubmit={handleFormSubmit} className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label className="block text-gray-700 text-2xl font-bold mb-4" htmlFor="comment">
       Add your Comment here:
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="comment"
        placeholder="Comments"
        name="comment"
        rows="3"
      ></textarea>
      <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Comment
      </button>
    </div>
       </form>
    </div>
</div>





    </div>
  );
};

export default BlogDetails;
