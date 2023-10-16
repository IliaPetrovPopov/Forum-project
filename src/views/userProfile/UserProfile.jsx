import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyPosts from "../../components/UserProfile/MyPosts";
import MyLikedPosts from "../../components/UserProfile/MyLikedPosts";
import { getUserByHandle, getUserData } from "../../services/user.service";
import "./UserProfile.css";
import { Admin } from "./type-of-profiles/Admin";
import { User } from "./type-of-profiles/User";
import MySavedPosts from "../../components/UserProfile/MySavedPosts";
import { RoleContext } from "../../context/RoleContext";
import { AuthContext } from "../../context/AuthContext";
import { Spinner } from "@chakra-ui/react";
import { Moderator } from "./type-of-profiles/Moderator";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const { handle: profileHandle } = useParams();
  const [profileUser, setProfileUser] = useState();
  const { role } = useContext(RoleContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUserData(user.uid).then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error("Something went wrong!");
      }
      setUserData(snapshot.val()[Object.keys(snapshot.val())[0]]);
    });
  }, [user]);

  useEffect(() => {
    getUserByHandle(profileHandle)
      .then((snapshot) => {
        setProfileUser(snapshot.val());
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [profileHandle]);

  if (!profileUser || !userData) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
      />
    );
  }

  return (
    <div id="user-profile-display">
      {role === "admin" ? (
        <Admin
          user={profileUser}
          userData={userData}
          handle={profileHandle}
          navigate={navigate}
        />
      ) : (
        role === "moderator" ? (
          <Moderator 
          user={profileUser} 
          userData={userData} 
          handle={profileHandle}
          navigate={navigate}
          />
        ) : (
          <User user={profileUser} userData={userData} handle={profileHandle} />
        )
      )}

      <MyPosts userHandle={profileHandle} />
      <MyLikedPosts userHandle={profileHandle} />
      {profileHandle === userData.handle && (
        <MySavedPosts userHandle={profileHandle} />
      )}
    </div>
  );
}

export default UserProfile;
