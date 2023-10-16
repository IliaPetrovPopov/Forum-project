import { get, ref } from "@firebase/database";
import { db } from "../../../config/firebase-config";

export const checkAdminStatus = async (userData, setIsAdmin) => {
  if (userData && userData.handle) {
    const roleSnapshot = await get(ref(db, `users/${userData.handle}/role`));
    setIsAdmin(roleSnapshot.val() === "admin");
  }
};
