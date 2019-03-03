<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{ lat }}</p>
    <p>{{ long }}</p>
    <ChatRoom />
  </div>
</template>

<script>
import ChatRoom from "@/views/ChatRoom.vue"
import googleMaps from "@google/maps"

export default {
  components: {
    ChatRoom
  },
  data() {
    return {
      lat: false,
      long: false
    }
  },
  async mounted() {
    const googleMapsClient = googleMaps.createClient({
      key: "AIzaSyB52jckwjMkkyeLAucMc6_gOBe1dZ4NpAA"
    })
    const vm = this
    var neighbrhood
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.lat = position.coords.latitude
        vm.long = position.coords.longitude
        googleMapsClient.reverseGeocode(
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
      })
    }
  }
}
</script>

<style></style>
