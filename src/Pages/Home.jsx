import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import RecentBlogs from "../Components/RecentBlogs";
import PoolNquiz from "../Components/PoolNquiz";
import ReaderFeedback from "../Components/ReaderFeedback";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
           <Hero></Hero>
            <RecentBlogs></RecentBlogs>
            
            <Newsletter></Newsletter>
            <PoolNquiz></PoolNquiz>
            <ReaderFeedback></ReaderFeedback>
            <Footer></Footer>
        </div>
    );
};

export default Home;