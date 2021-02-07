<template>
  <b-navbar fixed="top" type="dark" variant="primary">
    <b-navbar-nav>
      <b-nav-item :disabled="!$store.state.authorized" :to="{ name: 'plans' }">Plan zajęć</b-nav-item>
      <b-nav-item :disabled="!$store.state.authorized" :to="{ name: 'raports'}">Raporty</b-nav-item>
      <b-nav-item :disabled="!$store.state.authorized" :to="{ name: 'generate' }">Generuj plan</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item v-if="!$store.state.authorized" :href="link">
        Zaloguj się
      </b-nav-item>
      <b-nav-item v-else @click="$store.dispatch('logout')"> Wyloguj się </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  const link = process.env.VUE_APP_AWS_LOGIN_URL;
  import Sidebar from "./Sidebar";
  export default {
    name: "Navbar",
    components: {Sidebar},
    created () {
      this.link = link;
    }
  }
</script>

<style scoped>

</style>
