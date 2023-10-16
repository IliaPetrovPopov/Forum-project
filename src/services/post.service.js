import {
  ref,
  push,
  get,
  query,
  equalTo,
  orderByChild,
  update,
  remove,
  limitToLast,
} from "firebase/database";
import { db } from "../config/firebase-config";
import { POSTS_HOME_PAGE } from "../common/constants";
import { toast } from "react-toastify";

const fromPostsDocument = (snapshot) => {
  const postsDocument = snapshot.val();

  return Object.keys(postsDocument).map((key) => {
    const post = postsDocument[key];

    return {
      ...post,
      id: key,
      createdOn: new Date(post.createdOn),
      likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
      dislikedBy: post.dislikedBy ? Object.keys(post.dislikedBy) : [],
      savedBy: post.savedBy ? Object.keys(post.savedBy) : [],
      comments: post.comments ? Object.keys(post.comments) : [],
      categories: post.categories ? post.categories : [],
    };
  });
};

export const addPost = (content, handle, title, categories) => {
  return push(ref(db, "posts"), {
    content: content,
    author: handle,
    title: title,
    categories: categories,
    createdOn: Date.now(),
    comments: [],
    likedBy: [],
    dislikedBy: [],
  })
    .then((result) => {
      return getPostById(result.key);
    })
    .then((post) => console.error(post));
};

export const getPostById = (id) => {
  return get(ref(db, `posts/${id}`)).then((result) => {
    if (!result.exists()) {
      throw new Error(`Post with id ${id} does not exist!`);
    }

    const post = result.val();
    post.id = id;
    post.createdOn = new Date(post.createdOn);
    if (!post.likedBy) post.likedBy = [];
    if (!post.dislikedBy) post.dislikedBy = [];
    if (!post.savedBy) post.savedBy = [];

    return post;
  });
};

export const getLikedPosts = (handle) => {
  return get(ref(db, `users/${handle}`)).then((snapshot) => {
    if (!snapshot.val()) {
      throw new Error(`User with handle @${handle} does not exist!`);
    }

    const user = snapshot.val();
    if (!user.likedPosts) return [];

    return Promise.all(
      Object.keys(user.likedPosts).map((key) => {
        return get(ref(db, `posts/${key}`)).then((snapshot) => {
          const post = snapshot.val();

          return {
            ...post,
            // createdOn: new Date(post.createdOn),
            id: key,
            // likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
          };
        });
      })
    );
  });
};

export const getSavedPosts = (handle) => {
  return get(ref(db, `users/${handle}`)).then((snapshot) => {
    if (!snapshot.val()) {
      throw new Error(`User with handle @${handle} does not exist!`);
    }

    const user = snapshot.val();
    if (!user.saved) return [];

    return Promise.all(
      Object.keys(user.saved).map((key) => {
        return get(ref(db, `posts/${key}`)).then((snapshot) => {
          const post = snapshot.val();

          return {
            ...post,
            id: key
            // savedBy: post.savedBy ? Object.keys(post.savedBy) : [],
          };
        });
      })
    );
  });
};

export const getPostsByAuthor = (handle) => {
  return get(
    query(ref(db, "posts"), orderByChild("author"), equalTo(handle))
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];

    return fromPostsDocument(snapshot);
  });
};


export const getRecentlyCreated = () => {
  return get(
    query(
      ref(db, "posts"),
      orderByChild("createdOn"),
      limitToLast(POSTS_HOME_PAGE)
    )
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];

    return fromPostsDocument(snapshot);
  });
};

export const getMostLiked = () => {
  return get(
    query(
      ref(db, "posts"),
      orderByChild("likedBy"),
      limitToLast(POSTS_HOME_PAGE)
    )
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];

    return fromPostsDocument(snapshot);
  });
};

export const getMostCommented = () => {
  return get(
    query(
      ref(db, "posts"),
      orderByChild("comments"),
      limitToLast(POSTS_HOME_PAGE)
    )
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];

    return fromPostsDocument(snapshot);
  });
};

export const getAllPosts = () => {
  return get(ref(db, "posts")).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromPostsDocument(snapshot);
  });
};

export const likePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const unlikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};

export const dislikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/dislikedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/dislikedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const undislikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/dislikedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/dislikedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};

export const savePost = (handle, postId) => {
  const updateSaves = {};
  updateSaves[`/posts/${postId}/savedBy/${handle}`] = true;
  updateSaves[`/users/${handle}/saved/${postId}`] = true;

  return update(ref(db), updateSaves);
};
export const unsavePost = (handle, postId) => {
  const updateSaves = {};
  updateSaves[`/posts/${postId}/savedBy/${handle}`] = null;
  updateSaves[`/users/${handle}/saved/${postId}`] = null;

  return update(ref(db), updateSaves);
};


export const getPostCount = () => {
  return get(query(ref(db, "posts")))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.keys(snapshot.val()).length;
      }
      return 0;
    })
    .catch((e) => {
      console.error("Error getting posts count:", e);
      return 0;
    });
};

export const updatePost = (postId, title, content, date, categories) => {
  const updatePost = {};
  updatePost[`/posts/${postId}/title`] = title;
  updatePost[`/posts/${postId}/content`] = content;
  updatePost[`/posts/${postId}/lastUpdate`] = date;
  updatePost[`/posts/${postId}/categories`] = categories;

  return update(ref(db), updatePost)
    .then(() => {
      toast.success("Post updated successfully");
    })
    .catch((error) => {
      toast.error("Error updating post", error);
    });
};

export const deletePost = (postId) => {
  return get(ref(db, `/posts/${postId}/likedBy`))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        return [];
      }
      return Object.keys(snapshot.val());
    })
    .then((usersHandles) =>
      Promise.all(
        usersHandles.map((handle) =>
          remove(ref(db, `/users/${handle}/likedPosts/${postId}`))
        )
      )
    )
    .then(() => remove(ref(db, `/posts/${postId}`)))
    .catch((error) => {
      toast.error("Error deleting post", error);
    });
};

export const getPostCategories = async (postId) => {
  try {
    const snapshot = await get(ref(db, `posts/${postId}/categories`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting post categories:", error);
    return [];
  }
};