<script lang="ts" setup>

import color from "@/components/icons/color.vue";
import cexiao from "@/components/icons/cexiao.vue";
import qingkong from "@/components/icons/qingkong.vue";
import line from "@/components/icons/line.vue";
import circle from "@/components/icons/circle.vue";
import rect from "@/components/icons/rect.vue";
import arrow from "@/components/icons/arrow.vue";
import text from "@/components/icons/text.vue";
import bofang from "@/components/icons/bofang.vue";
import {ref} from "vue";
import axios from "axios";


const textareacontent = ref('');
const icons = {
  line,
  circle,
  rect,
  arrow,
  text,
  color,
  cexiao,
  qingkong,
  bofang,
}
const colorlist = ['#f53d6b', '#fcc00d', '#22c79e', '#4d70ff'];
const Shapelist = [{name: 'line', tip: '画笔工具'}, {name: 'circle', tip: '圆形工具'}, {
  name: 'rect',
  tip: '矩形工具'
}, {name: 'arrow', tip: '箭头工具'}, {name: 'text', tip: '文字工具'}];

const emit = defineEmits(['data-sent','revoke', 'clearCanvas']);
const sendDataToParent = () => {
  emit('data-sent');
};
const revoke = () => {
  emit('revoke');
};
const clear = () => {
  emit('clear');
};
const startdrawing= () => {
  emit('startdrawing');
}


const setColor = (color: string) => {
  // if (currentShape.value === '') {
  //   currentShape.value = 'line';
  // }
  currentColor.value = color;
  emit('startdrawing')
};
const setCurrentShape = (shape: string) => {
  currentShape.value = shape;
  emit('startdrawing')
};


const currentShape = ref('line');
const startdraw = ref(false);
const currentColor = ref('#f53d6b');
const textareatext = ref('');
const readydraw = ref(false);
defineExpose({
  currentColor,
  currentShape,
  startdraw,
  textareatext,
})
</script>

<template>
  <div class="Drawsend" style="margin-top: 20px;">
    <div class="drawsend">
      <el-input resize="none" type="textarea"
                input-style="color: #c9d4e6; background-color: #2c303b!important; box-shadow: 0 0 0 1px #303133;"
                v-model="textareatext" :rows="4"
                placeholder="从这里开始写批注..."></el-input>
      <div style="display: flex;
    justify-content: space-between;height:35px ;margin-top: 10px;">
        <div>
        </div>
        <div class="buttoncontainer" style="">
          <div class="shape-container f-c">
            <div v-for="(shape, index) in Shapelist" :key="index" class="shape-icon f-c">
              <el-tooltip effect="light" placement="top" trigger="hover" :content="shape.tip">
                <el-icon :size="25" :color="currentShape === shape.name? '#4a70ff' : '#a9b2c7'"
                         @click="setCurrentShape(shape.name)">
                  <component :is="icons[shape.name]"/>
                </el-icon>
              </el-tooltip>
            </div>
          </div>
          <div class="color-container" style="border-left: 1px solid #676767;margin-left: 10px;">
            <div class="shape-container f-c">
              <div v-for="(colorrgb, index) in colorlist" :key="index" :style="{
         'margin-left': '10px',
         'padding': '2px',
         'box-shadow': currentColor === colorrgb? `0 0 0 2px ${colorrgb}` : `none`
       }" class="color-icon f-c"
                   @click="setColor(colorrgb)">
                <el-icon :size="18" :color="colorrgb">
                  <component :is="color"/>
                </el-icon>
              </div>
            </div>
          </div>

          <div class="color-container" style="border-left: 1px solid #676767;margin-left: 20px;padding-left: 10px;">
            <div class="shape-container f-c" >
              <div class="shape-icon f-c" @click="revoke">
                <el-tooltip effect="light" placement="top" trigger="hover" content="撤销">
                  <el-icon :size="25" color="#adb6cc">
                    <component :is="cexiao"/>
                  </el-icon>
                </el-tooltip>
              </div>
              <div class="shape-icon f-c" @click="clear">
                <el-tooltip effect="light" placement="top" trigger="hover" content="清空">
                  <el-icon :size="25" color="#adb6cc">
                    <component :is="qingkong"/>
                  </el-icon>
                </el-tooltip>
              </div>
            </div>
          </div>
          <!--          <button @click="clearCanvas">清除</button>-->
        </div>
        <el-button v-if="readydraw" type="" @click="readydraw=false">退出批注</el-button>
        <el-button style="border-radius: 20px; padding: 0 20px;" type="primary" @click="sendDataToParent">提交</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.f-c {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}



.shape-icon {
  border-radius: 20%;
  padding: 1px 1px;
  cursor: pointer;
  margin-right: 10px;
}

.color-icon {
  border-radius: 20%;
  padding: 1px 1px;
  cursor: pointer;
}

.color-icon:hover, .shape-icon:hover {
  background-color: #2e323d;
}

.buttoncontainer {
  border-radius: 20px;
  background-color: #1d2029;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

.drawsend {
  padding: 20px;
  background-color: #2e323d;
}
</style>