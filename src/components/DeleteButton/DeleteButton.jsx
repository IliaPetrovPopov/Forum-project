import { useContext } from "react";
import { toast } from "react-toastify";
import { deletePost } from "../../services/post.service";
import { useNavigate } from "react-router-dom";
import { deleteComment, deleteReply } from "../../services/comment.service";
import PropTypes from "prop-types";
import { RoleContext } from "../../context/RoleContext";
import { AuthContext } from "../../context/AuthContext";

const DeleteButton = ({ type, post, comment, reply, replyID }) => {
  const { user, userData } = useContext(AuthContext);
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (type === "post") {
      deletePost(post.id)
        .then(() => {
          toast.success("Post deleted");
          if (location.pathname.includes("/single-post")) {
            navigate(-1);
          } else {
            navigate();
          }
        })
        .catch(() => toast.error("Oops! Something went wrong when deleting"));
    } else if (type === "comment") {
      deleteComment(post.id, comment.id)
        .then(() => {
          toast.success("Comment deleted");
          navigate();
        })
        .catch(() => toast.error("Oops! Something went wrong when deleting"));
    } else if (type === "reply") {
      deleteReply(post.id, comment.id, replyID)
        .then(() => {
          toast.success("Reply deleted");
          navigate();
        })
        .catch(() => toast.error("Oops! Something went wrong when deleting"));
    }
  };
  if (!userData) {
    return;
  }
  const canDelete =
    user &&
    (((role === "admin") || (role === "moderator")) ||
      (type === "post" && userData.handle === post.author) ||
      (type === "comment" && userData.handle === comment.author) ||
      (type === "reply" && userData.handle === reply.author));

  return canDelete ? (
    <span onClick={handleDelete}>
      <i className="bi bi-trash" />
    </span>
  ) : null;
};

DeleteButton.propTypes = {
  type: PropTypes.oneOf(["post", "comment", "reply"]),
  post: PropTypes.object,
  handle: PropTypes.string,
  comment: PropTypes.object,
  reply: PropTypes.object,
  replyID: PropTypes.string,
};

export default DeleteButton;
