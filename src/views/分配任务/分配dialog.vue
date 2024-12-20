<script lang="ts" setup>
import axios from "axios";
import {onMounted,defineEmits,defineProps,watch, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
const 员工list=ref([])
const formRef = ref<FormInstance>()
const handlefenpei = () => {
  axios.get('http://127.0.0.1:8678/yizhijiao/department',{params:{'bumen':'视频部'}})
      .then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          console.log(res.data.data['records'])
          员工list.value = res.data.data['records']
        }
      })
}
onMounted( () => {
  handlefenpei()
})

// const fenpei_data=ref({})
const fenpeiSubmitForm = (formEl: FormInstance | undefined) => {
  console.log(formEl, fenpeidata)
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(fenpeidata)
      axios.patch('http://127.0.0.1:8678/yizhijiao/fenpei/teable', fenpeidata.value)
          .then((res) => {
            ElMessage({type: res.data.code === 200?'success': 'error', message: res.data.message})
            console.log(res)
            if (res.data.code === 200) {
              emit('update:dialogVisible', false)
              dialogVisibleModal.value = false
            }
          })
    }
  })

}
const dialogVisibleModal = ref(false)
const fenpeidata = ref({})
const emit = defineEmits(['update:dialogVisible', 'submit']);
const props = defineProps({
  dialogVisible: Boolean,
  fenpeidata: Object,
});
watch(() => props.dialogVisible, (newVal) => {
  if (newVal) {
    dialogVisibleModal.value = newVal
    fenpeidata.value = props.fenpeidata
    // 可以在这里处理对话框打开时的逻辑
  }
});
const closeDialog = () => {
  emit('update:dialogVisible', false)
}

</script>

<template>
  <el-dialog v-model="dialogVisibleModal"
             title="分配任务" width="500"
  @close="closeDialog">
    <el-form :model="fenpeidata" label-width="auto" style="max-width: 600px" ref="formRef">
      <el-form-item label="任务详情">
        <el-input v-model="fenpeidata['任务详情']" type="textarea" disabled/>
      </el-form-item>

      <el-form-item label="时间范围" prop="时间范围" :rules="[{required: true, message: '时间范围', trigger: 'blur'}]">
        <el-date-picker
            v-model="fenpeidata['时间范围']"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
        />
      </el-form-item>

      <el-form-item label="选择员工" prop="任务负责人"
                    :rules="[{required: true, message: '请选择员工', trigger: 'blur'}]">
        <el-select v-model="fenpeidata['任务负责人']" placeholder="请选择员工" value-key="id">
          <el-option v-for="item in 员工list" :key="item.fields.fldf9n0yP4ybS4x3H1Y.id" :label="item.name" :value="item.fields.fldf9n0yP4ybS4x3H1Y"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fenpeiSubmitForm(formRef)">分配任务</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>