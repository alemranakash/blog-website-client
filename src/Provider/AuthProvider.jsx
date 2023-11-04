import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Config/firebase.config";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    }
        ,[])

// * google section================================================================  
const googleProvider = new GoogleAuthProvider();
const googleLogin =()=>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
}
// !============================================================================================


// * username password section===========================================================

// * create user
const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email, password)
    
}
// * sign in user

const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
}

// * sign out user
const logOut = () => {
    setLoading(true);
    return signOut(auth)
}
// * update user

const updateUser = (name, photoUrl)=>{
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photoUrl})
}



    const authInfo = {
        googleLogin,
        createUser,
        signIn,
        logOut,
        user,
        updateUser,
        loading
      
    }


    return (
        <AuthContext.Provider value={ authInfo  }>
        {children}
    </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };

export default AuthProvider;