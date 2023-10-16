import { useEffect, useState } from "react";
import { getMostCommented } from "../../services/post.service";
import DisplayPost from "../DisplayPost/DisplayPost";


const MostCommentedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMostCommented()
      .then((posts) => setPosts(posts))
      .catch((e) => console.error("Error fetching most liked posts", e));
  }, [posts]);

  return (
    <div className="card">
      <h2 className="card-title">Most commented posts:</h2>
      <div className="card-body">
        {posts
          .sort(
            (a, b) =>
              Object.keys(b.comments).length - Object.keys(a.comments).length
          )
          .map((post) => (
            <DisplayPost key={post.id} post={post}/>
          ))}
      </div>
    </div>
  );
};

export default MostCommentedPosts;
