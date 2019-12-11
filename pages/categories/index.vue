<template>
  <div>
    <v-container>
      <v-row fluid v-if="$store.state.categories.length > 0">
        <v-col v-for="cat in $store.state.categories" :key="cat.id" cols="12" lg="3">
          <category :cat="cat"></category>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import category from "~/components/category";
import api from "~/api/";
export default {
  components: {
    category
  },
  data() {
    return {
      categories: []
    };
  },
  asyncData({ store, params}) {
    return store.dispatch('getAllCategories')
  },
  // asyncData({ params }) {
  //   return api.cats.getAllCats().then(res => {
  //     return { categories: res.data };
  //   });
  // }
};
</script>

<style></style>
