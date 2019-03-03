<template>
  <div id="app">
    <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue"

export default {
  name: "app",
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">
@import "./styles/groupup";
body {
  padding-top: 60px;
}
</style>
