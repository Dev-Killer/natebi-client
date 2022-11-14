<template>
  <div class="d-flex justify-center">
    <v-icon>mdi-weather-sunny</v-icon>
    <v-switch v-model="$vuetify.theme.dark" class="mt-5 mx-1"></v-switch>
    <v-icon>mdi-weather-night</v-icon>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "ThemeSwitcher",
});
</script>
