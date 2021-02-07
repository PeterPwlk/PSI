<template>
    <b-container class="h-100" fluid>
        <b-row align-v="center">
            <b-col class="text-left">
                <h1> {{ $t('message.generatedPlans') }} </h1>
            </b-col>
            <b-col cols="auto">
                <b-btn variant="primary" :to="{ name: 'generate' }">  {{ $t('generate') }}  </b-btn>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col>
                <b-table :fields="columns" :items="schedules" striped thead-class="text-left" tbody-class="text-left" :busy="loadingPlans">
                    <template #cell(actions)="row">
                        <b-btn variant="outline-primary" size="sm" class="font-small" block :to="{ name: 'plan', params: { planId: row.item.lectureScheduleId, facultyId: row.item.facultyId } }">
                            <span class="font-small"> {{ $t('edit') }} </span>
                        </b-btn>
                    </template>
                    <template #table-busy>
                        <b-skeleton-table :rows="10" :colums="1" hide-header></b-skeleton-table>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {getSchedule} from "../httpService/httpService";

    export default {
        name: "Plans",
        data: () => ({
            schedules: [],
            loadingPlans: false
        }),
        computed: {
          columns() {
              return [
                { key: 'type', label: this.$t('type'), sortable: true },
                { key: 'level', label: this.$t('level'), sortable: true },
                { key: 'year', label: this.$t('startingYear'), sortable: true },
                { key: 'faculty', label: this.$t('faculty'), sortable: true },
                { key: 'specialty', label: this.$t('speciality'), sortable: true },
                { key: 'actions', label: ''}
            ]
          }
        },
        methods: {
            async getSchedules() {
                this.loadingPlans = true;
                const schedules = await getSchedule();
                this.schedules = schedules.map(schedule => ({
                    facultyId: schedule.faculty.facultyId,
                    lectureScheduleId: schedule.lectureScheduleId,
                    type: this.$t('studiesType')[schedule.faculty.studiesType],
                    level: this.$t('studiesLevel')[schedule.faculty.studiesLevel],
                    year: schedule.faculty.startYear,
                    faculty: schedule.faculty.name,
                    specialty: schedule.faculty.studentGroups.speciality
                }));
                this.loadingPlans = false;
            }
        },
        mounted() {
            this.getSchedules();
        }
    }
</script>

<style scoped>

</style>
