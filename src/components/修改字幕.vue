<script lang="ts" setup>
import {ref} from 'vue'


const DialogVisible = ref(false)
const formData = ref({})
const opendialog = (indata) => {
  console.log(indata)
  formData.value = indata
  DialogVisible.value = true
}
const emit = defineEmits(['updateSubtitle']);
const submit = () => {
  console.log(formData.value)
  DialogVisible.value = false
  emit('updateSubtitle', formData.value)
}



defineExpose({
  opendialog
})

</script>

<template>
  <el-dialog title="修改字幕" v-model="DialogVisible" width="50%" :close-on-click-modal="false">
    <el-form :model="formData" label-width="auto" style="max-width: 600px">
      <el-form-item label="id" >
        <el-input v-model="formData.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="原字幕">
        <el-input v-model="formData.srt" disabled></el-input>
      </el-form-item>
      <el-form-item label="新字幕">
        <el-input v-model="formData.new_srt"></el-input>
      </el-form-item>
      <el-form-item >
        <div style="text-align: right;">
        <el-button type="primary" @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
          </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>