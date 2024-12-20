<script lang="ts" setup>
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import axios from "axios";

const centerDialogVisible = ref(false)

const data = ref({
  '提交人': "username",
  '项目地址': "address",
  '字幕': "subtitle",
  '提交时间': "submitTime",
  '类型': '影响设计',
  '简要说明': "可不填",
})
const submit = (formEl) => {
  if (!formEl) return
  data.value.类型 = '影响设计'
  console.log(data.value)
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      axios.post(`${process.env.LOCAL_API_URL}/erroaudio`, data.value)
          .then(res => {
            console.log(res)
            ElMessage({
              message: res.data.message,
              type: res.data.code === 200 ? 'success' : 'error'
            })
            if (res.status === 200) {
              centerDialogVisible.value = false
            }
          })
          .catch(err => {
            ElMessage({
              message: '网络错误，请稍后再试',
              type: 'error'
            })
          })
    }
  })

}


const formRef = ref<FormInstance>()
const openDialog = (indata) => {
  data.value = indata
  centerDialogVisible.value = true
}

defineExpose({
  openDialog
})

</script>

<template>
  <el-dialog v-model="centerDialogVisible" title="报告音频错误超4个字以上,影响设计。" width="500" center>
    <el-form ref="formRef" :model="data" >
      <el-form-item label="提交人">
        <el-input disabled v-model="data.提交人"></el-input>
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input disabled v-model="data.项目地址"></el-input>
      </el-form-item>
      <el-form-item label="字幕">
        <el-input disabled v-model="data.字幕"></el-input>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-input disabled v-model="data.提交时间"></el-input>
      </el-form-item>
      <el-form-item label="简要说明">
        <el-input type="textarea" placeholder="可不填" v-model="data.简要说明"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit(formRef)">
          提 交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>