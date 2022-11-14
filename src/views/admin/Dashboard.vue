<template>
  <v-container class="my-auto">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card color="#FF8373">
          <v-card-title primary-title class="pb-0">
            <h3>Cotisation Sénégal</h3>
          </v-card-title>
          <v-row justify="space-between">
            <v-col cols="auto" class="pb-0">
              <v-card-text>
                <h4 class="ms-4 ms-md-8 text-h3 text-capitalize">
                  16<span class="text-h5 text-capitalize">Pers</span>
                </h4>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  outlined
                  elevation="2"
                  dark
                  class="font-weight-bold ms-4 mb-2"
                  >18000 F CFA</v-btn
                >
              </v-card-actions>
            </v-col>
            <v-col cols="auto" class="py-0">
              <v-avatar size="150" tile>
                <img src="/img/money_pana2.png" alt="alt" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="my-10 my-md-auto">
        <v-card color="#6F5CFF">
          <v-card-title primary-title class="pb-0">
            <h3>Cotisation Internationale</h3>
          </v-card-title>
          <v-row justify="space-between">
            <v-col cols="auto" class="pb-0">
              <v-card-text>
                <h4 class="ms-4 ms-md-8 text-h3 text-capitalize">
                  16<span class="text-h5 text-capitalize">Pers</span>
                </h4>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  outlined
                  elevation="2"
                  dark
                  class="font-weight-bold ms-4 mb-2"
                  >180 Euro</v-btn
                >
              </v-card-actions>
            </v-col>
            <v-col cols="auto" class="py-0">
              <v-avatar size="150" tile>
                <img src="/img/money_pana.png" alt="alt" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="#fbc164">
          <v-card-title primary-title class="pb-0">
            <h3>Cotisations Totaux</h3>
          </v-card-title>
          <v-row justify="space-between">
            <v-col cols="auto" class="pb-0">
              <v-card-text>
                <h4 class="ms-4 ms-md-8 text-h3 text-capitalize">
                  32<span class="text-h5 text-capitalize">Pers</span>
                </h4>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  outlined
                  elevation="2"
                  dark
                  class="font-weight-bold ms-4 mb-2"
                  >299503 F CFA</v-btn
                >
              </v-card-actions>
            </v-col>
            <v-col cols="auto" class="py-0">
              <v-avatar size="150" tile>
                <img src="/img/manage_money_rafiki2.png" alt="alt" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
import Vue from 'vue';
export default Vue.extend({
  name: 'Dashboard',

  created() {
    this.$emit('currentPage', 'Tableau de bord')
  }
})
</script>

<style></style>
