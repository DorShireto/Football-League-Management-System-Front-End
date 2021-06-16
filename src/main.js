


import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});


import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
  BootstrapVue,
  IconsPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
  BootstrapVue,
  IconsPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  server_domain: "http://localhost:",
  server_port: 3000,
  matchHeaders_WO_mec: [
    { key: "id" },
    { key: "leagueName" },
    { key: "seasonName" },
    { key: "stageName" },
    { key: "homeTeam", sortable: true },
    { key: "awayTeam", sortable: true },
    { key: "homeScore" },
    { key: "awayScore" },
    { key: "refereeName" },
    { key: "lineReferee1" },
    { key: "lineReferee2" },
    { key: "date", sortable: true },
    { key: "time" },
    { key: "stadium" },
  ],
  matchHeaders_With_mec: [
    { key: "id" },
    { key: "leagueName" },
    { key: "seasonName" },
    { key: "stageName" },
    { key: "homeTeam", sortable: true },
    { key: "awayTeam", sortable: true },
    { key: "homeScore" },
    { key: "awayScore" },
    { key: "refereeName" },
    { key: "lineReferee1" },
    { key: "lineReferee2" },
    { key: "date", sortable: true },
    { key: "time" },
    { key: "stadium" },
    { key: "matchEventCalendar" }
  ],
  future_match_headers: [
    { key: "id" },
    { key: "leagueName" },
    { key: "seasonName" },
    { key: "stageName" },
    { key: "homeTeam", sortable: true },
    { key: "awayTeam", sortable: true },
    { key: "refereeName" },
    { key: "lineReferee1" },
    { key: "lineReferee2" },
    { key: "date", sortable: true },
    { key: "time" },
    { key: "stadium" },

  ],

  role: localStorage.role,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
    router.push({ name: 'main' })
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
    router.push({ name: 'main' })
  },
  set_role(role_name) {
    this.role = role_name;
    console.log("finished and logged as " + this.role);
  }
};
// console.log(shared_data);
// Vue.prototype.$root.store = shared_data;


new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
