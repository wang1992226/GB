<script lang="ts" setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const tableData = ref([])
const getTableData = async () => {
  console.log(excelForm.value)
  tableData.value = []
  axios.get('http://192.168.1.14:8678/yizhijiao/zhzjexam', {params: excelForm.value}).then(res => {
    console.log(res.data)
    tableData.value = res.data
  })
  console.log(excelForm.value)
}
onMounted(() => {
// 获取缓存数据
//   const cacheData = localStorage.getItem('addcofig')
//   if (cacheData) {
//       addcofig.value = JSON.parse(cacheData)
//   }
//   const cacheData2 = localStorage.getItem('excelForm')
//   if (cacheData2) {
//       excelForm.value = JSON.parse(cacheData2)
//   }
})
const excelForm = ref({
  path: '',
  sheet: '',
  skiprows: 1
})

const handleEdit = (index, row) => {
  console.log({...row, ...addcofig.value})
  axios.post('http://192.168.1.14:8678/yizhijiao/addquestion', {...row, ...addcofig.value})
      .then(res => {
        if (res.data.retCode === '0') {
          row.结果 = '成功'
          console.log(res)
        } else {
          row.结果 = '失败'
          console.log(res)
        }
      })
}

const addcofig = ref({
  'cookie': '',
  'searchRootId':'',
  'bankId': '',
  'RootId': '',
  'classlist':[],
})
const getLetter = (index) => {
  return String.fromCharCode(65 + index)
}
// 处理题干
const handleQuestion = (question) => {
  return question.replace(/&/g, '__________')
}
const postquestionclass = async () => {
  axios.post('http://192.168.1.14:8678/yizhijiao/questionclass',addcofig.value).then(res => {
    console.log(res.data)
    if (res.data.retCode === '0') {
      ElMessage.success('获取成功')
      addcofig.value.RootId = res.data.data[0]['id']
      addcofig.value.classlist = res.data.data[0]['children']
    }else {
      ElMessage.error('获取分类失败,检查cookie和searchRootId')
    }
  }).catch(err => {
    console.log(err)
    ElMessage.error('获取分类失败,应该是没开服务器。')
  })
}
import { UploadFilled } from '@element-plus/icons-vue'
const handleUpload = (file) => {
  console.log(file)
  //获取文件在本地的路径


  // const reader = new FileReader()
  // reader.readAsDataURL(file.raw)
  // reader.onload = (e) => {
  //   addcofig.value.path = e.target.result
  // }
}
import he from 'he';
import {ElMessage} from "element-plus";
</script>

<template>
  <el-form  :model="addcofig" label-width="auto" style="margin-top: 20px;width: 500px">
    <el-form-item label="cookie" prop="cookie">
      <el-input v-model="addcofig.cookie"></el-input>
    </el-form-item>
    <el-form-item label="searchRootId" prop="searchRootId">
      <el-input v-model="addcofig.searchRootId"></el-input>
    </el-form-item>

    <el-form-item label="bankId" prop="bankId">
      <el-select v-model="addcofig.bankId" placeholder="选择分类">
        <!--        <el-option value="0" label="请选择分类"></el-option>-->
        <el-option v-for="item in addcofig.classlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="postquestionclass">获取分类</el-button>
    </el-form-item>
    <!--    <el-form-item>-->
    <!--      <el-input v-model="addcofig.bankId"></el-input>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item>-->
    <!--      <el-input v-model="addcofig.RootId"></el-input>-->
    <!--    </el-form-item>-->
  </el-form>

  <el-form :inline="true" :model="excelForm" label-width="auto">
<!--    <el-upload v-model="excelForm.path" drag :auto-upload="false" :on-change="handleUpload">-->
<!--      <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--    </el-upload>-->
    <el-form-item label="excel文件地址">
      <el-input v-model="excelForm.path"></el-input>
    </el-form-item>
    <el-form-item label="sheet名称">
      <el-input v-model="excelForm.sheet"></el-input>
    </el-form-item>
    <el-form-item style="width: 160px" label="跳过行数">
      <el-input type="number" v-model="excelForm.skiprows"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getTableData">获取数据</el-button>
    </el-form-item>
  </el-form>


  <el-table max-height="800" border :data="tableData" style="width: 100%">
    <el-table-column prop="序号" label="序号" width="60"></el-table-column>
    <el-table-column prop="题型" label="题型" width="120"></el-table-column>
    <el-table-column prop="题干" label="题干">
      <template #default="scope">
        {{ handleQuestion(scope.row.题干) }}
      </template>
    </el-table-column>
    <el-table-column prop="选项" label="选项">
      <template #default="scope">
        <el-tag v-for="(item, index) in scope.row.选项" :key="index">{{ getLetter(index) }}. {{ item }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="答案" label="答案"></el-table-column>
    <el-table-column prop="结果" width="80" label="结果">
      <template #default="scope">
        <el-tag v-if="scope.row.结果=='成功'" type="success">{{ scope.row.结果 }}</el-tag>
        <el-tag v-else-if="scope.row.结果=='失败'" type="danger">{{ scope.row.结果 }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column width="200" align="center" label="操作">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">提交</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<style scoped>

</style>