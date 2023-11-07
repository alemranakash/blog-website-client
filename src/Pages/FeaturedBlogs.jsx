// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import DataTable from "react-data-table-component";

// const FeaturedBlogs = () => {
//   const fetchFeaturedBlogs = async () => {
//     const response = await axios.get("http://localhost:5000/allBlogs");
//     return response.data;
//   };

//   const { data: featuredBlogs, isLoading, isError } = useQuery({
//     queryKey: ["featuredBlogs"],
//     queryFn: fetchFeaturedBlogs,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching data</div>;
//   }

//   const sortedFeaturedBlogs = featuredBlogs.sort((a, b) => {
//     const aWordCount = a.long_description.split(" ").length;
//     const bWordCount = b.long_description.split(" ").length;

//     return bWordCount - aWordCount;
//   });

//   const tableData = sortedFeaturedBlogs.slice(0, 10).map((blog, index) => ({
//     serialNumber: index + 1,
//     blogTitle: blog.title,
//     blogOwner: blog.blogOwnerName,
//     profilePicture: blog.blogOwnerPhoto,
//     length: blog.long_description.length,
//   }));

//   const columns = [
//     {
//       name: "Serial Number",
//       selector: (row) => row.serialNumber,
//       sortable: true,
//     },
//     {
//       name: "Blog Title",
//       selector: (row) => row.blogTitle,
//       sortable: true,
//     },
//     {
//       name: "Blog Owner",
//       selector: (row) => row.blogOwner,
//       sortable: true,
//     },
//     {
//       name: "Profile Picture",
//       cell: (row) => (
//         <img
//           className="rounded-full my-5"
//           src={row.profilePicture}
//           alt="Profile"
//           style={{ width: "60px", height: "60px" }}
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl text-center mt-4 mb-2">Featured Blogs</h1>
//       <div className="border-b-2 text-center w-36 mb-4 mx-auto border-black"></div>
//       <div className="featured-blogs">
//         <DataTable
//           title=""
//           columns={columns}
//           data={tableData}
//           pagination
//           responsive
//           highlightOnHover
//         />
//       </div>
//     </div>
//   );
// };

// export default FeaturedBlogs;


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
    length: blog.long_description.length,
  }));

  const columns = [
    {
      name: "Serial",
      selector: (row) => row.serialNumber,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.blogTitle,
      sortable: true,
    },
    {
      name: "Owner ",
      selector: (row) => row.blogOwner,
      sortable: true,
    },
    {
      name: "Photo",
      cell: (row) => (
        <img
          className="rounded-full my-5"
          src={row.profilePicture}
          alt="Profile"
          style={{ width: "60px", height: "60px" }}
        />)
      },
  ]
   
  

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center mt-4 mb-2">Featured Blogs</h1>
      <div className="border-b-2 text-center w-36 mb-4 mx-auto border-black"></div>
      <div className=" overflow-x-hidden">
        <DataTable
          title=""
          columns={columns}
          data={tableData}
          pagination
          responsive="sm"
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default FeaturedBlogs;
