import { useEffect, useState } from "react";
import { getUserCount } from "../../services/user.service";
import { getPostCount } from "../../services/post.service";

const Counter = () => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  
  useEffect(() => {
    getUserCount().then((count) => setUserCount(count));
    getPostCount().then((count) => setPostCount(count));
  }, []);

  return (
    <div>
      <p><span 
      style={{fontWeight: 'bold', fontSize: '18px', textDecoration: 'underline'}}>
        {userCount}</span> people are using the platform</p>
      <p> <span 
      style={{fontWeight: 'bold', fontSize: '18px', textDecoration: 'underline'}}>
        {postCount}</span> posts have been created <br />on the platform</p>
    </div>
  );
};

export default Counter;
