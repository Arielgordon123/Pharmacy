<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="searchItems"
      :loading="isLoading"
      :search-input.sync="search"
      clearable
      open-on-clear
      hide-details
      hide-selected
      no-filter
      hide-no-data
      item-text="name"
      item-value="_id"
      label="Search"
      solo
      ref="searchBox"
      @keyup.enter="enter"
      @blur="show = false"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for your favorite
            <strong>Cryptocurrency</strong>
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attr, on, item, selected }">
        <span v-text="item.name"></span>
      </template>
      <template v-slot:item="{ item }">
        <!-- <v-list-item-avatar
        color="indigo"
        class="headline font-weight-light white--text"
      >
        {{ item.name.charAt(0) }}
      </v-list-item-avatar> -->
        <v-list-item-content @click="searchItemClick(item._id)">
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import api from "~/api/index";
export default {
  props: ["value"],
  data: () => ({
    isLoading: false,
    searchItems: [],
    model: null,
    search: null,
    tab: null
  }),
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.searchItems = [];
      }
    }
  },
  methods: {
    searchItemClick(id) {
      this.$store.dispatch('getItemById', id)
      // this.$emit('showItem', id)
      // this.$router.push("/item/" + id);
      //   api.items.getItemById(id).then(res => {
      //     this.currentItem = res.data;
      //     this.itemDialog = true;
      //   });
    },
    enter() {
      if (this.model) {
        // this.$router.push("/item/" + this.model);
        // this.$emit('showItem', this.model)
      }
    }
  },

  watch: {
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search(val) {
      // Items have already been loaded
      //   if (this.items.length > 0) return;
      if (!val || val == "") return;
      this.isLoading = true;

      // Lazily load input items
      api
        .search(val)
        .then(res => {
          res.data.filter(item => console.log(item.name, item._id));
          this.searchItems = res.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.$refs.searchBox.focus();
  }
};
</script>

<style scoped></style>
