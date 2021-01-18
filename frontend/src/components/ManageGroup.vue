<template>
    <b-container fluid class="text-left p-3">
        <b-row>
            <b-col>
                <h2> {{ groupNumber }} </h2>
                <h5> INZ003854L </h5>
                <h5> Projektowanie sys. informat. </h5>
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
        <b-row class="mt-2">
            <b-col>
                <b-btn variant="primary" size="sm" class="wider-btn" @click="addTutor()"> Dodaj prowadzącego </b-btn>
            </b-col>
        </b-row>
        <hr/>
        <b-row class="mt-2" v-for="lectureTime in lectureTimes">
            <b-col>
                <GroupDetailsCard :title="getLectureTimeTitle(lectureTime)">
                    <div class="font-small">
                        <span>Budynek <b>{{ lectureTime.classRoom.building}}</b></span>
                        <span class="ml-2">Sala <b>{{ lectureTime.classRoom.number }}</b></span>
                    </div>
                    <div class="font-small"> Czas trwania zajęć: {{ lectureTime.duration }}</div>
                </GroupDetailsCard>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <b-btn variant="primary" size="sm" class="wider-btn" @click="addLectureTime()"> Dodaj termin </b-btn>
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
    import {getLecture} from "../httpService/httpService";
    import {pl} from "../assets/lang";
    export default {
        name: "ManageGroup",
        components: {ManageGroupAddLectureTimeModal, ManageGroupAddTutorModal, GroupDetailsCard},
        data: () => ({
            tutors: [],
            groupNumber: '',
            lectureTimes: []
        }),
        computed: {
            groupId() {
                return this.$route.params.groupId;
            }
        },
        methods: {
            addTutor() {
                this.$refs.addTutorModal.open();
            },
            addLectureTime() {
                this.$refs.addLectureTimeModal.open();
            },
            async getLecture() {
                const lecture = await getLecture(this.groupId);
                this.tutors = lecture.conductedClasses;
                this.groupNumber = lecture.groupNumber;
                this.lectureTimes = lecture.lectureTime;
                console.log(lecture);
            },
            getName(tutor) {
                return `${tutor.title} ${tutor.firstName} ${tutor.lastName}`
            },
            getLectureTimeTitle(lectureTime) {
                return `${pl.weekDay[lectureTime.day]} ${pl.weekType[lectureTime.weekType]} ${lectureTime.startTime} ${lectureTime.endTime}`
            }
        },
        mounted(){
            this.getLecture();
        }
    }
</script>

<style scoped>
    .wider-btn {
        width: 175px
    }
</style>
