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
                <b-table :fields="columns" :items="schedules" striped class="h-100" thead-class="text-left" tbody-class="text-left">
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
    import {getSchedules} from "../httpService/httpService";

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
            schedules: [
                { lectureScheduleId: 1, type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
            ]
        }),
        methods: {
            async getSchedules() {
                const schedules = await getSchedules();
                console.log(schedules)
            }
        },
        mounted() {
            this.getSchedules();
        }
    }
</script>

<style scoped>

</style>
