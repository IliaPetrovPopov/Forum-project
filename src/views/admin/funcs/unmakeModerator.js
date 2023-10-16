import { ref, update } from "@firebase/database";
import { db } from "../../../config/firebase-config";

export const unmakeModerator = async (handle) => {
    try {
        const rolePath = `users/${handle}/role`;
        
        update(ref(db), { [rolePath] : 'user' });
    } catch (e) {
        throw new Error(e.message);
    }
}