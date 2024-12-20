<script>
export default {
  name: "title1",
  props:{
    data:{type:Object,required: true,}
  }
}
</script>

<template>
  <div class="content_title">
    <div class="content_title4"><a class="title_ch" href="">{{ data.cntitle }}</a> <span class="title_en">{{ data.entitle }}</span>
    </div>
  </div>
</template>

<style scoped>
.content_title{margin-bottom:25px;background:url(/src/assets/res/images/content_title_bg.png) repeat-x center center; width: 100%}
.content_title4{ background-color:#f9f9f9; width:268px;}
.title_en{font-family: Arial;font-size:20px;color:#aaa;text-transform:uppercase;background:none;}
</style>