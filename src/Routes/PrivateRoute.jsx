import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    if(!user){
        return;
    }

    if(loading){
        return <p>Loading...</p>
    }

    return children;
};

export default PrivateRoute;