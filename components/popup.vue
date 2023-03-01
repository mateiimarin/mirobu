<template>
    <div>
        <Transition name="popup">
            <div class="fixed bottom-0 w-screen bg-black/[.40] h-screen z-50 flex items-center justify-center transition-all" v-if="showPopup">
                <div class="bg-white w-[80%] h-[92%]  rounded-lg transition-all popup-container px-6 py-2 ">
                    <div class="w-full border-b-2 flex py-3">
                        <h2>Application</h2>
                        <div @click="closePopup" class="ml-auto w-10 h-10 bg-ui-100 rounded-md flex items-center justify-center text-[18px] cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </div>
                    </div>
                    <div class="py-4 flex justify-center">
                        <div class="w-11/12">
                            <div class="flex items-center mb-6">
                                <div class="flex items-center justify-center w-14 h-14 bg-green-100 rounded-[12px]">
                                    <span class="font-main text-[18px] font-semibold text-main">{{ application.score }}</span>
                                </div>
                                <div class="ml-4">
                                    <h2 class="font-main text-[26px] font-medium">{{ application.name }}</h2>
                                    <span>{{ application.slogan }}</span>
                                </div>
                            </div>
                            <div class="flex gap-5 font-main bg-ui-50 py-2.5 px-2 rounded-md">
                                <div class="h-7 bg-[#212121] text-white px-5 rounded flex items-center" @click="openResume">
                                    <a :href="resumeUrl" target="_blank">Resume</a>
                                </div>
                                <div v-if="application.address != '404'" class="flex gap-2">
                                    <div class="bg-ui-300 h-7 w-7 rounded flex items-center justify-center">
                                        <font-awesome-icon icon="fa-solid fa-location-dot" />
                                    </div>
                                    <span class="flex items-center justify-center">{{ application.address }}</span>
                                </div>
                                <div v-if="application.linkedin != '404'" class="bg-[#006097] h-7 w-7 text-white rounded flex items-center justify-center ml-auto">
                                    <a :href="`https://linkedin.com/${application.linkedin}`" target="_blank"><font-awesome-icon icon="fa-brands fa-linkedin-in" /></a>
                                </div>
                                <div v-if="application.email != '404'" class="bg-[#c12a2a] h-7 w-7 text-white rounded flex items-center justify-center">
                                    <a :href="`mailto:${application.email}`" ><font-awesome-icon icon="fa-solid fa-envelope" /></a>
                                </div>
                            </div>
                            <p class="text-justify mt-5">{{ application.description }}</p>

                            <list  v-if="application.keywords != '404'" :list="application.keywords" class="mb-4"></list>
                            <list  v-if="application.certifications != '404'" :list="application.certifications" class="mb-4">Certifications</list>
                            <list  v-if="application.previous_work_experience != '404'" :list="application.previous_work_experience">Previous Work Experience</list>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref as storageRef, getDownloadURL} from 'firebase/storage'
 
const props = defineProps({
    application: Object,
})

const emit = defineEmits(['close'])

const { $storage } = useNuxtApp();
const resumeUrl = ref('');

const showPopup = ref(false);
setTimeout(() => {
    showPopup.value = true;
})

getDownloadURL(storageRef($storage, `applications/${useRoute().params.id}/${props.application.name}`))
.then((url) => {
    resumeUrl.value = url;
})

const closePopup = () => {
    showPopup.value = false;
    setTimeout(() => {
        emit('close');
    }, 200)
}
</script>

<style scoped>

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