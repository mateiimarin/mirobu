<template>
    <div class="relative">
        <div class="bg-white border-b-2 w-full py-2 px-3 flex justify-between fixed top-0 z-50">
            <div class="flex items-center gap-2 w-72">
                <div>
                    <img src="/icon.png" alt="logo" class="rounded-md w-7 h-7 object-cover" />
                </div>
                <h1 class="text-[22px] font-bold font-main">Mirobu</h1>
            </div>
            <div class="gap-2 flex">
                <NuxtLink to="/login"><UButton class="px-4" size="sm">Login</UButton></NuxtLink>
                <NuxtLink to="/signup"><UButton class="px-4" color="gray" size="sm">Signup</UButton></NuxtLink>
            </div>
        </div>
        <div class="h-screen w-screen pt-12 font-main flex items-center justify-center -mt-16">
            <div>
                <h1 class="text-6xl font-semibold text-center mb-6">
                    Hire Better Talent, Faster –
                    <br>
                    With <span class="text-primary-500">Mirobu AI</span>
                </h1>
                <p class="text-lg mb-6 text-center">Are you overwhelmed by the volume of resumes? Struggling to identify the right <br> candidates   efficiently?  Mirobu is here to transform your hiring process.</p>
                <div class="w-full flex justify-center">
                    <NuxtLink to="/signup">
                    <UButton size="xl" class="px-6">Get Started</UButton>
                </NuxtLink>
                </div>

            </div>
        </div>
        

        <div class="absolute bottom-0 right-0 left-0 max-h-44">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#f5f5f5" fill-opacity="1" d="M0,128L40,133.3C80,139,160,149,240,128C320,107,400,53,480,69.3C560,85,640,171,720,170.7C800,171,880,85,960,42.7C1040,0,1120,0,1200,32C1280,64,1360,128,1400,160L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
</svg>
        </div>
        
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>