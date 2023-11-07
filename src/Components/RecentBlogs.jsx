import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';



const fetchAllBlogs = async () => {
  const response = await fetch('http://localhost:5000/recentBlogs?sortBy=createdAt:asc&limit=6');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const RecentBlogs = () => {

  const {user}= useContext(AuthContext)
  // console.log(user);

  const email = user?.email
  console.log(email);


  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: fetchAllBlogs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const handleAddToWishlist = (blog) => {
    const { _id,title, image, short_description, category}= blog;
    

    const wishlistBlogs = {title, email, image, short_description, category, detailsId: _id};
    console.log(wishlistBlogs);


    axios.post('http://localhost:5000/wishList', wishlistBlogs)
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
      <div>
        <h1 className='text-4xl text-center mt-20 mb-5'>Recent Blogs</h1>
        <div className="border-b-4 text-center w-56 mb-20 mx-auto border-black">
  </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-10">
          {data.map((blog) => {
            const { title, image, short_description, category, _id, createdAt } = blog;
            return (
              <div key={_id}>
                <div className="card lg:card-side bg-slat-300 mb-10 hover:shadow-2xl hover:shadow-black">
                <div className="border-l-2 border-black">
  
</div>
                  <img className='rounded-lg lg:w-1/2  bg' src={image} alt="Blog" />
                
                  <div className="lg:card-body justify-center mx-auto">
                    <h2 className='font-bold text-xl text-black'>{title}</h2>
                    <p className="text-gray-500 text-sm">{new Date(createdAt).toLocaleString()}</p>
           <h2 className='border-l-2 border-r-2 border-black text-blue-500  w-fit px-2 '>{category}</h2>
                    <h2 className='mb-5'>{short_description}</h2>
                   
                    <div className="card-actions">
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
  className="btn btn-sm rounded-md border-black  hover:bg-black hover:text-white bg-none text-black"
  onClick={() => handleAddToWishlist(blog)}
>
  Wishlist 🖤
</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
