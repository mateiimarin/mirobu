<template>
    <div>
        <div class="bg-ui-50">
            <ClientOnly>
                <CampaignsList @create="showPopup = true"/>
            </ClientOnly>
            <Teleport to="body">
                    <Create :show = "showPopup" @close="showPopup = false"/>
            </Teleport>
        </div>
    </div>
</template>

<script setup>
const showPopup = ref(false);
</script>

<style lang="scss" scoped>

</style>