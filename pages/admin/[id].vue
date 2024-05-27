<template>
    <div class="px-4 pt-5">
        <div class="bg-white border mb-3 rounded-lg p-3 flex justify-between items-center">
            <ClientOnly>
                <div class="flex items-center gap-4"><h2 class="text-lg font-bold">{{ campaign?.data.name }}</h2>
                    <NuxtLink :to="`/${campaignHandle}`">
                        <UButton icon="i-heroicons-arrow-top-right-on-square" color="gray" size="xs"/>
                    </NuxtLink></div>
                <div class="flex gap-3 text-sm font-semibold  ">
                    <div><span>{{ campaign?.data.applications }}</span> Applications</div>
                    <div>
                        <span>{{ Math.round((campaign?.data.scores * 10) / campaign?.data.applications)  }}% Match</span>
                    </div>
                </div>
            </ClientOnly>
            
        </div>
        <UTable :loading="isLoadingData"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }" class="w-full bg-white rounded-t-lg border"
            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No applications.' }" :columns="columns"
            :rows="rows" @select="openApplication">
            <template #name-data="{ row }">
                <div class="flex items-center gap-3">
                    <img :src="row.picture" :alt="row.name" class="object-cover h-8 w-8 rounded-full bg-gray-100" />
                    <div class="text-gray-900 font-semibold">{{ row.name }}</div>
                </div>
            </template>

            <template #score-data="{ row }">
                <div class="h-6 w-6 rounded-full flex items-center justify-center text-white font-semibold "
                    :class="`bg-${row.color_indicator}-500`"><span>{{ row.score }}</span></div>
            </template>
            <template #keywords-data="{ row }">
                <div class="relative space-x-2 max-w-52 overflow-hidden">
                    <UBadge color="gray" :ui="{ rounded: 'rounded-full' }" v-for="keyword in row.keywords">{{ keyword }}
                    </UBadge>

                    <div class="absolute inset-y-0 right-0 w-1/5" style="background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));"></div>
                </div>
            </template>
        </UTable>
        <div class="bg-white py-2 px-3 border-x border-b  rounded-b-lg w-full flex justify-end">
            <UPagination v-model="page" :page-count="pageCount" :total="applications.length" />
        </div>

        <UModal v-model="selection.available"
            :ui="{ shadow: 'shadow-lg', width: 'w-[800px] sm:min-w-[800px]', overlay: { background: 'bg-black/20' } }">
            <ApplicationModal :application="selection.data" />
        </UModal>
    </div>
</template>

<script setup>
const campaignHandle = useRoute().params.id;

const applications = ref([]);
const campaign = ref();
const columns = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'slogan',
        label: 'Description'
    },
    {
        key: 'keywords',
        label: 'Details'
    },
    {
        key: 'score',
        label: 'Score'
    }
]

const isLoadingData = ref(true);
const selection = ref({
    data: null,
    available: false,
})

const openApplication = (application) => {
    selection.value.data = application;
    selection.value.available = true;
}

const page = ref(1);
const pageCount = 8;

const rows = computed(() => {
    return applications.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

onMounted(async () => {
    campaign.value = await getCampaign(campaignHandle);
    applications.value = await getApplications(campaignHandle);
    isLoadingData.value = false;
})
</script>

<style lang="scss" scoped></style>