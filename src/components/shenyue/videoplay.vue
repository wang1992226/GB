<template>

  <video ref="videoplayercomponent" @timeupdate="handleTimeUpdate" @click="togglePlayPause"  width="100%"
         :src="props.cvideoSrc"/>
  <div class="controls">
    <!-- 缩略图预览 -->
    <!--    <div class="thumbnail-preview" :style="{ left: `${previewPosition}px` }" v-show="showPreview">-->
    <!--      <img width="100px" :src=" thumbnailSrc " alt="Video Preview"/>-->
    <!--    </div>-->
    <div ref="progressBar" class="progress-bar" @click="handleClick" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mousedown="handleMouseDown">
      <div class="progress" :style="{ width: `${(currentTime / duration) * 100}%` }"></div>
            <div v-if="showmarker"  class="marker" :style="{ left: markerPosition + 'px' }"></div>
    </div>

    <div class="opinion-container">
      <div class="opinionpopover" v-for="(item, index) in props.opinion" @click="popoverclick(item) "
           :style="{ left:(item.currenttime / duration) * playerwidth-10 +'px'}">
        <el-popover effect="dark" placement="top-start" :content="item.context? item.context : ''">
          <template #reference>
            <el-avatar style="width: 20px; height: 20px;"
                       src="https://avatars.githubusercontent.com/u/72015883?v=4"/>
          </template>
        </el-popover>
      </div>
    </div>

        <el-row class="row-bg"  justify="space-around">
          <el-col :span="6" class="current-time">
            <p>{{
                Untils.CurrenttimetovideoTime(currentTime) + '/' + Untils.CurrenttimetovideoTime(duration)
              }}</p>
            <p>{{ (currentTime * 25).toFixed(0) }} / {{
                (duration * 25).toFixed(0)
              }}</p>
          </el-col>
          <el-col :span="6" class="f-c">
            <div class="play-container f-c">
              <el-icon class="cupo noneselect"  @click="previousFrame" :size="30" color="#adb6cc">
                <component :is="shangzhen"/>
              </el-icon>
              <el-icon class="cupo noneselect" style="margin-left: 20px;margin-right: 20px;" @click="togglePlayPause"
                       :size="45" color="#adb6cc">
                <component :is="isPlaying?  zanting: bofang "/>
              </el-icon>
              <el-icon class="cupo noneselect" @click="nextFrame" :size="30" color="#adb6cc">
                <component :is="xiazhen"/>
              </el-icon>
            </div>
          </el-col>

          <el-col :span="6" class="f-c">
            <el-dropdown size="small" placement="top"  @mouseleave="dropdownLeave">
                  <span style="color: #adb6cc;font-size: 14px;margin-right: 10px;cursor: pointer;">{{
                      PlaybackRateLabel
                    }}</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in playbackRateList" :key="item.value" :label="item.label"
                                    :value="item.value" @click="setPlaybackRate(item.value)">
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-icon @click="audiocontrol" :size="25" color="#adb6cc">
              <component :is="audio ?  openaudio : closeaudio "/>
            </el-icon>
          </el-col>
        </el-row>
  </div>
</template>
<script lang="ts" setup>
import {ref, defineProps, onMounted, nextTick, watch,} from "vue";
import shangzhen from "@/components/icons/shangzhen.vue";
import zanting from "@/components/icons/zhanting.vue";
import bofang from "@/components/icons/bofang.vue";
import xiazhen from "@/components/icons/xiazhen.vue";
import openaudio from "@/components/icons/openaudio.vue";
import closeaudio from "@/components/icons/closeaudio.vue";
import VideoProgressBar from '@/components/shenyue/VideoProgressBar.vue'
import Untils from '@/components/shenyue/untils.js'
const markerPosition = ref(0);
const showmarker = ref(false)
const videoplayercomponent = ref(null)
const playerheight = ref(0)

const PlaybackRateLabel = ref('1.0x')
const playbackRateList = [
  {value: 0.25, label: '0.25x'},
  {value: 0.5, label: '0.5x'},
  {value: 1.0, label: '1.0x'},
  {value: 2, label: '2.0x'},
  {value: 4, label: '4.0x'},
  {value: 6, label: '6.0x'},
]
const audio = ref(true)

onMounted(() => {
  const video = videoplayercomponent.value
  video.addEventListener('loadedmetadata', () => {
    duration.value = video.duration
    playerwidth.value = videoplayercomponent.value.offsetWidth
    playerheight.value = videoplayercomponent.value.offsetHeight
  })
  window.addEventListener('resize', () => {
    playerwidth.value = videoplayercomponent.value.offsetWidth
    playerheight.value = videoplayercomponent.value.offsetHeight
  })
})


const dropdownLeave = () => {
  // 取消聚焦
  document.activeElement?.blur()
}
const audiocontrol = () => {
  audio.value = !audio.value
  if (audio.value) {
    videoplayercomponent.value.muted = false
  } else {
    videoplayercomponent.value.muted = true
  }
}
const setPlaybackRate = (playbackRate) => {
  videoplayercomponent.value.playbackRate = parseFloat(playbackRate);
  PlaybackRateLabel.value = playbackRateList.find(item => item.value == playbackRate).label
}

const previousFrame = () => {
  isPlaying.value = false;
  videoplayercomponent.value.pause()
  videoplayercomponent.value.currentTime = Math.max(videoplayercomponent.value.currentTime - 1 / 25, 0);
}

const nextFrame = () => {
  isPlaying.value = false;
  videoplayercomponent.value.pause()
  // console.log(props.videoSrc);
  videoplayercomponent.value.currentTime = Math.min(videoplayercomponent.value.currentTime + 1 / 25, duration.value);
}

const togglePlayPause = () => {
  if (videoplayercomponent.value.paused) {
    videoplayercomponent.value.play()
  } else {
    videoplayercomponent.value.pause()
  }
  isPlaying.value = !isPlaying.value
}

const playerwidth = ref(0)

const popoverclick = (item) => {
  currentTime.value = item.currenttime
}
const props = defineProps({
  cvideoSrc: {type: String, required: true},
  opinion: {type: Array, default: () => []},
})

const duration = ref<number | null>(null);
const currentTime = ref<number>(0)

const handleClick = (event: MouseEvent) => {
  currentTime.value =  (event.clientX-20) / playerwidth.value * duration.value;
  videoplayercomponent.value.currentTime = currentTime.value;
};
const handleMouseMove = (event: MouseEvent) => {
  showmarker.value = true;
  markerPosition.value = event.clientX-20;
};
const handleMouseDown = (event: MouseEvent) => {
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleMouseUp);
};
const handleMouseUp = (event: MouseEvent) => {
  window.removeEventListener('mousemove', handleDragMove);
  window.removeEventListener('mouseup', handleMouseUp);
};
const handleDragMove = (event: MouseEvent) => {
    handleMouseMove(event);
    handleClick(event);
};
const handleMouseLeave = () => {
  showmarker.value = false;
};
const progressBar = ref(null)
// 处理视频播放事件
const handleTimeUpdate = () => {
  if (videoplayercomponent.value) {
    currentTime.value = videoplayercomponent.value.currentTime;
    // console.log('handleTimeUpdate', currentTime.value)
  }
};
const isPlaying = ref(false)

defineExpose({
  currentTime,
  isPlaying,
  playerheight,
  playerwidth,
})

const setvideocurrentTime = (time: number) => {
  if (videoplayercomponent.value) {
    videoplayercomponent.value.currentTime = time
  }
}

//快捷键 空格播放
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    togglePlayPause()
  }
})

// watch(currentTime, (newVal) => {
//   if (videoplayercomponent.value) {
//     videoplayercomponent.value.currentTime = newVal
//   }
// }, {immediate: true, deep: true})

</script>
<style scoped>
.opinion-container {
  margin-top: 5px;
}
.cupo {
  cursor: pointer;
}

.f-c {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}
.current-time p {
  margin: 0;
  font-size: 14px;
  color: #949494;
}

.current-time {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.controls {
  background-color: #1d2029;
  width: 100%;
  color: #fff;
  padding-bottom: 10px;
  //height: 80px;
  //display: flex;
  //align-items: center;
}
.opinion-container {
  position: relative;
  height: 20px;
  margin-bottom: 20px;
}

.opinionpopover {
  position: absolute;
}

.progress-bar {
  //margin-bottom: 5px;
  position: relative;
  height: 10px;
  background-color: #282b35;
  cursor: pointer;
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #4d70ff;
}

.marker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #adb6cc;
  z-index: 1; /* 确保标记在预览图之上 */
}

.preview {
  position: absolute;
  top: -25px; /* 调整预览图的位置，使其不在进度条上 */
  //top: -20px;
  width: 100px;
  text-align: center;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 2; /* 确保预览图在标记之上 */
}

.preview img {
  max-width: 100%;
  max-height: 100px;
}
</style>