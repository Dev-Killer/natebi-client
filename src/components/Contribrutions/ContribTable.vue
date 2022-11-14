<template>
  <v-card flat>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      :mobile-breakpoint="10"
      :loading="isLoading"
      loading-text="Chargement ..."
      no-data-text="Aucune donnée"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchData"> Reset </v-btn>
      </template>
    </v-data-table>

    <update-contrib-dialog
      v-if="item"
      :fields="item"
      :path="path"
      :dialog="updaterDialog"
      @cancel="updaterDialog = false"
      @update="update"
    ></update-contrib-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";
import { ref, onValue, remove, set } from "firebase/database";
import UpdateContribDialog from "./UpdateContribDialog.vue";
export default Vue.extend({
  name: "ContribTable",
  components: { UpdateContribDialog },
  props: {
    path: { type: String, required: true },
    db: { type: Object, required: true },
    isLoading: { type: Boolean, required: true },
  },

  data: () => ({
    items: [],
    headers: [
      {
        text: "Prénom",
        align: "start",
        sortable: true,
        value: "prenom",
      },
      { text: "Nom", value: "nom" },
      { text: "Téléphone", value: "phone" },
      { text: "Localité", value: "localite", sortable: true },
      { text: "Cotisation", value: "contrib", sortable: true },
      { text: "Date", value: "contribDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    item: null,
    itemId: null,
    updaterDialog: false,
  }),

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$emit("loadOn");
      onValue(ref(this.db, this.path), (snapshot) => {
        const datas = snapshot.exportVal();
        const tmp = [];
        const keys = Object.keys(datas);
        for (const key in keys) {
          if (Object.hasOwnProperty.call(datas, key)) {
            tmp.push({ ...datas[key], id: key });
          }
        }
        this.items = tmp;
        /* this.items = snapshot.val() ? snapshot.val() : []; */
        this.$emit("loadOff");
      });
    },

    editItem(item) {
      this.item = item;
      this.itemId = item.id;
      this.updaterDialog = true;
    },

    update() {
      this.loadOn();
      this.updaterDialog = false;
      set(ref(this.db, `${this.path}/${this.itemId}`), {
        ...this.item,
        contrib: parseInt(this.item.contrib),
      })
        .then(() => {
          console.log("success");
          this.loadOff();
          this.$swal.fire({
            title: "Succés",
            text: "Modification réussi",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.loadOff();
          this.$swal.fire({ title: "Erreur", text: "", icon: "error" });
        });
    },

    deleteItem(item) {
      this.loadOn();
      remove(ref(this.db, `${this.path}/${item.id}`))
        .then(() => {
          console.log("removed");
          this.loadOff();
          this.$swal.fire({
            title: "Succés",
            text: "Suppression réussi",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.loadOff();
          this.$swal.fire({
            title: "Erreur",
            text: "Erreur interne",
            icon: "error",
          });
        });
    },

    loadOn() {
      this.$emit("loadOn");
    },

    loadOff() {
      this.$emit("loadOff");
    },
  },
});
</script>

<style>
.v-application--is-ltr .v-data-footer__select {
  margin-right: auto;
}
.v-application--is-ltr .v-data-footer__pagination {
  margin: 0 15px 0 24px;
}
</style>
