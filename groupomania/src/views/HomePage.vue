<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/icon-left-font-monochrome-white.png"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn
        text
        @click="disconnect"
      >
        <span class="mr-2">Disconnect</span>
        <v-icon>mdi-restart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'HomePage',

  components: {
  },

  data: () => ({
    //
  }),

  methods: {
    disconnect() {
      this.$router.push("/")
    }
  }
};
</script>
