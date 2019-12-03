import Vue from "vue";
import Vuetify from "vuetify/lib";

import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: "fa"
  }
});

export default vuetify;
