<template>
  <v-app dark>
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

    <v-card color="grey lighten-4" flat>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon aria-label="Menu" @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="search-box" v-if="search">
          <v-text-field
            label="Solo"
            v-model="searchText"
            solo
            width="10rm"
            @blur="search = false"
          ></v-text-field>
        </div>
        <v-btn icon @click="openSearch" aria-label="Search" v-else>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn v-if="this.$store.state.user" aria-label="Logout" icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      search: false,
      searchText: "",
      items: [
        {
          icon: "mdi-apps",
          title: "קטגוריות",
          to: "/categories"
        }
        // {
        //   icon: "mdi-chart-bubble",
        //   title: "Inspire",
        //   to: "/inspire"
        // }
      ],
      miniVariant: false,
      title: "שם"
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
    }
  },
  computed: {
    isLogedIn() {
      return this.$store.state.user;
    },
    role() {
      return this.$store.state.user.role
    },
    menuList: {
      get() {
        
        if (this.isLogedIn) {
          this.items = this.items.filter(item => {
            return item.title != "התחברות";
          });
          if(this.role == "admin"){
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
            return item.title != "ניהול" 
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
  }
};
</script>
<style>
.search-box {
  margin: 36px 20px 0 0;
  float: left;
}
</style>
