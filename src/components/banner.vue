<script>
export default {
  name: "banner",
  methods:{
     banner_hover(i) {
  $("#home-slider-nav>dl").each(function (index) {
        if (i == index) {
          $(this).addClass("sel");
        } else {
          $(this).removeClass("sel");
        }
      }
  )
},

 banner_out() {
  $("#home-slider-nav>dl").each(function () {
        $(this).removeClass("sel");
      }
  )
}
  }
}
</script>

<template>
  <div class="container index_header">
    <div class="index_banner" style="display: flex;
    flex-direction: column;
    align-items: center;" id="wrapper">
      <div id="home-slider" class="home-slider">
        <div class="slider-item">
          <img alt="" width="1920px" height="480px" src="../assets/res/images/hf1.jpg"/>
        </div>
        <div class="slider-item">
          <img alt="" width="1920px" height="480px" src="../assets/res/images/hf2.jpg"/>
        </div>
        <div class="slider-item">
          <img alt="" width="1920px" height="480px" src="../assets/res/images/hf3.jpg"/>
        </div>
      </div>
      <div class="design_box">
        <div class="design" id="home-slider-nav">
          <dl class="sel" @mouseover="banner_hover(0)">
            <dt>
              辉煌历史
            </dt>
            <dd class="design_dd">
              办学历史悠久辉煌，传承文化铸就荣光！
            </dd>
          </dl>
          <dl class="design_center" @mouseover="banner_hover(1)">
            <dt>
              教育教学
            </dt>
            <dd class="design_dd">
              汇聚丰富学习资料，助您轻松攀登知识高峰！
            </dd>
          </dl>
          <dl @mouseover="banner_hover(2)">
            <dt>
              资源丰富
            </dt>
            <dd class="design_dd">
              为您提供高效学习资源，助您成就学业之路！
            </dd>
          </dl>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="service_bg">
      <div class="index_list">
        <ul>
          <li><a href="" class="bj01" target="_blank"><img src="../assets/res/images/ksdh01.png">
            <p>信息公开</p></a></li>
          <li><a href="" class="bj02" target="_blank"><img src="../assets/res/images/ksdh02.png">
            <p>师德师风</p></a></li>
          <li><a href="" class="bj03" target="_blank"><img src="../assets/res/images/ksdh03.png">
            <p>期刊投稿</p></a></li>
          <li><a href="" class="bj04" target="_blank"><img src="../assets/res/images/ksdh04.png">
            <p>校友工作</p></a></li>
          <li><a href="" class="bj05" target="_blank"><img src="../assets/res/images/ksdh05.png">
            <p>图书馆</p></a></li>

          <li><a href="" class="bj06" target="_blank"><img src="../assets/res/images/ksdh07.png">
            <p>OA系统</p></a></li>
          <li><a href="" class="bj07" target="_blank"><img src="../assets/res/images/ksdh08.png">
            <p>教学在线</p></a></li>
          <li><a href="" class="bj08" target="_blank"><img src="../assets/res/images/ksdh09.png">
            <p>招投标信息网</p></a></li>
          <li><a href="" class="bj09" target="_blank"><img src="../assets/res/images/ksdh06.png">
            <p>招商信息网</p></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>

.index_list ul {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.index_list ul li {

}

.index_list ul li a {
  display: flex;
  height: 130px;
  width: 133px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.index_list ul li p {
  line-height: 37px;
  font-size: 18px;
  color: white;
}


.index_list ul li a.bj01 {
  background: #e57862;
}

.index_list ul li a.bj02 {
  background: #4d8fd0;
}

.index_list ul li a.bj03 {
  background: #c36dd2;
}

.index_list ul li a.bj04 {
  background: #39bcc8;
}

.index_list ul li a.bj05 {
  background: #cda554;
}

.index_list ul li a.bj06 {
  background: #42b8df;
}

.index_list ul li a.bj07 {
  background: #9c71ea;
}

.index_list ul li a.bj08 {
  background: #e56281;
}

.index_list ul li a.bj09 {
  background: #a7a377;
}

.index_list ul li a:hover {
  background: #363aa1;
  transition: all 0.5s;
}

.index_list ul li a:hover img {
  width: 65px;
  transition: all 0.5s;
}

.index_list ul li a:hover p {
  font-size: 20px;
  transition: all 0.5s;
}

.service_bg {
  padding: 30px 0;
  width: auto;
  height: auto
}

.index_header {
  height: auto
}

</style>