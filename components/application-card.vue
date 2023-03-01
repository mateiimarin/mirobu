<template>
    <div class="max-w-[700px]">
        <div class="bg-white h-340 p-3 rounded-md">
            <div class="flex items-center mb-4">
                <div class="h-10 w-10 flex justify-center items-center rounded-[50px]" :class="colors[category].bg"><span class="font-main font-bold" :class="colors[category].text">{{ application.score }}</span></div>
                <span class="ml-3 font-medium font-main text-[17px]">{{ application.name }}</span>
            </div>
            <div class="leading-[20px] h-[42px] overflow-hidden mb-5 text-gray-600">
                {{ application.slogan }}
            </div>
            <div class="truncate">
                <span v-for="i in 3" class="mr-4 py-1 px-2 bg-ui-50 rounded-lg">{{ application.keywords[i] }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    application: Object,
    active: Number,
})

const colors = [
    {
        bg: '',
        text: '',
        limit :{
            min_score: -1, 
            max_score: -1,    
        }

    }, 
    {
        bg: 'bg-[#DCFCE7]',
        text: 'text-main',
        limit :{
            min_score: 9, 
            max_score: 10,    
        }

    },
    {
        bg: 'bg-lime-100',
        text: 'text-lime-500',
        limit :{
            min_score: 7, 
            max_score: 8,    
        }
    },
    {
        bg: 'bg-main',
        text: 'text-main',
        limit :{
            min_score: 5, 
            max_score: 6,    
        } 
    },
    {
        bg: 'bg-amber-200',
        text: 'text-amber-600',
        limit :{
            min_score: 3, 
            max_score: 4,    
        } 
    },
    {
        bg: 'bg-red-100',
        text: 'text-red-600',
        limit :{
            min_score: 1, 
            max_score: 2,    
        }
    }
]

/*
console.log(props.active)
const category = computed(() => {
    if(props.active != 0) return props.active;
    else {
        colors.forEach((item, index) => {
            if(props.application.score <= item.limit.max_score && props.application.score >= item.limit.min_score)
                return index;
        })
    }
})

*/


const category = ref(3);
colors.forEach((item, index) => {
    if(props.application.score <= item.limit.max_score && props.application.score >= item.limit.min_score)
        category.value = index;
})


</script>

<style lang="scss" scoped>

</style>