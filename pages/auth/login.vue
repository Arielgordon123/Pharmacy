<template>
  <v-app id="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" lg="3">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="onSubmit">
                  <v-alert v-if="alert" :type="alert.type">{{
                    alert.message
                  }}</v-alert>
                  <v-text-field
                    label="Login"
                    v-model="email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    
                    
                    <v-card-text>
                      <span>
                        עדיין אין לך חשבון? 
                        <nuxt-link to="/auth/register">הרשם עכשיו</nuxt-link>
                      </span>
                    </v-card-text>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="primary"
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                      >כניסה</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mdiAccount } from '@mdi/js';
export default {
  auth: false,
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      email: "",
      password: "",
      alert: null,
      loading: false
    };
  },

  mounted() {
    if (this.$route.query.redirect && this.$store.state.user)
      this.$router.push(this.$route.query.redirect || "/");
  },
  methods: {
    onSubmit() {
      this.alert = null;
      this.loading = true;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          //  console.log('result :', result);
          // this.alert = { type: 'success', message: result.data.message }
          this.loading = false;
          this.$store.dispatch("fetch").then(() => {
            // console.log('after fetch :', this.$route.query.redirect)
            this.$router.push(this.$route.query.redirect || "/admin");
          });
        })
        .catch(error => {
          //console.log("error: ", error);
          this.loading = false;
          if (error.response && error.response.data) {
            this.alert = {
              type: "error",
              message: error.response.data.message || error.reponse.status
            };
          }
        });
      // this.$store
      //   .dispatch('auth/login', {
      //     email: this.email,
      //     password: this.password
      //   })
      //   .then(result => {
      //     this.alert = { type: 'success', message: result.data.message }
      //     this.loading = false
      //     console.log('(this.$store.state.auth || {}).user :', (this.$store.state.auth || {}).user);
      //     // this.$router.push('/admin')
      //   })
    }
  }
};
</script>
<style scoped></style>
