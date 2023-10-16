import { get, ref, set, update } from "@firebase/database";
import { db } from "../../../config/firebase-config";

export const blockUser = async (handle, reason) => {
    try {
        const blockPath = `users/${handle}/blocked`;
        const email = (await get(ref(db, `users/${handle}/email`))).val();
        
        update(ref(db), { [blockPath] : true });
        set(ref(db, `blocked-users/${handle}`), { reason: reason, email: email} );
    } catch (e) {
        throw new Error(e.message);
    }
}