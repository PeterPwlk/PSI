<template>
    <b-container class="h-100" fluid>
        <b-row align-v="center">
            <b-col class="text-left">
                <h1> Wygenerowane plany </h1>
            </b-col>
            <b-col cols="auto">
                <b-btn variant="primary"> Generuj </b-btn>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col>
                <b-table :fields="columns" :items="plans" striped class="h-100" thead-class="text-left" tbody-class="text-left">
                    <template #cell(actions)="{ data }">
                        <b-btn variant="outline-primary" size="sm" class="font-small" block :to="{ name: 'plan', params: { id: 1 } }">
                            <span class="font-small">Edytuj</span>
                        </b-btn>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
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
            plans: [
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
                { type: 'Stacjonarne', level: 'II', year: '2016', faculty: 'Informatyka stosowana', specialty: 'Inżynieria oprogramowania' },
            ]
        })
    }
</script>

<style scoped>

</style>
