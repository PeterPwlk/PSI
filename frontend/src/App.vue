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
    </SplitPanel>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Sidebar from "./components/Sidebar";
  import Footer from "./components/Footer";
  import SplitPanel from "./components/SplitPanel";
  export default {
    components: {SplitPanel, Footer, Sidebar, Navbar},
    mounted() {
      this.$store.dispatch('checkLogin');
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
