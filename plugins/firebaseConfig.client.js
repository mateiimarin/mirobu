import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp

    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyAoViZuPGTQditJstjp3WownE0UPARvWuo",
        authDomain: "mirobu-a2491.firebaseapp.com",
        projectId: "mirobu-a2491",
        storageBucket: "mirobu-a2491.appspot.com",
        messagingSenderId: "6852642063",
        appId: "1:6852642063:web:bcf414f6721ddd7f75aa7a",
        measurementId: "G-42M50WQRF4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore(app)
    const storage = getStorage(app);
    const analytics = getAnalytics(app);

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);

    nuxtApp.vueApp.provide('db', db);
    nuxtApp.provide('db', db);

    nuxtApp.vueApp.provide('storage', storage);
    nuxtApp.provide('storage', storage);

    initializeUser();

  })