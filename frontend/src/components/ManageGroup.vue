<template>
    <b-container fluid class="text-left p-3">
        <b-row >
            <b-col v-if="!lectureLoading">
                <h2> {{ groupNumber }} </h2>
                <h5> {{ course.course.courseNumber }} </h5>
                <h5> {{ course.course.name }} </h5>
            </b-col>
            <b-col v-else>
                <b-skeleton height="32px" width="50%"></b-skeleton>
                <b-skeleton height="24px" width="40%"></b-skeleton>
                <b-skeleton height="24px" width="60%"></b-skeleton>
            </b-col>
        </b-row>
        <b-row v-for="tutor in tutors" class="mt-2">
            <b-col>
                <GroupDetailsCard :title="getName(tutor.tutor)">
                    <div class="font-small">
                        Prowadzi kurs w terminach:
                    </div>
                    <div class="font-small">{{ tutor.startDate }} - {{tutor.endDate}}</div>
                    <b-link class="font-small font-weight-bold" disabled> Pokaż plan prowadzącego </b-link>
                </GroupDetailsCard>
            </b-col>
        </b-row>
        <b-skeleton height="32px" v-if="lectureLoading"></b-skeleton>
        <b-skeleton height="32px" v-if="lectureLoading"></b-skeleton>
        <b-row class="mt-2">
            <b-col>
                <b-btn :disabled="lectureLoading" variant="primary" size="sm" class="wider-btn" @click="addTutor()"> Dodaj prowadzącego </b-btn>
            </b-col>
        </b-row>
        <hr/>
        <b-skeleton height="32px" v-if="lectureLoading"></b-skeleton>
        <b-skeleton height="32px" v-if="lectureLoading"></b-skeleton>
        <b-row class="mt-2" v-for="lectureTime in lectureTimes">
            <b-col>
                <GroupDetailsCard :title="getLectureTimeTitle(lectureTime)">
                    <div class="font-small">
                        <span>Budynek <b>{{ lectureTime.classRoom.building}}</b></span>
                        <span class="ml-2">Sala <b>{{ lectureTime.classRoom.number }}</b></span>
                    </div>
                    <div class="font-small"> Czas trwania zajęć: {{ course.duration }} min</div>
                </GroupDetailsCard>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <b-btn :disabled="lectureLoading" variant="primary" size="sm" class="wider-btn" @click="addLectureTime()"> Dodaj termin </b-btn>
            </b-col>
        </b-row>
        <ManageGroupAddTutorModal ref="addTutorModal"></ManageGroupAddTutorModal>
        <ManageGroupAddLectureTimeModal ref="addLectureTimeModal"></ManageGroupAddLectureTimeModal>
    </b-container>
</template>

<script>
    import GroupDetailsCard from "./GroupDetailsCard";
    import ManageGroupAddTutorModal from "./ManageGroupAddTutorModal";
    import ManageGroupAddLectureTimeModal from "./ManageGroupAddLectureTimeModal";
    import {addLectureTime, addLectureTutor, getLecture} from "../httpService/httpService";
    import {pl} from "../assets/lang";
    import eventBus from "../store/eventBus";
    export default {
        name: "ManageGroup",
        components: {ManageGroupAddLectureTimeModal, ManageGroupAddTutorModal, GroupDetailsCard},
        data: () => ({
            tutors: [],
            groupNumber: '',
            lectureTimes: [],
            course: {
                duration: '',
                course: {
                    courseNumber: '',
                },
                lectureType: 0
            },
            lectureLoading: false,
            lectureId: -1
        }),
        computed: {
            groupId() {
                return this.$route.params.groupId;
            }
        },
        watch: {
            groupId(newValue) {
                console.log(newValue);
                this.lectureTimes = [];
                this.tutors = [];
                this.getLecture(newValue);
            }
        },
        methods: {
            async addTutor() {
                try{
                    const newLectureTutor = await this.$refs.addTutorModal.open(this.course, this.groupNumber);
                    const addedLectureTutor = await addLectureTutor(this.lectureId, newLectureTutor);
                    this.conductedClasses = addedLectureTutor.Attributes.conductedClasses;
                    eventBus.$emit('lecture-time-updated', { lectureId: this.lectureId, conductedClasses: this.conductedClasses });
                } catch (e) {

                }
            },
            async addLectureTime() {
                try {
                    const newLectureTime = await this.$refs.addLectureTimeModal.open(this.course, this.groupNumber);
                    const addedLectureTime = await addLectureTime(this.lectureId, newLectureTime);
                    this.lectureTimes = addedLectureTime.Attributes.lectureTime;
                    eventBus.$emit('lecture-time-updated', { lectureId: this.lectureId, lectureTime: this.lectureTimes });
                } catch (e) {}
            },
            async getLecture(id) {
                this.lectureLoading = true;
                const lecture = await getLecture(id);
                this.lectureId = lecture.lectureId;
                this.tutors = lecture.conductedClasses;
                this.groupNumber = lecture.groupNumber;
                this.lectureTimes = lecture.lectureTime;
                this.course = lecture.course;
                this.lectureLoading = false;
            },
            getName(tutor) {
                return `${tutor.title} ${tutor.firstName} ${tutor.lastName}`
            },
            getLectureTimeTitle(lectureTime) {
                return `${pl.weekDay[lectureTime.day]} ${pl.weekType[lectureTime.weekType]} ${lectureTime.startTime} ${lectureTime.endTime}`
            }
        },
        mounted(){
            this.getLecture(this.groupId);
        }
    }
</script>

<style scoped>
    .wider-btn {
        width: 175px
    }
</style>
