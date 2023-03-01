<template>
    <div class="flex">
        <div class="bg-black h-screen w-1/3"></div>
        <div class="w-2/3 flex items-center justify-center">
            <div class="w-1/3">
                <h1 class="text-4xl font-bold mb-5">Welcome back</h1>
                <hr class="mb-2"/>
                <input type="text" placeholder="Your Email" v-model="email" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-2.5 px-3 py-2 w-full border-2 rounded border-gray-200"/>
                <input type="password" placeholder="Your Password" v-model="password" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-2.5 px-3 py-2 w-full border-2 rounded border-gray-200"/>
                <p v-if="errorMessage" class="text-center text-red-500 font-bold mb-3.5">{{ errorMessage }}</p>
                <button @click="login" class="w-full bg-black rounded p-3 text-white text-sm tracking-wider font-semibold mb-5">Login</button>
                <p class="text-center"><span class="text-gray-500">Don't have an account?</span> <NuxtLink to="/signup" class="font-bold">Sign up</NuxtLink></p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const email = ref("");
const password = ref("");
const errorMessage = ref();

const login = () => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
        navigateTo('/app')
    })
    .catch((error) => {
        switch (error.code) {
            case "auth/invalid-email":
                errorMessage.value = "Invalid Email"
                break;
            case "auth/user-not-found":
                errorMessage.value = "Email not registered"
                break;
            case "auth/wrong-password":
                errorMessage.value = "Incorrect Password"
                break;
            default:
                errorMessage.value = "Invalid Email or Password"
                break;
                }
            })

    };
</script>

<style lang="scss" scoped>

</style>