import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQO_EKuGSjl1jn_kMuJ10Pf5dUZR3tHqc",
  authDomain: "bgxplore.firebaseapp.com",
  databaseURL:
    "https://bgxplore-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bgxplore",
  storageBucket: "bgxplore.appspot.com",
  messagingSenderId: "536925466535",
  appId: "1:536925466535:web:c18debd38d566e1c491082",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const storage = getStorage(app);

// const firebaseConfig = {
//   apiKey: "AIzaSyAklK_e6BU3iaF1JTIIZkJ-raWtPqVG_0M",
//   authDomain: "forum-development-e446b.firebaseapp.com",
//   databaseURL:
//     "https://forum-development-e446b-default-rtdb.europe-west1.firebasedatabase.app/",
//   projectId: "forum-development-e446b",
//   storageBucket: "forum-development-e446b.appspot.com",
//   messagingSenderId: "787536246721",
//   appId: "1:787536246721:web:8c06005aaaf7ee58b5e140",
// };
