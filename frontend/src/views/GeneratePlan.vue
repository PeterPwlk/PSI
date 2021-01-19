<template>
    <div>
        <h1> Generuj Plan </h1>
        <b-container>
            <b-row class="mt-5">
                <b-col v-for="(step, index) in steps">
                    <GeneratePlanStep :name="step" :number="index + 1" @click.native="goToStep(index)" :active="activeStep === (index)"></GeneratePlanStep>
                </b-col>
            </b-row>
            <b-row align-content="center" class="mt-5">
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
        components: {GeneratePlanSelect, GeneratePlanStep},
        data: () => ({
            plans: {},
            steps: ['Rodzaj studiów', 'Stopień studiów', 'Rok rozpoczęcia', 'Semestr', 'Kierunek', 'Specjalizacja'],
            selected: []
        }),
        computed: {
            activeStep() {
                return parseInt(this.$route.query.step) || 0;
            }
        },
        methods: {
            goToStep(x) {
                this.$router.push({ query: { step: x }})
            }
        },
        mounted() {
            console.log(this.$router.query);
        }
    }
</script>

<style scoped>

</style>
