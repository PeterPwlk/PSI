<template>
    <b-container class="h-100" fluid>
        <b-row align-v="center">
            <b-col class="text-left">
                <h1> Wygenerowane plany </h1>
            </b-col>
            <b-col cols="auto">
                <b-btn variant="primary" :to="{ name: 'generate' }"> Generuj </b-btn>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col>
                <b-table :fields="columns" :items="schedules" striped thead-class="text-left" tbody-class="text-left">
                    <template #cell(actions)="row">
                        <b-btn variant="outline-primary" size="sm" class="font-small" block :to="{ name: 'plan', params: { planId: row.item.lectureScheduleId } }">
                            <span class="font-small">Edytuj</span>
                        </b-btn>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {getSchedule} from "../httpService/httpService";
    import {pl} from "../assets/lang";

    export default {
        name: "Plans",
        data: () => ({
            columns: [
                { key: 'type', label: 'Rodzaj', sortable: true },
                { key: 'level', label: 'Stopień', sortable: true },
                { key: 'year', label: 'Rok rozpoczęcia', sortable: true },
                { key: 'faculty', label: 'Kierunek', sortable: true },
                { key: 'specialty', label: 'Specjalizacja', sortable: true },
                { key: 'actions', label: ''}
            ],
            schedules: []
        }),
        methods: {
            async getSchedules() {
                const schedules = await getSchedule();
                this.schedules = schedules.map(schedule => ({
                    lectureScheduleId: schedule.lectureScheduleId,
                    type: pl.studiesType[schedule.faculty.studiesType],
                    level: pl.studiesLevel[schedule.faculty.studiesLevel],
                    year: schedule.faculty.startYear,
                    faculty: schedule.faculty.name,
                    specialty: schedule.faculty.studentGroups.speciality
                }));
            }
        },
        mounted() {
            // this.getSchedules();
        }
    }
</script>

<style scoped>

</style>
