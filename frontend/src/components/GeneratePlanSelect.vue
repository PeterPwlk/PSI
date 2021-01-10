<template>
    <b-btn variant="primary" block class="select">
        {{ name }}
    </b-btn>
</template>

<script>
    export default {
        name: "GeneratePlanSelect",
        props: {
            name: {
                required: true,
                type: String
            }
        }
    }
</script>

<style scoped lang="scss">
    .select {
        height: 100px;
        width: 200px;
        background-color: var(--primary);
        color: white;
    }
</style>
