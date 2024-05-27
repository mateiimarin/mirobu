<template>
    <div class="min-w-72 h-full border-r-2 py-5 px-3.5 border-gray-200 font-main">
        <div class="relative h-full w-full">
            <div>
                <UVerticalNavigation 
                    :links="links" 
                    class="font-main"
                    :ui="{ 
                        padding: 'p-2.5', 
                        active: 'text-gray-900 dark:text-primary-400 font-semibold',
                        inactive: 'text-gray-700',
                        icon: {
                            active: 'text-gray-900',
                            inactive: 'text-gray-700',
                        },
                    }" 
                />
            </div>
            <div class="mt-4">
                <div class="flex w-full justify-between px-1 mb-1.5">
                    <h6 class="text-xs font-medium text-gray-500">CAMPAIGNS</h6>
                    <UIcon name="i-heroicons-chevron-down" class="text-gray-100"/>
                </div>
                <ClientOnly> 
                    <div v-if="authUser.available">
                        <div v-if="authUser.data.campaigns.length > 0" class="flex flex-col-reverse gap-0.5">
                            <div v-for="campaign in authUser.data.campaigns" class="px-2.5 py-1.5 rounded-md cursor-pointer" :class="currentCampaignId == campaign.id ? 'bg-gray-100 border-r-4 border-primary-500' : ''">
                                <NuxtLink :to="`/admin/${campaign.id}`" @click="currentCampaignId = campaign.id">
                                    <div class="flex gap-2 items-center" >
                                        <div class="text-sm">{{ campaign.name }}</div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                        <div v-else class="text-sm text-gray-600 px-1">There are no campaigns yet.</div>
                    </div>
                    <template #fallback>
                        <div class="space-y-2.5">
                            <USkeleton class="h-7 w-full" />
                            <USkeleton class="h-7 w-full" />
                            <USkeleton class="h-7 w-full" />
                        </div>
                    </template>
                </ClientOnly> 
            </div>
            <div class="absolute bottom-0 font-main w-full space-y-1 p-1">
                <UButton color="primary" @click="isModalOpen = true" block>New Campaign</UButton>
            </div>
        </div>
        <UModal v-model="isModalOpen" :ui="{shadow: 'shadow-lg', width: 'max-w-fit sm:max-w-fit'}">
           <NewCampaignModal @close="isModalOpen = false"/>
        </UModal>
    </div>
</template>

<script setup>
const authUser = useAuthUser();
const currentCampaignId = ref(useRoute().params.id);
const isModalOpen = ref(false);

const links = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/dashboard'
    },
    {
        label: 'Analytics',
        icon: 'i-heroicons-arrow-trending-up',
        to: '/analytics'
    },
    {
        label: 'Integrations',
        icon: 'i-heroicons-arrows-right-left',
        to: '/integrations'
    },
    {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        to: '/settings'
    }
] 

</script>

<style lang="scss" scoped>

</style>