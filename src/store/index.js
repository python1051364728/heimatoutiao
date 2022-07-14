import Vue from "vue";
import Vuex from "vuex";
import { getLocal, setLocal } from "@/utils/storage";

Vue.use(Vuex);
const tokenKey = "toutiao_token";

export default new Vuex.Store({
  // 用于存储全局状态数据
  state: {
    user: getLocal(tokenKey),
    count: 0,
    userInfo: {
      name: "张三",
    },
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      setLocal(tokenKey, user);
      // localStorage.setItem(tokenKey, JSON.stringify(state.user));
    },
    // changeCount(state) {
    //   state.count++;
    // },
    // changeName(state) {
    //   state.userInfo.name = "李四";
    // },
    // changeCount2(state, num) {
    //   state.count += num;
    // },
  },
  actions: {},
  modules: {},
});
