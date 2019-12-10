<template>
  <v-container>
    <v-row>
      <v-btn v-for="item in items" :key="item.id" @click="showItem(item)" class="btn-category">
        {{ item.name }}
      </v-btn>
      
      <item v-model="dialog" v-if="!!current.serial" :item="current" />
    </v-row>
  </v-container>
</template>

<script>
import api from "~/api/index";
import item from "~/components/item";
export default {
  props: {},
  data() {
    return {
      current: {},
      dialog: false
    };
  },
  components: { item },
  asyncData({ params }) {
    console.log("params :", params);
    return api.items.getItemsByCatName(params.name).then(res => {
      return { items: res.data };
    });
  },
  methods: {
    showItem(item) {
      this.dialog = true;
      this.current = item;
    }
  }
};
</script>
<style scoped>
.list {
  float: right;
  background-color: aqua;
  width: 200px;
}
.item {
  float: left;
  background-color: darkgoldenrod;
  width: 100%;
}
.btn-category {
  margin: 4px;
}
</style>
