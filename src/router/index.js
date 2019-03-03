import Vue from "vue"
import Router from "vue-router"
import VueScrollTo from "vue-scrollto"
import ChatRoom from "@/views/ChatRoom"

Vue.use(Router)
Vue.use(VueScrollTo)

export default new Router({
  routes: [
    {
      path: "/",
      name: "ChatRoom",
      component: ChatRoom
    }
  ]
})
