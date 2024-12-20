<template>
  <div class="waveform-container">
    <div ref="waveform" class="waveform">

    </div>

    <input type="checkbox" id="loop-checkbox" v-model="loop"/> 循环播放
    <input type="range" style="width: 300px" id="zoom-slider" min="0" max="100" step="5" :value="rangevalue"/>
    <input type="range" style="width: 300px" id="ratespeed" min="0" max="4" step="1" value="1"/>

    <el-button style="width: 200px" :type="isPlaying ? 'warning' : 'success'" @click="playSelectedRegion">
      {{ isPlaying ? '暂停' : '播放' }}
    </el-button>
  </div>
  <!--    <el-button @click="setregions(1,5)">jjj</el-button>-->
  <!--  <el-button @click="regionssetOptions">kkk</el-button>-->
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, defineProps, nextTick} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom.esm.js'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js'

const audio_path = ref('./audio_cache/DesginAudio.mp3');
const waveform = ref<HTMLElement | null>(null);
const waveSurfer = ref();
const isPlaying = ref(false);
const loop = ref(false);
const regions = ref(RegionsPlugin.create());
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;
const starttime = ref(0);
const endtime = ref(0);

// const setregions = (start: number, end: number) => {
//   // console.log(regions.value);
//   // regionoptions.value.start = start;
//   // regionoptions.value.end = end;
//   starttime.value = start;
//   endtime.value = end;
//   //时间线跳转到start
//   if (waveSurfer.value) {
//     waveSurfer.value.setTime(start);
//   }
// }

const set_regions = async (data) => {
  console.log(data);

  regions.value.clearRegions();
    for (let i = 0; i < data.length; i++) {
      const start = data[i].start_time_int/1000;
      const end = data[i].end_time_int/1000;
      const text = data[i].text.slice(0, 4);//获取前4个字
      regions.value.addRegion({
        start: start,
        end: end,
        // color: randomColor(),
        content: text,
        minLength: 1,
      });
    }


}
const plugins = ref([
  regions.value,
  TimelinePlugin.create(),
  Hover.create({
    lineColor: '#ff0000',
    lineWidth: 2,
    labelBackground: '#555',
    labelColor: '#fff',
    labelSize: '11px',
  }),
  ZoomPlugin.create({
    scale: 0.05,
    maxZoom: 100,
  }),
])
const emit = defineEmits(['timeupdated']);

onMounted(() => {
  if (waveform.value) {
    waveSurfer.value = WaveSurfer.create({
      container: waveform.value,
      waveColor: 'violet',
      progressColor: 'purple',
      // backend: 'MediaElement',
      minPxPerSec: 50,
      height: 100,
      barWidth: 1,
      scrollParent: true, // 启用滚动
      cursorWidth: 2,
      // hideScrollbar: true, // 显示滚动条
      responsive: true,
      plugins: plugins.value,
    });

    // 加载音频文件
    waveSurfer.value.load(audio_path.value);
    // 创建一些特定时间范围的区域
    // waveSurfer.value.on('decode', () => {
    //   regions.value.addRegion({
    //     start: 0,
    //     end: 1,
    //     content: '同学们大家好',
    //     // color: randomColor(),
    //     // drag: false,
    //     resize: true,
    //   });
    //   regions.value.addRegion({
    //     start: 2,
    //     end: 3,
    //     content: 'Resize me2',
    //     // color: randomColor(),
    //     // drag: false,
    //     resize: true,
    //   });
    //   // setregions(0, 0);
    // });

    // regions.value.enableDragSelection({
    //   color: 'rgba(255, 0, 0, 0.1)',
    // });
    // let activeRegion: any = null;
    //
    regions.value.on('region-updated', (region) => {
      console.log('Updated region', region);
      starttime.value = region.start;
      endtime.value = region.end;
      // activeRegion = region;
      console.log(starttime.value, endtime.value);
      emit('timeupdated', starttime.value, endtime.value);
    });
    // regions.value.on('region-in', (region) => {
    //   // console.log('region-in', region);
    //   activeRegion = region;
    // });
    // regions.value.on('region-out', (region) => {
    //   // console.log('region-out', region);
    //   if (activeRegion === region) {
    //     if (loop.value) {
    //       region.play();
    //     } else {
    //       waveSurfer.value.pause();
    //       isPlaying.value = false;
    //       activeRegion = null;
    //     }
    //   }
    // });
    // regions.value.on('region-clicked', (region, e) => {
    //   e.stopPropagation(); // 防止触发波形图上的点击事件
    //   // console.log('Clicked region', isPlaying.value);
    //   activeRegion = region;
    //   region.play();
    //   isPlaying.value = true;
    //   region.setOptions({color: randomColor()});
    // });
    //
    // // 重置活动区域
    // waveSurfer.value.on('interaction', () => {
    //   activeRegion = null;
    // });

    // 更新缩放级别
    document.querySelector('input[type="range"]')?.addEventListener('input', (rangee) => {
      const minPxPerSec = Number((rangee.target as HTMLInputElement).value);
      rangevalue.value = minPxPerSec;
      waveSurfer.value?.zoom(minPxPerSec);
    });
    document.addEventListener('keydown', (e) => {
      // rangevalue.value = Number((document.querySelector('input[type="range"]') as HTMLInputElement).value);
      if (e.code === 'Equal' || e.code === 'NumpadAdd') {
        console.log('zoom in');
        rangevalue.value += 5;
        if (rangevalue.value > 100) {
          rangevalue.value = 100;
        }
        // console.log(rangevalue.value);

        waveSurfer.value?.zoom(rangevalue.value);
      } else if (e.code === 'Minus' || e.code === 'NumpadSubtract') {
        console.log('zoom out');
        rangevalue.value -= 5;
        if (rangevalue.value < 0) {
          rangevalue.value = 0;
        }
        waveSurfer.value?.zoom(rangevalue.value);
      }
      if (e.code === 'Space') {
        playSelectedRegion();
      }
    });
    //监听鼠标滚轮事件
    document.addEventListener('wheel', (e) => {
      console.log(waveSurfer.value);
      console.log(waveSurfer.value.options.minPxPerSec);
      //获取现在的缩放级别
      const currentZoom = waveSurfer.value.options.minPxPerSec;
      rangevalue.value = currentZoom;
      console.log(currentZoom);
    });




    document.querySelector('#ratespeed').addEventListener('input', (e) => {
      const speeds = [0.5, 1, 2, 3, 4]
      const speed = speeds[e.target.value]
      console.log(speed)
      waveSurfer.value.setPlaybackRate(speed, true)
    })

  }


});
const rangevalue = ref(50);
const playSelectedRegion = () => {
  console.log(regions);
  if (waveSurfer) {
    if (waveSurfer.value.isPlaying()) {
      waveSurfer.value.pause();
      isPlaying.value = false;
    } else {
      waveSurfer.value.play();
      isPlaying.value = true;
    }
  }
};


defineExpose({
  waveSurfer,
  starttime,
  endtime,
  // setregions,
  set_regions
})
</script>

<style scoped>
.waveform-container {
  width: 100%;
  height: 200px;
  overflow-x: auto; /* 启用横向滚动 */
}

.waveform {
  width: 100%; /* 确保波形图宽度足够大 */
  height: 160px; /* 波形图高度 */
}
</style>
