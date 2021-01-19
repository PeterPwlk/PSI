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
                  <b-select :options="weekType"></b-select>
              </b-col>
          </b-row>
          <b-row class="mt-2">
              <b-col>
                  <span> Dzień: </span>
                  <b-select :options="weekDay"></b-select>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <span> Sala: </span>
                  <b-select :options="classrooms" v-if="!loadingClassrooms"></b-select>
                  <b-skeleton v-else type="input"></b-skeleton>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <span> Czas rozpoczęcia: </span>
                  <b-timepicker locale="pl"></b-timepicker>
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
            }
        }),
        computed: {
        },
        methods: {
            open(course, groupNumber){
                this.course = course;
                this.groupNumber = groupNumber;
                this.modal = true;
                this.getClassrooms();
            },
            handleOk(event){
                event.preventDefault();
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
