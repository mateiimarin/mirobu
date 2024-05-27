<template>
    <div class="">
        <div class="bg-gray-100 border-b rounded-t-xl p-5">
            <div class="flex items-center gap-4">
                <img :src="application.picture" class="w-24 h-24 object-cover rounded-full shadow shadow-gray-200" />
                <div>
                    <h3 class="text-2xl font-bold">{{ application.name }}</h3>
                    <h6>{{ application.slogan }}</h6>
                    <UBadge size="sm" class="mt-3 select-none cursor-pointer rounded-full px-3"
                        :color="application.color_indicator">{{ application.score }}pt. Match</UBadge>
                </div>
            </div>
        </div>
        <div class="border-b py-1 px-5">
            <div class="flex items-center justify-between">
                <div class="flex gap-3">
                    <NuxtLink :to="`mailto:${application.email}`" target="_blank" class="flex items-center">
                        <UButton size="md" color="gray" class="text-lg p-2" variant="ghost"><i
                                class="fi fi-rr-envelope w-5 h-5"></i></UButton>
                    </NuxtLink>
                    <NuxtLink v-if="application.linkedin != '404'" :to="`https://${application.linkedin}`"
                        target="_blank">
                        <UButton size="md" color="gray" class="text-lg p-2" variant="ghost"><i
                                class="fi fi-brands-linkedin w-5 h-5"></i></UButton>
                    </NuxtLink>
                    <UButton size="md" color="gray" class="text-sm p-2 flex items-center" variant="ghost"><i
                            class="fi fi-rr-marker w-5 h-5 text-lg"></i>
                        <div>{{ application.address }}</div>
                    </UButton>
                </div>
                <NuxtLink :to="application.resume" target="_blank">
                    <UButton size="md" color="primary" class="text-sm py-1.5 flex items-center" variant="solid"><i
                            class="fi fi-rr-document"></i>
                        <div>Resume</div>
                    </UButton>
                </NuxtLink>
            </div>
        </div>
        <div class="p-5 space-y-3 max-h-[calc(100vh_-_300px)] overflow-y-auto">
            <div>
                <h3 class="text-xl font-semibold mb-1">Description</h3>
                <p>{{ application.description }}</p>
            </div>
            <div>
                <h3 class="text-xl font-semibold mb-1">Skills</h3>
                <UBadge v-for="keyword in application.keywords" size="md"
                    class="mr-2 mb-2 select-none cursor-pointer  rounded-full" color="gray">{{ keyword }}</UBadge>
            </div>
            <div v-if="application.certifications != '404'">
                <h3 class="text-xl font-semibold mb-1">Certifications</h3>
                <UBadge v-for="certification in application.certifications" size="md"
                    class="mr-2 mb-2 select-none cursor-pointer rounded-full" color="gray">{{ certification }}</UBadge>
            </div>
            <div v-if="application.education != '404'">
                <h3 class="text-xl font-semibold mb-1">Education</h3>
                <UBadge v-for="experience in application.education" size="lg"
                    class="mr-2 mb-2 pl-2 py-2 pr-4 rounded-xl select-none cursor-pointer " color="white">

                    <div class="flex gap-2.5 items-center">
                        <UAvatar :alt="experience.institution" class="h-9 w-9" />
                        <div>
                            <h5 class="text-base">{{ experience.institution }}</h5>
                            <h6 class="text-xs text-[#4a85e3]">{{ experience.timespan }}</h6>
                        </div>
                    </div>
                </UBadge>
            </div>
            <div v-if="application.work_experience != '404'">
                <h3 class="text-xl font-semibold mb-1">Work experience</h3>
                <UBadge v-for="job in application.work_experience" size="lg"
                    class="mr-2 mb-2 pl-2 py-2 pr-4 rounded-xl select-none cursor-pointer " color="white">

                    <div class="flex gap-2.5 items-center">
                        <UAvatar :alt="job.institution" class="h-9 w-9" />
                        <div>
                            <h5 class="text-base">{{ job.institution }}</h5>
                            <h6 class="text-xs text-[#4f8df1]">{{ job.timespan }}</h6>
                        </div>
                    </div>
                </UBadge>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
const props = defineProps({
    application: Object,
})

const getResume = async () => {
    const { $storage } = useNuxtApp();
    getDownloadURL(storageRef($storage, `applications/${useRoute().params.id}/${props.application.email}`))
        .then((url) => {
            props.application.resume = url;
        })
}


onMounted(async () => {
    await getResume();
})

</script>

<style lang="scss" scoped></style>