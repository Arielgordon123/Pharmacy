<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="3">
        <v-card to="/categories">
          <v-img
            src="/pills.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title> קטגוריות</v-card-title>
          </v-img>
          <v-card-text>
             רשימת קטגוריות
          </v-card-text>
        </v-card>
      </v-col>
     
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {}
};
</script>
