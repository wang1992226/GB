<script lang="ts" setup>
import {ref} from "vue";

const content=ref('')
</script>

<template>
  <div class="drawsend">
    <el-input type="textarea" v-model="content" style="color: #2e323d;" :rows="4" placeholder="请输入内容"></el-input>

    <button @click="toggleShapeMode('line')">画笔</button>
    <button @click="toggleShapeMode('circle')">画圆</button>
    <button @click="toggleShapeMode('rect')">画框</button>
    <button @click="toggleShapeMode('arrow')">画箭头</button>
    <button @click="toggleShapeMode('text')">写字</button> <!-- 添加写字按钮 -->
    <input type="color" v-model="currentColor" @change="setColor(currentColor)">
    <input type="number" v-model.number="currentLineWidth" @change="setLineWidth(currentLineWidth)" min="1" max="10">
    <!--  清除按钮 -->
    <button @click="clearCanvas">清除</button>

    <el-button type="primary">提交</el-button>
  </div>
</template>

<style scoped>
.drawsend {
  padding: 20px;
  background-color: #2e323d;
}
</style>