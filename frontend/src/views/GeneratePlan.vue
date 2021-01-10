<template>
    <div>
        <h1> Generuj Plan </h1>
        <b-container>
            <b-row>
                <b-col>
                    <GeneratePlanStep name="Rodzaj studiów" number="1"></GeneratePlanStep>
                </b-col>
                <b-col>
                    <GeneratePlanStep name="Rodzaj studiów" number="2" active></GeneratePlanStep>
                </b-col>
                <b-col>
                    <GeneratePlanStep name="Rodzaj studiów" number="3"></GeneratePlanStep>
                </b-col>
            </b-row>
            <b-row align-content="center">
                <b-col>
                    <GeneratePlanSelect name="Test select" class="mt-4"></GeneratePlanSelect>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import GeneratePlanStep from "../components/GeneratePlanStep";
    import GeneratePlanSelect from "../components/GeneratePlanSelect";
    export default {
        name: "GeneratePlan",
        components: {GeneratePlanSelect, GeneratePlanStep}
    }
</script>

<style scoped>

</style>
