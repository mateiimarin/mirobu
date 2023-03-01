<template>
    <div>
        <div class="h-screen bg-ui-50 flex">
            <Sidebar />
            <div class="px-7 py-6 w-full">
                <h2 class="font-bold text-2xl mb-4">Applications</h2>
                <ClientOnly><FilterBar @filter-change="updateFilter"/>
                    <div v-if="filteredApplications.length != 0" class="grid-container mt-6">
                        <ApplicationCard v-for="application in filteredApplications" :application="application" :active="activeTab" @click="openPopup(application)" class="cursor-pointer"></ApplicationCard>
                    </div>
                    <div v-else class="font-main py-6 ">There are no applications matching your filter criteria</div>
                </ClientOnly>
            </div>
            <Teleport to="body">
                <Popup :application="popupApplication" @close="showPopup = false" v-if="showPopup"/>
            </Teleport>
        </div>
    </div>
</template>

<script setup>
import { collection, getDocs } from '@firebase/firestore';

const campaign = useRoute().params.id;
const authUserData = useAuthUserData();

const showPopup = ref(false);
const popupApplication = ref();
const refreshKey = ref(0);
const openPopup = (appl) => {
    popupApplication.value = appl;
    showPopup.value = true;
}




const search = ref('');
const limits = ref({min_score: 1, max_score: 10});
const activeTab = ref(0);

const updateFilter = (newLimits, newActive, newSearch) => {
    limits.value = newLimits;
    activeTab.value = newActive;
    console.log(activeTab.value)
    search.value = newSearch;
}

const applications = ref([]);
const applicationFiles = ref([]);
const {$db} = useNuxtApp();

if($db) {
    const applicationSnapshot = await getDocs(collection( $db, `campaigns/${campaign}/applications`));
    applicationSnapshot.forEach((doc) => {
        applications.value.push(doc.data());
    })
}

const filteredApplications = computed(() => {
    return applications.value.filter(
    (application) => application.name.toLowerCase().includes(search.value.toLowerCase()) 
    && parseInt(application.score) >= limits.value.min_score 
    && parseInt(application.score) <= limits.value.max_score)
});
</script>

<style  scoped>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      grid-gap: 1.5rem;
      width: 100%;
    }
</style>