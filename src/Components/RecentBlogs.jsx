import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchAllBlogs = async () => {
  const response = await fetch('http://localhost:5000/recentBlogs?sortBy=createdAt:asc&limit=6');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const RecentBlogs = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: 'allBlogs',
    queryFn: fetchAllBlogs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <h1 className='text-4xl text-center'>This is Recent Blogs</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data.map((blog) => {
            const { title, image, short_description, category, _id, createdAt } = blog;
            return (
              <div key={_id}>
                <div className="card lg:card-side bg-blue-200 shadow-xl">
                  <figure className="p-4">
                    <img className='rounded-lg w-full h-full' src={image} alt="Blog" />
                  </figure>
                  <div className="card-body">
                    <h2 className='font-bold text-xl text-blue-700'>{title}</h2>
                    <h2 className='border-red-500 text-red-500 border-[1px] w-fit px-2 rounded-xl'>{category}</h2>
                    <h2 className=''>{short_description}</h2>
                    <p className="text-gray-500 text-sm">{new Date(createdAt).toLocaleString()}</p>
                    <div className="card-actions justify-end">
                      <div className="flex justify-center items-center gap-5">
                        <button
                          className="btn btn-secondary my-2 btn-sm hover-bg-black hover-text-white"
                          onClick={() => navigate(`/blogDetails/${_id}`)}
                        >
                          Details
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
