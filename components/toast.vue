<template>
    <div>
        <div class="px-3 py-2.5 bg-ui-150 rounded flex items-center">
            <div class="h-12 w-2 rounded" :class="colors[status]"></div>
            <div class="ml-3">
                <slot name="header"></slot>
                <br>
                <slot name="message"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const colors = ['bg-blue-400', 'bg-main', 'bg-red-400']
const props = defineProps({
    status: Number,
})

</script>

<style lang="scss" scoped>

</style>