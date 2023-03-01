<template>
    <div class="flex justify-center items-center h-screen">
        <form @submit.prevent = "createCampaign" class="w-1/3 bg-ui-50 p-4 rounded">
            <input type="text" placeholder="Your projects name" v-model="job.name" class="w-full box-border border-none font-main text-base p-3 mb-4 rounded outline-none p-rel" style="width: 100%" required/>
            <br />
            <textarea placeholder="Job description" v-model="job.description" class="w-full box-border border-none font-sec text-base p-3 mb-4 rounded outline-none resize-y" required></textarea>
            <br />
            <textarea placeholder="Job requirements" v-if="editor" @blur="toggleView" v-model="job.requirements" @input="execute" class="w-full box-border border-none font-sec text-base p-3 mb-4 rounded outline-none resize-y" required></textarea>
            <div v-else v-html="output" @click="toggleView" class="w-full bg-white box-border font-sec text-base p-3 mb-4 rounded"></div>
            <br />
            <span class="text-red-500 font-sec"> {{ errorMessage }} </span>
            <input type="submit" placeholder="Next" class="float-right border-none bg-main text-white rounded-md px-6 py-2 font-sec"/>
        </form>    
    </div>
</template>

<script setup>
import { marked } from 'marked'
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"

const job = ref({ name: "", description: "", requirements: ""});
const output = computed(() => marked(job.value.requirements))

const { $db } = useNuxtApp();
const authUser = useAuthUser();
const authUserData = useAuthUserData();

const errorMessage = ref("");
const editor = ref(true);

const toggleView = () => {
    editor.value = !editor.value;
    console.log(editor.value)
}

const validJob = async (campaignUrl) => {

    const campaignRef = doc($db, "campaigns", campaignUrl);
    const campaign = await getDoc(campaignRef);

    if (campaign.exists()) return "A campaign with this URL already exists";

    return "true";

}

const createCampaign = async () => {

    const campaignUrl = (authUserData.value.data().name + ' ' + Math.floor(Math.random() * (9999 - 1000) + 1000).toString()).toLowerCase().replace(/ /g, '-');
    const isJobValid = await validJob(campaignUrl);

    if(isJobValid === "true") {
        await setDoc(doc($db, "campaigns", campaignUrl), {
            name: job.value.name,
            description: job.value.description,
            requirements: output.value,
            publisher: authUser.value.uid,
        });

        const authUserRef = doc($db, "users", authUser.value.uid)
        await updateDoc(authUserRef, {
            campaigns: arrayUnion(campaignUrl)
        });

    }
    else errorMessage.value = isJobValid;
}



</script>

<style scoped>
ul {
    list-style-type: circle !important;
}
</style>