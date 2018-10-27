import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Content from "@/views/Content";
import Soundlist from "@/views/Soundlist";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/home",
      name: "home",
      component: Home,
      children: [{
          path: "/content",
          name: "content",
          component: Content,
          meta: {
            keepAlive: true
          }
        },
        {
          path: "/soundlist",
          name: "soundlist",
          component: Soundlist,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});