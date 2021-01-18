<template>
  <b-modal id="modal-1" v-model="modal" centered button-size="sm" @ok="handleOk">
      <template #modal-title>
          <div class="font-weight-bold"> Prowadzący </div>
          <div class="font-regular"> Z01-24a Projektowanie sys. informat. (INZ0003854L) </div>
      </template>
      <b-container fluid>
          <b-row>
              <b-col>
                  <b-select>
                      <b-select-option value="Test">
                          Dr inż. Bogumiła Hnatkowska
                      </b-select-option>
                  </b-select>
                  <b-link disabled>Pokaż plan prowadzącego</b-link>
              </b-col>
          </b-row>
          <b-row class="mt-2">
              <b-col>
                  <span>Data rozpoczęcia:</span>
                  <b-datepicker></b-datepicker>
              </b-col>
              <b-col>
                  <span>Data zakończenia:</span>
                  <b-datepicker></b-datepicker>
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
    export default {
        name: "ManageGroupAddTutorModal",
        data: () => ({
            modal: false
        }),
        methods: {
            open(){
                this.modal = true;
            },
            handleOk(event){
                event.preventDefault();
            }
        }
    }
</script>

<style scoped>

</style>
