<template>
  <v-app ref="app" style="height: 100%">
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      temporary
      app
      v-model="drawer"
      :color="$vuetify.theme.dark ? '#1a202e' : '#ffffff'"
    >
      <v-list>
        <v-list-item class="py-2 w-100">
          <v-list-item-avatar class="mx-auto" width="150px" height="100%">
            <v-img src="/img/contrib.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user?.displayName || "" }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user?.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <!-- <v-list-item link to="/dashboard">
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Tableau de bord</v-list-item-title>
                </v-list-item> -->
        <v-list-item-group color="#FF725E">
          <v-list-item link to="/admin/dashboard" class="my-5">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><span class="text-subtitle-1 font-weight-medium"
                >Tableau de bord</span
              ></v-list-item-title
            >
          </v-list-item>
          <v-list-item link to="/admin/contribution">
            <v-list-item-icon>
              <v-icon>mdi-account-cash-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><span class="text-subtitle-1 font-weight-medium"
                >Cotisations</span
              ></v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="#FF725E" class="white--text" @click="logout">
            Deconnexion
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar
      app
      elevation="4"
      :color="$vuetify.theme.dark ? '#1a202e' : '#ffffff'"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ currentPage }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <theme-switcher></theme-switcher>

      <!-- <div class="mx-6"></div>

            <user-dropdown-vue></user-dropdown-vue> -->
    </v-app-bar>

    <!-- Content -->
    <v-main style="background-color: #ffeae8">
      <v-card
        flat
        height="100%"
        :color="$vuetify.theme.dark ? '#232B3E' : '#FFF5F3'"
        class="pt-4"
        rounded="0"
      >
        <router-view @currentPage="pageTitle"></router-view>
      </v-card>
    </v-main>

    <!-- Footer -->
    <v-footer padless dark color="#363636">
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }}
          <strong>Dev - Killers</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import ThemeSwitcher from "../components/shared/ThemeSwitcher";
/* import UserDropdownVue from "../components/shared/UserDropdown.vue"; */
import { getAuth, signOut } from "firebase/auth";
export default Vue.extend({
  name: "AdminLayout",

  components: { ThemeSwitcher /* UserDropdownVue */ },
  data: () => ({
    drawer: false,
    user: null,
    currentPage: "",
  }),
  mounted() {
    this.user = this.$store.getters["auth/user"];
    console.log(this.user?.email);
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.commit("auth/SET_LOGGED", {
            user: null,
            isLoggedIn: false,
          });
          location.reload();
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    /* fetchUser() {
      axios
        .get("user")
        .then((response) => {
          this.user = response;
          this.$store.commit("auth/SET_LOGGED", {
            user: response,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.$swal({
            icon: "error",
            title: "Erreur",
            text: error.message,
          });
        });
    }, */
    pageTitle(title) {
      this.currentPage = title;
    },
  },
  watch: {
    "$vuetify.theme.isDark"() {
      this.$nextTick(() => {
        /* const rootStyles = window.getComputedStyle(this.$refs.app.$el); */
        document.body.style.backgroundColor =
          "#1a202e"; /* rootStyles.backgroundColor */
      });
    },
  },
});
</script>
<style>
.theme--dark.v-data-table {
  background-color: #1a202e !important;
}
.theme--light.v-tabs-items {
  background-color: inherit !important;
}
.theme--dark.v-tabs-items {
  background-color: inherit !important;
}
</style>
