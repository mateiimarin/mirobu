<template>
    <div>
        <div v-if="logoUrl && props.publisherData" class="flex items-center">
            <img :src="logoUrl" class="h-20 w-20 object-cover rounded-xl"/>
            <div class="ml-4">
                <h2 class="font-bold font-main">{{ campaignData.name }}</h2>
                <h4 class="text-gray-500 font-main">{{ publisherData.slogan }}</h4>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref as storageRef, getDownloadURL} from '@firebase/storage';

const props = defineProps({
    campaignData: Object,
    publisherData: Object,
})

const logoUrl = ref('');
const { $storage } = useNuxtApp();
if(props.publisherData)
{
    getDownloadURL(storageRef($storage, 'users/'+ props.publisherData.name))
    .then((url) => {
        logoUrl.value = url
    })
    .catch((error) => {
        console.log(error);
    }); 
}




</script>

<style lang="scss" scoped>

</style>