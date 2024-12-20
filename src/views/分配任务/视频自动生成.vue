<template>

    <div class="mb-4" style="margin-bottom: 20px">
      <el-button type="primary" @click="createmodifytask()">
        生成修改任务
      </el-button>
      <el-button type="primary" @click="createsampletask()">
        生成样片任务
      </el-button>


    </div>
    <el-table max-height="800" border :data="tableData" style="width: 100%">
      <el-table-column align="center"  width="80" label="优先级" prop="优先级"/>
      <el-table-column label="任务详情" width="320" prop="任务详情"/>
      <el-table-column align="center" width="140" label="生成日期" prop="批次">
        <template #default="scope">
          <span>{{ formatDate(scope.row.批次) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="任务类型" prop="任务类型"/>
<!--      <el-table-column align="center" width="90" label="rid" prop="rid" show-overflow-tooltip/>-->
      <el-table-column   label="备注" prop="备注" show-overflow-tooltip/>
      <el-table-column width="260"  align="center" label="操作">
        <template #default="scope">
          <el-button
              size="small"
              type="danger"
              @click="handlefenpei(scope.$index, scope.row)"
          >
            分配
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  <FenpeiDialog
      :dialogVisible="fenpeiDialogVisible"
      :fenpeidata="formData"
      @update:dialogVisible="fenpeiDialogVisible = $event"
  />



<!--  <el-dialog v-model="fenpeiDialogVisible"-->
<!--             title="分配任务" width="500">-->
<!--    <el-form :model="fenpei_data" label-width="auto" style="max-width: 600px" ref="formRef">-->
<!--      <el-form-item label="任务详情">-->
<!--        <el-input v-model="fenpei_data['任务详情']" type="textarea" disabled/>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="时间范围" prop="时间范围" :rules="[{required: true, message: '时间范围', trigger: 'blur'}]">-->
<!--        <el-date-picker-->
<!--            v-model="fenpei_data['时间范围']"-->
<!--            type="datetimerange"-->
<!--            start-placeholder="开始时间"-->
<!--            end-placeholder="结束时间"-->
<!--            :default-time="defaultTime"-->
<!--        />-->
<!--      </el-form-item>-->

<!--      <el-form-item label="选择员工" prop="任务负责人"-->
<!--                    :rules="[{required: true, message: '请选择员工', trigger: 'blur'}]">-->
<!--        <el-select v-model="fenpei_data['任务负责人']" placeholder="请选择员工" value-key="id">-->
<!--          <el-option v-for="item in 员工list" :key="item.fields.fldf9n0yP4ybS4x3H1Y.id" :label="item.name" :value="item.fields.fldf9n0yP4ybS4x3H1Y"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->

<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="fenpeiSubmitForm(formRef)">分配任务</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </el-dialog>-->
</template>
<script lang="ts" setup>
import {onMounted, ref, reactive, computed} from 'vue'
import dayjs from 'dayjs'
import {ElMessage, ElMessageBox} from 'element-plus'
import type {FormInstance} from 'element-plus'
import axios from "axios";
import FenpeiDialog from "@/views/分配任务/分配dialog.vue";
const now = new Date()
const formRef = ref<FormInstance>()
const fenpeiDialogVisible = ref(false)
const formData = ref({})
const createmodifytask = async() => {
  axios.get('http://127.0.0.1:8678/yizhijiao/fenpei/zidong/createmodifytask')
      .then((res) => {
        console.log(res)
        ElMessage({type: res.data.code === 200?'success': 'error', message: res.data.message})
        if (res.data.code === 200) {
          getTableData()
        }
      })
}
const createsampletask = async() => {
  axios.get('http://127.0.0.1:8678/yizhijiao/fenpei/zidong/createsampletask')
      .then((res) => {
        console.log(res)
        ElMessage({type: res.data.code === 200?'success': 'error', message: res.data.message})
        if (res.data.code === 200) {
          getTableData()
        }
      })
}
const value1 = ref('')
const tableData = ref([])
const defaultTime: [Date, Date] = [
  new Date(2000, 1, 1, 9, 0, 0),
  new Date(2000, 2, 1, 21, 0, 0),
]
const getTableData = async() => {
  try {
    const response = await axios.get('http://127.0.0.1:8678/yizhijiao/fenpei/zidong/today');
    console.log(response.data)
    tableData.value = response.data.data;
  } catch (error) {
    console.error('请求失败:', error);
  }
}
onMounted(async () => {
  await getTableData()
});
const formatDate = (date:Number) => {
  // 1730965958.9733498
  if (!date) return ''
  const d = new Date(date * 1000)
  return dayjs(d).format('MM-DD HH:mm')
}


const fenpei_data=ref({})
const 员工list=ref([])
const handlefenpei = (index: number, row: any) => {

  console.log(index, row)
  // axios.get('http://127.0.0.1:8678/yizhijiao/department',{params:{'bumen':'视频部'}})
  //     .then((res) => {
  //       console.log(res)
  //       if (res.data.code === 200) {
  //         console.log(res.data.data['records'])
  //         员工list.value = res.data.data['records']
  //         fenpei_data.value = {...row}
  //         fenpeiDialogVisible.value = true
  //       }
  //     })

  console.log(fenpeiDialogVisible.value)
  console.log(index, row)
  fenpeiDialogVisible.value = true
  formData.value = row
}

const fenpeiSubmitForm = (formEl: FormInstance | undefined) => {
  console.log(formEl, fenpei_data)
  // if (!formEl) return
  // formEl.validate((valid) => {
  //   if (valid) {
  //     console.log(fenpei_data)
  //     // console.log({id: fenpei_data.id, data: { 责任人: fenpei_data.责任人 }})
  //     axios.patch('http://127.0.0.1:8678/yizhijiao/fenpei/zidong', fenpei_data.value)
  //         .then((res) => {
  //           ElMessage({type: res.data.code === 200?'success': 'error', message: res.data.message})
  //           console.log(res)
  //           if (res.data.code === 200) {
  //             fenpeiDialogVisible.value = false
  //           }
  //         })
  //   }
  // })



}



</script>