import React,{createContex,useState,useContext, Children} from "react";

const AuthContext = createContex(null);

export const AuthProvider = ({Children}) =>{
    const[user,setUser] =useState (null);

    const login = (userData) =>{
        setUser(UserData);

        //store user in local
        localStorage.setItem ('user',JSON.stringify(userData));
    
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user')
    };

    return(
        <AuthContext.Provider value ={{user,login,logout}}>
            {Children}
        </AuthContext.Provider>
    );

} ;

export const useAuth = () => useContext(AuthContext);