<template>
  <b-navbar fixed="top" type="dark" variant="primary">
    <b-navbar-nav>
      <b-nav-item href="#">Plan zajęć</b-nav-item>
      <b-nav-item href="#">Raporty</b-nav-item>
      <b-nav-item :to="{ name: 'generate' }">Generuj plan</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item v-if="!$store.state.authorized" href="https://pwr-psi.auth.us-east-1.amazoncognito.com/login?client_id=4qkatbqtpu4bsv25b27cffvtjv&response_type=code&scope=openid+profile&redirect_uri=http://localhost:8080/login">
        Zaloguj się
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
    import Sidebar from "./Sidebar";
    export default {
        name: "Navbar",
      components: {Sidebar}
    }
</script>

<style scoped>

</style>
