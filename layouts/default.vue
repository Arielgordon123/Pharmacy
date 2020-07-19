<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      disable-resize-watcher
      fixed
      app
      right
      style="padding-top: 70px;"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menuList"
          :key="i"
          :to="item.to"
          @click="drawer = false"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card color="grey lighten-4" flat >
      <v-app-bar :clipped-left="clipped" fixed app outlined style="border-color: red;">
        <v-app-bar-nav-icon aria-label="Menu" @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="search-box" v-if="search">
          <!-- <v-text-field
            label="Solo"
            v-model="searchText"
            solo
            width="10rm"
            @blur="search = false"
          ></v-text-field> -->
          <search v-model="search"/>
        </div>
        <v-btn icon @click="openSearch" aria-label="Search" v-else>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          v-if="this.$store.state.user"
          aria-label="Logout"
          icon
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-content>
      <v-container>
        <nuxt />
        <client-only>
        <item v-model="$store.state.searchDialog" :item="$store.state.item" @edit="editItem" />
        <edititem
        v-if="itemToEdit && $store.state.user.role == 'admin'"
        v-model="addDialog"
        :categoriesList="getCategories"
        :item="itemToEdit"
        :method="method"
        @input="clearEdit"
      />
        </client-only>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <div style="width: -webkit-fill-available; ">
   <p  class="text-center" style="margin: 0;">Ariel Gordon Neria Cohen Liraz Yaacov &copy; 2019</p>
      </div>
   
    </v-footer>
  </v-app>
</template>

<script>
import search from "~/components/search";
import item from '~/components/item'
import edititem from "~/components/editItem";
export default {
  components: {
    search,
    item,
    edititem
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      search: false,
      dialog: false,
      itemToEdit: null,
      addDialog: false,
      method: "new",
      categories: [],
      searchText: "",
      items: [
        {
          icon: "mdi-apps",
          title: "קטגוריות",
          to: "/categories"
        },
         {
          icon: "mdi-message-processing",
          title: "צור קשר",
          to: "/contactUs"
        },

        // {
        //   icon: "mdi-chart-bubble",
        //   title: "Inspire",
        //   to: "/inspire"
        // }
      ],
      miniVariant: false,
      title: "מקטלוג"
    };
  },
  methods: {
    openSearch() {
      this.search = !this.search;
    },
    logout() {
      this.$store.dispatch("reset").then(() => {
        this.$router.push("/");
      });
    },
    editItem(item) {
      this.method = "edit";
      
      this.itemToEdit = item;
      this.addDialog = true;
    },
    clearEdit() {
      // console.log('clear edit');
      this.itemToEdit = null;
      this.addDialog = false;
    },
     fillCategory() {
      //  console.log('call to fill category:');
      if (this.$store.getters.get_categories.length == 0) {

        this.$store.dispatch("getAllCategories");
      }
      // let categories = this.$store.state.categories;

      // categories = categories.reduce((acc, item) => {
      //   acc.push({ name: item.name, enName: item.enName });
      //   return acc;
      // }, []);
    },
  },
  computed: {
    getCategories() {
      return this.$store.getters.get_categories;
    },
    isLogedIn() {
      return this.$store.state.user;
    },
    role() {
      return this.$store.state.user.role;
    },
    menuList: {
      get() {
        if (this.isLogedIn) {
          this.items = this.items.filter(item => {
            return item.title != "התחברות";
          });
          if (this.role == "admin") {
            this.items.push({
              icon: "mdi-settings-outline",
              title: "ניהול",
              to: "/admin"
            });
          }
        } else {
          this.items.push({
            icon: "mdi-login",
            title: "התחברות",
            to: "/auth/login"
          });
          this.items = this.items.filter(item => {
            return item.title != "ניהול";
          });
        }

        return this.items;
      },
      set(item) {
        this.items.push(item);
      }
    }
  },
  mounted() {
    this.fillCategory()
  }
};
</script>
<style>
.search-box {
  /* margin: 36px 20px 0 0; */
  float: left;
}
</style>
