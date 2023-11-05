import Navbar from "../Components/Navbar";
import RecentBlogs from "../Components/RecentBlogs";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>This is Home</h1>
            <RecentBlogs></RecentBlogs>
        </div>
    );
};

export default Home;