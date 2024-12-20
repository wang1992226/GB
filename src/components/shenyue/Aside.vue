<template>
  <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      >
    <el-tab-pane label="批注" name="first" >
      <Pizhucomponent/>
    </el-tab-pane>
    <el-tab-pane label="文件信息" name="second">
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {defineProps, ref} from 'vue'
import type {TabsPaneContext} from 'element-plus'
import Pizhucomponent from '@/components/shenyue/pizhu.vue'


const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  //padding: 32px;
  color: #dee0e7;
  //font-size: 32px;
  //font-weight: 600;
}
</style>