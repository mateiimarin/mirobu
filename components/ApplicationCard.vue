<template>
    <div>
        <UCard :ui="{
            body: { padding: 'px-4 py-4 sm:p-4' },
            header: { padding: 'px-3 py-4 sm:px-3' },
            footer: { padding: 'px-3 py-3 sm:px-3' },
        }">
            <template #header>
                <div class="flex justify-between">
                    <div class="flex items-center gap-3">
                        <UIcon name="i-heroicons-sparkles" class="text-xl" />
                        <h3 class="text-lg font-semibold">Easy Apply</h3>
                    </div>
                    <UButton v-if="isFormOpen" name="i-heroicons-sparkles" @click="isFormOpen = false" class="text-xl" size="sm" color="gray" variant="soft" icon="i-heroicons-x-mark"/>
                </div>
            </template>

            <div v-if="!isFormOpen" class="space-y-3">
                <div v-for="card in infoCards">
                    <h6 class="text-sm tracking-wide text-gray-500">{{ card.charAt(0).toUpperCase() + card.slice(1) }}
                    </h6>
                    <ClientOnly>
                        <h5 class="font-medium  text-gray-800">{{ props.campaign?.[card] }}</h5>
                        <template #fallback>
                            <USkeleton class="h-6 w-full" />
                        </template>
                    </ClientOnly>
                </div>
            </div>
            <div v-else>
                <UForm class="space-y-4 " :state="application" @submit="submitApplication">
                    <UFormGroup label="Your Email" name="email" required>
                        <UInput v-model="application.email" placeholder="Your Email" type="text" size="lg" icon="i-heroicons-envelope"/>
                    </UFormGroup>
                    <UFormGroup label="Photo" name="photo" required>
                        <input type="file" accept="image/*" ref="pictureUpload" class=" text-sm file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-noneshadow-sm px-3.5 py-2.5 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 " required/>
                    </UFormGroup>
                    <UFormGroup label="Resume" name="resume" required>
                        <input type="file" accept=".pdf" ref="fileUpload" class=" text-sm file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-noneshadow-sm px-3.5 py-2.5 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 " required/>
                    </UFormGroup>
                    <UButton type="submit" size="lg" :loading="isSubmitting" block>Submit</UButton>
                </UForm>
            </div>

            <template #footer v-if="!isFormOpen">
                <UButton color="primary"  size="md" block @click="isFormOpen = true">Apply</UButton>
            </template>
        </UCard>


    </div>
</template>

<script setup>
import { ref as storageRef, getDownloadURL} from 'firebase/storage'
const props = defineProps({
    campaign: Object,
})

const infoCards = ref(['location', 'website', 'salary']);
const isFormOpen = ref(false);

const fileUpload = ref();
const pictureUpload = ref();

const application = ref({
    email: '',
    resume: null,
})

const isSubmitting = ref(false);

const submitApplication = async () => {
    isSubmitting.value = true;
    const file = fileUpload.value.files[0];
    const picture = pictureUpload.value.files[0];

    const formData = new FormData();
    formData.append('pdf', file);

    await addApplication(formData, file, picture, application.value.email, useRoute().params.id, props.campaign.requirements);
}

</script>

<style lang="scss" scoped></style>