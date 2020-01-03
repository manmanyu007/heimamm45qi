import Vue from 'vue'
import App from './App.vue'
// 导入router
import router from "./router/index"
// 导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入初始化样式
import "./style/base.css"
// 开发环境测试基地址
window.console.log(process.env.VUE_APP_BASEURL)
// 注入饿了么ui
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
