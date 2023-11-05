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
import UpdateBlogs from "../Pages/UpdateBlogs";

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
            element: <PrivateRoutes><WishList></WishList></PrivateRoutes>
          },
          {
            path: "/blogDetails/:id",
            element: <PrivateRoutes><BlogDetails></BlogDetails></PrivateRoutes>,
            loader: ()=>fetch('http://localhost:5000/allBlogs'),
          },
          {
            path: "/updateBlogs/:id",
            element: <PrivateRoutes><UpdateBlogs></UpdateBlogs></PrivateRoutes>,
            loader: ({params})=> fetch(`http://localhost:5000/allBlogs/${params.id}`)
          },

    ]
    }
])

export default routes;