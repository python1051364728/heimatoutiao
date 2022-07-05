import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vant from "vant";
import "amfe-flexible";
import "./styles/index.less";
import "vant/lib/index.less";
import TouTiaoIcon from "@/components/TouTiaoIcon";

import request from "@/utils/request";

request.get("/v1_0/channels").then((res) => {
  console.log(res);
});
// Vue.use("TouTiaoIcon", TouTiaoIcon);
Vue.use(vant);
Vue.component("TouTiaoIcon", TouTiaoIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
