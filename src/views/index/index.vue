<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 头部左侧盒子 -->
      <div class="header-left">
         <i class=" icon el-icon-s-fold"></i>
         <img class="logo" src="../../assets/img/111.png" alt="">
         <span class="title">黑马面面</span>
      </div>
      <!-- 头部右侧盒子 -->
      <div class="header-right">
         <img class="avatar" :src="userInfo.avatar" alt="">
         <span class="userName">{{userInfo.username}}</span>
         <el-button size="small" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入/info
import {info} from "../../api/login"
export default {
    data() {
       return {
          userInfo:""
       }
    },
    created() {
       info({

       }).then(res=>{
          
          this.userInfo=res.data.data
          this.userInfo.avatar= process.env.VUE_APP_BASEURL +'/'+ this.userInfo.avatar;
          window.console.log(this.userInfo);
       })
    },
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    display: flex;
    justify-content: space-between;
   //  左边盒子
    .header-left {
      display: flex;
      align-items: center;
      .icon{
         font-size: 24px;
         margin-right: 22px;
      };
      .logo{
         margin-right: 11px;
      };
      .title{
         color:#49A1FF;
         font-size: 22px;
         font-family:Microsoft YaHei;
      };
    };
   //  右边盒子
    .header-right {
      display: flex;
      align-items: center;
      .avatar{
         width:43px;
        height:43px;
        border-radius: 50%;
        margin-right: 9px;
      };
      .userName{
         font-size: 14px;
         color: #636363;
         margin-right: 38px;
      }
    }
  }
  .my-aside {
    background-color: blue;
  }
  .my-main {
    background-color: blueviolet;
  }
}
</style>

