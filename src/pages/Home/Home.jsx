import Feedback from "../../components/Feedback/Feedback";
import Users from "../../components/Users/Users";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Users></Users>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;