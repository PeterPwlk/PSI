<template>
    <b-container class="h-100">
        <b-row class="h-100">
            <b-col align-self="center">
                <h3> {{ $t('message.loginRequired' )}} </h3>
                <b-btn :href="link"> {{ $t('login') }} </b-btn>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "LoginRequired",
        created() {
            this.link = process.env.VUE_APP_AWS_LOGIN_URL;
        }
    }
</script>

<style scoped>

</style>
