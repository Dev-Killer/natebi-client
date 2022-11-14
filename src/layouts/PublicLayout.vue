<template>
  <v-app style="height: 100%">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="js">
import Vue from 'vue';
import HelloWorld from '../views/public/HelloWorld';
import ThemeSwitcherVue from '../components/shared/ThemeSwitcher.vue';

export default Vue.extend({
    name: 'PublicLayout',

    components: {
        HelloWorld,
        ThemeSwitcherVue
    },

    created() {
        this.$vuetify.theme.dark = false
    }
});
</script>
