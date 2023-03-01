<template>
    <div>
        <div class="mb-6">
            <h2 class="font-semibold font-main text-[22px]">Apply for this job</h2>
            <span class="text-gray-500">Submit your name and your resume</span>
        </div>
        <form @submit.prevent = "addApplication">
            <input type="text" placeholder="Your Name" v-model="applicantName" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-2.5 px-3 py-2 w-full border-2 rounded border-gray-200" required/>
            <input type="file" accept=".pdf" ref="fileUpload" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-10 px-3 py-2 w-full border-2 rounded border-gray-200" required/>
            <input type="submit" placeholder="Submit" class="bg-main text-center w-full px-14 py-2 rounded text-gray-100 font-main cursor-pointer"/>
        </form>
      
    </div>
</template>

<script setup>
import { ref as storageRef, uploadBytes } from "firebase/storage";

const props = defineProps({
  campaign: String,
  campaignData: Object,
})

const emit = defineEmits(['applicationSubmit']);

const { $storage } = useNuxtApp();

const fileUpload = ref();
const applicantName = ref("");


const addApplication = async () => {
    const file = fileUpload.value.files[0];
    const fileRef = storageRef($storage, 'applications/' + props.campaign + '/' + applicantName.value);

    const formData = new FormData();
    formData.append('pdf', file);
    
    fetch('https://pdf-parse.vercel.app', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
    .then(text => {
        emit('applicationSubmit', text.trim(), applicantName.value);
    })

    uploadBytes(fileRef, file).then( async () => {
        console.log('Uploaded succesfully');

    });
}
</script>

<style lang="scss" scoped>

</style>