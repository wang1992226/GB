<script lang="ts" setup>
import axios from "axios";
import {onMounted} from "vue";
import {ref} from "vue";

const tableData = ref([]);
const getTableData = () => {
  try {
    axios.get('http://127.0.0.1:8678/yizhijiao/fenpei/teable')
        .then(response => {
          console.log('请求成功:', response.data);
          if (response.data.code === 200) {
            tableData.value = response.data.data.records;
          }
        })


  } catch (error) {
    console.error('请求失败:', error);
  }
}

const tongguo = (index, row, status) => {
  console.log(index, row);
  // console.log(row.id, row.bumen);
  axios.post('http://127.0.0.1:8678/yizhijiao/fenpei/teable/'+row.id+'/'+status)
     .then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          if (status === 'y') {
            row.fields.fldupn9F4TxNoLz7UFt = '审核通过';
          } else {
            row.fields.fldupn9F4TxNoLz7UFt = '未审核';
          }
        }
      })
}
const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formatter = new Intl.DateTimeFormat('zh-CN', options);
  const parts = formatter.formatToParts(date);

  const month = parts.find(part => part.type === 'month').value;
  const day = parts.find(part => part.type === 'day').value;
  const hour = parts.find(part => part.type === 'hour').value;
  const minute = parts.find(part => part.type ==='minute').value;

  return `${month}-${day} ${hour}:${minute}`;
};
onMounted(async () => {
  await getTableData()
});

</script>

<template>
  <el-table max-height="800" border :data="tableData" style="width: 100%">
<!--    <el-table-column align="center" width="100" label="部门" prop="部门"/>-->
    <el-table-column align="center" width="140" label="开始日期" prop="fields.fldwL8LWtslNxqhfBaX">
      <template #default="scope">
        {{  formatDate(scope.row.fields.fldwL8LWtslNxqhfBaX) }}
      </template>
    </el-table-column>
    <el-table-column align="center" width="140" label="截止日期" prop="fields.fldvkAacWrtT70PmJ0c">
      <template #default="scope">
        {{  formatDate(scope.row.fields.fldvkAacWrtT70PmJ0c) }}
      </template>
    </el-table-column>
    <el-table-column align="center" width="100" label="任务负责人" prop="fields.fldYoIc7BqqMm5zHdEZ.title"/>
    <el-table-column align="center" width="120" label="任务类型" prop="fields.fld9XOwPYbsuTSNrOLy"/>
    <el-table-column label="任务详情" prop="fields.fld1Rup6aMFAUiY38fc"/>


    <el-table-column align="center" width="120" label="审核状态" prop="fields.fldupn9F4TxNoLz7UFt">
      <template #default="scope">
        <el-tag v-if="scope?.row?.fields?.fldupn9F4TxNoLz7UFt === '审核通过'" type="success">{{ scope.row.fields.fldupn9F4TxNoLz7UFt }}</el-tag>
        <el-tag v-else type="danger">{{ scope.row.fields.fldupn9F4TxNoLz7UFt }}</el-tag>
      </template>
    </el-table-column>
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