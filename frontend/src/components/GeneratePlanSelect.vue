<template>
    <b-btn variant="primary" block class="select" @click="$emit('click')" :selected="selected">
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
            },
            selected: {
                default: false,
                type: Boolean
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
    .btn[selected] {
        background-color: var(--success);
        border: none;
    }
</style>
