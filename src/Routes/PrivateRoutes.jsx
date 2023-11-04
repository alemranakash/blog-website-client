import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";


const PrivateRoutes = ({children}) => {

    const {user, loading}= useContext(AuthContext)
    const location=useLocation();

    if(loading){
        return <span className="loading flex justify-center items-center loading-infinity loading-lg"></span>
    }
    
    if(user){
        return children;
    }
    
        return  <Navigate state={location.pathname} to={"/login"}></Navigate>
    
};


PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired, 
  };

export default PrivateRoutes;