<script>
import title1 from "@/components/title/title1.vue";
export default {
  components:{
    title1
  },
  name: "new1",
  props: {
    leftnews: {
      type: Array,
      required: true,
    },
    rightnews: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div class="news_bg">
    <div class="news">
      <title1 :data="{cntitle:'新闻咨询',entitle:'NEWS'}"/>
      <div class="news_con">
        <div class="news_con_left">
          <dl v-for="item in leftnews" :key="item.id">
            <dt>
              <div class="news_title fl"><a :href="item.link" target="_blank">{{ item.标题 }}</a></div>
              <div class="news_date fr"></div>
              <div class="clear"></div>
            </dt>
            <dd><a :href="item.link" target="_blank"> {{ item.简要 }} ... </a></dd>
          </dl>
        </div>
        <div class="news_con_right">
          <dl v-for="item in rightnews" :key="item.id">
            <dt>
              <div class="news_title fl"><a :href="item.link" target="_blank">{{ item.标题 }}</a></div>
              <div class="news_date fr"></div>
              <div class="clear"></div>
            </dt>
            <dd><a :href="item.link" target="_blank"> {{ item.简要 }} ... </a></dd>
          </dl>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
a.title_ch{font-family:"微软雅黑";font-size:20px;font-weight:bold;margin-right:15px;background:none;color:#2eafbb;}
.news_bg{margin:0 auto;background-color:#f9f9f9;    width: 100%;}
.news{width:1200px;margin:0 auto;padding-top:40px; padding-bottom:40px;}
.news_con_left{float:left;width:550px; padding-right:45px; border-right:1px solid #eee;}
.news_con_right{float:left;width:550px; padding-left:45px;}
.news_con_left dl,.news_con_right dl{border-bottom:dashed 1px #d8d8d8;padding:20px 0 10px 0;}
.news_title{font-size:14px;font-weight:bold;}
.news_title a{color:#666;}
.news_title a:hover{color:#2eafbb;text-decoration:underline;}
.news_date{color:#999;font-family:Arial;}
.news_con_left dl dd,.news_con_right dl dd{line-height:20px;margin-top:10px;}
.news_con_left dl dd a,.news_con_right dl dd a{color:#999;}
.news_con_left dl dd a:hover,.news_con_right dl dd a:hover{color:#666;}
</style>