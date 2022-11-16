<!-- eslint-disable prettier/prettier -->
<template>
  <v-app ref="app" style="height: 100%" v-if="isCodeValid">

    <!-- App Bar -->
    <v-app-bar app elevation="4" :color="$vuetify.theme.dark ? '#1a202e' : '#ffffff'">

      <v-toolbar-title>Configs</v-toolbar-title>

      <v-spacer></v-spacer>

      <theme-switcher></theme-switcher>

      <!-- <div class="mx-6"></div>

            <user-dropdown-vue></user-dropdown-vue> -->
    </v-app-bar>

    <!-- Content -->
    <v-main style="background-color: #ffeae8">
      <div class="pt-4">
        <h1 class="text-center" style="font-family: 'Courier New', Courier, monospace;">New User</h1>

      <p class="text-center">Fill form fields and save</p>

      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleAddField()">
          <v-row justify="center" class="mt-5">
            <v-col cols="10">
              <v-text-field v-model="fields.prenom" :rules="[rules.required]" outlined rounded label="Prénom"
                placeholder="Ex: Yakhad"></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field v-model="fields.nom" :rules="[rules.required]" outlined rounded label="Nom"
                placeholder="Ex: Diop"></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field v-model="fields.email" :rules="[rules.required, rules.emailMatch]" outlined rounded
                label="Email" placeholder="Ex: xxx@yyy.zzz"></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field v-model="fields.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" label="Mot de passe"
                hint="Au moins 8 caractères" outlined rounded counter @click:append="show1 = !show1"></v-text-field>
            </v-col>
          </v-row>

          <div class="my-3 text-center">
            <v-btn :loading="isLoading" rounded large block type="submit" color="#FF725E" style="color: whitesmoke">Creer</v-btn>
          </div>
        </v-form>
      </v-container>
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      </div>
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
  <v-app ref="app" v-else>
    <v-card flat style="height: 100vh;" @click="countClick()">
      <v-dialog v-model="dialog" persistent max-width="350px">
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field :label="label" v-model="code" outlined rounded required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="submitCode">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</template>
<script lang="js">
import Vue from 'vue';
import ThemeSwitcher from '../../components/shared/ThemeSwitcher.vue';
import { createUserWithEmailAndPassword, getAuth, signOut, updateProfile } from "firebase/auth";
export default Vue.extend({
  name: "CreateNewUser",
  components: { ThemeSwitcher },
  data: () => ({
    valid: true,
    isLoading: false,
    screenClickCounter: 0,
    code: "",
    isCodeValid: false,
    dialog: false,
    label: crypto.randomUUID().split('-')[0],
    fields: {
      prenom: '',
      nom: '',
      email: '',
      password: ''
    },
    show1: false,
    rules: {
      required: value => !!value || 'Obligatoire.',
      min: v => (v.length > 0 && v.length >= 8) || 'Au moins 8 caratères',
      emailMatch: (val) => new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$').test(val) || `L'email est incorrect`,
    },
    auth: null
  }),

  methods: {
    handleAddField() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.isLoading = true;
        this.auth = getAuth();
        createUserWithEmailAndPassword(this.auth, this.fields.email, this.fields.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.updateUser(user)
            // ...
          })
          .catch((error) => {
            this.isLoading = false;
            console.log(error);
            this.$swal.fire({title: "Erreur", text: "", icon: "error"})
            // ..
          });
      }
    },

    updateUser(user) {
      updateProfile(user, {
        displayName: `${this.fields.prenom} ${this.fields.nom}`, photoURL: ""
      }).then(() => {
        // Profile updated!
        signOut(this.auth).then(() => {
          this.isLoading = false
          this.$swal.fire({title: "Succés", text: "Création réussie", icon: "success"})
        }).catch(() => { this.isLoading = false; this.$swal.fire({title: "Erreur", text: "", icon: "error"}) })
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error);
        this.isLoading = false
        this.$swal.fire({title: "Erreur", text: "", icon: "error"})
        // ...
      });
    },

    countClick() {
      this.screenClickCounter++
      if (this.screenClickCounter == 3) {
        this.dialog = true;
      }
    },

    submitCode() {
      const tmp = this.$store.getters["auth/getConfigCode"];
      console.log(tmp);
      if (this.code === tmp) this.isCodeValid = true
      else this.$router.push({ name: 'Home' })
    }
  }
});
</script>
