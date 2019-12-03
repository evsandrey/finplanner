import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/user/Login.vue";
import Register from "../components/user/Register.vue";
import UsersList from "../components/admin/UsersList.vue";
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
    path: "/admin/users",
    name: "usersList",
    component: UsersList,
    meta: { requiresAuth: true, adminAuth: true }
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
    path: "/forgot_password",
    name: "forgot_password",
    component: () => import("../components/user/ForgotPassword.vue")
  },
  {
    path: '/update_password/:token',
    name: 'update_password',
    component: () => import("../components/user/UpdatePassword.vue"),
    props: true
  },
  {
    path: "/post/new",
    name: "newPost",
    meta: { requiresAuth: true, adminAuth: false },
    component: () => import("../components/post/NewPost.vue")
  },
  {
    path: "/post/:post_id",
    name: "showPost",
    component: () => import("../components/post/ShowPost.vue"),
    props: true
  },
  {
    path: "/post/:post_id/edit",
    name: "editPost",
    component: () => import("../components/post/EditPost.vue"),
    props: true
  },
  {
    path: "/posts",
    name: "showPosts",
    component: () => import("../components/post/ListPosts.vue"),
    props: true
  },
  {
    path: "/profile",
    name: "profile",
    meta: { requiresAuth: true, adminAuth: false },
    component: () => import("../components/user/EditProfile.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: Route, from: any, next: any) => {
  if (to.meta.requiresAuth) {
    const token = users.isTokenized;
    if (!token) {
      console.log("tokenFail");
      next("/login");
    } else {
      if (to.meta.adminAuth) {
        if (users.isAdmin) {
          console.log("Im admin");
          next();
        } else {
          next("/login");
        }
      } else {
        next();
      }
      next();
    }
  } else {
    next();
  }
});

export default router;
