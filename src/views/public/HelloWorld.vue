<template>
  <v-container fluid style="height: 100vh">
    <v-row justify="center" class="h-100">
      <v-col cols="12">
        <div>
          <v-img src="img/reading_list_pana.png"></v-img>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="font-weight-bold"
        style="font-family: 'Caveat', cursive !important"
      >
        <p class="text-center text-h2 text-md-h1 font-weight-bold title-font">
          Bienvenu sur Nate Bi.
        </p>
        <p class="text-center text-h4 text-md-h3 title-font">
          Plateforme de transparence et gestion de cotisation pour
          l'amélioration de la vie social et communautaire
          <!-- Plateforme de transparence et gestion de cotisation pour
                    l'amélioration de la vie social et communautaire -->
        </p>
      </v-col>
      <v-col cols="12">
        <p class="text-center">
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
