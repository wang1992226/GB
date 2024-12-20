<script lang="ts" setup>
import {RouterLink, RouterView} from 'vue-router'

import xianshang from './视频分配任务.vue'


</script>
<template>
  <header>
    <div class="container" style="padding: 20px">
      <xianshang/>
      <nav>

        <RouterLink class="mx-1" to="/fenpei/videoauto">视频自动生成</RouterLink>


        <RouterLink class="mx-1" to="/fenpei/manualadd">视频手动添加</RouterLink>

      </nav>
    </div>
  </header>
  <RouterView/>
</template>
<style lang="scss" scoped>

.mx-1 {
  margin-right: 10px;
}

a {
  text-decoration: none;
}
</style>
