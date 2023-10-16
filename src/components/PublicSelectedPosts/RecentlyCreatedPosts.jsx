import { useEffect, useState } from "react";
import { getRecentlyCreated } from "../../services/post.service";

import DisplayPost from "../DisplayPost/DisplayPost";

const RecentlyCreatedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getRecentlyCreated()
      .then((posts) => setPosts(posts))
      .catch((e) => console.error("Error fetching recently created posts", e));
  }, [posts]);

  return (
    <div className="card">
      <h2 className="card-title">Most recently created posts:</h2>
      <div className="card-body">
        {posts
          .sort((a, b) => b.createdOn - a.createdOn)
          .map((post) => (
            <DisplayPost key={post.id} post={post}/>
          ))}
      </div>
    </div>
  );
};

export default RecentlyCreatedPosts;
