import { useEffect, useState } from "react";
import { getPostsByAuthor } from "../../services/post.service";
import PropTypes from "prop-types";
import DisplayPost from "../DisplayPost/DisplayPost";

const MyPosts = ({ userHandle }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getPostsByAuthor(userHandle)
      .then((posts) => {
        setUserPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, [userHandle, userPosts]);

  return (
    <div className="card">
      <h2 className="card-title" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>My posts:</h2>
      <div className="card-body">
        {userPosts
          .sort((a, b) => b.createdOn - a.createdOn)
          .map((post) => (
            <DisplayPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

MyPosts.propTypes = {
  userHandle: PropTypes.string,
};

export default MyPosts;
