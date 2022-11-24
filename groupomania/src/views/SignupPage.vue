<template>
  <v-app>
    <v-container fill-height fluid class="ma-0 pa-0">
      <v-row class="no-gutters secondary fill-height" align="center">
        <v-col cols="6" class="signup_background fill-height d-flex">
          <v-row align="center" class="blur_background">
            <v-col cols="12">
              <v-img
                :src="require('../assets/icon-left-font-monochrome-white.svg')"
                fluid
                class="ma-8"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row class="text-center">
            <v-col class="mb-4">
              <h1 class="display-2 font-weight-bold mb-3">
                Welcome to our Intranet
              </h1>

              <p class="subheading font-weight-regular">
                For help, collaboration and fun with your associates,
              </p>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="6">
              <v-text-field
              v-model="email"
              label="Email"
              outlined
              :append-icon="'mdi-account'"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="showPasswordConfirmation" justify="center">
            <v-col cols="3">
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showPassword = !showPassword)"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="passwordConfirmation"
                label="Confirm password"
                outlined
                :type="showConfirmationPassword ? 'text' : 'password'"
                :append-icon="showConfirmationPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showConfirmationPassword = !showConfirmationPassword)"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-else justify="center">
            <v-col cols="6">
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showPassword = !showPassword)"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="10" v-if="passwordConfirmationError">
              <p v-if="passwordConfirmationError" class="text-red text-center">
                <v-icon>mdi-alert</v-icon>
                Please select a non-empty password equal to password confirmation
              </p>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="3">
              <v-btn
                block
                color="primary"
                class="anchor--text"
                elevation="10"
                x-large
                @click="login"
              >
                Login
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                block
                color="primary"
                class="anchor--text"
                elevation="10"
                x-large
                @click="signup"
              >
                Signup
              </v-btn>
            </v-col>  
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'SignupPage',

    data: () => ({
      password: "",
      passwordConfirmation: "",
      showPasswordConfirmation: false,
      passwordConfirmationError: false,
      email: "",
      backgroundURL: "https://www.viedesmetiers.com/wp-content/uploads/2019/10/m%C3%A9tier-de-la-grande-distribution.jpg",
      showPassword: false,
      showConfirmationPassword: false,
    }),

    methods: {
      async login(){
        try {
          const {data} = await axios.post('auth/login/', {
              email: this.email, 
              password: this.password
            })
          axios.defaults.headers['Authorization'] = data.token;
          axios.defaults.headers['userId'] = data.userId;
          this.$router.push("/home")
          } catch (e) {
            console.log("error")
            console.log(e)
          }
      },
      async signup(){
        if( this.showPasswordConfirmation ) {
          if ( this.password == this.passwordConfirmation && this.password != "") {
          try {
            await axios.post('auth/signup/', {
                email: this.email,
                password: this.password
              })
          } catch (e) {
            console.log("error")
            console.log(e)
          }
          this.login()
          }
          else {
            this.passwordConfirmationError = true;
          }
        }
      else {
        this.showPasswordConfirmation = true;
      }
      }
    },
  }
</script>

<style scoped>
  .signup_background {
    background-color: "#FD2D01";
    background: url('../assets/signup_page_background.jpg');
  }
  .blur_background {
    backdrop-filter: blur(6px);
    margin: 0px;
  }
</style>
