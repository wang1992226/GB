<template>
  <div class="progress-bar" @click="handleClick"
       @mousemove="handleMouseMove"
       @mouseleave="handleMouseLeave"
       @mousedown="handleMouseDown"
       @mouseup="handleMouseUp">
    <div class="progress" :style="{ width: progressWidth + '%' }"></div>
<!--    <div v-if="showPreview" class="preview" :style="{ left: previewPosition + 'px' }">-->
<!--      <img :src="previewImage" alt="Preview" />-->
<!--    </div>-->
    <div v-if="showMarker" class="marker" :style="{ left: markerPosition + 'px' }"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted, onUnmounted, inject} from 'vue';
const currentTime = inject('currentTime')
const duration = inject('duration')
const props = defineProps<{
  previewImage: string; // 预览图的 URL
}>();

// const emit = defineEmits(['update:currentTime']);
const progressBar = ref<HTMLElement | null>(null);

onMounted(() => {
  progressBar.value = document.querySelector('.progress-bar');
});
const showPreview = ref(false);
const showMarker = ref(false);
const markerPosition = ref(0);
const previewPosition = ref(0);

const progressWidth = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

const handleClick = (event: MouseEvent) => {
  const rect = progressBar.value?.getBoundingClientRect();
  const clickPosition = event.clientX - rect.left;
  const newTime = (clickPosition / rect.width) * duration.value;
  // console.log(rect.width,clickPosition,duration.value);
  currentTime.value = newTime;
  // console.log(currentTime.value);
};
const handleMouseMove = (event: MouseEvent) => {
  const rect = progressBar.value?.getBoundingClientRect();
  if (!rect) return;
  const mousePosition = event.clientX - rect.left;
  markerPosition.value = mousePosition;
  previewPosition.value = mousePosition - 50; // 调整预览图的位置
  showMarker.value = true;
  showPreview.value = true;
};

let isDragging = ref(false);
const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true;
  handleMouseMove(event); // 更新初始位置
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleMouseUp);
};
const handleMouseUp = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', handleDragMove);
  window.removeEventListener('mouseup', handleMouseUp);
};

const handleDragMove = (event: MouseEvent) => {
  if (isDragging.value) {
    handleMouseMove(event);
    handleClick(event);
  }
};



const handleMouseLeave = () => {
  showMarker.value = false;
  showPreview.value = false;
};
</script>

<style scoped>
.progress-bar {
  margin-bottom: 5px;
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
