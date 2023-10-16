import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DisplayPost from "../DisplayPost/DisplayPost";
import { getSavedPosts } from "../../services/post.service";

const MySavedPosts = ({ userHandle }) => {
  const [userSavedPosts, setUserSavedPosts] = useState([]);

  useEffect(() => {
    getSavedPosts(userHandle)
      .then((savedPosts) => {
        setUserSavedPosts(savedPosts);
      })
      .catch((error) => {
        console.error("Error fetching user saved posts:", error);
      });
  }, [userHandle, userSavedPosts]);

  return (
    <div className="card">
      <h2 className="card-title" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Saved for later:</h2>
      <div className="card-body">
        {userSavedPosts
          .sort((a, b) => b.createdOn - a.createdOn)
          .map((post) => (
            <DisplayPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

MySavedPosts.propTypes = {
  userHandle: PropTypes.string,
};

export default MySavedPosts;
