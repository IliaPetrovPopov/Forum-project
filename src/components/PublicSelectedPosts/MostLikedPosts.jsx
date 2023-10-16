import { useEffect, useState } from "react";
import { getMostLiked } from "../../services/post.service";

import DisplayPost from "../DisplayPost/DisplayPost";

const MostLikedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMostLiked()
      .then((posts) => setPosts(posts))
      .catch((e) => console.error("Error fetching most liked posts", e));
  }, [posts]);

  return (
    <div className="card">
      <h2 className="card-title">Most liked posts:</h2>
      <div className="card-body">
        {posts
          .sort((a, b) => b.likedBy.length - a.likedBy.length)
          .map((post) => (
            <DisplayPost key={post.id} post={post}/>
          ))}
      </div>
    </div>
  );
};

export default MostLikedPosts;
