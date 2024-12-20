<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch, defineProps} from 'vue';
import Canvas from '@/utils/CanvasClass.js';


const canvasRef = ref(null);
const isDrawing = ref(false);
const context = ref(null);
const strokes = ref([]);
const currentShape = ref('');
const shapeStart = ref<{ x: number; y: number } | null>(null);
const currentShapeData = ref<{ x: number; y: number; w: number; h: number } | null>(null);
const currentColor = ref('#000000');
const currentLineWidth = ref(5);
const textInput = ref();
const textareaopened = ref(false); // 新增的状态，用于追踪是否处于 textarea 输入模式
let currentTextPosition = {x: 0, y: 0};


watch([currentLineWidth, currentColor], () => {
  if (textInput.value) {
    applyStyleToTextInput();
  }
});

const startDrawing = (event: MouseEvent) => {
  if (currentShape.value === 'text' || currentShape.value === '') {
    return;
  } // 文字模式下不绘制任何线条
  isDrawing.value = true;
  if (currentShape.value === 'line') {
    canvasInstance.drawLinestart(event.offsetX, event.offsetY, currentColor.value, currentLineWidth.value);
    const stroke = {
      canvaswidth: canvasRef.value!.width,
      canvasheight: canvasRef.value!.height,
      type: 'line',
      data: [{x: event.offsetX, y: event.offsetY}],
      color: currentColor.value,
      lineWidth: currentLineWidth.value
    };
    strokes.value.push(stroke);
  }
  if (currentShape.value != 'text' && currentShape.value != 'line') {
    shapeStart.value = {x: event.offsetX, y: event.offsetY};
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
    const lastStroke = strokes.value[strokes.value.length - 1];
    if (lastStroke) {
      lastStroke.data.push({x: event.offsetX, y: event.offsetY});
    }
  }

  if (currentShape.value !== 'line' && shapeStart.value) {
    // 计算当前的形状
    const width = event.offsetX - shapeStart.value.x;
    const height = event.offsetY - shapeStart.value.y;
    currentShapeData.value = {x: shapeStart.value.x, y: shapeStart.value.y, w: width, h: height};

    // 重新绘制所有已有的笔触
    canvasInstance.drawstrokes(strokes.value)

    if (currentShape.value === 'circle') {
      const radius = Math.sqrt(width * width + height * height);
      canvasInstance.drawCircle(shapeStart.value.x, shapeStart.value.y, radius, currentColor.value);
    } else if (currentShape.value === 'rect') {
      canvasInstance.drawRect(shapeStart.value.x, shapeStart.value.y, width, height, currentColor.value);
    } else if (currentShape.value === 'arrow') {
      canvasInstance.drawArrow(shapeStart.value.x, shapeStart.value.y, event.offsetX, event.offsetY, currentColor.value);
    }
  }
};
const stopDrawing = (event) => {
  isDrawing.value = false;
  if (currentShape.value !== 'line' && shapeStart.value && currentShapeData.value) {
    // 将完成的形状添加到笔触列表中
    strokes.value.push({
      canvaswidth: canvasRef.value!.width,
      canvasheight: canvasRef.value!.height,
      type: currentShape.value,
      data: currentShapeData.value,
      color: currentColor.value,
      lineWidth: currentLineWidth.value
    });
    shapeStart.value = null;
    currentShapeData.value = null;
  }
  if (currentShape.value == 'text') {
    startTextEntry(event);
  }
  //存cookies
  // let strokes_str = JSON.stringify(strokes.value);
  // document.cookie = `strokes=${strokes_str}`;
  console.log('提交的绘画数据:', strokes.value);
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


const applyStyleToTextInput = () => {
  if (textInput.value) {
    textInput.value.style.fontSize = `${currentLineWidth.value}px`;
    textInput.value.style.color = currentColor.value;
  }
};


const finishTextEntry = (event) => {
  if (textInput.value) {
    const input = textInput.value;
    const text = input.value.trim();
    if (text) {
      strokes.value.push({
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
    canvasInstance.drawstrokes(strokes.value);
  }
};

const setColor = (color: string) => {
  currentColor.value = color;
  console.log(`设置颜色为 ${color}`);
  updateContextStyles(); // 更新当前上下文的颜色
};
const setLineWidth = (width: number) => {
  currentLineWidth.value = width;
  console.log(`设置线宽为 ${width}px`);
  updateContextStyles(); // 更新当前上下文的线宽
};

const updateContextStyles = () => {
  if (context.value) {
    context.value.fillStyle = currentColor.value;
    context.value.strokeStyle = currentColor.value;
    context.value.lineWidth = currentLineWidth.value;
  }
};

let canvasInstance = null;
onMounted(() => {
  if (canvasRef.value) {
    const canvasElement = canvasRef.value;
    canvasInstance = new Canvas(canvasElement.id);
  }
  // calculateContainerSize();
  // window.addEventListener('resize', calculateContainerSize);
});
// 当组件卸载前，移除事件监听器
onUnmounted(() => {
  // window.removeEventListener('resize', calculateContainerSize);
});

const containerStyle = ref({});
// 计算容器的样式
const calculateContainerSize = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const aspectRatio = 16 / 9;
  let width, height;
  if (windowWidth / windowHeight > aspectRatio) {
    // 如果窗口的宽高比大于16:9，则以高度为基础
    height = windowHeight;
    width = windowHeight * aspectRatio;
  } else {
    // 否则以宽度为基础
    width = windowWidth;
    height = windowWidth / aspectRatio;
  }
  containerStyle.value = {
    width: `${width}px`,
    height: `${height}px`
  };
  canvasInstance.CanvasResize(width, height);
};


const toggleShapeMode = (shape) => {
  console.log(props.parentRef);
  currentShape.value = shape;
  console.log(`切换到 ${shape} 模式`);
};

//清除按钮
const clearCanvas = () => {
  strokes.value = [];
}

const props = defineProps({
  parentRef: {type: null, default: null},
  parentstartDrawing: {type: Function, default: null},
  draw: {type: Function, default: null},
  stopDrawing: {type: Function, default: null},
});

watch(() => props.parentRef, (newVal) => {
  console.log('Parent ref changed:', newVal);
  canvasRef.value = newVal
});
watch(() => props.parentstartDrawing, (newVal) => {
  console.log('startDrawing changed:', newVal);
  // startDrawing = newVal
});
</script>

<template>
  <div class="canvas-container" :style="containerStyle">
<!--    <canvas ref="canvasRef" id="canvas" @mousedown="startDrawing" @mousemove="draw"-->
<!--            @mouseup="stopDrawing"></canvas>-->
  </div>
  <button @click="toggleShapeMode('line')">画笔</button>
  <button @click="toggleShapeMode('circle')">画圆</button>
  <button @click="toggleShapeMode('rect')">画框</button>
  <button @click="toggleShapeMode('arrow')">画箭头</button>
  <button @click="toggleShapeMode('text')">写字</button> <!-- 添加写字按钮 -->
  <input type="color" v-model="currentColor" @change="setColor(currentColor)">
<!--  <input type="number" v-model.number="currentLineWidth" @change="setLineWidth(currentLineWidth)" min="1" max="10">-->
  <!--  清除按钮 -->
  <button @click="clearCanvas">清除</button>
</template>

<style scoped>
canvas {
  border: 1px solid black;
  width: 100%;
  height: 100%;
}

.canvas-container {

  //background-image: url('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

input.text-input {
  position: absolute;
  border: 1px solid #000;
  padding: 2px;
  background-color: #d11f1f;
  z-index: 1000;
}

</style>