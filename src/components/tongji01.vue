<script lang="ts" setup>
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const outputValue=0
</script>

<template>
  <el-row class="tongji">
    <el-col :span="4">
      <el-statistic title="今日访问量" :value="562">
        <template #prefix>
          <el-icon style="vertical-align: -0.125em">
            <Mouse />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>


    <el-col :span="5">
      <el-statistic title="总访问量" :value="562">
        <template #prefix>
          <el-icon style="vertical-align: -0.125em">
            <Coin />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>



    <el-col :span="5">
      <el-statistic title="素材总数" :value="562">
        <template #prefix>
          <el-icon style="vertical-align: -0.125em">
            <DocumentCopy />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>

    <el-col :span="5">
      <el-statistic title="课程总数" :value="562">
        <template #prefix>
          <el-icon style="vertical-align: -0.125em">
            <Notebook />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>


    <el-col :span="5">
      <el-statistic title="用户总数" :value="562">
        <template #prefix>
          <el-icon style="vertical-align: -0.125em">
            <User />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<style scoped>
.tongji {text-align: center;}
</style>