import { ref, set, update } from "@firebase/database";

import { db } from "../config/firebase-config";


export const blockUser = (handle) => {
  try {
    update(ref(db, `/users/${handle}`), { blocked: true });
  } catch (e) {
    console.error("Error blocking user", e);
  }
};

export const unblockUser = (handle) => {
  try {
    update(ref(db, `/users/${handle}`), { blocked: false });
  } catch (e) {
    console.error("Error blocking user", e);
  }
};

