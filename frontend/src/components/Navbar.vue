<template>
  <b-navbar fixed="top" type="dark" variant="primary">
    <b-navbar-nav>
      <b-nav-item :disabled="!$store.state.authorized" :to="{ name: 'plans' }"> {{ $t('schedule') }}</b-nav-item>
      <b-nav-item :disabled="!$store.state.authorized" :to="{ name: 'raports'}"> {{ $t('raports') }} </b-nav-item>
      <b-nav-item :disabled="!$store.state.authorized" :to="{ name: 'generate' }"> {{ $t('generatePlan') }}</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item @click="setLang('en')">EN</b-dropdown-item>
        <b-dropdown-item @click="setLang('pl')">PL</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item v-if="!$store.state.authorized" :href="link">
        {{ $t('login') }}
      </b-nav-item>
      <b-nav-item v-else @click="$store.dispatch('logout')"> {{ $t('logout') }} </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  const link = process.env.VUE_APP_AWS_LOGIN_URL;
  import Sidebar from "./Sidebar";
  export default {
    name: "Navbar",
    components: {Sidebar},
    methods: {
      setLang(lang) {
        localStorage.setItem('lang', lang);
        this.$i18n.locale = lang;
      }
    },
    created () {
      this.link = link;
    }
  }
</script>

<style scoped>

</style>
