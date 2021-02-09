<template>
    <div>
        <h1> {{ $t('generatePlan') }} </h1>
        <b-container>
            <b-row class="mt-5">
                <b-col v-for="(step, index) in steps">
                    <GeneratePlanStep :name="step.value" :number="index + 1" @click.native="goToStep(index)" :active="activeStep === (index)" :complete="typeof selected[step.key] !== 'undefined'"></GeneratePlanStep>
                </b-col>
            </b-row>
            <b-row v-if="loading" align-content="center" align-h="center" class="mt-5">
                <b-col v-for="i in new Array(6)" cols="auto">
                    <b-skeleton class="select mt-4"></b-skeleton>
                </b-col>
            </b-row>
            <b-row v-else-if="this.plans.length === 0" align-content="center" align-h="center" class="mt-5">
                <b-col>
                    <b-alert show variant="secondary" class="font-large">There are no more plans to generate.</b-alert>
                </b-col>
            </b-row>
            <b-row v-else-if="submitting" align-content="center" align-h="center" class="mt-5">
                <b-col>
                    <p> {{ $t('message.planGenerating') }} </p>
                    <b-progress animated :value="submitProgress" :max="100"></b-progress>
                </b-col>
            </b-row>
            <b-row v-else align-content="center" align-h="center" class="mt-5">
                <b-col v-for="value in selectableValues" cols="auto">
                    <GeneratePlanSelect :name="value.text" class="mt-4" @click="select(value.value)"
                                        :selected="selected[currentStep] === value.value"></GeneratePlanSelect>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    let progressInterval = null;

    import GeneratePlanStep from "../components/GeneratePlanStep";
    import GeneratePlanSelect from "../components/GeneratePlanSelect";
    import { getNotGeneratedPlans, postLectureSchedule } from "../httpService/httpService";
    export default {
        name: "GeneratePlan",
        components: {GeneratePlanSelect, GeneratePlanStep},
        data: () => ({
            activeStep: 0,
            selected: {},
            plans:  [],
            loading: false,
            submitting: false,
            submitProgress: 0
        }),
        computed: {
            plansComp() {
                return this.plans.map(plan => ({
                    studiesType: { value: plan.studiesType, text: this.$t('studiesType')[plan.studiesType]},
                    studiesLevel: { value: plan.studiesLevel, text: this.$t('studiesLevel')[plan.studiesLevel]},
                    name: { text: plan.name, value: plan.name},
                    startYear: { text: plan.startYear, value: plan.startYear },
                    speciality: plan.studentGroups.speciality ? { text: plan.studentGroups.speciality, value: plan.studentGroups.speciality } : undefined,
                    semester: { text: plan.studentGroups.semester, value: plan.studentGroups.semester }
                }));
            },
            filteredPlans() {
                return this.plansComp.filter(plan => {
                    let balls = Object.keys(this.selected).map(key => {
                        return plan[key].value === this.selected[key];
                    });
                    return balls.length === 0 || balls.every(ball => ball);
                })
            },
            currentStep(){
                return this.steps[this.activeStep].key;
            },
            selectableValues(){
                const selectables = this.filteredPlans.map(el => el[this.currentStep]).filter(el => typeof el !== 'undefined');
                const uniqueValues = Array.from(new Set(selectables.map(p => p.value)))
                    .map(value => {
                        return selectables.find(p => p && p.value === value)
                    });
                return uniqueValues;
            },
            steps() {
                return [
                    { key: 'studiesType', value: this.$t('message.studiesType')},
                    { key: 'studiesLevel', value: this.$t('message.studiesLevel')},
                    { key: 'startYear', value: this.$t('startingYear')},
                    { key: 'semester', value: this.$t('semester')},
                    { key: 'name', value: this.$t('faculty')},
                    { key: 'speciality', value: this.$t('speciality')},
                ]
            }
        },
        methods: {
            runProgress() {
                progressInterval = setInterval(() => {
                    if (this.submitProgress >= 100) {
                        clearInterval(progressInterval);
                        progressInterval = null;
                    }
                    this.submitProgress += 10;
                }, 150);
            },
            goToStep(x, force = false) {
                if (x < this.activeStep) {
                    for(let i = this.activeStep; i >= x; i--) {
                        this.$delete(this.selected, this.steps[i].key);
                    }
                }
                if (x < this.activeStep || force) this.activeStep = x;
            },
            select(value) {
                this.$set(this.selected, this.currentStep, value);
                if (this.activeStep + 1 === this.steps.length){
                    this.submit();
                    return;
                }
                this.goToStep(this.activeStep + 1, true);
                if (this.selectableValues.length === 0) this.submit();
            },
            async submit() {
                this.submitting = true;
                this.runProgress();
                let selected = this.selected;
                const postObject = this.plans.find(plan => {
                   return [
                       plan.name === selected.name,
                       plan.startYear === selected.startYear,
                       plan.studiesLevel === selected.studiesLevel,
                       plan.studiesType === selected.studiesType,
                       plan.studentGroups.semester === selected.semester,
                       !plan.studentGroups.speciality || plan.studentGroups.speciality === selected.speciality,
                   ].every(el => el);
                });
                const response = await postLectureSchedule(postObject);
                this.submitting = false;
                this.$router.push({ name: 'plans'})
            },
            async getPlans() {
                this.loading = true;
                const plans = await getNotGeneratedPlans();
                this.plans = plans;
                this.loading = false;
            }
        },
        beforeDestroy() {
          if (progressInterval) {
              clearInterval(progressInterval);
              progressInterval = null;
          }
        },
        mounted() {
            this.getPlans();
        }
    }
</script>

<style scoped>
    .select {
        height: 100px;
        width: 200px;
    }
</style>
