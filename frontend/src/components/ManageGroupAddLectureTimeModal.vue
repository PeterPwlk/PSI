<template>
  <b-modal id="modal-1" v-model="modal" centered button-size="sm" @ok="handleOk" size="lg">
      <template #modal-title>
          <div class="font-weight-bold"> Termin zajęć </div>
          <div class="font-regular"> Z01-24a Projektowanie sys. informat. (INZ0003854L) </div>
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
                  <b-select></b-select>
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

    export default {
        name: "ManageGroupAddLectureTimeModal",
        data: () => ({
            modal: false,
            dateFrom: null,
            dateTo: null,
            weekDay: Object.keys(pl.weekDay).map(key => ({ value: key, text: pl.weekDay[key]})),
            weekType: Object.keys(pl.weekType).map(key => ({ value: key, text: pl.weekType[key]}))
        }),
        computed: {
        },
        methods: {
            open(){
                this.modal = true;
                this.getClassrooms();
            },
            handleOk(event){
                event.preventDefault();
            },
            async getClassrooms() {
               const classrooms = await getClassroom();
               console.log(classrooms);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
