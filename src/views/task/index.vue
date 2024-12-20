<script setup>

import {ref} from 'vue'
import axios from 'axios'
import {ElMessage} from 'element-plus'

const tableData = ref([])

const data = axios.get(`${process.env.VUE_APP_API_URL}/yzjvika/getzykxm`)
    .then(res => {
      console.log(res.data)
      ElMessage.success(res.statusText)
      tableData.value = res.data.data
    })

// 定义过滤器函数
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
// 获取距离现在的天数
const getDaysFromNow = (date) => {
  const now = new Date();
  const followUpDate = new Date(date);
  const timeDiff = Math.abs(now.getTime() - followUpDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

// 根据距离现在的天数返回对应的类名
const getFollowUpColor = (date) => {
  const daysDiff = getDaysFromNow(date);
  if (daysDiff > 15) {
    return 'red-color';
  } else if (daysDiff > 7) {
    return 'orange-color';
  } else {
    return 'green-color';
  }
};


</script>
<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">State: {{ props.row.state }}</p>
          <p m="t-0 b-2">City: {{ props.row.city }}</p>
          <p m="t-0 b-2">Address: {{ props.row.address }}</p>
          <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
          <h3>Family</h3>
          <el-table :data="props.row.family" border>
            <el-table-column label="Name" prop="name"/>
            <el-table-column label="State" prop="state"/>
            <el-table-column label="City" prop="city"/>
            <el-table-column label="Address" prop="address"/>
            <el-table-column label="Zip" prop="zip"/>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="项目名称" prop="项目名称"/>
    <el-table-column label="项目进度详情" prop="项目进度详情"/>

    <el-table-column label="跟进时间" prop="跟进时间">
      <template #default="scope">
         <span :class="getFollowUpColor(scope.row.跟进时间)">
        {{ formatDate(scope.row.跟进时间) }}
           </span>
      </template>
    </el-table-column>

  </el-table>
</template>

<style scoped>
.red-color {
  color: red;
}

.orange-color {
  color: orange;
}

.green-color {
  color: green;
}
</style>