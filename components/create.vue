<template>
    <div class="flex justify-center items-center h-screen">
        <Transition name="popup">
            <div v-if="show" class="fixed bottom-0 w-screen bg-black/[.40] h-screen z-50 flex items-center justify-center transition-all">
                <div class="bg-white w-[70%] h-[92%]  rounded-lg transition-all popup-container px-6 py-2">
                    <div class="w-full border-b-2 flex py-3">
                        <h2>Add new job</h2>
                        <div @click="$emit('close')" class="ml-auto w-10 h-10 bg-ui-100 rounded-md flex items-center justify-center text-[18px] cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </div>
                    </div>
                    <form @submit.prevent = "createCampaign" class="w-full bg-ui-50 p-4 pb-12 rounded mt-4">
                        <input type="text" placeholder="Job name" v-model="job.name" class="w-full box-border border-none font-main text-base p-3 mb-4 rounded outline-none p-rel" style="width: 49%" required/>
                        <input type="text" placeholder="Job salary" v-model="job.salary" class="w-full box-border border-none font-main float-right text-base p-3 mb-4 rounded outline-none p-rel" style="width: 49%" required/>
                        <input type="text" placeholder="Company website" v-model="job.website" class="w-full box-border border-none font-main text-base p-3 mb-4 rounded outline-none p-rel" style="width: 49%" required/>
                        <input type="text" placeholder="Company location" v-model="job.location" class="w-full box-border border-none font-main text-base float-right p-3 mb-4 rounded outline-none p-rel" style="width: 49%" required/>
                        <br />
                        <textarea placeholder="Job description" v-model="job.description" class="w-full box-border border-none font-sec text-base p-3 h-32 mb-4 rounded outline-none resize-y" required></textarea>
                        <br />
                        <textarea placeholder="Job requirements" v-if="editor" @blur="toggleView" v-model="job.requirements" @input="execute" class="w-full box-border border-none h-48 font-sec text-base p-3 mb-4 rounded outline-none resize-y" required></textarea>
                        <div v-else v-html="output" @click="toggleView" class="w-full bg-white box-border font-sec text-base p-3 mb-4 rounded"></div>
                        <br />
                        <span class="text-red-500 font-sec"> {{ errorMessage }} </span>
                        <input type="submit" placeholder="Next" class="float-right border-none bg-main text-white rounded-md px-6 py-2 font-sec"/>
                    </form>  
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { marked } from 'marked'
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"

const props = defineProps({
    show: Boolean,
})

const emit = defineEmits(['close']);

const job = ref({ name: "", description: "", requirements: "", location: "", salary: "", website: ""});
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
            website: job.value.website,
            salary: job.value.salary,
            location: job.value.location,
            requirements: output.value,
            publisher: authUser.value.uid,
            applications: 0,
            scores: 0,
        });

        const authUserRef = doc($db, "users", authUser.value.uid)
        await updateDoc(authUserRef, {
            campaigns: arrayUnion(campaignUrl)
        });
        emit('close')

    }
    else errorMessage.value = isJobValid;
}



</script>

<style scoped>
ul {
    list-style-type: circle !important;
}

.popup-enter-from {
  opacity: 0;
}

.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .popup-container,
.popup-leave-to .popup-container {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
</style>