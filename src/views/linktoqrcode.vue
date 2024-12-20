<template>
  <div style="    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;">
    <el-image src="/images/二维码背景.jpg"  style="width: 400px; height: 400px;"></el-image>
    <div style="position: absolute;text-align: center">
      <p style="font-size: 24px;color: #fff;margin: 5px;">扫码查看链接</p>
      <el-image :src="qrcodeUrl"  style="width: 200px; height: 200px;"></el-image>
      <p style="font-size: 24px;color: #fff;margin: 5px;">长按图片识别二维码</p>
    </div>

  </div>
</template>

<script setup>
import QRCode from 'qrcode';
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute();
const qrcodeUrl = ref('');

onMounted(() => {
  const code = route.query.code;
  console.log(code)
  //把code生成二维码图给el-image :src
  QRCode.toDataURL(code,{ margin: 1 }) .then(url => { qrcodeUrl.value = url; }) .catch(error => { console.error(error); });
});
</script>

<style>
body {
  background-color: #212121;;
}
</style>

