import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuGhasz6OC64OGYUft_sv88f4oZ3moguE",
  authDomain: "fir-try-9820a.firebaseapp.com",
  projectId: "fir-try-9820a",
  storageBucket: "fir-try-9820a.appspot.com",
  messagingSenderId: "397491300959",
  appId: "1:397491300959:web:57a64d024ca54ee38509ea",
  measurementId: "G-1PV4P2LDLZ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
