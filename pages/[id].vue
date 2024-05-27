<template>
    <div class="w-screen font-main overflow-y-auto">
        <div class="bg-white border-b-2 w-full py-2 px-3 flex justify-between fixed top-0 z-50">
            <div class="flex items-center gap-2 w-72">
                <div>
                    <img src="/icon.png" alt="logo" class="rounded-md w-7 h-7 object-cover" />
                </div>
                <h1 class="text-[22px] font-bold font-main">Mirobu</h1>
            </div>
            <div class="gap-2 flex">
                <NuxtLink to="/login"><UButton class="px-4" size="sm">Login</UButton></NuxtLink>
                <NuxtLink to="/signup"><UButton class="px-4" color="gray" size="sm">Signup</UButton></NuxtLink>
            </div>
        </div>
        <ClientOnly>
            <div class="bg-gray-100 p-5 mt-12 w-full flex items-center justify-between" v-if="publisher">
                <div class="flex gap-4 items-center">
                    <div>
                        <img :src="publisher?.logo" alt="Logo" class="w-16 h-16 rounded-lg"/>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold">{{ publisher?.data.name }}</h2>
                        <h6>{{ publisher?.data.slogan }}</h6>
                    </div>
                </div>
                <div>
                    <NuxtLink :to="`https://${campaign?.website}`" target="_blank" >
                        <UButton size="lg" variant="solid" color="white"  square>
                            <UIcon  name="i-heroicons-link" class="text-lg"/>
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
            <template #fallback >
                <div class="w-full mt-12 p-4 space-y-2">
                    <USkeleton class="h-12 w-[500px]" />
                    <USkeleton class="h-8 w-96" />
                </div>
            </template>
        </ClientOnly>
        <div class="p-6 flex gap-12 justify-between max-h-[calc(100vh_-_160px)] overflow-y-auto">
            <div class="grow">
                <CampaignInfo :campaign="campaign"/>
            </div>
            <div class="min-w-96 shrink sticky top-0">
                <ApplicationCard :campaign="campaign"/>
            </div>
        </div>
    </div>
</template>

<script setup>
const handle = useRoute().params.id;

const campaign = ref();
const publisher = ref();

onMounted(async() => {
    const campaignData = await getCampaign(handle);
    campaign.value = campaignData.data;
    publisher.value = campaignData.publisher;
    console.log(campaign.value)
})



</script>

<style scoped>
    .hdew {
        list-style: inside !important;
        
    }
</style>