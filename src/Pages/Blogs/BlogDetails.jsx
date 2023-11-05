import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import swal from 'sweetalert';
import { useLoaderData } from "react-router-dom";
import axios from 'axios';

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user.email;
  const blogs = useLoaderData();
  const [blogDetails, setBlogDetails] = useState(blogs);
  const { id } = useParams();
  const [comments, setComments] = useState([]); // Step 1: Create a comments state variable

  useEffect(() => {
    const findBlogDetails = blogs.find((blog) => blog._id === id);
    setBlogDetails(findBlogDetails);

    // Step 2: Fetch comment data when the component mounts
    axios.get('http://localhost:5000/allComments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, blogs]);

  const { title, image, short_description, long_description, category, blogOwnerEmail, _id } = blogDetails;
  const isOwner = userEmail === blogOwnerEmail;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (isOwner) {
      swal({
        title: "Can not comment on own blog",
        text: "You are the owner of this blog, so you cannot comment on it.",
        icon: "warning",
      });
      return;
    }
    const addComment = {
      comment,
      id: _id,
      commentOwnerName: user.displayName,
      commentOwnerPhoto: user.photoURL
    };

    // Update the comments state when adding a new comment
    setComments([...comments, addComment]);



    axios
      .post('http://localhost:5000/allComments', addComment, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
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
  };

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
      <div>
        <h1 className="text-2xl font-bold">Comments:</h1>
        {comments
          .filter((comment) => comment.id === _id) // Filter comments matching the blog _id
          .map((comment) => (
            <div key={comment._id}>
              <div className="flex  gap-5 my-5">
              <img className="rounded-full w-10 h-10 border-2 border-black" src={comment.commentOwnerPhoto} alt={comment.commentOwnerName} />

               
<div className="">
 <p className="text-lg font-bold">{comment.commentOwnerName}</p>
 <p className="text-lg">{comment.comment}</p>
 
 </div>

              </div>
              
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogDetails;
