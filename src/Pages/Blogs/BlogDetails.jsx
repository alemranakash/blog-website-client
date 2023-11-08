import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import swal from 'sweetalert';
import { useLoaderData } from "react-router-dom";
import axios from 'axios';

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user.email;
  const blogs = useLoaderData(["featuredBlogs"]);
  const [blogDetails, setBlogDetails] = useState(blogs);
  const { id } = useParams();
  const [comments, setComments] = useState([]); 

  console.log(blogs);

  useEffect(() => {
    const findBlogDetails = blogs.find((blog) => blog._id === id);
    setBlogDetails(findBlogDetails);

    // Step 2: Fetch comment data when the component mounts
    axios.get('https://blog-website-server-steel.vercel.app/allComments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, blogs]);

  const { title, image, short_description, long_description, category, blogOwnerEmail, _id, createdAt, blogOwnerName, blogOwnerPhoto } = blogDetails;
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
      .post('https://blog-website-server-steel.vercel.app/allComments', addComment, {
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
      <h1 className="text-4xl text-center mt-10 mb-5">Blog Details</h1>
      <div className="border-b-4 text-center w-56 mb-10 mx-auto border-black">
  </div>
      <div className="card lg:card-side bg-blue-20 shadow-x mt-20 mb-10">
        <figure className="mr-20">
          <img className="rounded-lg w-full h-full" src={image} alt="Blog" />
        </figure>
      <div className="lg:border-l-4 mb-10  border-black ml">
      <div className="card-body">
          <h2 className='font-bold text-4xl text-black'>{title}</h2>
          <p className="text-black text-sm"><span className="text-gray-500">Posted on: </span>  {new Date(createdAt).toLocaleString()}</p>
          <div className="">
          
         <div className="flex flex-row-reverse items-center gap-5 justify-center ">
         <p className="text-lg font-semibold">{blogOwnerName}</p>
          <img className="w-10 rounded-full" src={blogOwnerPhoto} alt="" />
         </div>
          </div>
          <h2 className='border-l-2 border-r-2 mt-5 border-black text-blue-500  w-fit px-2 '>
            {category}
          </h2>
          <h2>{short_description}</h2>
         
          {isOwner && (
           <Link to={`/updateBlogs/${_id}`}>
           <button className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black">Update</button>
           </Link>
          )}
        </div>
      </div>
      </div>
      <p className="mb-20">{long_description}</p>
      <div className="mb-4">
        <form onSubmit={handleFormSubmit} className="bg-blue-10 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block text-gray-900 text-2xl font-bold mb-4" htmlFor="comment">
            Add your Comment here:
          </label>
          <textarea
            className="shadow appearance-none border-2 mb-4 border-black rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="comment"
            placeholder="Comments"
            name="comment"
            rows="3"
          ></textarea>
          <div className="flex items-center justify-between">
            <button
              className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
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
