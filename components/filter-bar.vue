<template>
    <div class="flex gap-3">
        <div class="w-2/3 h-12 bg-white rounded-md flex items-center px-2">
            <div v-for="(category, index) in config" @click="active = index, emitChanges()" class="mr-3 h-8 px-3 flex items-center rounded-md cursor-pointer transition" :class="{active : active === index}">
                <font-awesome-icon icon="fa-solid fa-circle" class="text-[9px] pt-[2px]" :class="active === index ? category.color : 'text-white'" v-if="index != 0"/>
                <span class="ml-1 font-main" :class="active === index ? 'text-gray-900 font-semibold' : 'text-gray-600 font-medium'">{{ category.name }}</span>
            </div>
        </div>
        <div class="w-1/3 rounded-md">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute py-4 mt-px ml-px px-4 text-gray-400 "/>
            <input placeholder="Search" class="h-full w-full pr-5 pl-12 outline-none rounded-md font-main" @keyup = "emitChanges" v-model="search">
        </div>
    </div>
</template>

<script setup>
const active = ref(0);
const config = [
    {
        name: 'All applications',
        color: 'text-ui-50',
        limit :{
            min_score: 1, 
            max_score: 10,    
        }

    },
    {
        name: 'Excellent',
        color: 'text-green-500',
        limit :{
            min_score: 9, 
            max_score: 10,    
        }
    },
    {
        name: 'Good',
        color: 'text-lime-500',
        limit :{
            min_score: 7, 
            max_score: 8,    
        }
    },
    {
        name: 'Average',
        color: 'text-yellow-500',
        limit :{
            min_score: 5, 
            max_score: 6,    
        } 
    },
    {
        name: 'Poor',
        color: 'text-amber-600',
        limit :{
            min_score: 3, 
            max_score: 4,    
        } 
    },
    {
        name: 'Very Poor',
        color: 'text-red-600',
        limit :{
            min_score: 1, 
            max_score: 2,    
        }
    }
]

const emit = defineEmits(['filterChange'])

const search = ref('');

const emitChanges = () => {
    emit('filterChange', config[active.value].limit, active.value, search.value)
}
</script>

<style scoped>
.active {
    background-color: #F2F4F4;
}

.hide {
    display: none;
}
</style>