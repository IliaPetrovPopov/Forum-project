import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import { getUserData, getUserRole } from "../services/user.service";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid).then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error("Something went wrong!");
      } else {
        const handle = Object.keys(snapshot.val())[0];

        getUserRole(handle)
          .then((userRole) => {
            setRole(userRole);
          })
          .catch((error) => {
            console.error("Error getting user role:", error);
          });
      }
    });
  }, [user]);

  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
};

RoleProvider.propTypes = {
  children: PropTypes.object,
};
