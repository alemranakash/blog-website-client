
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataTable from "react-data-table-component";

const FeaturedBlogs = () => {

  const fetchFeaturedBlogs = async () => {
    const response = await axios.get("http://localhost:5000/allBlogs");
    return response.data;
  };


  const { data: featuredBlogs, isLoading, isError } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: fetchFeaturedBlogs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

//   console.log(featuredBlogs);
console.log("Featured Blogs:", featuredBlogs);


  const sortedFeaturedBlogs = featuredBlogs.sort((a, b) => {
    const aWordCount = a.long_description.split(" ").length;
    const bWordCount = b.long_description.split(" ").length;

    return bWordCount - aWordCount;
  });


  const tableData = sortedFeaturedBlogs.slice(0, 10).map((blog, index) => ({
    serialNumber: index + 1,
    blogTitle: blog.title,
    blogOwner: blog.blogOwnerName, 
    profilePicture: blog.blogOwnerPhoto, 
    length: blog.long_description.length
  }));


const columns = [
    {
      name: "Serial Number",
      selector: (row) => row.serialNumber,
      sortable: true,
    },
    {
      name: "Blog Title",
      selector: (row) => row.blogTitle,
      sortable: true,
    },
    {
      name: "Blog Owner",
      selector: (row) => row.blogOwner,
      sortable: true,
    },
    {
      name: "Profile Picture",
      cell: (row) => (
        <img
          className="rounded-full my-5"
          src={row.profilePicture}
          alt="Profile"
          style={{ width: "60px", height: "60px" }}
        />)
      },
  ];
  

  return (
 <div>
   <h1 className="text-4xl text-center my-10">Featured Blogs</h1>
     <div className="featured-blogs ">
      <DataTable
        title=""
        columns={columns}
        data={tableData}
        pagination
      />
    </div>
 </div>
  );
};

export default FeaturedBlogs;
