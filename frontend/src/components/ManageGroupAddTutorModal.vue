<template>
  <b-modal id="modal-1" v-model="modal" centered no-close-on-backdrop button-size="sm" @ok="handleOk" size="lg" @cancel="handleCancel" @close="handleCancel">
      <template #modal-title>
          <div class="font-weight-bold"> {{ $t('tutor') }} </div>
          <div class="font-regular"> {{ groupNumber }} {{ course.course.name }} ({{ course.course.courseNumber}}) </div>
      </template>
      <b-container fluid>
          <b-row>
              <b-col>
                  <b-select v-if="!loadingTutors" :options="tutors" v-model="tutorId"></b-select>
                  <b-skeleton type="input" v-else></b-skeleton>
                  <b-link disabled>{{ $t('message.showTutorPlan') }}</b-link>
              </b-col>
          </b-row>
          <b-row class="mt-2">
              <b-col>
                  <span>{{ $t('startDate') }}:</span>
                  <b-datepicker v-model="startDateComp" locale="pl"></b-datepicker>
              </b-col>
              <b-col>
                  <span>{{ $t('endDate') }}:</span>
                  <b-datepicker v-model="endDateComp" locale="pl"></b-datepicker>
              </b-col>
          </b-row>
      </b-container>
      <template #modal-ok>
          <span> {{ $t('saveChanges') }} </span>
      </template>
      <template #modal-cancel>
          <span> {{ $t('cancel') }} </span>
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
            tutorId: -1,
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString()
        }),
        computed: {
            startDateComp: {
                get() {
                    return this.startDate
                },
                set(value) {
                    this.startDate = new Date(Date.parse(value)).toISOString();
                }
            },
            endDateComp: {
                get() {
                    return this.startDate
                },
                set(value) {
                    this.endDate = new Date(Date.parse(value)).toISOString();
                }
            }
        },
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
                    tutorId: this.tutorId,
                    startDate: this.startDate,
                    endDate: this.endDate
                };
                this.resolve(newTutor);
                this.modal = false;
            },
            handleCancel(event){
                this.reject(false);
            }
        }
    }
</script>

<style scoped>

</style>
