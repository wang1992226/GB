<template>
  <div class="video-container">
    <div class="video-player">
      <div class="video-container" ref="videoContainer" width="100%" height="100%">
        <div v-if="showcanvas" class="canvas-container">
          <canvas ref="canvasRef" class="video-canvas" style="z-index:2;width: 100%; height: 100%; " id="canvas"
                  @mousedown="startDrawing" @mousemove="draw"
                  @mouseup="stopDrawing"></canvas>
          <canvas ref="canvasRef2" class="video-canvas" style="z-index:1;width: 100%; height: 100%; "
                  id="canvas2"></canvas>
        </div>
        <videoplay ref="videoplayref" :cvideoSrc="props.videoSrc" :opinion="opinion"/>
      </div>
    </div>
  </div>
  <canvascontrol ref="canvascontrolref"
                 @data-sent="handleDataFromChild"
                 @revoke="revoke"
                 @clear="clearCanvas"
                 @startdrawing="startdrawingsu"
                />
</template>

<script lang="ts" setup>
import {ref, onMounted, watch, defineProps, nextTick, inject, provide} from 'vue';
import Untils from '@/components/shenyue/untils.js'
import {debounce} from 'lodash';
import line from '@/components/icons/line.vue';
import circle from '@/components/icons/circle.vue';
import rect from '@/components/icons/rect.vue';
import arrow from '@/components/icons/arrow.vue';
import text from '@/components/icons/text.vue';


import videoplay from '@/components/shenyue/videoplay.vue'
import canvascontrol from '@/components/shenyue/canvascontrol.vue'
const canvascontrolref = ref(null)

const handleDataFromChild = () => {
  let hasstrokes = false;
  if (allstrokes.length > 0) {
    hasstrokes = true;
  }
  const new_opinion = {
    frame: (currentTime.value * 25).toFixed(0),
    currenttime: currentTime.value,
    hasstrokes: hasstrokes,
    strokes: allstrokes,
    context: canvascontrolref.value.textareatext
  }
  axios.post(process.env.VUE_APP_API_URL + '/yizhijiao/shenyue/opinion/' + record.value + '/' + banben.value, new_opinion).then(res => {
    // console.log(res.data.data);
    if (res.data.code == 200) {
      if (opinion.value && opinion.value.length > 0) {
        opinion.value.unshift(res.data.data);
      } else {
        opinion.value = [res.data.data];
      }
      // clearCanvas();
      readydraw.value = false;
      // showcanvas.value = false;
      activePostindex.value = 0
      canvascontrolref.value.textareatext = ''
    }
  })
}
const currentShape = ref('line');
const currentColor = ref('#000000');

const startdrawingsu = () => {
  // console.log(canvascontrolref.value.currentColor, canvascontrolref.value.currentShape);
  currentShape.value = canvascontrolref.value.currentShape;
  currentColor.value = canvascontrolref.value.currentColor;
  startdraw();
}

const readydraw = ref(false);
const showcanvas = ref(false);
const canvasRef = ref(null)
const canvasRef2 = ref(null)
const videoPlayer = ref(null)
import simplify from 'simplify-js';
const banben = inject('banben')
const record = inject('record')
const opinion = inject('opinion')
const currentTime = inject('currentTime')
var allstrokes = inject('allstrokes')
const activePostindex = inject('activePostindex')
const loading = inject('loading')

import Canvas from '@/utils/CanvasClass.js';
import axios from "axios";

const duration = ref(0)
provide('duration', duration)

const isPlaying = ref(false)
const playbackRate = ref(1.0)
const isDrawing = ref(false);
const context = ref(null);
let strokes;

const currentShapeData = ref<{ x: number; y: number; w: number; h: number } | null>(null);
const currentLineWidth = ref(5);
const textInput = ref();
const textareaopened = ref(false);
let currentTextPosition = {x: 0, y: 0};
let linedata;
let shapeStart;

const revoke = () => {
  console.log('撤销');
  // 删除最后一个笔画
  if (allstrokes.length > 0) {
    allstrokes.pop();
  }
}

const props = defineProps({
  videoSrc: {type: String, default: '', required: true},
  videoTitle: {type: String, default: ''},
});

const startDrawing = (event: MouseEvent) => {
  console.log(canvasInstance);
  if (currentShape.value === 'text' || currentShape.value === '') {
    return;
  } // 文字模式下不绘制任何线条
  isDrawing.value = true;
  canvasInstance.setstrokeStyle(currentColor.value)
  canvasInstance.setlineWidth(currentLineWidth.value)
  if (currentShape.value === 'line') {
    canvasInstance.drawLinestart(event.offsetX, event.offsetY, currentColor.value, currentLineWidth.value * 3);
    const stroke = {
      canvaswidth: canvasRef.value!.width,
      canvasheight: canvasRef.value!.height,
      type: 'line',
      data: [{x: event.offsetX, y: event.offsetY}],
      color: currentColor.value,
      lineWidth: currentLineWidth.value
    };
    linedata = stroke;
  }
  if (currentShape.value != 'text' && currentShape.value != 'line') {
    shapeStart = {x: event.offsetX, y: event.offsetY};
  }
};

const draw = (event: MouseEvent) => {
  if (!isDrawing.value) {
    return;
  }
  if (currentShape.value === 'text') {
    return;
  }
  if (currentShape.value === 'line') {
    canvasInstance.drawLineTo(event.offsetX, event.offsetY);
    linedata.data.push({x: event.offsetX, y: event.offsetY});
  }
  if (currentShape.value !== 'line' && shapeStart) {
    // 计算当前的形状
    const width = event.offsetX - shapeStart.x;
    const height = event.offsetY - shapeStart.y;
    currentShapeData.value = {x: shapeStart.x, y: shapeStart.y, w: width, h: height};

    // 重新绘制所有已有的笔触
    if (strokes && strokes.length > 0) {
      canvasInstance.drawstrokes(strokes)
    }
    canvasInstance.clear();
    console.log('strokes', strokes);

    if (currentShape.value === 'circle') {
      const radius = Math.sqrt(width * width + height * height);
      canvasInstance.drawCircle(shapeStart.x, shapeStart.y, radius, currentColor.value);
    } else if (currentShape.value === 'rect') {
      canvasInstance.drawRect(shapeStart.x, shapeStart.y, width, height, currentColor.value);
    } else if (currentShape.value === 'arrow') {
      canvasInstance.drawArrow(shapeStart.x, shapeStart.y, event.offsetX, event.offsetY, currentColor.value);
    }
  }
};

const stopDrawing = (event) => {
  let stroke;
  if (currentShape.value == 'line') {
    linedata.data = simplify(linedata.data, 2.0);
    // console.log('linedata', linedata.data);
    allstrokes.push(linedata);
    stroke = linedata;
    linedata = {};
  }
  isDrawing.value = false;
  if (currentShape.value !== 'line' && shapeStart && currentShapeData.value) {
    // 将完成的形状添加到笔触列表中
    stroke = {
      canvaswidth: canvasRef.value!.width,
      canvasheight: canvasRef.value!.height,
      type: currentShape.value,
      data: currentShapeData.value,
      color: currentColor.value,
      lineWidth: currentLineWidth.value
    };
    console.log('stroke2', stroke);
    allstrokes.push(stroke);
    shapeStart = null;
    currentShapeData.value = null;
  }
  if (currentShape.value == 'text') {
    startTextEntry(event);
  }

  // console.log(canvasInstance.toDataURL());
  canvasInstance.clear();
  // canvasInstance2.drawstrokes(allstrokes);

  canvasInstance2.updatestroke(stroke);
  console.log('提交的绘画数据:', allstrokes);
};

const startTextEntry = (event) => {
  const canvasRect = event.target.getBoundingClientRect();
  currentTextPosition = {
    x: event.clientX - canvasRect.left,
    y: event.clientY - canvasRect.top
  };

  const textarea = document.createElement('textarea');
  textarea.className = 'text-input';
  textarea.style.position = 'absolute';
  textarea.style.left = `${currentTextPosition.x}px`;
  textarea.style.top = `${currentTextPosition.y - 2}px`;
  textarea.style.zIndex = '9999';
  textarea.style.border = '1px solid #000';
  textarea.style.padding = '2px';
  textarea.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // 半透明背景
  textarea.style.width = '150px';
  textarea.style.height = '100px';
  textarea.wrap = 'off';
  textarea.addEventListener('blur', finishTextEntry);

  const container = document.querySelector('.canvas-container');
  if (container) {
    container.appendChild(textarea);
    textInput.value = textarea;
    textInput.value.style.fontSize = `${currentLineWidth.value * 3}px`;
    textInput.value.style.color = currentColor.value;
    textarea.focus();
    textareaopened.value = true;
  }
};

function Redrawcanvas(strokesdata) {
  allstrokes = strokesdata;
  readydraw.value = false;
  if (strokesdata.length > 0) {
    showcanvas.value = true;
    nextTick(async () => {
      // initcanvas2();
      canvasInstance2 = initcanvas(canvasRef2.value);
      return await canvasInstance2.drawstrokes(strokesdata);
    })
  } else {
    showcanvas.value = false;
  }
}

defineExpose({
  Redrawcanvas,
  videoPlayer,
});

const finishTextEntry = (event) => {
  if (textInput.value) {
    const input = textInput.value;
    const text = input.value.trim();
    if (text) {
      allstrokes.push({
        canvaswidth: canvasRef.value!.width,
        canvasheight: canvasRef.value!.height,
        type: 'text',
        data: {...currentTextPosition, text},
        color: currentColor.value,
        lineWidth: currentLineWidth.value,
      });
    }
    input.remove();
    textInput.value = null;
    currentTextPosition = null;
    canvasInstance2.drawstrokes(allstrokes);
  }
};


const startdraw = () => {
  if (readydraw.value!= true) {
    console.log('readydraw', readydraw.value);
    showcanvas.value = true;
    readydraw.value = true;
    nextTick(() => {
      canvasInstance = initcanvas(canvasRef.value);
      canvasInstance2 = initcanvas(canvasRef2.value);
    })
  }
}


let canvasInstance;
let canvasInstance2;
onMounted(() => {
  window.addEventListener('resize', debouncedCalculateContainerSize);
});

const videoplayref = ref(null)

const initcanvas = (canvref) => {
  const canvasElement = canvref;
  canvasInstance = new Canvas(canvasElement.id);
  let videodom = videoplayref.value
  canvasInstance.CanvasResize(videodom.playerwidth, videodom.playerheight);
  canvref.style.width = `${videodom.offsetWidth}px`;
  canvref.style.height = `${videodom.offsetHeight}px`;
  return canvasInstance;
}



const videoContaineroffset = ref([]);

const calculateContainerSize = () => {
  // videooffwidth.value = videoPlayer.value.offsetWidth;
  console.log('calculateContainerSize');
  if (!showcanvas.value) {
    return
  }

  let videodom = videoplayref.value
  const vcw = videodom.playerwidth;
  const vch = videodom.playerheight;
  videoContaineroffset.value = [vcw, vch];

  canvasInstance2.CanvasResize(vcw, vch);
  canvasRef2.value.style.width = `${vcw}px`;
  canvasRef2.value.style.height = `${vch}px`;

  canvasInstance2.drawstrokes(allstrokes);
};
// 使用 debounce 创建一个防抖函数
const debouncedCalculateContainerSize = debounce(calculateContainerSize, 10);


const clearCanvas = () => {
   console.log('清除画布');
  if (readydraw.value) {
    strokes = [];
    allstrokes = [];
    if (canvasRef.value) {
      canvasInstance.clear();
    }
    if (canvasRef2.value) {
      canvasInstance2.clear();
    }
  }
}

</script>

<style scoped>


.current-time p {
  margin: 0;
  font-size: 14px;
  color: #949494;
}


.video-container {
  //position: relative;
  width: 100%;
  //height: 500px;
}

/* 隐藏进度条的文本 */
.el-progress__text {
  display: none;
}

.video-container {
  position: relative;
}

.video-canvas {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  //background-color: rgba(108, 41, 41, 0.29);;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.video-player {
  //position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
}


</style>