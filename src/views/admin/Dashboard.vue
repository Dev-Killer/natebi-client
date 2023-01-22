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
                  {{ data_sn.nbre
                  }}<span class="text-h5 text-capitalize">Pers</span>
                </h4>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  outlined
                  elevation="2"
                  dark
                  class="font-weight-regular ms-4 mb-2 text-h6"
                  >{{ data_sn.contrib | toCurrency }}</v-btn
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
                  {{ data_int.nbre
                  }}<span class="text-h5 text-capitalize">Pers</span>
                </h4>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  outlined
                  elevation="2"
                  dark
                  class="font-weight-regular ms-4 mb-2 text-h6"
                  >{{ data_int.contrib | toCurrency }}</v-btn
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
                  {{ data_all.nbre
                  }}<span class="text-h5 text-capitalize">Pers</span>
                </h4>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  rounded
                  outlined
                  elevation="2"
                  dark
                  class="font-weight-regular ms-4 mb-2 text-h6"
                  >{{ data_all.contrib | toCurrency }}</v-btn
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
import { getDatabase, onValue, ref } from "firebase/database";
export default Vue.extend({
  name: 'Dashboard',
  data: () => ({
    db: null,
    data_sn: {
      nbre: 0,
      contrib: 0
    },
    data_int: {
      nbre: 0,
      contrib: 0
    },
    data_all: {
      nbre: 0,
      contrib: 0
    }
  }),

  created() {
    this.$emit('currentPage', 'Tableau de bord')
    this.db = getDatabase();
    this.fetchData()
  },

  methods: {
    fetchData() {
      onValue(ref(this.db, '/'), (snapshot) => {
        const datas = snapshot.exportVal();
        /* ---- SN ------ */
        this.data_sn.nbre = Object.keys(datas.contributors_sn).length;
        for (const key of Object.keys(datas.contributors_sn)) {
          this.data_sn.contrib += datas.contributors_sn[key].contrib
        }

        /* ---- INT ------ */
        this.data_int.nbre = Object.keys(datas.contributors_int).length;
        for (const key of Object.keys(datas.contributors_int)) {
          this.data_int.contrib += datas.contributors_int[key].contrib
        }

        /* ---- ALL ------ */
        this.data_all.nbre = this.data_sn.nbre + this.data_int.nbre
        this.data_all.contrib = this.data_sn.contrib + this.data_int.contrib
      });
    },
  }
})
</script>

<style></style>
