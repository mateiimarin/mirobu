<template>
    <div>
        <div>
            <div v-if="campaignData" class="font-sec text-justify mb-6"> {{ campaignData.description }}</div>
        </div>
        <div>
            <div v-if="campaignData" v-html="campaignData.requirements" class="font-sec"></div>
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