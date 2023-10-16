import { createContext } from "react";

export const AuthContext = createContext({
    user:null,
    userData:null, 
    setContext() {
        // real implementation comes from App.jsx
      },
    
})