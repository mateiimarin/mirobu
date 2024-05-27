<template>
    <div class="p-4 font-main">
        <div class="mb-5 mt-2 text-center">
            <h3 class="text-xl font-bold text-balance mb-0.5">Create New Campaign</h3>
            <div class="text-[13px] font-medium text-gray-500 leading-4">Enter the following details about your job</div>
        </div>
        <UForm class="space-y-4 " :state="campaign" @submit="addCampaign">
            <div class="grid grid-cols-2 gap-5">
                <UFormGroup label="Job Name" name="name" required>
                    <UInput v-model="campaign.name" placeholder="Job Name" type="text" size="md" />
                </UFormGroup>

                <UFormGroup label="Website" name="website" required>
                    <UInput v-model="campaign.website" placeholder="Job Website" type="text" size="md" />
                </UFormGroup>

                <UFormGroup label="Location" name="location" required>
                    <UInput v-model="campaign.location" placeholder="Job Location" type="text" size="md" />
                </UFormGroup>

                <UFormGroup label="Salary" name="salary" required>
                    <UInput v-model="campaign.salary" placeholder="Job Salary" type="text" size="md" />
                </UFormGroup>
            </div>
            <UFormGroup label="Description" name="description" required>
                <UTextarea v-model="campaign.description" placeholder="Job Description" type="text" size="md" autoresize :maxrows="6"/>
            </UFormGroup>
            <UFormGroup label="Requirements" name="requirements" hint="Markup Supported" required>
                <UTextarea v-model="campaign.requirements" placeholder="Job Requirements" type="text" size="md" autoresize :maxrows="6"/>
            </UFormGroup>


            <UButton type="submit" size="md":loading="isCreating" block>Create Campaign</UButton>
        </UForm>
    </div>
</template>

<script setup>
const emit = defineEmits(['close'])

const campaign = ref({
    name: '',
    website: '',
    salary: '',
    location: '',
    description: '',
    requirements: '',
});

const isCreating = ref(false);

const addCampaign = async () => {
    isCreating.value = true;
    const handle = await createCampaign(campaign.value);
    isCreating.value = false;
    emit('close');
    navigateTo(`/admin/${handle}`);
}


</script>

<style lang="scss" scoped>

</style>