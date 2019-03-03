<template>
  <div id="app">
    <TheNavbar />
    <main>
      <router-view></router-view>
    </main>
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
  padding-top: 52px;
}
</style>
