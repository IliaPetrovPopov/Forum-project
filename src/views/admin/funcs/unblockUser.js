import { ref, set, update } from "@firebase/database";
import { db } from "../../../config/firebase-config";

export const unblockUser = async (username) => {
    try {
        const blockPath = `users/${username}/blocked`;

        await update(ref(db), { [blockPath] : false });
        await set(ref(db, `blocked-users/${username}`),  null);
    } catch (e) {
        throw new Error(e.message);
    }
}