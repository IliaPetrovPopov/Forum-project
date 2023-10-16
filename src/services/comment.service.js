import { get, push, query, ref, remove, set, update } from "firebase/database";
import { db } from "../config/firebase-config";
import { toast } from "react-toastify";

export const addComment = (postID, content, author) => {
  const commentsRef = ref(db, `posts/${postID}/comments`);

  const newCommentRef = push(commentsRef);
  const newCommentKey = newCommentRef.key;

  const newComment = {
    content: content,
    author: author,
    createdOn: Date.now(),
    replies: {},
    likedBy: {},
  };

  return set(newCommentRef, newComment)
    .then(() => ({ ...newComment, id: newCommentKey }))
    .catch((e) => {
      toast.error("Error adding the comment", e);
    });
};

export const addReplyToComment = (postId, commentId, content, author) => {
  const repliesRef = ref(db, `posts/${postId}/comments/${commentId}/replies`);

  const newReplyRef = push(repliesRef);
  const newReplyKey = newReplyRef.key;

  const newReply = {
    content: content,
    author: author,
    createdOn: Date.now(),
  };

  return set(newReplyRef, newReply)
    .then(() => ({ ...newReply, id: newReplyKey }))
    .catch((e) => {
      toast.error("Error adding the reply", e);
    });
};
export const getCommentsForPost = (postId) => {
  return get(ref(db, `posts/${postId}/comments`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    const comments = snapshot.val();

    return Object.keys(comments)
      .map((key) => ({
        ...comments[key],
        id: key,
      }))
      .sort((a, b) => b.createdOn - a.createdOn);
  });
};

export const getCommentsCount = (postId) => {
  return get(query(ref(db, `posts/${postId}/comments`)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.keys(snapshot.val()).length;
      }
      return 0;
    })
    .catch((e) => {
      console.error("Error getting comments count:", e);
      return 0;
    });
};

export const getRepliesForComments = (postId, commentId) => {
  return get(ref(db, `posts/${postId}/comments/${commentId}/replies`)).then(
    (snapshot) => {
      if (!snapshot.exists()) {
        return [];
      }

      const replies = snapshot.val();

      return Object.keys(replies)
        .map((key) => ({
          ...replies[key],
          id: key,
        }))
        .sort((a, b) => b.createdOn - a.createdOn);
    }
  );
};

export const deleteComment = (postId, commentId) => {
  return remove(ref(db, `posts/${postId}/comments/${commentId}`))
    .then(() => {
      return;
    })
    .catch((error) => {
      toast.error("Error deleting comment", error);
    });
};

export const deleteReply = (postId, commentId, replyId) => {
  return remove(
    ref(db, `posts/${postId}/comments/${commentId}/replies/${replyId}`)
  )
    .then(() => {
      return;
    })
    .catch((error) => {
      toast.error("Error deleting reply", error);
    });
};

export const updateComment = (postId, commentId, content) => {
  const updateComment = {};
  updateComment[`/posts/${postId}/comments/${commentId}/content`] = content;

  return update(ref(db), updateComment)
    .then(() => {
      toast.success("Comment updated successfully");
    })
    .catch((error) => {
      toast.error("Error updating comment", error);
    });
};

export const updateReply = (postId, commentId, replyId, content) => {
  const updateReply = {};
  updateReply[
    `/posts/${postId}/comments/${commentId}/replies/${replyId}/content`
  ] = content;

  return update(ref(db), updateReply)
    .then(() => {
      toast.success("Reply updated successfully");
    })
    .catch((error) => {
      toast.error("Error updating reply", error);
    });
};
