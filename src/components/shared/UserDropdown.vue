<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="150"
      max-width="300"
      offset-y
      transition="slide-x-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark fab small v-bind="attrs" v-on="on">{{
          user.prenom[0]
        }}</v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="/img/user.png" alt="moi" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                `${user.prenom} ${user.nom}`
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item link :to="{ name: 'UserHome' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Mon compte</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Déconnexion</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <!-- Deconnexion Loader -->
    <v-dialog v-model="dialog" hide-overlay persistent width="350">
      <v-card class="pa-3">
        <div class="text-center">
          <div class="font-weight-medium">
            Déconnexion en cours. Veuillez patienter
          </div>
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            class="mt-5"
          ></v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { axios } from "axios";
export default {
  name: "UserDropdown",
  data() {
    return {
      menu: false,
      dialog: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
  },
  methods: {
    logout() {
      this.dialog = true;
      axios
        .post("logout")
        .then(() => {
          this.$store.commit("auth/SET_LOGGED", {
            user: null,
            isLoggedIn: false,
          });
          location.reload();
        })
        .catch((error) => {
          this.dialog = false;
          this.$swal({
            icon: "error",
            title: "Erreur !",
            text: error.message,
          });
        });
    },
  },
};
</script>
