// 导入axios
import axios from "axios"
// 登录验证api
export function login(data) {
   return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        // 是否携带cookies
        withCredentials: true,
        data
      })
}
//获取用户短信验证码api
export function sendsms(data) {
   return axios({
        url: process.env.VUE_APP_BASEURL + "/sendsms",
        method: "post",
        // 是否携带cookies
        withCredentials: true,
        data
      })
}
//定义一个注册的方法
export function register(data) {
   return axios({
        url: process.env.VUE_APP_BASEURL + "/register",
        method: "post",
        // 是否携带cookies
        withCredentials: true,
        data
      })
}
//定义一个注册的方法
export function info() {
   return axios({
        url: process.env.VUE_APP_BASEURL + "/info",
        method: "get",
        // 是否携带cookies
        withCredentials: true,
        headers:{
        //  从缓存中获取
        token:window.localStorage.getItem("infotoken")
       }
      })
}