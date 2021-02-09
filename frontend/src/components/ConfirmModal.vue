<template>
    <b-modal v-model="modal" :title="title" @ok="ok" @cancel="cancel" hide-header-close>
        {{ message }}
    </b-modal>
</template>

<script>
    export default {
        name: "ConfirmModal",
        data: () => ({
            modal: false,
            resolve: null,
            reject: null,
            title: '',
            message: ''
        }),
        methods: {
            open(title, message) {
                this.title = title;
                this.message = message;
                this.modal = true;
                return new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
            },
            cancel() {
                this.reject(false);
                this.modal = false;
            },
            ok() {
                this.resolve(true);
                this.modal = false;
            }
        }
    }
</script>

<style scoped>

</style>
