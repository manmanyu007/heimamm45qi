<template>
  <div class="login-container">
    <!-- 左侧的盒子 -->
    <div class="left">
      <!-- 左侧里面功能盒子 -->
      <div class="title-box">
        <img src="../../assets/img/矢量智能对象 拷贝 9.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 左侧盒子中的表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="43px"
        class="demo-ruleForm login-form"
      >
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            class="high-input"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="ruleForm.phone"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <!--验证码  -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="6" class="code-col">
              <img @click="changeCode" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/img/login_banner_ele.png" alt />
    <!-- 注册对话框 -->
    <el-dialog title :visible.sync="dialogFormVisible" class="register-dialog">
      <div class="logon_title">注册</div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="86px"
        class="demo-ruleForm logon_form"
      >
        <el-form-item label="头像" prop="pic_file" class="pic_file">
          <!-- 用户头像 -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="图形码" prop="Graphics_code">
              <el-input v-model="ruleForm.Graphics_code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <img src="../../assets/img/code.jpg" alt />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="验证码" prop="Verification_code">
              <el-input v-model="ruleForm.Verification_codee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <button class="logon_btn">获取用户验证码</button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer my_footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//  导入axios
// import axios from "axios";
// 导入login api
import {login} from "../../api/login"
// 邮箱验证
var emailCheck = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else {
    // 定义正则
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("输入的邮箱格式不对哦!!1"));
    }
  }
};
// 验证手机号方法
var validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("手机号为空"));
  } else {
    // 正则
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 判断
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("手机号输入不正确"));
    }
  }
};
export default {
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      dialogFormVisible: false,
      imageUrl: "",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: false,
        // 对话框
        name: "",
        email: "",
        Graphics_code: "",
        Verification_code: ""
      },
      rules: {
        phone: [{ required: true, validator: validatePass, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在必须在4位数", trigger: "blur" }
        ],
        pic_file: [{ required: true }],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        email: [{ required: true, validator: emailCheck, trigger: "blur" }],
        Graphics_code: [
          { min: 4, max: 4, message: "长度在必须为四位数", trigger: "change" }
        ],
        Verification_code: [{ message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.ruleForm.checked == false) {
        this.$message.warning("请勾选用户协议");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$message.success("验证成功");
          // axios发送请求
         login({
             phone: this.ruleForm.phone,
          password: this.ruleForm.password,
          code: this.ruleForm.code
         }).then(res => {
            //成功回调
            // 判断是否响应成功
            // 失败
            if (res.data.code == 202) {
              this.$message.error(res.data.message);
            }
            // 成功
            else if (res.data.code == 200) {
              this.$message.success("验证成功");
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    changeCode() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    // 文件上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  align-items: center;
  /* 线型渐变 */
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  justify-content: space-around;
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    .title-box {
      display: flex;
      align-items: center;
      margin-left: 48px;
      img {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #dfdfdf;
        margin-right: 12px;
        height: 28px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
      }
    }
    // 整个表单
    .login-form {
      padding-right: 41px;
      margin-top: 27px;
      // 验证码
      .code-col {
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      // 文本框高度
      .high-input > input {
        height: 45px;
        line-height: 45px;
      }
      .reset-btn {
        margin-top: 28px;
      }
      // 按钮撑满整行
      .login-btn {
        width: 100%;
        margin-left: 0;
      }
    }
  }
  // 注册框格式
  .register-dialog{
  .el-dialog {
      width: 600px;
    };
    .el-dialog__body {
    padding: 0;
  };
   .el-dialog__body .logon_form {
    padding-right: 27px;
  }
  .el-dialog__body .logon_title {
    height: 53px;
    background-color: #409eff;
    text-align: center;
    line-height: 53px;
    margin-bottom: 27px;
    color: #ffffff;
  }
  .el-dialog__header {
    display: none;
  }
  .my_footer {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload {
    border: 1px dashed #d9d9d9;
  }
  .pic_file {
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .logon_btn {
    width: 139px;
    height: 39px;
    background-color: #ffffff;
    border: 1px solid rgba(211, 215, 223, 1);
    border-radius: 4px;
  }
  }

 
}
</style>