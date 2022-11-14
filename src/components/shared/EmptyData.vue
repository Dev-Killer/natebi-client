<template>
  <div class="d-flex flex-column justify-space-between align-center py-5">
    <!-- <v-img max-height="400" max-width="350" src="/img/nodata-found-02.png" /> -->
    <div class="font-weight-bold text--secondary text-h4">
      {{ "Aucune donnée" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyData",
  props: {
    text: {
      type: String,
      default: "Pase de données",
    },
  },
};
</script>
