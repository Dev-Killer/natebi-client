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
    </v-data-table>
  </v-card>
</template>

<script>
import Vue from "vue";
import { ref, onValue } from "firebase/database";
export default Vue.extend({
  name: "ContribTable",
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
    ],
  }),

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$emit("loadOn");
      onValue(ref(this.db, this.path), (snapshot) => {
        this.items = snapshot.val() ? snapshot.val() : [];
        this.$emit("loadOff");
      });
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
