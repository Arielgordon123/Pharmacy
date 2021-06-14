<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-alert v-if="alert" :type="alert.type">{{alert.message}}</v-alert>
                  <v-text-field
                    label="user"
                    name="user"
                    v-model="email"
                    prepend-icon="person"
                    type="text"
                    required
                    validate-on-blur
                    :rules="rules.email"
                  ></v-text-field>
                  <v-text-field
                    label="name"
                    id="name"
                    name="name"
                    v-model="name"
                    prepend-icon="person"
                    type="text"
                    required
                    :rules="rules.name"
                  ></v-text-field>
                  <v-text-field
                    id="new-password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    required
                    :rules="rules.password"
                  ></v-text-field>

                  <v-text-field
                    id="new-password2"
                    v-model="password2"
                    label="Password Again"
                    name="password2"
                    prepend-icon="lock"
                    type="password"
                    required
                    :rules="rules.password2"
                  ></v-text-field>

                  <v-card-actions>
                    <span>
                      כניסה לרשומים
                      <nuxt-link to="/auth/login">התחברות</nuxt-link>
                    </span>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="primary"
                      :loading="loading"
                      :disabled="!valid &&loading"
                      @click.prevent="register"
                    >הרשמה</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  auth: false,
  props: {
    source: String
  },
  data() {
    return {
      rules: {
        name: [
          val =>
            /^[a-zA-z]{2,}\ [a-zA-z]{2,}$/.test(val) ||
            'please provide full name',
          val => (val || '').length > 0 || 'This field is required'
        ],
        password2: [
          val => val == this.password || 'password should match',
          val => (val || '').length > 0 || 'This field is required'
        ],
        password: [
          val => (val || '').length > 0 || 'This field is required',
          val =>
            (val || '').length >= 6 || 'Password must contain atleast 6 chars'
        ],
        email: [
          val => !!val || 'E-mail is required',
          val => this.isValidEmail(val) || 'Please fill valid email'
        ]
      },
      drawer: null,
      password2: '',
      password: '',
      email: '',
      name: '',
      valid: true,
      alert: null,
      loading: false
    }
  },
  methods: {
    isValidEmail: function(email) {
      return /\S+@\S+\.\S+/.test(email)
    },
    register: function() {
      this.alert = null
      this.loading = true
      this.$store
        .dispatch('register', {
          email: this.email,
          fullName: this.name,
          hashedPassword: this.password
        })
        .then(result => {
          //  console.log('result :', result);
          // this.alert = { type: 'success', message: result.data.message }
          this.loading = false
          this.$router.push('/')
        })
        .catch(error => {
          //console.log("error: ", error);
          this.loading = false
          if (error.response && error.response.data) {
            this.alert = {
              type: 'error',
              message: error.response.data.message || error.reponse.status
            }
          }
        })
      // console.log('register', this.password2)
    }
  }
}
</script>