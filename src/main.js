// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import routes from "./config/routes.js";
import store from "./config/store.js";
import VueRouter from "vue-router";
import vueResource from "vue-resource";
import VueI18n from "vue-i18n";
import iView from "iview";
import "iview/dist/styles/iview.css";

import App from "./App.vue";
import Api from "./config/api";
import $ from "@js/jquery.min.js";
var moment = require("moment");

Vue.use(iView);
Vue.use(VueClipboard);
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(VueI18n);
Vue.prototype.url = "https://test.bigao.io/";
// Vue.prototype.host = "https://api.coin-dy.com";

Vue.prototype.host = "https://api.bigao.io";

Vue.prototype.api = Api;
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  "Content-Type": "application/json;charset=utf-8"
};

const router = new VueRouter({
  mode: "hash",
  routes
});
const i18n = new VueI18n({
  locale: "zh", // 语言标识
  messages: {
    zh: require("./assets/lang/zh.js"),
    en: require("./assets/lang/en.js")
  }
});
Vue.http.interceptors.push((request, next) => {
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  request.headers.set("x-auth-token", localStorage.getItem("TOKEN"));
  next(response => {
    //登录极验证时需获取后台返回的TOKEN值
    var xAuthToken = response.headers.get("x-auth-token");
    if (xAuthToken != null && xAuthToken != "") {
      localStorage.setItem("TOKEN", xAuthToken);
    }
    //
    if (response.body.code == "4000" || response.body.code == "3000") {
      store.commit("setMember", null);
      router.push("/login");
      return false;
    }
    return response;
  });
});

Vue.config.productionTip = false;
Vue.filter("timeFormat", function(tick) {
  return moment(tick).format("HH:mm:ss");
});
Vue.filter("dateFormat", function(tick) {
  return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter("toFixed", function(number, scale) {
  return new Number(number).toFixed(scale);
});
//   接收参数
function getParamString(name) {
  let paramUrl = window.location.href;
  let paramStrs = paramUrl.split("?");
  let params = {};
  for (var index = 0; index < paramStrs.length; index++) {
    params[paramStrs[index].split("=")[0]] = decodeURI(
      paramStrs[index].split("=")[1]
    );
  }
  return params[name];
}

function isMobileUserAgent() {
  var ua = window.navigator.userAgent.toLowerCase();
  var a = /iphone|ipod|android|windows.*phone|blackberry.*mobile/i.test(
    window.navigator.userAgent.toLowerCase()
  );
  var b = ua.match(/MicroMessenger/i) == "micromessenger";
  return a || b;
}
// 路由验证
router.beforeEach((to, from, next) => {
  if (to.path == "/register") {
    if (isMobileUserAgent()) {
      if (getParamString("agent") != undefined) {
        location.href =
          "https://www.coin-dy.com/register/#/signin?agent=" +
          getParamString("agent");
      }
    }
  }
  next();
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  template: "<App/>",
  components: {
    App
  }
});
