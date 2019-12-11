<template>
  <v-container>
    <v-row>
      <v-col sm="4" md="3" lg="2" v-for="item in items" :key="item.id">
        <v-btn @click="showItem(item)" class="btn-category" block>
          {{ item.name }}
        </v-btn>
      </v-col>

      <edititem v-model="dialog" :item="current" />
    </v-row>
  </v-container>
</template>

<script>
import api from "~/api/index";
import item from "~/components/item";
import edititem from "~/components/editItem";

export default {
  props: {},
  data() {
    return {
      current: {},
      dialog: false
    };
  },
  components: { item,edititem },
  asyncData({ params }) {
    console.log("params :", params);
    return api.items.getItemsByCatName(params.name).then(res => {
      return { items: res.data };
    });
  },
  methods: {
    showItem(item) {
      api.items.getItemById(item._id).then(res => {
        this.current = res.data;
        this.dialog = true;
        console.log('res.data :', res.data);
      });
      console.log("item :", item);
      
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
