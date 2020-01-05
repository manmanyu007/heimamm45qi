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
      <!-- 登录盒子中的表单 -->
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
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/img/login_banner_ele.png" alt />
    <!-- 注册对话框 -->
    <el-dialog
      center
      width="600px"
      title="注册"
      :visible.sync="dialogFormVisible"
      class="register-dialog"
    >
      <el-form :model="form" ref="form" :rules="resRules">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <el-upload
            name="image"
            class="avatar-uploader"
            :action="uploadURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input show-password v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="图形码" :label-width="formLabelWidth">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="code-col">
            <img :src="regCodeUrl" @click="changeRegCodeUrl" alt />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
              <el-input v-model="form.rcode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="code-col">
            <el-button @click="getMessge" :disabled="delayTime!=0">{{btnMessage}}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegister">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//  导入axios
// import axios from "axios";
// 导入login api
import { login, sendsms, register } from "../../api/login";
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
// 验证邮箱方法
var checkEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("邮箱为空"));
  } else {
    // 正则
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 判断
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确"));
    }
  }
};
export default {
  data() {
    return {
      // 注册验证码
      regCodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      // 登录验证码
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      // 注册框
      dialogFormVisible: false,

      formLabelWidth: "86px",
      form: {
        username: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: "",
        avatar: ""
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
        ]
      },
      // 注册框验证规则
      resRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
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
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }]
      },
      // 定义倒计时时间
      delayTime: 0,
      // 定义用户验证码
      btnMessage: "获取用户验证码",

      imageUrl: "",
      // 定义文件图片地址
      uploadURL: process.env.VUE_APP_BASEURL + "/uploads"
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
              this.$message.success("登录成功");
              window.localStorage.setItem("infotoken",res.data.data.token);
              // 跳转页面
              this.$router.push("/index")
            }
          });
        } else {
          this.$message.error("用户名或者密码不匹配");
          return false;
        }
      });
    },
    // 登录验证码点击事件
    changeCode() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    // 注册验证码点击事件
    changeRegCodeUrl() {
      this.regCodeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&" + Date.now();
    },
    // 短信验证码点击事件
    getMessge() {
      // 手机号验证
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.form.phone) == false) {
        return this.$message.error("输入的手机号不正确");
      }
      // 图形码验证
      if (this.form.code.length !== 4) {
        return this.$message.error("验证码输入不对哦");
      }
      //  通过开始倒计时
      if (this.delayTime == 0) {
        //  修改delayTime的值
        this.delayTime = 60;
        // 创建定时器
        const interId = setInterval(() => {
          // 时间递减
          this.delayTime--;
          // 修改用户验证码的值为倒计时时间
          this.btnMessage = `还剩${this.delayTime}秒哦`;
          // 时间递减完 清除定时器
          if (this.delayTime == 0) {
            clearInterval(interId);
            //  还原用户验证码的值
            this.btnMessage = "获取用户验证码";
          }
        }, 1000);
      } else {
        return;
      }

      sendsms({
        code: this.form.code,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("您的短信验证码为" + res.data.data.captcha);
        }
      });
    },

    // 文件上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 注意:
      // 1. action需要动态设置
      // 2. name需要设置为接口需要的值name='image'
      // 3. 上传成功之后的回调函数中
      //    1. res可以获取 服务器响应的数据
      this.form.avatar = res.data.file_path;
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
    },
    // 注册提交
    submitRegister() {
      // 表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          // 调用接口
          register({
            username: this.form.username,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              //  关闭对话框
              this.dialogFormVisible = false;
            } else if (res.data.code == 201) {
              this.$message.warning(res.data.message);
            }
          });
        } else {
          this.$message.error("请输入完整");
        }
      });
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
  .register-dialog {
    .el-dialog__header {
      background: linear-gradient(
        225deg,
        rgba(1, 198, 250, 1),
        rgba(20, 147, 250, 1)
      );
      margin-bottom: 27px;
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
    .el-form-item__content {
      text-align: center;
    }
  }
  // 验证码
  .code-col {
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .el-button {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>