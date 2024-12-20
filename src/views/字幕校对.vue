<script lang="ts" setup>
import {ElTable} from "element-plus";
import axios from "axios";
import {onMounted, ref} from "vue";
const str_json = ref([])
onMounted (() => {
   axios.get('http://127.0.0.1:8000/getmarkjson',{params: {path: '\\\\YZJ-NAS\\Work\\资源库项目\\2024-台山市培英职业技术学校-市场营销基础-叶红乐\\0115-微课视频\\03-工程\\8.3广告促销\\任务进度更新.json'}})
      .then(response => {
        console.log(response.data)
        str_json.value =response.data.data
      })
})
</script>

<template>
  <el-table ref="tableRef" :data="str_json" height="800px" style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column property="page" label="page" width="80"/>
    <el-table-column property="text" label="text" >
      <template v-slot="{ row }">
        <div :style="{ 'color': row.find_flag == true? 'red' : 'green' }" v-html="row.text"></div>
      </template>
    </el-table-column>

  </el-table>
</template>

<style scoped>

</style>