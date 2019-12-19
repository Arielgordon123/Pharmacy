<template>
  <v-card
  @click="addNewItemClick"
    v-if="
      $store.state.user &&
        $store.state.user.role == 'admin' &&
        !dialog &&
        !addDialog
    "
  >
    <v-btn
      color="blue"
      dark
      small
      fixed
      bottom
      left
      fab
      style="margin-bottom: 30px;"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
   addNewItemClick(){
     this.$emit("click")
   }
  }
};
</script>

<style></style>
