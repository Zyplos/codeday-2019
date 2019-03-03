<template>
  <div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
//import ChatRoom from "@/views/ChatRoom.vue"
import googleGeo from "@google/maps"
import loadGoogleMapsApi from "load-google-maps-api"

export default {
  //components: {
  //  ChatRoom
  //},
  data() {
    return {
      lat: false,
      long: false
    }
  },
  async mounted() {
    const googleGeoClient = googleGeo.createClient({
      key: "AIzaSyB52jckwjMkkyeLAucMc6_gOBe1dZ4NpAA"
    })
    const vm = this
    var neighbrhood
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.lat = position.coords.latitude
        vm.long = position.coords.longitude
        googleGeoClient.reverseGeocode(
          {
            latlng: {
              lat: vm.lat,
              lng: vm.long
            }
          },
          function(err, response) {
            if (!err) {
              //console.log("RESULTS", response.json.results)
              neighbrhood = response.json.results.filter(function(place) {
                return place.types.includes("neighborhood")
              })
              console.log(neighbrhood)
            }
          }
        )

        loadGoogleMapsApi({
          key: "AIzaSyB52jckwjMkkyeLAucMc6_gOBe1dZ4NpAA"
        })
          .then(function(googleMaps) {
            new googleMaps.Map(vm.$refs.map, {
              center: {
                lat: vm.lat,
                lng: vm.long
              },
              zoom: 17
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

<style lang="scss" scoped></style>
