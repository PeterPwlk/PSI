<template>
    <b-container class="h-100">
        <b-row class="h-100">
            <b-col align-self="center">
                <h3> Aby korzystać z systemu logowania, musisz być zaplanowany! </h3>
                <b-btn href="https://nowa-edukacja.auth.us-east-1.amazoncognito.com/login?client_id=3gfjgnf29ngqvsp52pqmc1dn7f&response_type=code&scope=openid+profile&redirect_uri=https://51.83.129.128:8080/login"> Zaloguj się </b-btn>
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
