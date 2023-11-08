import  { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const fetchAllBlogs = async () => {
  try {
    const response = await axios.get('https://blog-website-server-steel.vercel.app/allBlogs');
    return response.data;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
};

const AllBlogs = () => {

  const {user}= useContext(AuthContext)
  // console.log(user);

  const email = user?.email
  console.log(email);

  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: 'allBlogs',
    queryFn: fetchAllBlogs,
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredBlogs = data.filter((blog) => {
    const categoryMatch = !selectedCategory || blog.category === selectedCategory;
    const titleMatch = !searchTerm || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && titleMatch;
  });

  const handleAddToWishlist = (blog) => {
    const {_id, title, image, short_description, category } = blog;
    const wishlistBlogs = { title, email, image, short_description, category, detailsId: _id };

    axios
      .post('https://blog-website-server-steel.vercel.app/wishList', wishlistBlogs)
      .then((response) => {
        if (response.data.insertedId) {
          swal({
            title: 'Blog Added',
            text: 'Blog added to WishList successfully',
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        swal({
          title: 'Error',
          text: 'Error adding the blog to the WishList',
          icon: 'error',
        });
      });
  };

  return (
    <div>
      <h1 className="text-4xl text-center mt-10 mb-5">This is All Blogs</h1>
      <div className="border-b-4 text-center w-56 mb-10 mx-auto border-black">
  </div>
      <div className="flex lg:flex-row flex-col items-center justify-between mb-10">
        <div className="mb-5 flex justify-center items-center gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Filter by Category :
          </label>
          <select
            className="shadow appearance-none border-2 rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black "
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food and Cooking">Food and Cooking</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="mb-4 flex justify-center items-center gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
            Search : 
          </label>
          <input
            className="shadow appearance-none border-2 border-black  rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Search by title"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredBlogs.map((blog) => {
          const { title, image, short_description, category, _id } = blog;
          return (
            <div key={_id}>
              <div className="card lg:card-side shadow-xl hover:shadow-2xl hover:shadow-black my-5">
              <img className=" lg:w-1/2 mr-5  " src={image} alt="Blog" />
              <div className='flex'>
                <div className="lg:border-l-4 mb-10  border-black ml"></div>
              <div className="card-body">
                  <h2 className="font-bold text-xl text-black">{title}</h2>
                  <h2 className="border-l-2 border-r-2 border-black text-blue-500  w-fit px-2">{category}</h2>
                  <h2 className="my-5">{short_description}</h2>

                  <div className="card-actions ">
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
                        onClick={() => navigate(`/blogDetails/${_id}`)}
                      >
                        Details
                      </button>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
                        onClick={() => handleAddToWishlist(blog)}
                      >
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBlogs;
