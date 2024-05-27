<template>
    <div>
        <ClientOnly>
            <div class="mb-5">
                <h1 class="text-xl font-semibold " >Job Description</h1>
                <p class="text-gray-900 leading-relaxed text-justify">
                    {{ props.campaign?.description }}
                </p>
            </div>
            <div>
                <h1 class="text-xl font-semibold">Job Requirements</h1>
                <div v-html="markedRequirements" ref="requirements" class="text-gray-900 leading-8"></div>
            </div>
            <template #fallback >
                <div class="space-y-3">
                    <USkeleton class="h-12 w-full" />
                    <USkeleton class="h-48 w-3/4" />
                    <USkeleton class="h-12 w-11/12" />
                    <USkeleton class="h-48 w-5/6" />
                </div>
            </template>
        </ClientOnly>
    </div>
</template>

<script setup>
import { marked } from 'marked'
const props = defineProps({
    campaign: Object,
})

const requirements = ref();
const markedRequirements = ref();

const updateListStyle = () => {
    watch(() => props.campaign, async (newValue, oldValue) => {
        markedRequirements.value = marked(props.campaign.requirements);
        await nextTick();
        const lists = requirements.value.querySelectorAll("ul");
        console.log(lists)
        lists.forEach((list) => {
            list.style.listStyle = 'inside';
        });
    })
}

onMounted(() => {
    updateListStyle();
})
</script>

<style lang="scss" scoped></style>