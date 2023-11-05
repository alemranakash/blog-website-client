import { useParams } from "react-router-dom";
import  { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


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

  const { title, image, short_description, long_description, category, blogOwnerEmail  } = blogDetails;
  const isOwner = userEmail === blogOwnerEmail;
 
  return (
    <div>
      <h1 className="text-4xl text-center">Blog Details</h1>
      <div className="card lg:card-side bg-blue-200 shadow-xl">
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
    </div>
  );
};

export default BlogDetails;
