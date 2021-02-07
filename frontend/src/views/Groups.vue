<template>
    <b-container class="h-100" fluid>
        <b-row align-v="center">
            <b-col class="text-left" v-if="!loadingFaculty">
                <h1>  {{ $t('schedule') }}  </h1>
                <div v-if="!loadingFaculty">
                    <div> {{ faculty.name }}, {{ faculty.speciality }}, {{ faculty.studiesType }}, {{ faculty.studiesLevel }}
                    </div>
                    <div> {{ $t('startingYear') }}: {{ faculty.year }}</div>
                </div>
                <b-skeleton v-else class="faculty-skeleton" height="200px" width="400px"></b-skeleton>
            </b-col>
        </b-row>
        <b-row class="h-100 mt-4">
            <b-col>
                <b-table :fields="columns" :items="groups" striped thead-class="text-left" tbody-class="text-left" responsive :busy="loadingGroups">
                    <template #cell(tutors)="row">
                        <div v-if="row.item.tutors.length > 0">
                            <div v-for="tutor in row.item.tutors">
                                {{ getTutorName(tutor) }}
                            </div>
                        </div>
                        <div v-else class="text-danger"> {{ $t('notAssigned') }} </div>
                    </template>
                    <template #cell(classroom)="row">
                        <span v-if="row.item.classroom"> {{ row.item.classroom }}</span>
                        <span v-else class="text-danger"> {{ $t('notAssigned') }} </span>
                    </template>
                    <template #cell(lectureTimes)="row">
                        <div v-if="row.item.lectureTimes.length > 0">
                            <div v-for="lectureTime in row.item.lectureTimes">
                                {{ getLectureTimeText(lectureTime) }}
                            </div>
                        </div>
                        <div v-else class="text-danger"> {{ $t('notAssigned') }} </div>
                    </template>
                    <template #cell(actions)="row">
                        <b-icon icon="pencil-fill" class="mr-3 cursor-pointer text-primary" @click="goToGroupDetails(row.item.lectureId)"></b-icon>
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
                                    <div> {{ $tc('exception', 10) }}: </div>
                                    <div> 24-11-20 (wt) 7:30 - 8:15, B-4, s. sala wirtualna </div>
                                </b-col>
                                <b-col>
                                    <div> {{ $t('tutor') }}: </div>
                                    <div v-if="row.item.tutors.length > 0">
                                        <div v-for="tutor in row.item.tutors">
                                            {{ getTutorText(tutor) }}
                                        </div>
                                    </div>
                                    <div v-else> {{ $t('message.tutorNotAssigned') }}. </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </template>
                    <template #table-busy>
<!--                        <b-skeleton v-for="i in new Array(10)" height="30px"></b-skeleton>-->
                        <b-skeleton-table :rows="10" :colums="1" hide-header></b-skeleton-table>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {getFaculty, getSchedule} from "../httpService/httpService";
    import eventBus from "../store/eventBus";

    export default {
        name: "Groups",
        data: () => ({
            schedule: [],
            faculty: { name: '', studiesLevel: 0, studiesType: 0, speciality: ''},
            loadingFaculty: false,
            loadingGroups: false,
        }),
        computed: {
            columns() {
                return [
                    {key: 'code', label: this.$t('groupCode')},
                    {key: 'name', label: this.$t('courseName')},
                    {key: 'tutors', label: this.$tc('tutor', 2)},
                    {key: 'lectureTimes', label: this.$t('lectureTerms')},
                    {key: 'hours', label: this.$tc('hour', 2)},
                    {key: 'duration', label: this.$t('duration')},
                    {key: 'actions', label: ''},
                    {key: 'collapse', label: ''},
                ]
            },
            groups() {
                return this.schedule.map(lecture => ({
                    ...lecture,
                    _rowVariant: (!lecture.tutors.length || !lecture.lectureTimes.length) ? undefined : 'success'
                }));
            }
        },
        methods: {
            removeGroup(row) {
                console.log(row);
            },
            async goToGroupDetails(id) {
                try {
                    await this.$router.replace({ name: 'planGroup', params: { groupId: id, planId: this.$route.params.planId }});
                } catch (e) {}
            },
            async getGroups() {
                this.loadingGroups = true;
                const schedule = await getSchedule(this.$route.params.planId);
                this.schedule = schedule.lectures.map(lecture => ({
                    lectureId: lecture.lectureId,
                    code: lecture.groupNumber || 'N/A',
                    name: lecture.course.course.name,
                    tutors: lecture.conductedClasses,
                    lectureTimes: lecture.lectureTime,
                    hours: lecture.course.numberOfHours,
                    duration: lecture.course.duration
                }));
                this.loadingGroups = false;
            },
            async getFaculty(){
                this.loadingFaculty = true;
                const faculty = await getFaculty(this.$route.params.facultyId);
                this.faculty = {
                    name: faculty.name,
                    studiesLevel: this.$t('studiesLevel')[faculty.studiesLevel],
                    studiesType: this.$t('studiesType')[faculty.studiesType],
                    speciality: faculty.studentGroups.speciality,
                    year: faculty.startYear
                };
                this.loadingFaculty = false;
            },
            getLectureTimeText(lectureTime){
                return `${ this.$t('weekDay')[lectureTime.day]}, ${ this.$t('weekType')[lectureTime.weekType] } ${lectureTime.startTime} - ${lectureTime.endTime}, ${lectureTime.classRoom.building} s.${lectureTime.classRoom.number}`
            },
            getTutorName(tutor) {
                return `${tutor.tutor.title} ${tutor.tutor.firstName} ${tutor.tutor.lastName}`
            },
            getTutorText(tutor){
                return `${this.getTutorName(tutor)} (${tutor.startDate} - ${tutor.endDate})`;
            }
        },
        mounted() {
            this.getGroups();
            this.getFaculty();
            eventBus.$on('lecture-time-updated', (data) => {
                this.schedule.find(item => item.lectureId === data.lectureId).lectureTimes = data.lectureTime;
            });
            eventBus.$on('conducted-classes-updated', (data) => {
                this.schedule.find(item => item.lectureId === data.lectureId).tutors = data.conductedClasses;
            });
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
