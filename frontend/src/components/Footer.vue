<template>
    <div id="footer">
        <img src="../assets/pwrlogo.png" alt="pwr logo" class="float-left">
        <span class="font-small"> Projektowanie systemów informatycznych </span>
        <img src="../assets/iz-logo.jpg" alt="iz logo" class="float-right">
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    img {
        height: 100%;
    }
    #footer {
        border-top: 1px solid #e7edf1;
        height: 30px;
        padding-right: 10px;
    }
</style>
