<template>
 <no-ssr>
    <item v-model="dialog" :item="$store.state.item" />
 </no-ssr>
</template>

<script>
import item from "~/components/item";
import api from "~/api/index";

export default {
  components: {
    item,
  },
  data() {
    return {
      current: {},
      dialog: false
    };
  },
  mounted() {
    this.dialog = true
  },
  asyncData({ store, params }) {
    // return api.items.getItemById(params.id).then(res => {
    //   this.current = res.data;
    //   this.dialog = true;
    // });

    return store.dispatch("getItemById", params.id);
  }
};
</script>

<style></style>
