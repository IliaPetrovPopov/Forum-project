import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../../config/firebase-config"
import { updateProfile } from "firebase/auth";

export const updateStorage = async (photo, user, handle) => {

    const storageRef = ref(storage, `profile-pic-${handle}`);
    
    await uploadBytes(storageRef, photo);
    const photoURL = await getDownloadURL(storageRef);
    
    await updateProfile(user, {photoURL: photoURL});
}