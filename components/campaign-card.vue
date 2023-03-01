<template>
    <div>
        <div class="w-full flex flex-col bg-white h-44 px-4 py-5 border-1 border-gray-100 rounded-md">
          <NuxtLink :to="`/admin/${route}`" >
          <div class="mb-2.5">
              <h4 class="text-xl font-main font-semibold leading-6">{{ campaign.name }}</h4>
          </div>
          <div class="mb-3">
            <div class="mb-0.5">
              <span class="text-sm text-gray-500">Match</span>
              <span class="float-right text-sm text-gray-500"> {{ match }}%</span>
            </div>
            <div class="w-full rounded bg-ui-100 h-2">
              <div :style="`width: ${match}%`" class="bg-main h-2 rounded" :class="color"></div>
            </div>
          </div>
        </NuxtLink>
          <div class="mt-auto flex items-center">
            <span class="font-sec font-normal text-gray-500"><span class="font-medium text-gray-700">{{ campaign.applications }}</span> {{ campaign.applications == 1 ? "application" : "applications" }}</span>
            <a :href="`http://localhost:3000/${route}`" target="_blank" class="h-10 flex justify-center items-center w-10 bg-ui-50 rounded-xl ml-auto"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="text-gray-500"/></a>
          </div>

        </div>
      
    </div>
</template>

<script setup>

const props = defineProps({
  route: String,
  campaign: Object,
})

const match = computed(() => {
  return 10 * props.campaign.scores / props.campaign.applications;
})

const color = computed(() => {
  return match.value > 70 ? 'bg-main' : (match.value < 50 ? 'bg-red-400' : 'bg-yellow-400');
})


</script>

<style scoped>
svg {
  vertical-align: middle !important;
}
</style>