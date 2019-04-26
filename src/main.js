/* eslint-disable */
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueResource from "vue-resource";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.prototype.HOST = "/admin";
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
