// 导入axios
import axios from "axios"
export function login(data) {
   return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        // 是否携带cookies
        withCredentials: true,
        data
      })
}