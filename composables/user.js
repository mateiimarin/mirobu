import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ref as storageRef, getDownloadURL } from "firebase/storage";


export const useAuthUser = () => useState('authUser', () => {})

export const initializeUser = async () => {
    const { $auth } = useNuxtApp();
    const authUser = useAuthUser();

    authUser.value = {
        uid: '',
        data: {},
        logo: '',
        available: false,
    }

    onAuthStateChanged($auth, (user) => {
        authUser.value.uid = user.uid;
        getUserData();
    })
}

export const getUserData = async () => {
    const { $db } = useNuxtApp();
    const authUser = useAuthUser();

    const authUserData = await getDoc(doc($db, "users", authUser.value.uid));
    authUser.value.data = authUserData.data();
    getUserLogo();
}

export const getUserLogo = async () => {
    const { $storage } = useNuxtApp();
    const authUser = useAuthUser();

    getDownloadURL(storageRef($storage, `users/${authUser.value.data.name}`))
    .then((url) => {
        authUser.value.logo = url;
        authUser.value.available = true;
        console.log(authUser.value)
    })

}