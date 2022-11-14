<template>
  <v-dialog v-model="dialog" persistent>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="handleAddField()"
    >
      <v-card style="background-color: #fff5f3">
        <v-card-title>
          <span class="headline">Nouvelle Cotisation</span>
        </v-card-title>
        <v-card-text>
          <v-alert prominent dense text type="info"
            >Champ obligatoire (*)</v-alert
          >
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="fields.prenom"
                  outlined
                  label="Prénom *"
                  :rules="[rules.required]"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="fields.nom"
                  outlined
                  label="Nom *"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="fields.phone"
                  outlined
                  label="Numéro téléphone"
                  :rules="[rules.phone]"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="fields.localite"
                  outlined
                  label="Localité *"
                  :rules="[rules.required]"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="fields.contrib"
                  outlined
                  label="Cotisation *"
                  type="number"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      v-model="fields.contribDate"
                      label="Date Cotisation"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="fields.contribDate" scrollable>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Zone *"
                  v-model="zone"
                  outlined
                  :items="items"
                  item-value="title"
                  item-text="text"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancelDialog">Annuler</v-btn>
          <v-btn color="blue darken-1" text type="submit">Enregister</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import { child, get, ref, set } from "firebase/database";
export default Vue.extend({
  name: "CreateContribDialog",
  props: {
    dialog: { type: Boolean, default: false },
    db: { type: Object, required: true },
  },

  data: () => ({
    valid: true,
    fields: {
      prenom: "",
      nom: "",
      phone: "",
      localite: "",
      contrib: 0,
      contribDate: null,
    },
    zone: null,
    rules: {
      phone: (v) => !v || (v.length > 0 && v.length == 9) || "Taille incorrect",
      required: (v) => (v && !!v.trim()) || "Obligatoire.",
    },
    menu: false,
    items: [
      {
        title: "sn",
        text: "Sénégal",
      },
      {
        title: "int",
        text: "International",
      },
    ],
  }),

  methods: {
    handleAddField() {
      console.log("handleAddField");
      this.$refs.form.validate();
      if (this.valid) {
        const path = this.zone == "sn" ? "contributors_sn" : "contributors_int";
        console.log("beforeEnter");
        this.$emit("loadOn");
        get(child(ref(this.db), `${path}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.saveContrib(path, snapshot.size);
            } else {
              this.$swal.fire({ title: "Erreur", text: "", icon: "error" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({ title: "Erreur", text: "", icon: "error" });
            this.$emit("loadOff");
          });
        /* this.saveContrib(
          this.zone == "sn" ? "contributors_sn" : "contributors_int"
        ); */
      }
    },

    saveContrib(path, length) {
      set(ref(this.db, `${path}/${length}`), this.fields)
        .then((val) => {
          console.log(val);
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire({ title: "Erreur", text: "", icon: "error" });
          this.cancelDialog();
        })
        .finally(() => {
          this.cancelDialog();
        });
    },
    cancelDialog() {
      this.$refs.form.reset();
      this.$emit("loadOff");
      this.$emit("cancel");
    },
  },
});
</script>

<style></style>
