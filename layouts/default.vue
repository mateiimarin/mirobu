<template>
    <div class="overflow-hidden">
        <div class="max-h-screen overflow-y-hidden">
            <div class="bg-white border-b-2 w-full py-2 px-3 flex fixed top-0 z-50" v-if="displayLayout">
                    <div class="flex items-center gap-2 w-72">
                        <div>
                            <img src="/icon.png" alt="logo" class="rounded-md w-7 h-7 object-cover"/>
                        </div>
                        <h1 class="text-[22px] font-bold font-main">Mirobu</h1>
                    </div>
                    <div class="flex justify-between grow">
                        <UInput
                            icon="i-heroicons-magnifying-glass-20-solid"
                            size="md"
                            variant="none"
                            color="white"
                            :trailing="false"
                            placeholder="Search..."
                            class="bg-gray-100 rounded-md w-96"
                        />
                        <ClientOnly>
                            <div v-if="authUser.available" class="flex gap-3">
                                <div class="text-right text-xs font-main">
                                    <span class="block font-bold">{{ authUser.data.name }}</span>
                                    <span class="text-gray-600">{{ authUser.data.email }}</span>
                                </div>
                                <UAvatar
                                    :src="authUser.logo"
                                    alt="Company logo"
                                />
                            </div>
                            <template #fallback>
                                <UAvatar
                                    src="/user.png"
                                    alt="Company logo"
                                />
                            </template>
                        </ClientOnly>
                    </div>
                </div>
            <div class=" h-screen flex space-between" :class="displayLayout ? 'pt-12' : ''">
                <Sidebar v-if="displayLayout"/>
                <div :class="displayLayout ? 'grow overflow-y-auto bg-gray-100' : ''">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const currentRoute = useRoute();
const authUser = useAuthUser();


const routesx = ref(['admin']);

const displayLayout = computed(() => {
    for(let routex of routesx.value) {
        if(currentRoute.path.includes(routex)) return true;
    }

    return false;
})

onMounted(() => {
    console.log(authUser.value)
    
})

</script>

<style scoped>

</style>