<template>
    <div class="bg-ui-50 min-h-screen container max-w-screen-2xl py-10 px-4">
        <div class="px-12 pb-4 pt-6 bg-slate-100 fixed w-[calc(100%_-_2rem)]">
            <h2 class="text-3xl font-main font-bold mb-2">Your Projects</h2>
            <div class="flex gap-3 w-full">
                <div class="w-10/12">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute py-3.5 px-4 text-gray-400 "/>
                    <input type="search" placeholder="Search" v-model="searchValue" class="p-2 pl-11 w-full font-sec border-2 border-gray-200 rounded"/>  
                </div>
            <div class="w-2/12"><button class="bg-black font-main rounded py-2 text-white w-full" @click="$emit('create')">Add new</button></div>
            </div>
        </div>
    
        <div class="pt-32" v-if="loaded">
            <div class="grid-container">
                    <CampaignCard v-for="(campaign, index) in filteredCampaigns" :route="campaigns[index]" :campaign="filteredCampaigns[index]" class="hover:border-2 hover:border-gray-600 hover:-translate-y-1 transition-transform cursor-pointer rounded-md"></CampaignCard>
            </div>
            
        </div>
    </div>
    </template>
    
<script setup>

    import {doc, getDoc} from "firebase/firestore"

    const authUserData = useAuthUserData();
    const searchValue = ref("");
    const campaigns = ref([]);
    const campaignsData = ref([]);
    const { $db } = useNuxtApp();

    const loaded = ref(false);

    if(authUserData.value) {
        campaigns.value = authUserData.value.data().campaigns;
        campaigns.value.forEach( async (campaign) => {
            const document = await getDoc(doc($db, "campaigns", campaign));
            campaignsData.value.push(document.data())

            if(campaigns.value.length === campaignsData.value.length) loaded.value = true;
        })
    }
    else {
        watch(authUserData, () => { 
            campaigns.value = authUserData.value.data().campaigns;
            campaigns.value.forEach( async (campaign) => {
                const document = await getDoc(doc($db, "campaigns", campaign));
                campaignsData.value.push(document.data())

                if(campaigns.value.length === campaignsData.value.length) loaded.value = true;
            })
        })
    }
    
    watch(loaded, () => {
        console.log(campaignsData.value)
    })

    const filteredCampaigns = computed(() => {
        return campaignsData.value.filter((campaign) => campaign.name.toLowerCase().includes(searchValue.value.toLowerCase()));
    })
    
</script>
    
<style scoped>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      grid-gap: 1.5rem;
      width: 100%;
      padding: 2rem 4rem 4rem 4rem;
    }
    
</style>