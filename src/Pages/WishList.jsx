import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const fetchAllWishList = async () => {
  try {
    const response = await axios.get('http://localhost:5000/wishList' , { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
};

const WishList = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const userEmail = user.email;
  console.log(userEmail);

  const { data: wishListData, error, isLoading } = useQuery({
    queryKey: 'allWishList',
    queryFn: fetchAllWishList,
  });

  const [remainingWishList, setRemainingWishList] = useState([]);
  const [isRemainingLoading, setIsRemainingLoading] = useState(true);

  useEffect(() => {
    if (wishListData) {
      setRemainingWishList(wishListData);
      setIsRemainingLoading(false);
    }
  }, [wishListData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleRemoveFromWishList = (blogId) => {
    swal({
      title: 'Are you sure?',
      text: 'Delete Blog?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        axios
          .delete(`http://localhost:5000/wishList/${blogId}` , { withCredentials: true })
          .then((response) => {
            if (response.data.deletedCount > 0) {
              swal({
                title: 'Deleted',
                text: 'Blog deleted successfully',
                icon: 'error',
              });

              const updatedRemaining = remainingWishList.filter(
                (blog) => blog._id !== blogId
              );
              setRemainingWishList(updatedRemaining);
            }
          })
          .catch((error) => {
            console.error(error);
            swal({
              title: 'Error',
              text: 'Error deleting the blog from the Wishlist',
              icon: 'error',
            });
          });
      }
    });
  };

  const filteredWishList = remainingWishList.filter((blog) => blog.email === userEmail);

  return (
    <div>
      <h1 className="text-4xl text-center mt-10 mb-5">My Wishlist</h1>
      <div className="border-b-4 text-center w-56 mb-10 mx-auto border-black">
  </div>
      {isRemainingLoading ? (
        <div >Loading remaining wishlist items...</div>
      ) : filteredWishList.length === 0 ? (
        <div>No data found.</div>
      ) : (
        filteredWishList.map((blog) => {
          const { title, image, short_description, _id, detailsId } = blog;
          return (
            <div  key={_id}>
              <div className="card lg:card-side mb-20 shadow-lg hover:shadow-2xl hover:shadow-black">
               
               <img className="rounded-lg lg:w-1/3" src={image} alt="Blog" />
              
                <div className="card-body">
                  <h2 className="font-bold text-xl text-black">{title}</h2>
                  <h2 className="border-l-2 border-r-2 border-black text-blue-500  w-fit px-2">
                    {blog.category}
                  </h2>
                  <h2 className="my-5">{short_description}</h2>
                  
                  <div className="card-actions">
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
                        onClick={() => navigate(`/blogDetails/${detailsId}`)}
                      >
                        Details
                      </button>
                    </div>
                    
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="btn btn-sm rounded-md border-black   hover:bg-black hover:text-white bg-none text-black"
                        onClick={() => handleRemoveFromWishList(_id)}
                      >
                        Remove from Wishlist ✖
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default WishList;
