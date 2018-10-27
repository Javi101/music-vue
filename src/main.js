import Vue from "vue";
import Axios from "axios";
import qs from "qs";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/less/style.less";
import Mint from "mint-ui";
import "mint-ui/lib/style.min.css";
import Aplayer from 'vue-aplayer'



Vue.use(Mint);
Vue.config.productionTip = false;
// 加载音乐控件
Vue.component("aplayer", Aplayer);
// 全局注册Input自动聚焦方法
Vue.directive("focus", {
    inserted: function (el) {
        el.focus();
    }
});
Axios.defaults.baseURL = process.env.API_ROOT
console.log(process.env.API_ROOT)


Vue.prototype.$axios = Axios.create({
    responseType: "json",
    transformRequest(data) {
        qs.stringify(data);
        return data;
    },
    transformResponse(data) {
        console.log(data)
        let d = {};
        if (data.plist) {
            d.plist = data.plist;
            d.origin = "singer";
        } else if (data.banner) {
            d.banner = data.banner;
            d.origin = "new-song";
        } else if (data.data && data.data.info) {
            d.info = data.data.info;
            d.origin = "search-song";
        } else if (data.list && data.info) {
            d.list = data.list;
            d.info = data.info;
            d.origin = "soundlist";
        } else if (data.url) {
            d.url = data.url;
            d.timeLength = data.timeLength;
            d.hash = data.hash;
            d.filename = data.fileName;
            d.origin = "img";
        }
        return d;
    }
});
Vue.prototype.$axiosStr = Axios.create({
    responseType: "text"
})

//接口统一处理方法 扩展
Vue.prototype.http = function (method, url, data) {
    let TIME_OUT_MS = 60 * 1000;
    let _this = this;
    if (!data || data == "" || data == null) data = "";
    return _this
        .$axios({
            method: method,
            url: url,
            data: data,
            timeout: TIME_OUT_MS
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
};

Vue.prototype.httpStr = function (method, url, data) {
    let TIME_OUT_MS = 60 * 1000;
    let _this = this;
    if (!data || data == "" || data == null) data = "";
    return _this
        .$axiosStr({
            method: method,
            url: url,
            data: data,
            timeout: TIME_OUT_MS
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");