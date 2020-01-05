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