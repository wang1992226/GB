<script lang="ts" setup>
import axios from "axios";
import {onMounted} from "vue";
import {ref} from "vue";

const tableData = ref([]);
const getTableData = () => {
  try {
    axios.get('http://127.0.0.1:8678/yizhijiao/fenpei/online')
        .then(response => {
          console.log('请求成功:', response.data);
          if (response.data.code === 200) {
            tableData.value = response.data.data;
          }
        })


  } catch (error) {
    console.error('请求失败:', error);
  }
}

const tongguo = (index, row, status) => {
  console.log(index, row);
  console.log(row.id, row.bumen);
  axios.post('http://127.0.0.1:8678/yizhijiao/fenpei/online/'+row.tableId+'/'+row.id+'/'+status)
     .then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          if (status === 'y') {
            row.fields.审核状态 = '审核通过';
          } else {
            row.fields.审核状态 = '未审核';
          }
        }
      })
}
const formatDate = (date) => {
  console.log(date);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return `${month}-${day}`;
}
onMounted(async () => {
  await getTableData()
});
</script>

<template>
  <el-table max-height="800" border :data="tableData" style="width: 100%">
    <el-table-column align="center" width="100" label="部门" prop="部门"/>
    <el-table-column align="center" width="100" label="任务负责人" prop="fields.任务负责人.title"/>
    <el-table-column align="center" width="90" label="任务类型" prop="任务类型"/>
    <el-table-column label="任务详情" prop="fields.任务详情"/>
    <el-table-column align="center" width="140" label="日期" prop="fields.日期">
      <template #default="scope">
        {{  formatDate(scope.row.fields.日期) }}
      </template>
    </el-table-column>

    <el-table-column align="center" width="90" label="审核状态" prop="fields.审核状态" show-overflow-tooltip/>
    <el-table-column align="center" width="90" label="备注" prop="备注" show-overflow-tooltip/>
    <el-table-column width="160" align="center" label="操作">
      <template #default="scope">
        <el-button type="success" size="small" @click="tongguo(scope.$index, scope.row,'y')">
          通过
        </el-button>
        <el-button type="danger" size="small" @click="tongguo(scope.$index, scope.row,'n')">
          不通过
        </el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>