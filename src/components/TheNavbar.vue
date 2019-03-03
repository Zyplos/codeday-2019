<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark fixed-top bg-primary py-0 pr-0"
    >
      <a class="navbar-brand mr-auto mr-lg-0 p-0" href="#">GroupUp</a>
      <button
        class="navbar-toggler p-0 border-0"
        type="button"
        data-toggle="offcanvas"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="navbar-collapse offcanvas-collapse"
        id="navbarsExampleDefault"
        v-bind:class="{ open: isActive }"
      >
        <div id="map" ref="map"></div>
      </div>
    </nav>
  </div>
</template>

<script>
import loadGoogleMapsApi from "load-google-maps-api"
export default {
  name: "TheNavbar",
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleNavbar() {
      console.log("TOGGLE")
      this.isActive = !this.isActive
    }
  },
  async mounted() {
    const vm = this
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("MAP COORDS", position)
        loadGoogleMapsApi({
          key: "AIzaSyB52jckwjMkkyeLAucMc6_gOBe1dZ4NpAA"
        })
          .then(function(googleMaps) {
            const mapObject = new googleMaps.Map(vm.$refs.map, {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              zoom: 13
            })
            const marker = new googleMaps.Marker({
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              map: mapObject
            })
          })
          .catch(function(error) {
            console.error(error)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 991.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 52px; /* Height of navbar */
    bottom: 0;
    left: 100%;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    visibility: hidden;
    background-color: $gray-200;
    transition: visibility 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out,
      -webkit-transform 0.3s ease-in-out;
  }
  .offcanvas-collapse.open {
    visibility: visible;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.navbar-toggler {
  height: 52px;
  background-color: rgba(0, 0, 0, 0.2);
  width: 52px;
}

#map {
  min-height: 100%;
  max-height: 100%;
  height: 100%;
  z-index: 30 !important;
}
</style>
