<template>
    <div>
        <div class="mb-3">
            <span class="text-gray-600 font-main text-[15px]">SALARY</span><br>
            <span class="font-main text-[18px] font-medium">{{ campaignData.salary }}</span>
        </div>
        <div class="mb-3">
            <span class="text-gray-600 font-main text-[15px]">LOCATION</span><br>
            <span class="font-main text-[18px] font-medium">{{ campaignData.location }}</span>
        </div>
        <div class="mb-3">
            <span class="text-gray-600 font-main text-[15px]">SALARY</span><br>
            <a :href="`https://${campaignData.website}`" class="font-main text-[18px] font-medium">{{ campaignData.website }}</a>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    campaignData: Object,
})
</script>

<style lang="scss" scoped>

</style>