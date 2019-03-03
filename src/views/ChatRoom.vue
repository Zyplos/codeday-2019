<template>
  <div>
    <input id="m" autocomplete="off" v-model="message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import io from "socket.io-client"

export default {
  name: "ChatRoom",
  data() {
    return {
      message: "",
      socket: false
    }
  },
  methods: {
    sendMessage() {
      console.log(this.message)
      this.socket.emit("chat message", this.message)
      this.message = ""
    }
  },
  created() {
    console.log("ChatRoom created")
  },
  mounted() {
    console.log("ChatRoom mounted")

    this.socket = io.connect("http://localhost:3000")

    this.socket.on("connect", () => {
      console.log("Successfully connected!")
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font: 13px Helvetica, Arial;
}
form {
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
form input {
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}
form button {
  width: 9%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
}
#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#messages li {
  padding: 5px 10px;
}
#messages li:nth-child(odd) {
  background: #eee;
}
</style>
