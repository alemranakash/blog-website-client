import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import RecentBlogs from "../Components/RecentBlogs";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>This is Home</h1>
            <RecentBlogs></RecentBlogs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;