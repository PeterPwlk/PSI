<template>
  <b-modal id="modal-1" v-model="modal" centered button-size="sm" @ok="handleOk" size="lg">
      <template #modal-title>
          <div class="font-weight-bold"> Termin zajęć </div>
          <div class="font-regular"> {{ groupNumber }} {{ course.course.name }} ({{ course.course.courseNumber}}) </div>
      </template>
      <b-container fluid>
          <b-row>
              <b-col>
                  <span> Tydzień: </span>
                  <b-select :options="weekType" v-model="newLectureTime.weekType"></b-select>
              </b-col>
          </b-row>
          <b-row class="mt-2">
              <b-col>
                  <span> Dzień: </span>
                  <b-select :options="weekDay" v-model="newLectureTime.day"></b-select>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <span> Sala: </span>
                  <b-select :options="classrooms" v-if="!loadingClassrooms" v-model="newLectureTime.classRoom"></b-select>
                  <b-skeleton v-else type="input"></b-skeleton>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <span> Czas rozpoczęcia: </span>
                  <b-timepicker locale="pl" v-model="newLectureTime.startTime"></b-timepicker>
              </b-col>
          </b-row>
      </b-container>
      <template #modal-ok>
          <span> Zapisz zmiany </span>
      </template>
      <template #modal-cancel>
          <span> Anuluj </span>
      </template>
  </b-modal>
</template>

<script>
    import {pl} from "../assets/lang";
    import {getClassroom} from "../httpService/httpService";
    import {mapLectureTypeToClassRoomType} from "../static/static";

    export default {
        name: "ManageGroupAddLectureTimeModal",
        data: () => ({
            modal: false,
            dateFrom: null,
            dateTo: null,
            weekDay: Object.keys(pl.weekDay).map(key => ({ value: key, text: pl.weekDay[key]})),
            weekType: Object.keys(pl.weekType).map(key => ({ value: key, text: pl.weekType[key]})),
            classrooms: [],
            loadingClassrooms: false,
            course: {
                courseId: 0,
                duration: '',
                course: {
                    courseNumber: '',
                },
                lectureType: 0
            },
            newLectureTime: {
                startTime: '7:30',
                duration:'',
                day: '',
                weekType: '',
                classRoom: -1
            },
            resolve: null,
            reject: null
        }),
        watch: {
        },
        computed: {
        },
        methods: {
            open(course, groupNumber){
                this.course = course;
                this.groupNumber = groupNumber;
                this.modal = true;
                this.getClassrooms();
                this.newLectureTime.duration = this.course.duration;
                return new Promise((resolve, reject) => {
                   this.resolve = resolve;
                   this.reject = reject;
                });
            },
            handleOk(event){
                event.preventDefault();
                this.resolve(this.newLectureTime);
            },
            handleCancel(event) {
                this.reject(false);
            },
            async getClassrooms() {
                this.loadingClassrooms = true;
                const classrooms = await getClassroom({ classRoomType: mapLectureTypeToClassRoomType(this.course.lectureType) });
                this.classrooms = classrooms.map(classroom => ({
                   text: `${classroom.building}, s. ${classroom.number} (${classroom.capacity} os.)`,
                   value: classroom.classRoomId
                }));
                this.loadingClassrooms = false;
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
