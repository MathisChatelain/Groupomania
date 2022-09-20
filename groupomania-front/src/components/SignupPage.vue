<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/icon-left-font-monochrome-black.svg')"
          color="anchor"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to our Intranet
        </h1>

        <p class="subheading font-weight-regular">
          For help, collaboration and fun with your associates,
        </p>
      </v-col>

      <v-col
        cols="12"
      >
        <v-row justify="center">
          <h2 class="headline font-weight-bold mb-3">
            Sign up ?
          </h2>
        </v-row>

        <v-row justify="center" class="pb-0 mb-0">
          <v-col cols="4" class="pb-0 mb-0">
            <v-text-field
            v-model="email"
            label="Email"
            outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="password"
              label="Password"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="passwordConfirmation"
              label="Confirm password"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn
              block
              color="secondary"
              class="red--text"
              elevation="10"
              x-large
            >
            Signup
            </v-btn>
          </v-col>  
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'SignupPage',

    data: () => ({
      password: "",
      passwordConfirmation: "",
      email: "",
    }),
  }
</script>
