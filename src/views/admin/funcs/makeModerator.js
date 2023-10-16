import { ref, update } from "@firebase/database";
import { db } from "../../../config/firebase-config";

export const makeModerator = async (handle) => {
    try {
        const rolePath = `users/${handle}/role`;
        
        update(ref(db), { [rolePath] : 'moderator' });
    } catch (e) {
        throw new Error(e.message);
    }
}