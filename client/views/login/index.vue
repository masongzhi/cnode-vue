<template>
    <el-row
            type="flex"
            justify="center"
            align="middle">
        <el-col :xs="12" :sm="10" :md="8" :lg="5" class="loginBox">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" @keyup.enter.native="submitForm('loginForm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row
                            type="flex"
                            justify="center"
                            align="middle">
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                        <el-button>修改密码</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
  import convertApiQuery from 'utils/convertApiQuery'
  import MD5 from 'md5'
  import { mapState } from 'vuex'
  export default {
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            return false;
          }
        });
      },
    },
    computed: mapState({
      data: state => state.login.data,
      error: state => state.login.error,
      loginForm: state => {console.log(state);return state.login.loginForm},
      rules: state => state.login.rules,
    })
  }
</script>
<style scoped>
    .loginBox {
        margin-top: 200px;
        padding: 20px;
        border: 1px solid #ababab;
    }
    .el-col {
        border-radius: 4px;
    }
</style>
