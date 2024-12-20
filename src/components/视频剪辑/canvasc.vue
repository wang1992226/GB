<template>
  <div class="canvas-container">
<div class="canvas-container-inner">
  <canvas class="canvas" ref="canvasRef"></canvas>
</div>
    
    <div class="controls" style="background-color: #161616;border: 1px solid #5e5e5e; height: 100px;">
      <button @click="scaleSelectedElement">铺满画布</button>
      <button @click="printAllElementsData">打印所有元素数据</button>
      <!-- <button @click="selectElement">选择元素</button> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as fabric from 'fabric';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let canvas: fabric.Canvas | null = null;



const setImages = (images: string[]) => {
  const imagePromises = images.map((imgSrc) => {
      return fabric.Image.fromURL(`./${imgSrc}`, {
        crossOrigin: 'anonymous' // 解决 CORS 问题
      }).then((img) => {
        img.set({
          id: imgSrc,
          left: 0,
          top: 0,
          dirty: true,
          scaleX: 1*allscale.value,
          scaleY: 1*allscale.value,
        });
        canvas.add(img);
      });
    });
    Promise.all(imagePromises).then(() => {
      canvas.renderAll();
    }).catch((error) => {
      console.error(error);
    });
};
const allscale=ref(1);
// const element_index = ref(0);
//置顶元素
const selectElement = (element_str: string) => {
  const objects = canvas.getObjects();
  const element = objects.find((obj: any) => obj.id === element_str);
  // element=objects[element_index.value]
  // element_index.value++;
  // if(element_index.value>=objects.length){
  //   element_index.value=0;
  // }
  console.log(element);
  canvas.setActiveObject(element);
  canvas.requestRenderAll();
};

onMounted(() => {
  if (canvasRef.value) {
    canvas = new fabric.Canvas(canvasRef.value, {
      width: 1920,
      height: 1080
    });
  }
  //监听快捷键-和+控制canvas的缩放
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    console.log(event.key);
    if (event.key === '-') {
      allscale.value=allscale.value*0.9;
      scaleCanvas();
    } else if (event.key === '=') {
      allscale.value=allscale.value*1.1;
      scaleCanvas();
    }
    
  });
});

const scaleCanvas = () => {
  canvas.setWidth(1920 * allscale.value);
  canvas.setHeight(1080 * allscale.value);
  canvas.setViewportTransform([allscale.value, 0, 0, allscale.value, 0, 0]);
  canvas.renderAll();
};



const scaleSelectedElement = () => {
  if (canvas && canvas.getActiveObject()) {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      // const scaleFactor = 1920 / activeObject.width;
      // activeObject.scaleToWidth(1920);
      activeObject.left = 0;
      activeObject.top = 0;
      activeObject.scaleX = 1;
      activeObject.scaleY = 1;
      activeObject.setCoords();
      canvas.renderAll();
    }
  }
};

const printAllElementsData = () => {
  if (canvas) {
    const objects = canvas.getObjects();
    console.log('所有元素数据:', objects);
  }
};

defineExpose({
  setImages,
  selectElement
});

</script>
<style scoped>
.canvas-container-inner{
  width: 100%;
  height: calc(100vh - 100px);
  background-color: #161616;
  border: 1px solid #5e5e5e;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas{
  background-color: #232323;
}
.canvas-container {
  position: relative;
  width: 100%;
  height: 100%; /* 使容器高度占满整个视口 */
  
}

canvas {
  display: block;
}

.controls {
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;

}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
