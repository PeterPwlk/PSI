<template>
  <b-modal id="modal-1" v-model="modal" centered button-size="sm" @ok="handleOk" size="lg" @cancel="handleCancel">
      <template #modal-title>
          <div class="font-weight-bold"> Prowadzący </div>
          <div class="font-regular"> {{ groupNumber }} {{ course.course.name }} ({{ course.course.courseNumber}}) </div>
      </template>
      <b-container fluid>
          <b-row>
              <b-col>
                  <b-select v-if="!loadingTutors" :options="tutors" v-model="newLectureTutor.tutorId"></b-select>
                  <b-skeleton type="input" v-else></b-skeleton>
                  <b-link disabled>Pokaż plan prowadzącego</b-link>
              </b-col>
          </b-row>
          <b-row class="mt-2">
              <b-col>
                  <span>Data rozpoczęcia:</span>
                  <b-datepicker v-model="newLectureTutor.startDate" locale="pl"></b-datepicker>
              </b-col>
              <b-col>
                  <span>Data zakończenia:</span>
                  <b-datepicker v-model="newLectureTutor.endDate" locale="pl"></b-datepicker>
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
    import {getTutor} from "../httpService/httpService";

    export default {
        name: "ManageGroupAddTutorModal",
        data: () => ({
            modal: false,
            resolve: null,
            tutors: [],
            course: {
                courseId: 0,
                duration: '',
                course: {
                    courseNumber: '',
                },
                lectureType: 0
            },
            groupNumber: '',
            loadingTutors: false,
            newLectureTutor: {
                tutorId: -1,
                startDate: new Date(),
                endDate: new Date(),
            }
        }),
        methods: {
            async getTutors() {
                this.loadingTutors = true;
                const tutors = await getTutor({ courseId: this.course.courseId });
                this.tutors = tutors.map(tutor => ({
                    text: `${tutor.title} ${tutor.firstName} ${tutor.lastName}`,
                    value: tutor.tutorId
                }));
                this.loadingTutors = false;
            },
            open(course, groupNumber){
                this.course = course;
                this.groupNumber = groupNumber;
                this.getTutors();
                this.modal = true;
                return new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
            },
            handleOk(event){
                event.preventDefault();
                let newTutor = {
                    tutorId: this.newLectureTutor.tutorId,
                    startDate: this.newLectureTutor.startDate.toLocaleDateString(),
                    endDate: this.newLectureTutor.endDate.toLocaleDateString()
                };
                this.resolve(newTutor);
            },
            handleCancel(event){
                this.reject(false);
            }
        }
    }
</script>

<style scoped>

</style>
