<template>
    <div>
        <aside class="h-screen bg-white w-72 py-7 px-3 relative">
            <div class="mb-6">
                <h1 class="text-2xl font-semibold font-title px-1">Mirobu</h1>
            </div>
            <ClientOnly>
                <div>
                    <div v-for="(route, index) in config" class="py-2 px-3 mb-3 rounded-md cursor-pointer" :class="{active : active === index}">
                        <font-awesome-icon :icon="route.icon" class="text-gray-600" :class="{activeText : active === index}"/>
                        <span class="ml-3 font-medium text-gray-500">{{ route.name }}</span>
                    </div>
                </div>
                
                <div class="absolute left-0 bottom-3 w-72 px-3" v-if="loaded">
                    <div class="flex">
                        <img :src="authUserLogo"  class="h-12 w-12 object-cover rounded-lg"/>
                        <div class="ml-3">
                            <span class="font-medium block">{{ authUserData.data().name }}</span>
                            <span class="font-sm">Profile · Settings</span>
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </aside>
    </div>
</template>

<script setup>
const active = ref(0);
const config = [
    {
        name: 'Dashboard',
        icon: 'fa-solid fa-house'
    },
    {
        name: 'Analytics',
        icon: 'fa-solid fa-chart-simple'
    },
    {
        name: 'Integrations',
        icon: 'fa-solid fa-arrow-right-arrow-left'
    },
    {
        name: 'Settings',
        icon: 'fa-solid fa-gear'
    },
]


const loaded = ref(false);

const authUserLogo = useAuthUserLogo();
const authUserData = useAuthUserData();

if(authUserLogo.value) loaded.value = true;
else {
    watch(authUserLogo, () => {
        loaded.value = true;
    })
}



</script>

<style scoped>
.active {
    background-color: #F0F5FF;
}

.activeText {
    color: #1357d6;
}
</style>