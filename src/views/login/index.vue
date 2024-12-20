<script setup lang="ts">
import {reactive, ref} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

const router = useRouter()
import md5 from 'js-md5'
import {ElMessage} from "element-plus";

document.documentElement.classList.add("dark")

const ruleForm = reactive({
  user: '',
  pass: '',
})

const handleSubmit = () => {
  const md5pass = md5(ruleForm.pass)
  const userdata = {
    user: ruleForm.user,
    pass: md5pass
  }
  // console.log('Submitting form:', userdata);
  axios.post(`${process.env.VUE_APP_API_URL}/yzjuser/login`, userdata)
      .then(res => {
        console.log(res.data)
        if (res.data.code == 200) {
          localStorage.setItem('yizhijiao_user', JSON.stringify(res.data.data.user_data))
          localStorage.setItem('yizhijiao_token', res.data.data.access_token)
          localStorage.setItem('isAuthenticated', 'true')
          ElMessage.success("登录成功")
          setTimeout(() => {
            router.push({path: '/anliku'});
          }, 2000);
        } else {
          ElMessage.error(res.data.message)
        }
      })
}


</script>

<template>
<!--  <el-container class="height-full">-->
<!--    <el-main>-->
      <div class="container">
        <el-card shadow="never" style="width: 400px; margin: 0 auto;">
          <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              label-width="auto"
              class="demo-ruleForm"
          >
            <el-form-item label="账 号" prop="user">
              <el-input v-model="ruleForm.user"/>
            </el-form-item>

            <el-form-item label="密 码" prop="pass">
              <el-input @keydown.enter="handleSubmit" v-model="ruleForm.pass" type="password"/>
            </el-form-item>

            <div class="login-btn">
              <!--        <el-button @click="handleReset">清 空</el-button>-->
              <el-button type="primary" @click="handleSubmit">登 录</el-button>
            </div>
          </el-form>
        </el-card>
      </div>
<!--    </el-main>-->
<!--  </el-container>-->
</template>

<style lang="scss">
@import 'element-plus/theme-chalk/src/dark/css-vars.scss';
.login-btn {
  display: flex;
  justify-content: center;
}
.height-full {
  height: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
