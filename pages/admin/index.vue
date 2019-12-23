<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  asyncData({ store, params }) {
    return store.dispatch("getUsers");
  },
  computed: {
    users() {
      return this.$store.state.usersList;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "שם",
          align: "right",
          sortable: false,
          value: "fullName"
        },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "כניסה אחרונה", value: "lastLogin" },
        { text: "נרשם בתאריך", value: "created" }
      ]
      //users: []
    };
  }
};
</script>

<style></style>
