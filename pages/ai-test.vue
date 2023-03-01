<template>
    <div>
        <h1>Welcome to the Matrix</h1>
        {{ john }}
    </div>
</template>

<script setup>

const john = ref('Can you escape?');
    const response = await $fetch("/api/evaluate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { company: 'web design company' },
    });

    john.value = response;
    console.log(typeof response)
</script>

<style lang="scss" scoped>

</style>