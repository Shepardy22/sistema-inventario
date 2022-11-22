
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuSc9NualfGD_g89JUSK2q2nfvwb33kMU",
  authDomain: "contagem-estoque-2bdeb.firebaseapp.com",
  projectId: "contagem-estoque-2bdeb",
  storageBucket: "contagem-estoque-2bdeb.appspot.com",
  messagingSenderId: "706718762727",
  appId: "1:706718762727:web:68be43241255b52e9e4442",
  measurementId: "G-CE97ST113M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export default app;

export const db = getFirestore(app);