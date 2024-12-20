<template>
  <div id="app">
    <div class="image-list">
      <ImageList ref="imageListRef" :images="images" @update:currentelement="onImageSelect" />
    </div>
    <CanvasComponent ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CanvasComponent from '@/components/视频剪辑/canvasc.vue';
import ImageList from '@/components/视频剪辑/ImageList.vue';

const images = ref(['b.png','a.png', 'c.png']);
// const currentelement = ref(images[0]);
const AllElementsData = ref([]);
const imageListRef = ref();
const canvasRef = ref();
const onImageSelect = (image: any) => {
  console.log('fdsfdsfds');
  // images.value=image;
  canvasRef.value.selectElement(image);
};

// const setImages = (newImages: string[]) => {
//   images.value = newImages;
// };

onMounted(() => {
  imageListRef.value.setImages(['b.png','a.png', 'c.png']);
  canvasRef.value.setImages(['b.png','a.png', 'c.png']);
});

</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.image-list {
  width: 300px;
}
</style>
