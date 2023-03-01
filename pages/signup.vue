<template>
    <div class="flex h-screen">
        <div class="w-3/5 flex items-center justify-center">   
            <div class="w-3/6">
                <h1 class="text-4xl font-bold mb-5 font-main">Welcome to Mirobu</h1>
                <hr class="mb-2"/>
                <form  @submit.prevent="signup">
                    <span class="font-sec font-bold mb-1">Credentials</span>
                    <input type="text" placeholder="Your Email" v-model="credentials.email" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-2.5 px-3 py-2 w-full border-2 rounded border-gray-200" required/>
                    <input type="password" placeholder="Your Password" v-model="credentials.password" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-6 px-3 py-2 w-full border-2 rounded border-gray-200" required/>
                    <span class="font-sec font-bold mb-1">Company Identity</span>
                    <input type="text" placeholder="Company Name" v-model="credentials.name" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-2.5 px-3 py-2 w-full border-2 rounded border-gray-200" required/>
                    <input type="text" placeholder="Company Slogan" v-model="credentials.slogan" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-2.5 px-3 py-2 w-full border-2 rounded border-gray-200" required/>
                    <input type="file" accept="image/*" placeholder="Upload your logo" ref="logo" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-2.5 px-3 py-2 w-full border-2 rounded border-gray-200 mb-6" required/>
                    <p v-if="errorMessage" class="text-center text-red-500 font-bold mb-3.5">{{ errorMessage }}</p>
                    <input type="submit" class="w-full bg-black rounded p-3 text-white text-sm tracking-wider font-semibold mb-5 cursor-pointer" />
                </form>
                <p class="text-center"><span class="text-gray-500">Already have an account?</span> <NuxtLink to="/login" class="font-bold">Login</NuxtLink></p>
            </div>             
        </div>
        <div class="bg-main w-2/5"></div>
    </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {setDoc, doc} from "firebase/firestore"
import { ref as storageRef, uploadBytes } from "firebase/storage";
    
const credentials = ref({ name: "", slogan:"", email: "", password: ""});
const errorMessage = ref();
const logo = ref();

const signup = () => {

    const { $db, $auth, $storage } = useNuxtApp();

    if(credentials.value.name != "") {
        createUserWithEmailAndPassword($auth, credentials.value.email, credentials.value.password)
        .then((data) => {
            setDoc(doc($db, "users", data.user.uid), {
                name: credentials.value.name,
                slogan: credentials.value.slogan,
            });

            uploadBytes(storageRef($storage, 'users/' + credentials.value.name), logo.value.files[0]).then(() => {
                console.log('Uploaded succesfully');
            });

            navigateTo('/app')

        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage.value = "Invalid Email"
                    break;
                case "auth/email-already-in-use":
                    errorMessage.value = "Email already registered"
                    break;
                case "auth/weak-password":
                    errorMessage.value = "Password should be at least 6 characters long"
                    break;
                default:
                    errorMessage.value = "Invalid Email or Password"
                    break;
            }
        })
    } else errorMessage.value = "Name field can't be blank";        
};
</script>

<style lang="scss" scoped>

</style>