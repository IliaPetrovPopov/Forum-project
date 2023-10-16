import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  update,
} from "firebase/database";
import { db } from "../config/firebase-config";
import {
  validateEmail,
  validateName,
} from "./document-verifications/user-doc-verification";
import { ROLES } from "../common/constants";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email, firstName, lastName) => {
  try {
    validateName(firstName);
    validateName(lastName);
    validateEmail(email);
  } catch (e) {
    return `Error creating user: ${e}`;
  }

  return set(ref(db, `users/${handle}`), {
    handle,
    uid,
    blocked: false,
    role: "user",
    email,
    firstName,
    lastName,
    createdOn: new Date(),
    likedPosts: {},
    photoURL: "",
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

export const getUserCount = () => {
  return get(query(ref(db, "users")))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.keys(snapshot.val()).length;
      }
      return 0;
    })
    .catch((e) => {
      console.error("Error getting users count:", e);
      return 0;
    });
};

export const changeUserData = (uid, updatedData) => {
  return update(ref(db, `users/${uid}`), updatedData);
};

export const changeUserRole = (handle, newRole) => {
  newRole.toLowerCase();
  try {
    if (!ROLES.includes(newRole)) {
      throw new Error(
        `${newRole} not in available roles for our forum! Available roles are: ${ROLES.join(
          ", "
        )}`
      );
    }
    update(ref(db, `/users/${handle}`), { role: newRole });
  } catch (e) {
    console.error("Error changing user role", e);
  }
};

export const getUserRole = (handle) => {
  return get(ref(db, `users/${handle}/role`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
  }).catch((e) => {console.error("Error getting user role:", e)});
};
