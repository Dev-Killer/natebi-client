<template>
  <v-container fluid>
    <v-row justify="center" class="align-items-end" style="height: 100vh">
      <v-col cols="auto">
        <div class="text-center">
          <v-img
            :src="require('@/assets/imgs/reading_list_pana.png')"
            max-width="600px"
            class="text-center"
          ></v-img>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="font-weight-bold"
        style="font-family: 'Caveat', cursive !important"
      >
        <p class="text-center text-h3 text-md-h3 font-weight-bold title-font">
          Bienvenu sur Nate Bi.
        </p>
        <p class="text-center text-h6 text-md-h5 title-font">
          Plateforme de transparence et gestion de cotisation pour
          l'amélioration de la vie social et communautaire
          <!-- Plateforme de transparence et gestion de cotisation pour
                    l'amélioration de la vie social et communautaire -->
        </p>
      </v-col>
      <v-col cols="12">
        <p class="text-center my-auto">
          <v-btn
            rounded
            large
            color="#FF725E"
            style="color: whitesmoke"
            to="/login"
            >Se connecter</v-btn
          >
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
  }),
});
</script>
<style>
p.text-center.title-font {
  font-family: "Caveat", cursive !important;
}
</style>
