<template>
    <b-container class="h-100" fluid>
        <b-row align-v="center">
            <b-col class="text-left">
                <h1> Plan zajęć </h1>
            </b-col>
        </b-row>
        <b-row class="h-100">
            <b-col>
                <b-table :fields="columns" :items="groups" striped thead-class="text-left" tbody-class="text-left" responsive>
                    <template #cell(tutor)="row">
                        <span v-if="row.item.tutor"> {{ row.item.tutor }}</span>
                        <span v-else class="text-danger"> Nieprzypisano </span>
                    </template>
                    <template #cell(classroom)="row">
                        <span v-if="row.item.classroom"> {{ row.item.classroom }}</span>
                        <span v-else class="text-danger"> Nieprzypisano </span>
                    </template>
                    <template #cell(actions)="row">
                        <b-icon icon="pencil-fill" class="mr-3 cursor-pointer text-primary" @click="goToGroupDetails(row.item.groupId)"></b-icon>
                        <b-icon icon="x-circle-fill" class="cursor-pointer" @click="removeGroup(row)"></b-icon>
                    </template>
                    <template #cell(collapse)="row">
                        <b-icon icon="caret-down-fill" @click="row.toggleDetails" v-if="row.detailsShowing" class="cursor-pointer"></b-icon>
                        <b-icon icon="caret-left-fill" @click="row.toggleDetails" v-else class="cursor-pointer"></b-icon>
                    </template>
                    <template #row-details="row">
                        <b-container>
                            <hr/>
                            <b-row>
                                <b-col>
                                    <div>Wyjątki:</div>
                                    <div> 24-11-20 (wt) 7:30 - 8:15, B-4, s. sala wirtualna </div>
                                </b-col>
                                <b-col>
                                    <div>Prowadzący:</div>
                                    <div>Dr inż. Bogumiła Hnatkowska (01.10.2020 - 10.11.2020)</div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </template>

                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "Groups",
        data: () => ({
            columns: [
                { key: 'code', label: 'Kod grupy' },
                { key: 'name', label: 'Nazwa kursu' },
                { key: 'tutor', label: 'Prowadzący' },
                { key: 'classroom', label: 'Sala' },
                { key: 'time', label: 'Termin zajęć' },
                { key: 'hours', label: 'Godziny'},
                { key: 'duration', label: 'Czas trwania'},
                { key: 'actions', label: ''},
                { key: 'collapse', label: ''},
            ],
            groups: [
                { groupId: 5, code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: '', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1, _rowVariant: 'danger'},
                { groupId: 1,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1, _rowVariant: 'success'},
                { groupId: 3,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1},
                { groupId: 6,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: '', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1},
                { groupId: 8,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1},
                { groupId: 23,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1},
                { groupId: 5,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1},
                { groupId: 5,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1},
                { groupId: 5,code: 'Z01-23A', name: 'Projektowanie sys. informat.', tutor: 'Bogumiła Hnatkowska', classroom: 'B4, sala wirtualna', time: 'Poniedziałek, 11:15 - 13:00 TP', hours: 30, duration: 1},
            ]
        }),
        methods: {
            removeGroup(row) {
                console.log(row);
            },
            async goToGroupDetails(id) {
                try {
                    await this.$router.replace({ name: 'planGroup', params: { groupId: id, planId: this.$route.params.planId }});
                } catch (e) {}
            }
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
