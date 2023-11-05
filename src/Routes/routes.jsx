import { createBrowserRouter } from "react-router-dom";
import Root from './Root'
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddBlogs from "../Pages/AddBlogs";
import AllBlogs from "../Pages/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import WishList from "../Pages/WishList";
import PrivateRoutes from "./PrivateRoutes";
import BlogDetails from "../Pages/Blogs/BlogDetails";

const routes = createBrowserRouter([
    {
        path: "/",
    element: <Root></Root>,
    children:[
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/login",
            element: <Login></Login>
          },
          {
            path: "/register",
            element: <Register></Register>
          },
          {
            path: "/addBlogs",
            element: <PrivateRoutes><AddBlogs></AddBlogs></PrivateRoutes>
          },
          {
            path: "/allBlogs",
            element: <AllBlogs></AllBlogs>
          },
          {
            path: "/featuredBlogs",
            element: <FeaturedBlogs></FeaturedBlogs>
          },
          {
            path: "/wishlist",
            element: <WishList></WishList>
          },
          {
            path: "/blogDetails/:id",
            element: <BlogDetails></BlogDetails>
          },

    ]
    }
])

export default routes;