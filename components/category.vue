<template>
  <v-card :to="'/items/'+cat.enName" outlined style="border-color: red;">
    <v-card-title>
      {{ cat.name }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    cat: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
