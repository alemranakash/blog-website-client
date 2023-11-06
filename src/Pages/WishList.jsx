import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const fetchAllWishList = async () => {
  try {
    const response = await axios.get('http://localhost:5000/wishList');
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
          .delete(`http://localhost:5000/wishList/${blogId}`)
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
      <h1>This is Wishlist</h1>
      {isRemainingLoading ? (
        <div>Loading remaining wishlist items...</div>
      ) : filteredWishList.length === 0 ? (
        <div>No data found.</div>
      ) : (
        filteredWishList.map((blog) => {
          const { title, image, short_description, _id, detailsId, email } = blog;
          return (
            <div key={_id}>
              <div className="card lg:card-side bg-blue-200 shadow-xl">
                <figure className="p-4">
                  <img className="rounded-lg w-full h-full" src={image} alt="Blog" />
                </figure>
                <div className="card-body">
                  <h2 className="font-bold text-xl text-blue-700">{title}</h2>
                  <h2 className="border-red-500 text-red-500 border-[1px] w-fit px-2 rounded-xl">
                    {blog.category}
                  </h2>
                  <h2 className="">{short_description}</h2>
                  <h2 className="">{email}</h2>
                  <div className="card-actions justify-end">
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="btn btn-secondary my-2 btn-sm hover-bg-black hover-text-white"
                        onClick={() => navigate(`/blogDetails/${detailsId}`)}
                      >
                        Details
                      </button>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="btn btn-secondary my-2 btn-sm hover-bg-black hover-text-white"
                        onClick={() => handleRemoveFromWishList(_id)}
                      >
                        Remove from Wishlist
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
