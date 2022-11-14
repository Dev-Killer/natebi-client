import Vue from "vue";
import VueRouter from "vue-router";
import { getAuth } from "firebase/auth";
import HomeView from "../views/public/HelloWorld.vue";
import Login from "../views/public/Login.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Contribution from "../views/admin/Contribution.vue";
import PublicLayout from "../layouts/PublicLayout.vue";

Vue.use(VueRouter);

async function guardUserPage(to, from, next) {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  if (user !== null) {
    next();
  } else {
    next({ name: "Home" });
  }
}

const router = new VueRouter({
  routes: [
    {
      path: "/admin",
      component: AdminLayout,
      beforeEnter: guardUserPage,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "contribution",
          name: "Contribution",
          component: Contribution,
        },
      ],
    },
    {
      path: "/",
      component: PublicLayout,
      children: [
        {
          path: "",
          name: "Home",
          component: HomeView,
        },
        {
          path: "/login",
          name: "Login",
          component: Login,
        },
      ],
    },

    /**
     * Vues Other
     */
    {
      path: "/*",
      redirect: { name: "Home" },
    },
  ],
  mode: "hash",
  /* base: process.env.BASE_URL, */
});

export default router;
