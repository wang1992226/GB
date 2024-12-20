<template>
  <div class="container" style="padding: 20px">
    <el-table max-height="800" border :data="tableData" style="width: 100%">
      <el-table-column width="180" label="生成日期" prop="生成日期"/>
      <el-table-column label="任务详情" prop="任务详情"/>
      <el-table-column align="center" width="140" label="开始日期" prop="开始日期">
        <template #default="scope">
          <span>{{ formatDate(scope.row?.时间范围?.[0]) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="140" label="截止日期" prop="截止日期">
        <template #default="scope">
          <span>{{ formatDate(scope.row?.时间范围?.[1]) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="90" label="任务类型" prop="任务类型"/>
      <el-table-column align="center" width="90" label="备注" prop="备注" show-overflow-tooltip/>
      <el-table-column width="200"  align="center" label="操作">
        <template #default="scope">
          <el-button
              size="small"
              type="danger"
              @click="handlefenpei(scope.$index, scope.row)"
          >
            分配
          </el-button>
          <el-button size="small" @click="deleteTask(scope.$index, scope.row)">
            删除
          </el-button>
          <el-button
              disabled
              size="small"
              type="danger"
              @click="handlefenpei(scope.$index, scope.row)"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="mt-4" style="width: 100%" @click="addTask">
      添加任务
    </el-button>
  </div>
  <el-dialog
      v-model="dialogVisible"
      :title="AddOrEdit+'任务'"
      width="500"
  >
    <el-form :model="DialogData"
             ref="formRef"
             label-width="auto" style="max-width: 600px">

      <el-form-item label="任务详情"
                    prop="任务详情"
                    :rules="[
            { required: true, message: '请输入详情', trigger: 'blur' }]"
      >
        <el-input autocomplete="off" v-model="DialogData['任务详情']" type="textarea"/>
      </el-form-item>
      <el-form-item label="任务类型" prop="任务类型"
                    :rules="[{required: true}]">
        <el-select v-model="DialogData['任务类型']" placeholder="任务类型">
          <el-option label="制作" value="制作"/>
          <el-option label="修改" value="修改"/>
          <el-option label="休假" value="休假"/>
        </el-select>
      </el-form-item>

      <el-form-item label="时间范围" prop="时间范围" >
        <el-date-picker
            v-model="DialogData['时间范围']"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="defaultTime"
        />
      </el-form-item>

      <el-form-item label="备注" prop="备注">
        <el-input autocomplete="off" v-model="DialogData['备注']" type="textarea"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">{{ AddOrEdit }}任务</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <FenpeiDialog
      :dialogVisible="fenpeiDialogVisible"
      :fenpeidata="formData"
      @update:dialogVisible="fenpeiDialogVisible = $event"
  />
</template>
<script lang="ts" setup>
import {onMounted, ref, reactive, computed} from 'vue'
import dayjs from 'dayjs'
import {ElMessage, ElMessageBox} from 'element-plus'
import type {FormInstance} from 'element-plus'
import axios from "axios";
import FenpeiDialog from "./分配dialog.vue";

const now = new Date()
const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const AddOrEdit = ref('add')
const fenpeiDialogVisible = ref(false)
const deleteTask = (index: number, row: any) => {
  ElMessageBox.confirm('确认删除该任务吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => { // 点击确定
    axios.delete('http://127.0.0.1:8678/yizhijiao/fenpei/shoudong/'+row.id)
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            tableData.value.splice(index, 1)
            ElMessage({type: 'info', message: '删除成功'})
          }
        })
  }).catch(() => { // 点击取消
    console.log('取消删除')
  })
}
const defaultTime: [Date, Date] = [
  new Date(2000, 1, 1, 9, 0, 0),
  new Date(2000, 2, 1, 21, 0, 0),
]
const DialogData = reactive({})

const formData=ref({})

const tableData = ref([])
const handlefenpei = (index, row) => {
  console.log(fenpeiDialogVisible.value)
  console.log(index, row)
  fenpeiDialogVisible.value = true
  formData.value = row
}

const getTableData = async() => {
  try {
    const response = await axios.get('http://127.0.0.1:8678/yizhijiao/fenpei/shoudong');
    console.log(response)
    tableData.value = response.data;
  } catch (error) {
    console.error('请求失败:', error);
  }
}

onMounted(async () => {
  await getTableData()
});
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}时`;
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(DialogData)
      if (AddOrEdit.value === 'add') {
        axios.post('http://127.0.0.1:8678/yizhijiao/fenpei/shoudong', DialogData)
            .then((res) => {
              ElMessage({type: res.data.code === 200?'success': 'error', message: res.data.message})
              if (res.data.code === 200) {
                tableData.value.push(res.data.data)
                dialogVisible.value = false
              }
            })
      }
      // else {
      //   axios.patch('http://127.0.0.1:8678/yizhijiao/fenpei/'+ruleForm.id, {...ruleForm})
      //       .then((res) => {
      //         console.log(res)
      //         ElMessage({type: res.data.code === 200?'success': 'error', message: res.data.message})
      //         if (res.data.code === 200) {
      //           for (let i = 0; i < tableData.value.length; i++) {
      //             if (tableData.value[i].id === ruleForm.id) {
      //               tableData.value[i] = res.data.data
      //               break
      //             }
      //           }
      //         }
      //       })
      // }
      // dialogVisible.value = false
      // resetForm(formRef.value)
    }
  })

}
const addTask = () => {
  AddOrEdit.value = 'add'
  dialogVisible.value = true
}







</script>