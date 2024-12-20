<script lang="ts" setup>
import {ref} from 'vue'
import {ElMessage} from "element-plus";


const DialogVisible = ref(false)
const tableData = ref([])
const opendialog = (indata) => {
  console.log(indata)
  tableData.value = indata
  DialogVisible.value = true
}
const handleRowClick = async (row) => {
  console.log(row)
  let text = row.time
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      // alert('文本已复制到剪贴板');
      ElMessage({
        message: '复制时间成功',
        type:'success',
      })
    } catch (err) {
      console.error('复制失败: ', err);
      alert('复制失败，请检查权限');
    }
  } else {
    // Fallback for browsers that do not support the Clipboard API
    fallbackCopyTextToClipboard(text);
  }
}
const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      ElMessage({
        message: '复制时间成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '复制时间失败',
        type: 'error',
      })
    }
  } catch (err) {
    ElMessage({
      message: '复制时间失败',
      type: 'error',
    })
  } finally {
    document.body.removeChild(textArea);
  }
};

defineExpose({
  opendialog
})

</script>

<template>
  <el-dialog v-model="DialogVisible" width="232px" :close-on-click-modal="false">
    <el-table :data="tableData" max-height="600px" @row-click="handleRowClick">
      <el-table-column width="100px"  prop="time" label="时间"></el-table-column>
      <el-table-column width="100px"  prop="text" label="字幕"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<style scoped>

</style>