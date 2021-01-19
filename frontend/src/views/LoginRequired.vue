<template>
    <b-container class="h-100">
        <b-row class="h-100">
            <b-col align-self="center">
                <h3> Aby korzystać z systemu logowania, musisz być zaplanowany! </h3>
                <b-btn href="https://pwr-psi.auth.us-east-1.amazoncognito.com/login?client_id=4qkatbqtpu4bsv25b27cffvtjv&response_type=code&scope=openid+profile&redirect_uri=http://localhost:8080/login"> Zaloguj się </b-btn>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "LoginRequired"
    }
</script>

<style scoped>

</style>
