<template>
  <div class="login">
    <SvgIcon name="login_bg" inlineStyle="width:100%;height:100%;position:absolute;top:0;left:0;"></SvgIcon>

    <div class="login-card-box">
      <div class="login-card">
        <h1 class="login_title">Fameily后台管理系统</h1>
        <el-text class="register" type="primary" @click="registerFnc">
          <el-icon>
            <Avatar />
          </el-icon>
          注册
        </el-text>
        <div class="from_box">
          <el-form ref="ruleFormRef" :model="loginData" :rules="rules">
            <el-form-item prop="username">
              <el-input :prefix-icon="User" placeholder="请输入用户名" maxlength="10" v-model="loginData.username" clearable />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" show-password :prefix-icon="Lock" placeholder="请输入密码" maxlength="15"
                v-model="loginData.password" clearable />
            </el-form-item>
            <el-form-item prop="textCode">
              <el-input placeholder="请输入验证码" v-model="loginData.textCode" class="text_code_input" clearable />
              <valicode ref="refresh" @getCode="getCode" />
            </el-form-item>
            <el-form-item class="btn_box">
              <el-button type="primary" @click="submitForm(ruleFormRef)" class="submit_btn" :loading="submitLogin">
                登录
              </el-button>
              <el-button @click="resetForm(ruleFormRef)" class="reset_btn">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <SvgIcon name="login_left" inlineStyle="width:40%;height:60%;"></SvgIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import type { loginFormData } from '@/api/user/type';
import { User, Lock, Avatar } from '@element-plus/icons-vue';
import { reactive, ref, onMounted } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import valicode from '@/components/valicode/index.vue';
import userUserStore from '@/store/modules/user';
import { getTime } from '@/utils/index';

defineOptions({
  name: 'login',
});

let $router = useRouter();
let $route = useRoute();
let userStore = userUserStore();
let ruleFormRef = ref<FormInstance>();
let loginData = reactive<loginFormData>({
  //默认账号密码：admin  atguigu123
  username: 'admin',
  password: 'atguigu123',
  textCode: '',
});
let submitLogin = ref<boolean>(false);
const code = ref<string>('');
const refresh = ref<any>(null);

// 接收验证码组件返回的code
const getCode = (value: string) => {
  code.value = value;
};

// 验证码自定义校验规则
const checkCode = (rule: any, value: string, callback: any) => {
  console.log(rule);
  if (!value) {
    return callback(new Error('请输入验证码'));
  }
  if (value != code.value) {
    refresh.value?.refresh();
    callback(new Error('验证码有误，请重新输入'));
  } else {
    callback();
  }
};

// 用户名自定义校验规则
const validatorUserName = (rule: any, value: string, callback: any) => {
  console.log(rule);
  if (!value) {
    return callback(new Error('请输入用户名'));
  }
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('用户名长度至少5位'));
  }
};

// 密码自定义校验规则
const validatorPassword = (rule: any, value: string, callback: any) => {
  console.log(rule);
  if (!value) {
    return callback(new Error('请输入密码'));
  }
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少6位'));
  }
};

// 表单校验规则组
const rules = reactive<FormRules>({
  username: [{ validator: validatorUserName, trigger: 'change' }],
  password: [{ validator: validatorPassword, trigger: 'change' }],
  textCode: [{ validator: checkCode, trigger: 'blur' }],
});

// 提交登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      submitLogin.value = true;
      userStore
        .userLogin(loginData)
        .then((resolve) => {
          console.log(resolve);

          if (resolve == 'ok') {
            let path = $route.query.redirect;
            if (typeof path === 'string') {
              //通过判断 解决 path参数值类型报错问题，告诉TS 这个值只能等于string类型
              $router.push(path);
            } else {
              $router.push('/');
            }
            submitLogin.value = false;
            ElNotification({
              type: 'success',
              title: `Hi，${getTime()}`,
              message: '欢迎回来',
            });
          }
        })
        .catch((error) => {
          ElNotification({
            type: 'error',
            message: error.message == '' ? '用户名或密码错误，请重新输入！' : (error as Error).message,
          });
          refresh.value?.refresh();
          loginData.textCode = '';
          submitLogin.value = false;
        });
    } else {
      console.log(fields);
    }
  });
};

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 注册
const registerFnc = () => {
  ElMessage({
    type: 'warning',
    message: '功能还在开发中，敬请期待。',
  });
};

onMounted(() => {
  ElNotification({
    type: 'info',
    title: '系统消息',
    message: `欢迎访问Fameily后台管理系统`,
    showClose: false,
    duration: 3000,
  });
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: url(@/assets/images/login_background.jpg) no-repeat;
  // background-size: 100% 100%;
  background-color: #e493d0;
  background-image: radial-gradient(closest-side,
      rgba(235, 105, 78, 1),
      rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgb(77, 213, 223), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side,
      rgba(254, 234, 131, 1),
      rgba(254, 234, 131, 0)),
    radial-gradient(closest-side,
      rgba(170, 142, 245, 1),
      rgba(170, 142, 245, 0)),
    radial-gradient(closest-side,
      rgba(248, 192, 147, 1),
      rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
    -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 3s movement linear infinite;

  @keyframes movement {

    0%,
    100% {
      background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
        110vmax 110vmax, 90vmax 90vmax;
      background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
        -30vmax -10vmax, 50vmax 50vmax;
    }

    25% {
      background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
        90vmax 90vmax, 60vmax 60vmax;
      background-position: -60vmax -60vmax, 50vmax -40vmax, 0vmax -20vmax,
        -40vmax -20vmax, 40vmax 60vmax;
    }

    50% {
      background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
        60vmax 60vmax, 80vmax 80vmax;
      background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
        20vmax 10vmax, 30vmax 70vmax;
    }

    75% {
      background-size: 90vmax 90vmax, 90vmax 100vmax, 100vmax 100vmax,
        70vmax 70vmax, 80vmax 80vmax;
      background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
        -10vmax 10vmax, 40vmax 60vmax;
    }
  }

  .login-card-box {
    width: 1850px;
    height: 900px;
    // background-color: rgba(255, 255, 255, .6);
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    z-index: 10;

    .login-card {
      width: 430px;
      height: 350px;
      margin-left: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      box-shadow: 0 0 10px 0 rgb(221, 221, 221);
      padding: 0 50px;
      box-sizing: border-box;
      border-radius: 5px;
      position: relative;

      .login_title {
        font-size: 28px;
        margin-top: 40px;
      }

      .register {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
      }

      .from_box {
        width: 100%;
        margin-top: 40px;

        .btn_box {
          margin-top: 20px;
          margin-bottom: 5px;

          .submit_btn {
            width: 257px;
          }
        }

        .text_code_input {
          width: 60%;
        }
      }
    }
  }
}

.login::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
