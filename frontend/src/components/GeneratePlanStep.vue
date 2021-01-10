<template>
    <div class="step" :active="active">
        <div class="circle ml-auto mr-auto">
            {{ number }}
        </div>
        <div class="hidden-text"> {{ name }} </div>
    </div>
</template>

<script>
    export default {
        name: "GeneratePlanStep",
        props: {
            number: {
                required: true,
                type: Number
            },
            name: {
                required: true,
                type: String
            },
            active: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .circle {
        border-radius: 50%;
        height: 50px;
        width: 50px;
        background-color: var(--secondary);
        padding-top: 14px;
        color: white;
    }

    .step[active] .circle {
        background-color: var(--primary);
    }

    .hidden-text {
        visibility: hidden;
    }

    .step:hover {
        cursor: pointer;
    }

    .step:hover .circle {
        background-color: var(--primary-dark)
    }

    .step:hover .hidden-text {
        visibility: visible;
    }

    .step[active] .hidden-text{
        visibility: visible;
    }
</style>
