<script lang="ts" setup>
import videoplayer from '@/components/shenyue/VideoPlayer.vue'
import Aside from '@/components/shenyue/Aside.vue'
import {nextTick, onMounted, provide, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";

const opinion = ref([])
provide('opinion', opinion)
const banben = ref('')
provide('banben', banben)
const record = ref('')
provide('record', record)
const currentTime = ref<number>(0)
provide('currentTime', currentTime)
var allstrokes = [];
provide('allstrokes', allstrokes)
const activePostindex = ref(-1)
provide('activePostindex', activePostindex)
const loading = ref(false)
provide('loading', loading)
// const show


const minwidth = 1365;
const minheight = 820;


const content = ref<HTMLElement | null>(null);
const resizeContent = () => {
  if (content.value) {
    if (window.innerWidth > minwidth && window.innerHeight > minheight) {
      if (content.value.offsetHeight < window.innerHeight - 80) {
      //   console.log(content.value.offsetHeight, window.innerHeight - 80);
        content.value.style.maxWidth = window.innerWidth - 460-20 + 'px';
      }
      if (content.value.offsetHeight > window.innerHeight - 80) {
        // const aspectRatio = content.value.offsetWidth / content.value.offsetHeight;
        // content.value.style.maxWidth = (window.innerWidth - 460-20)/aspectRatio + 'px' ;
        console.log('yyyyyy',content.value.offsetHeight, window.innerHeight - 80, content.value.offsetWidth );
        content.value.style.maxWidth =content.value.offsetWidth-(content.value.offsetHeight-window.innerHeight+80)+ 'px' ;
      }
    }
  }
};
const Apiurl = process.env.VUE_APP_API_URL + '/yizhijiao/shenyue'
const shenyueapi = {
  setallstrokes: (frame, datetime) => {
    axios.get(Apiurl + `/${record.value}/${banben.value}/strokes/` + frame + '/' + datetime)
        .then(async res => {
          currentTime.value = frame / 25;
          console.log(res.data);
          if (res.data.code === 200) {
            videoplayerMethods.value.Redrawcanvas(res.data.data)
            console.log(videoplayerMethods.value.videoPlayer.currentTime = currentTime.value)
          }
        })
  },
  deleteopinion: (frame, datetime) => {
    return axios.delete(Apiurl + `/${record.value}/${banben.value}/` + frame + '/' + datetime)
  }
}
provide('shenyueapi', shenyueapi)

const changebanben = (item) => {
  banben.value = item
  videoSrc.value = process.env.VIDEO_API_URL + `/${record.value}/${banben.value}/${record.value}.mp4`

  getopinion()
}
const banbenlist = ref([])
onMounted(() => {
  const route = useRoute();
  record.value = route.query.record as string | null;
  console.log('Record:', record.value);
  if (record) {
    loading.value = true
    axios.get(process.env.VUE_APP_API_URL + '/yizhijiao/shenyue/' + record.value).then(res => {
      console.log(res.data);
      banbenlist.value = res.data.filelist
      banben.value = res.data.filelist[0]
      videoSrc.value = process.env.VIDEO_API_URL + `/${record.value}/${banben.value}/${record.value}.mp4`
      // console.log(videoSrc.value);
      loading.value = false
      getopinion()
    })
  }
});
const videoSrc = ref('')
const getopinion = () => {
  axios.get(process.env.VUE_APP_API_URL + '/yizhijiao/shenyue/opinion/' + record.value + '/' + banben.value).then(res => {
    console.log(res.data);
    opinion.value = res.data['opinion_json'];
    console.log(opinion.value);
  })
};
const videoplayerMethods = ref(null)
onMounted(() => {
  window.addEventListener('resize', resizeContent);
  // resizeContent(); // 初始调用
});
</script>
<template>
  <el-container v-loading="loading" class="layout-container-demo noneselect"
                style="height: 100%;min-width: 1365px;min-height: 820px;">
    <el-header class="Header">
      <div class="toolbar">
      <el-dropdown trigger="click">

        <el-button class="el-dropdown-link">
          {{ banben }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in banbenlist" :key="item" @click="changebanben(item)">{{ item }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      </div>
    </el-header>
    <el-container element-loading-background="rgba(122, 122, 122, 0.8)" style="height:calc(100% - 60px);">
      <el-main style="
    background-color: rgb(13, 15, 21);
    display: flex;
    align-items: center;
    padding: 0px;
    justify-content: center;">
        <el-scrollbar wrap-style="display: flex; align-items: center; justify-content: center;">
          <div class="content-wrapper" >
            <div class="content" ref="content">
              <videoplayer ref="videoplayerMethods" :videoSrc="videoSrc" :videoTitle="'ewrewr'"/>
            </div>
          </div>
        </el-scrollbar>

      </el-main>
      <el-aside width="460px" style="background-color: #1c1e26;overflow: hidden;height: calc(100vh - 60px);">
        <Aside/>
      </el-aside>
    </el-container>

  </el-container>


</template>

<style scoped>
.noneselect {
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */
}

.Header {
  background-color: #1d2029;
}

.common-layout {
  position: relative;
  height: 100%;
}

.content {
  padding: 20px;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

</style>