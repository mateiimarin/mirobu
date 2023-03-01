<template>
    <div>
        <span class="text-[20px] font-medium font-main"><slot /></span>
        <div class="flex flex-wrap gap-3 mt-2">
            <div v-for="item in list" class="px-3 py-1.5 border-2 border-ui-200 rounded cursor-pointer">
            {{ item }}
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    list: Array,
})
</script>

<style lang="scss" scoped>

</style>