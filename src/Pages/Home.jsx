import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import RecentBlogs from "../Components/RecentBlogs";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
           <Hero></Hero>
            <RecentBlogs></RecentBlogs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;