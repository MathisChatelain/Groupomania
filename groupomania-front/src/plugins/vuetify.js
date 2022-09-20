import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: "#FD2D01",
            secondary: "#FFD7D7",
            anchor: "#4E5166",
          },
        },
    },
});
