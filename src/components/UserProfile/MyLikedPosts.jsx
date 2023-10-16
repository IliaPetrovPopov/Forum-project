import { useEffect, useState } from "react";
import { getLikedPosts } from "../../services/post.service";
import PropTypes from "prop-types";
import DisplayPost from "../DisplayPost/DisplayPost";

const MyLikedPosts = ({ userHandle }) => {
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  useEffect(() => {
    getLikedPosts(userHandle)
      .then((likedPosts) => {
        setUserLikedPosts(likedPosts);
      })
      .catch((error) => {
        console.error("Error fetching user liked posts:", error);
      });
  }, [userHandle, userLikedPosts]);

  return (
    <div className="card">
      <h2 className="card-title" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Liked:</h2>
      <div className="card-body">
        {userLikedPosts
          .sort((a, b) => b.createdOn - a.createdOn)
          .map((post) => (
            <DisplayPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

MyLikedPosts.propTypes = {
  userHandle: PropTypes.string,
};

export default MyLikedPosts;
