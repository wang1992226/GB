<script setup>
import {资源库任务, 资源库项目, 日志汇总} from '@/api/vika.js'
import {ref, onMounted} from "vue";
import tableData from "./package.json"
import {Check, Close} from '@element-plus/icons-vue'
// const tableData =()=>{
//
// }
// const tableDataapi =ref([])
//
//
// onMounted(() => {
//     new 资源库任务().get_all({'filterByFormula': '{项目}="3D max室内效果图制作-微课视频"'})
//       .then(result => {
//         console.log(result)
//         tableDataapi.value= result.map(item => {
//           console.log(item.fields)
//           return item.fields
//         })
//         console.log(tableData)
//       })
// })
// console.log(tableData)
//定义变量 列表数组
const tableColumns = ['拍摄完成','设计完成','视频完成', 'PPT字体', '视频母版', '拍摄文件夹', '剪辑文件夹', '终稿视频', '压缩视频', '上传地址']

</script>

<template>
  <div class="full-block flex-layout">
    <div class="flex-auto" style="min-height:0;">
      <el-table border :data="tableData.data" height="100%" style="width: 100%;" size="small">
        <el-table-column prop="任务名称" label="任务名称" width="320"/>
        <el-table-column align="center" v-for="(item,index) in tableColumns" :key="index" :prop="item" :label="item"
                         width="80" show-overflow-tooltip>
          <template #default="scope">
            <el-button size="small" :type="scope.row[item] === 'success' ? 'success' : 'warning'"
                       :icon="scope.row[item] === 'success' ? Check : Close" circle/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.full-block{
  height:100%;
  width:100%;
  overflow:hidden;
}
.flex-layout{
  display:flex;
  flex-direction:column;
}
.flex-auto{
  flex:1 1 auto
}

</style>