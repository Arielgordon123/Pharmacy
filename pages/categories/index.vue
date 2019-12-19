<template>
  <div>
    <v-container>
      <v-row fluid v-if="$store.state.categories.length > 0">
        <v-col
          v-for="cat in $store.state.categories"
          :key="cat.id"
          cols="12"
          lg="3"
        >
          <category :cat="cat"></category>
        </v-col>
      </v-row>
    </v-container>
    <addBtn @click="addNewCat" :dialog="dialog" />
    <addCatDialog
      v-model="addDialog"
      :item="itemToEdit"
      :method="method"
      @input="clearEdit"
    ></addCatDialog>
  </div>
</template>

<script>
import category from "~/components/category";
import api from "~/api/";
import addBtn from "~/components/addBtn";
import addCatDialog from "~/components/addCatDialog";
export default {
  components: {
    category,
    addBtn,
    addCatDialog
  },
  methods: {
    addNewCat() {
      this.itemToEdit = {};
      this.addDialog = true;
    },
    clearEdit() {
      // console.log('clear edit');
      this.itemToEdit = null;
      this.addDialog = false;
    }
  },
  data() {
    return {
      categories: [],
      dialog: false,
      addDialog: false,
      itemToEdit: null,
      method: "new"
    };
  },
  asyncData({ store, params, addBtn }) {
    return store.dispatch("getAllCategories");
  }
  // asyncData({ params }) {
  //   return api.cats.getAllCats().then(res => {
  //     return { categories: res.data };
  //   });
  // }
};
</script>

<style></style>
