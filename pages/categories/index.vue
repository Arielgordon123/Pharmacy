<template>
  <div>
    <v-container>
   
      <v-row fluid v-if="categories.length >0">
        <v-col v-for="cat in categories" :key="cat.id" cols="12" lg="3">
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
  asyncData({ params }) {
    return api.cats.getAllCats().then(res => {
      
      return { categories: res.data };
    });
   
  }
};
</script>

<style></style>
