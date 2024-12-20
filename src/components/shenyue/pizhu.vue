<script lang="ts" setup>
import {inject, ref} from 'vue'
import star from "@/components/icons/star.vue";
import Untils from '@/components/shenyue/untils.js'
import {ElMessage, ElMessageBox} from "element-plus";
const banben = inject('banben')
const record = inject('record')
const opinion= inject('opinion')
const shenyueapi = inject('shenyueapi');
const activePostindex = inject('activePostindex')
const deletePost = ( frame, datetime ) => {

  ElMessageBox.confirm(
      '确认删除批注？',
      '删除批注',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        shenyueapi.deleteopinion(frame, datetime)
            .then((res) => {
              if (res.data.code === 200) {
                for (let i = 0; i < opinion.value.length; i++) {
                  if (opinion.value[i].frame === frame && opinion.value[i].datetime === datetime) {
                    opinion.value.splice(i, 1)
                    break;
                  }
                }
                activePostindex.value = -1
              }
            })
      })
      .catch(() => {

      })
}
const setActivePost = (index, frame: string, datetime: number) => {
  activePostindex.value = index
  shenyueapi.setallstrokes(frame, datetime)
}
const datetime = (date) => {
  const dateObj = new Date(date*1000)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const hour = dateObj.getHours()
  const minute = dateObj.getMinutes()
  const second = dateObj.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
</script>

<template>

  <el-scrollbar style="height: calc(100vh - 120px);">
  <div :key="post.datetime" class="white-post2" :class="{ 'active-post': index === activePostindex }" v-for="(post, index) in opinion" style=" cursor: pointer;background-color: #1d2029;border-bottom: 1px solid #3b4252;padding: 15px 20px;" @click="setActivePost(index,post.frame,post.datetime)" >
    <div class="flex items-center mb-2" style="">
      <img style="border-radius: 50%;" alt="User avatar" class="w-10 h-10  mr-2" src="https://placehold.co/40x40"/>
      <div>
        <div class="text-sm text-gray-400" style="font-size: 12px; color:#737e9f;">
         {{ post.userId }} 编辑于 {{ datetime(post.datetime) }}
        </div>
        <div class="flex text-blue-400" style="color: #4d70ff;margin-top: 3px;">
          <div  style="padding:0px 5px;background-color:#2e323d;border-radius: 5px;">
            {{ banben }}
          </div>
          <div class="ml-5" >{{ Untils.CurrenttimetovideoTime(post.currenttime) }}</div>
          <el-icon v-if="post.hasstrokes" :size="16" color="#4d70f2">
            <component :is="star"/>
          </el-icon>
        </div>
      </div>
    </div>
    <div class="ml-12">
      <div style="margin-top: 10px;margin-bottom: 10px;font-size: 12px;color: #d2dae6;">
        <span style="font-family: system-ui;">{{ post.context }}</span>
      </div>
      <div class="  flex text-sm text-gray-400" style="font-size: 12px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">
<!--        <div class="white-post mr-4" style="cursor: pointer;color: #737e9f;">-->
<!--          回复(0)-->
<!--        </div>-->
        <div class="ml-5 white-post" @click="deletePost(post.frame,post.datetime)" style="cursor: pointer;color: #737e9f; " >
          删除
        </div>
      </div>
    </div>
  </div>
  </el-scrollbar>
</template>

<style scoped>
.active-post {
  background-color: #282b35 !important;
  box-shadow: inset 2px 0px 0px 0px #4d70ff;
}

.white-post2:hover {

  background-color: #282b35!important;
}
.white-post:hover {
  color: #f5efef !important;
}
.ml-5{
  margin-left: 5px;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.mr-2 {
  margin-right: 0.5rem;
}
.w-10 {
  width: 2.5rem;
}
.h-10 {
  height: 2.5rem;
}
.text-sm {
  font-size: 12px;
}
.text-gray-400 {
  color: #9CA3AF;
}
.text-blue-400 {
  font-size: 13px;
  color: #4299E1;
}

.text-gray-400 {
  color: #9CA3AF;

}

</style>