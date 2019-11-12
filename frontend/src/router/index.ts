import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/user/Login.vue";
import Register from "../components/user/Register.vue";
import RequestForm from "../components/request/RequestForm.vue";
import Components from "../views/Components.vue";
import users from "../store/modules/users";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/components",
    name: "components",
    component: Components,
    meta: { requiresAuth: true, adminAuth: false }
  },
  {
    path: "/newrequest",
    name: "newrequest",
    component: RequestForm,
    meta: { requiresAuth: true, adminAuth: false }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: Route, from: any, next: any) => {
  if (to.meta.requiresAuth) {
    const token = users.isAuthenticated;
    console.log("token", token);
    if (!token) {
      console.log("tokenFail");
      next("/login");
    } else {
      if (to.meta.adminAuth) {
        const authUser = users.profileData;
        if (authUser != null && authUser.role.id === 2)
          console.log("Im in admin");
        next();
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
