<template>
  <div class="image-list">
    <draggable v-model="images" group="images" animation="200" @update="handleUpdate">
      <template #item="{ element, index}">
        <div class="image-item" :class="{'active': element === currentelement}"  @click="handleImageClick( element )">
          <img :src="element" :alt="element" />
          <span>{{ getFileName(element) }}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';



const images = ref([]);
const setImages = (newImages: string[]) => {
  images.value = newImages;
  currentelement.value = images.value[0];
};
const getFileName = (filePath: string) => {
  return filePath.split('/').pop() || filePath;
};
const currentelement = ref('');
const emit = defineEmits(['update:images','update:currentelement']);

const handleUpdate = (newImages: string[]) => {
  console.log('newImages',newImages);
  emit('update:images', newImages);
};

const handleImageClick = (image: string) => {
  console.log('image',image);
  currentelement.value = image;
  emit('update:currentelement', image);
};

defineExpose({
  setImages
});

</script>

<style scoped>
.active {
  border: 2px solid red !important;
}
.image-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.image-item {

  display: flex;
  align-items: center;
  cursor: move;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
}

.image-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.list-move {
  transition: transform 0.3s;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
