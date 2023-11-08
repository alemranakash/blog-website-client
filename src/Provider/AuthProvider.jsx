import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Config/firebase.config";
import axios from 'axios';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail}
          setUser(currentUser);
          setLoading(false);
      
          if (currentUser) {
           
            axios
              .post('https://blog-website-server-steel.vercel.app/jwt', loggedUser, { withCredentials: true })
              .then((res) => {
                console.log('token response', res.data);
              })
              .catch((error) => {
                console.error('Error while issuing token:', error);
              });
          }

          else {
            axios.post('https://blog-website-server-steel.vercel.app/logout', loggedUser, {
                withCredentials: true
            })
                .then(res => {
                    console.log(res.data);
                })
        }


        });
      
        return () => {
          unSubscribe();
        };
      }, []);
      

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