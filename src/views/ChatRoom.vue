<template>
  <div>
    <section class="neighborhood-info">
      <p class v-if="neighborhood">
        Talking in {{ neighborhood.address_components[0].short_name }}
      </p>
    </section>
    <section class="message-list">
      <div
        v-for="(messageObject, index) in messages"
        :key="index"
        class="message-item"
      >
        <div class="message-name">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="user"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="17"
          >
            <path
              fill="currentColor"
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
              class
            ></path>
          </svg>
          <span class="ml-2">{{ messageObject.name }}</span>
          <small class="ml-2">{{ formatDate(messageObject.timestamp) }}</small>
        </div>
        <p class="message-text">{{ messageObject.text }}</p>
      </div>

      <span class="message-list-end"></span>
    </section>
    <!--<pre>{{ neighborhood }}</pre>-->
    <section class="message-input">
      <div class="d-flex">
        <textarea
          v-model="message"
          class="flex-grow-1 message-textarea"
        ></textarea>
        <button @click="sendMessage" id="send-button" class="btn btn-primary">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 535.5 535.5"
            xml:space="preserve"
          >
            <g id="send">
              <polygon
                points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75 		"
                fill="white"
              ></polygon>
            </g>
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import googleGeo from "@google/maps"
import io from "socket.io-client"
import moment from "moment"

export default {
  name: "ChatRoom",
  data() {
    return {
      message: "",
      messages: [
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        },
        {
          name: "Name",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga aspernatur, aliquid quas voluptatibus veniam nesciunt voluptatum. Voluptatem libero itaque nihil quisquam eligendi, repellat eveniet doloribus ratione temporibus aperiam voluptate!",
          timestamp: 1551601669726
        }
      ],
      socket: false,
      neighborhood: false
    }
  },
  methods: {
    sendMessage() {
      console.log(this.neighborhood.place_id)
      const messageObject = {
        name: "Testerperson",
        text: this.message,
        place_id: this.neighborhood.place_id,
        timestamp: Date.now()
      }
      this.socket.emit("chat message", messageObject)
      this.message = ""
    },
    formatDate(timestamp) {
      return moment(timestamp).format("MM/DD/YYYY h:mma")
    }
  },
  async created() {
    const vm = this
    vm.socket = io.connect("http://localhost:3000")

    vm.socket.on("connect", () => {
      console.log("Successfully connected! CREATED METHOD")
    })

    const googleGeoClient = googleGeo.createClient({
      key: "AIzaSyB52jckwjMkkyeLAucMc6_gOBe1dZ4NpAA"
    })
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
              console.log("RESULTS", response.json.results)
              vm.neighborhood = response.json.results.filter(function(place) {
                return place.types.includes("neighborhood")
              })
              vm.neighborhood = vm.neighborhood[0]
              vm.socket.emit("join room", {
                name: "Testerperson",
                neighborhood: vm.neighborhood
              })
              vm.socket.on("chat message|" + vm.neighborhood.place_id, function(
                msg
              ) {
                vm.messages.push(msg)
                vm.$scrollTo(".message-list-end")
              })
            }
          }
        )
      })
    }
  },
  mounted() {
    console.log("ChatRoom mounted")
  }
}
</script>

<style lang="scss" scoped>
.neighborhood-info {
  background-color: darken($primary, 20);
  color: white;
  padding: 0.3rem 0.6rem;
  position: fixed;
  width: 100%;
  height: auto;
  bottom: 35px;
}
.message {
  &-item {
    padding: 1.3rem 2rem;
    border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
  }
  &-name {
    font-weight: bolder;
    font-size: 1.2rem;
    margin-bottom: 5px;
    small {
      font-size: 0.6rem;
      color: $gray-600;
    }
  }
  &-textarea {
    height: 100% !important;
    width: 100%;
  }
  &-input {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10 !important;
  }
  &-list {
    margin-bottom: 59px;
  }
}
</style>
