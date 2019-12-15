<template>
  <v-container>
    <v-row v-if="$store.state.items.length > 0">
      <v-col
        sm="4"
        md="3"
        lg="2"
        v-for="item in $store.state.items"
        :key="item.id"
      >
        <!-- <v-btn @click="showItem(item)" class="btn-category" block>
          {{ item.name }}
        </v-btn> -->
        <v-card  @click="showItem(item)">
          <v-img :src="item.imageUrl">
              <v-card-text>
                 {{ item.name }}
              </v-card-text>
          </v-img>
        </v-card>
      </v-col>

      <!-- <item v-model="dialog" :item="current" @edit="editItem" /> -->
      <edititem
        v-if="itemToEdit"
        v-model="addDialog"
        :categoriesList="categories"
        :item="itemToEdit"
        :method="method"
        @input="clearEdit"
      />
    </v-row>
    <v-card
      v-if="
        $store.state.user &&
          $store.state.user.role == 'admin' &&
          !dialog &&
          !addDialog
      "
      @click="addNewItem"
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
      dialog: false,
      categories: [],
      addDialog: false,
      itemToEdit: null,
      method: "new"
    };
  },
  components: { item, edititem },
  asyncData({ params, store }) {
    // console.log("params :", params);
    // api.items.getItemsByCatName(params.name).then(res => {
    //   return { items: res.data };
    // });
    return store.dispatch("getItemsByCatName", params.name);
  },

  methods: {
    showItem(item) {
      this.$store.dispatch('getItemById', item._id)

      // this.$emit('showItem', item._id)
      // api.items.getItemById(item._id).then(res => {
      //   this.current = res.data;
      //   this.dialog = true;
      //   // console.log('res.data :', res.data);
      // });
      // console.log("item :", item);
    },
    editItem(item) {
      this.method = "edit";
      this.categories = this.getCategories;
      this.itemToEdit = item;
      this.addDialog = true;
    },
    clearEdit() {
      // console.log('clear edit');
      this.itemToEdit = null;
      this.addDialog = false;
    },
    // fillCategory() {
    //   console.log(
    //     "this.$store.getters.get_categories.length :",
    //     this.$store.getters.get_categories.length
    //   );
    //   if (this.$store.getters.get_categories.length == 0) {
    //     this.$store.dispatch("getAllCategories");
    //   }
    //   let categories = this.$store.state.categories;

    //   categories = categories.reduce((acc, item) => {
    //     acc.push({ name: item.name, enName: item.enName });
    //     return acc;
    //   }, []);
    // },

    addNewItem() {
      this.categories = this.getCategories;
      this.itemToEdit = {};
      this.addDialog = true;
    }
  },
  computed: {
    getCategories() {
      return this.$store.getters.get_categories;
    }
  },
  created() {
    // this.fillCategory();
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
