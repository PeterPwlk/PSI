<template>
  <div id="app">
    <Navbar></Navbar>
    <SplitPanel>
      <template v-slot:leftPanel>
        <router-view
          ref="side"
          name="side"
        />
      </template>
      <template v-slot:navigationBar>
        <router-view name="navigationBar" />
      </template>
      <template v-slot:rightPanel>
        <router-view />
      </template>
      <template v-slot:secondaryFooter>
        <router-view name="secondaryFooter" />
      </template>
      <template v-slot:rightSidePanel>
        <router-view name="rightSidePanel" />
      </template>
    </SplitPanel>
    <ConfirmModal ref="confirmModal"></ConfirmModal>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Sidebar from "./components/Sidebar";
  import Footer from "./components/Footer";
  import SplitPanel from "./components/SplitPanel";
  import ConfirmModal from "./components/ConfirmModal";
  export default {
    components: {ConfirmModal, SplitPanel, Footer, Sidebar, Navbar},
    created() {
      const lang = localStorage.getItem('lang');
      if (lang) {
        this.$i18n.locale = lang;
      }
    },
    mounted() {
      this.$store.dispatch('checkLogin');
      this.$root.$confirm = (...params) => this.$refs.confirmModal.open(...params);
    }
  }
</script>


<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
