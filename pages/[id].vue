<template>
    <div class="container max-w-screen-xl py-10 px-4">
        <Toast class="fixed bottom-5 right-10" :status="toast.status" v-if="toast.active" @click="toast.active = false">
            <template #header><span class="font-semibold font-main text-[18px] leading-5">{{ toast.status == 0 ? 'Pending' : (toast.status == 1 ? 'Succes' : 'Error')}}</span></template>
            <template #message><span class="text-[14px] font-main">{{ toast.message }}</span></template>
        </Toast>
        <div class="w-full lg:flex gap-28 items-start">
            <div class="w-full lg:w-1/3 border-2 rounded-xl relative lg:order-last">
                <div class="px-5 pt-8 pb-16">
                    <FileUpload v-if="currentTab == 2" :campaign="campaignId" :campaign-data="campaignData" @application-submit="evaluateApplication" />
                    <CampaignDetails :campaign-data="campaignData" v-else/>
                </div>
                <button class="px-14 py-2 rounded font-main absolute bottom-3 inset-x-4" :class="[currentTab === 1 ? 'bg-black text-gray-100' : 'bg-ui-500 text-gray-800']" @click="currentTab = currentTab === 1 ? 2 : 1">{{ currentTab === 1 ? 'Apply' : 'Cancel'}}</button>
            </div>
            <div class="w-2/3">
                <CampaignHeader :campaign-data="campaignData" :publisher-data="publisherData" class="mb-6"/>
                <CampaignInfo :campaign-data="campaignData" />
            </div> 
        </div>
    </div>
</template>

<script setup>
import { doc, getDoc, collection, addDoc, updateDoc, increment } from "firebase/firestore"

const campaignData = ref();
const publisherData = ref();

const { $db } = useNuxtApp();
const campaignId = useRoute().params.id;

const currentTab = ref(1);
const toast = ref({active: false, status: 0, message: 'Your application is being registered'});

if($db)
{
    const campaign = await getDoc(doc($db, "campaigns", campaignId));
    campaignData.value = campaign.data();
    
    const publisher = await getDoc(doc($db, "users", campaignData.value.publisher));
    publisherData.value = publisher.data();
}

const evaluateApplication = async (applicantResume, applicantName) => {

    toast.value.active = true;

    const input = {
        resume: applicantResume,
        campaign: {
            description: campaignData.value.description,
            requirements: campaignData.value.requirements,
        }
    }

    const score = await $fetch("/api/evaluate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: input,
    });

    const data = await $fetch("/api/extract-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: applicantResume,
    });

    

    if(score.error != 'error' && data.error != 'error') {
        const applicantData = JSON.parse(data.result);
        await addDoc(collection($db, `campaigns/${campaignId}/applications`), {
            name: applicantName,
            score: score.result,
            email: applicantData.email,
            linkedin: applicantData.linkedin,
            description: applicantData.description,
            keywords: applicantData.keywords,
            certifications: applicantData.certifications,
            address: applicantData.address,
            slogan: applicantData.slogan,
            previous_work_experience: applicantData.previous_work_experience,
        })

        await updateDoc(doc($db, "campaigns", campaignId), {
            scores: increment(parseInt(score.result)),
            applications: increment(1),
        })

        toast.value = { active: true, status: 1, message: 'Your application was succesfully registered'};
    }
    else {
        toast.value = { active: true, status: 2, message: 'There was an error. Try again'};
    }



}


</script>

<style lang="scss" scoped>

</style>