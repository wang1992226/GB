<script>
import '../assets/res/js/jquery-1.8.1.min.js';
import '../assets/res/js/jquery.cycle.all.js';
import '../assets/res/js/index.js';
// 引入其他CSS文件
import '../assets/res/css/basic.css';
import '../assets/res/css/index.css';

// 引入其他JS文件
import axios from "axios";
import banner from "@/components/banner.vue";
import ryheader from "@/components/header.vue";
import ryfooter from "@/components/footer.vue";
import nav1 from "@/components/navigation/nav1.vue";
import lunbo1 from "@/components/lunbo1.vue";
import tongji from "@/components/tongji01.vue";
import new1 from "@/components/new1.vue";
import title1 from "@/components/title/title1.vue";

export default {
  name: "Home",
  data() {
    return {

      简介轮播图: ["/images/hf1.jpg", "/images/hf2.jpg", "/images/hf3.jpg",],
      学校封面: '/images/学校崇德广场.jpg',
      学校简介: '  学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。',
      热门课程:[
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/94ec9a6b92fdfa5d238316221e9a8e2b_44366_292_164.png",
            "名称": "市场营销学",
            "平台名": "电子商务",
            "链接": "https://edu.yizhijiao.cn/route/course?course=GTfolWA6"
          },
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/3bba7c7c00f0c1227ab747501215fd9e_43311_292_164.png",
            "名称": "电子商务网站建设",
            "平台名": "电子商务",
            "链接": "https://edu.yizhijiao.cn/route/course?course=WbBu6SDE"
          },
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/3877d68d3915749a063a7fe30b351eb3_35508_292_164.png",
            "名称": "ERP与客户关系管理",
            "平台名": "电子商务",
            "链接": "https://edu.yizhijiao.cn/route/course?course=QUHAzWjm"
          },
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/99b1e1f1e579bc7c4ceeca682e11bccb_35744_292_164.png",
            "名称": "会计学",
            "平台名": "电子商务",
            "链接": "https://edu.yizhijiao.cn/route/course?course=XgXcWybS"
          },
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/964537b59776d6680d87b126698fee73_171158_600_338.png",
            "名称": "考古学概论",
            "平台名": "工艺美术专业群资源库",
            "链接": "https://edu.yizhijiao.cn/route/course?course=K5JyWHb1"
          },
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/42bd1b5c3a8f18222ec65267baa72f12_408918_600_338.png",
            "名称": "中国传统纹样",
            "平台名": "工艺美术专业群资源库",
            "链接": "https://edu.yizhijiao.cn/route/course?course=CeBuhiOz"
          },
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/d9dde9e5db77ede0a71a006e87567b06_210728_600_338.png",
            "名称": "中国艺术设计史",
            "平台名": "工艺美术专业群资源库",
            "链接": "https://edu.yizhijiao.cn/route/course?course=lJbIhgTX"
          },
          {
            "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/945e95cfba18b7dae4a224b231144c1a_290927_600_338.png",
            "名称": "传统漆器研究",
            "平台名": "工艺美术专业群资源库",
            "链接": "https://edu.yizhijiao.cn/route/course?course=AUPy5bbg"
          }
        ],
      热门微课: [
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/94ec9a6b92fdfa5d238316221e9a8e2b_44366_292_164.png",
          "名称": "市场营销学",
          "平台名": "电子商务",
          "链接": "https://edu.yizhijiao.cn/route/course?course=GTfolWA6"
        },
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/3bba7c7c00f0c1227ab747501215fd9e_43311_292_164.png",
          "名称": "电子商务网站建设",
          "平台名": "电子商务",
          "链接": "https://edu.yizhijiao.cn/route/course?course=WbBu6SDE"
        },
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/3877d68d3915749a063a7fe30b351eb3_35508_292_164.png",
          "名称": "ERP与客户关系管理",
          "平台名": "电子商务",
          "链接": "https://edu.yizhijiao.cn/route/course?course=QUHAzWjm"
        },
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/99b1e1f1e579bc7c4ceeca682e11bccb_35744_292_164.png",
          "名称": "会计学",
          "平台名": "电子商务",
          "链接": "https://edu.yizhijiao.cn/route/course?course=XgXcWybS"
        },
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/964537b59776d6680d87b126698fee73_171158_600_338.png",
          "名称": "考古学概论",
          "平台名": "工艺美术专业群资源库",
          "链接": "https://edu.yizhijiao.cn/route/course?course=K5JyWHb1"
        },
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/42bd1b5c3a8f18222ec65267baa72f12_408918_600_338.png",
          "名称": "中国传统纹样",
          "平台名": "工艺美术专业群资源库",
          "链接": "https://edu.yizhijiao.cn/route/course?course=CeBuhiOz"
        },
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/d9dde9e5db77ede0a71a006e87567b06_210728_600_338.png",
          "名称": "中国艺术设计史",
          "平台名": "工艺美术专业群资源库",
          "链接": "https://edu.yizhijiao.cn/route/course?course=lJbIhgTX"
        },
        {
          "封面": "https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/945e95cfba18b7dae4a224b231144c1a_290927_600_338.png",
          "名称": "传统漆器研究",
          "平台名": "工艺美术专业群资源库",
          "链接": "https://edu.yizhijiao.cn/route/course?course=AUPy5bbg"
        }
      ],
      retryCount: 0,
      maxRetryCount: 10,
      dataLoaded: false,
      id: 0,
      navdata: {
        nav: [
          {label: '学校概况', url: ''},
          {label: '信息公开', url: ''},
          {label: '专业设置', url: ''},
          {label: '师资队伍', url: ''},
          {label: '校园文化', url: ''},
          {label: '教研教改', url: ''},
          {label: '招生就业', url: ''},
          {label: '图 书 馆', url: ''},
          {label: '家校互动', url: ''},
          {label: '信义品牌', url: ''},
          {label: '项目建设', url: ''},
        ], active: 0, imgurl: '/images/banner.png'
      },
      ziyuanku: [],
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      leftnews: [],
      rightnews: [],
    }
  },
  components: {
    title1,
    banner,
    ryheader,
    ryfooter,
    nav1,
    lunbo1,
    tongji,
    new1
  },
  watch: {},
  methods: {
    updateFavicon(iconUrl) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = iconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    },
    // 发起axios请求
    fetchData() {
      axios.get(`${process.env.VUE_APP_API_URL}/plasch/` + this.$route.params.id)
          .then(response => {
            console.log(response.data)
            this.ziyuanku = response.data.data.ziyuanku
            this.rightnews = response.data.data.rightnews
            this.leftnews = response.data.data.leftnews
            this.dataLoaded = true;
            document.title  = response.data.data.data.名称+'-资源平台'; // 修改当前路由的meta.title
            // this.updateFavicon("/src/assets/res/images/favicon.png");
          })
          .catch(error => {
            if (this.retryCount < this.maxRetryCount) {
              // 重试
              this.retryCount++;
              this.fetchData();
            } else {
              // 达到最大重试次数，处理数据获取失败的情况
            }
          });
    },
    onSubmit() {
      console.log('submit!')
    }
  },
  mounted() {

    console.log(process.env.VUE_APP_API_URL)
  },
  created() {
    this.fetchData();
    // console.log(this.$route.);
  },
}
</script>

<template>
  <div v-if="dataLoaded">
    <nav1 :data="navdata"/>
    <el-container class="lay-container" style="margin-top: 10px">
      <div style="width: 1200px;padding: 0px;">
        <el-card shadow="always">
          <tongji/>
        </el-card>

        <el-container style="margin-top: 10px">

          <el-aside width="200px">
            <el-card shadow="never" class="bianlan">
              <template #header>
                <div class="card-header">
                  <el-icon style="vertical-align: -0.125em">
                    <Files/>
                  </el-icon>
                  <span>专业导航</span>
                </div>
              </template>
              <div style="line-height:25px;font-size: 13px;" v-for="(o,index) in ziyuanku" :key="o._id"
                   class="text item">
                <a :href="`https://edu.yizhijiao.cn/route/resource/zysy?resid=${o._id}`" target="_blank">
                  <el-tag style="margin-right: 5px" round size="small" type="primary">{{ index }}</el-tag>
                  {{ o.名称 }}
                </a>
              </div>

            </el-card>


            <el-card shadow="never" style="margin-top: 5px">
              <template #header>
                <div class="card-header">
                  <el-icon>
                    <Message/>
                  </el-icon>
                  <span>通知公告</span>
                </div>
              </template>
              <p v-for="o in 4" :key="o" class="text item">{{ '通告名称通告 ' + o }}</p>

            </el-card>
          </el-aside>

          <el-main>
            <el-carousel height="241px" class="zlunbo">
              <el-carousel-item v-for="o in 简介轮播图">
                <img :src="o"/>
              </el-carousel-item>
            </el-carousel>

            <el-card shadow="never" style="height: 231px">
              <el-row :gutter="20">
                <el-col :span="10"><img :src="学校封面" style="width: 100%;height: 191px"/></el-col>
                <el-col :span="14">
                  <el-scrollbar :height="191">
                    <span style="font-size: 13px;line-height: 21px">
                      {{ 学校简介 }}
</span>
                  </el-scrollbar>
                </el-col>
              </el-row>

            </el-card>
          </el-main>

          <el-aside width="200px">
            <el-card style="max-width: 480px">
              <el-form
                  ref="form"
                  style="max-width: 600px"
                  :model="sizeForm"
                  label-width="auto"
                  label-position="right"
                  size="small"
              >
                <el-form-item label="账号">
                  <el-input v-model="sizeForm.name"/>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="sizeForm.name"/>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="onSubmit">登录</el-button>
                  <el-button>重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
            <el-card style="max-width: 480px;margin-top: 10px">
              <template #header>
                <div class="card-header">
                  <el-icon>
                    <Collection/>
                  </el-icon>
                  <span>热门课程</span>
                </div>
              </template>
              <p v-for="o in 4" :key="o" class="text item">{{ '课程名称课程 ' + o }}</p>
            </el-card>

          </el-aside>
        </el-container>
        <lunbo1 :data="ziyuanku"/>
      </div>

      <el-container style="width: 1200px;flex-wrap: wrap;margin-top: 40px">
        <title1 :data="{cntitle:'热门课程',entitle:'COURSES'}"/>

        <div class="cases_dl" init="true" style="display: flex;
    opacity: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;">

          <dl class="w288" v-for="o in 热门课程">
            <dt>
              <a :href="o.链接" target="_blank">
                <img class="img_case" :alt="o.名称"
                     :src="o.封面"
                     width="380px" height="235px"></a>
            </dt>
            <div style="padding: 0 10px;background-color: #f8f8f8">
            <dd class="cases_name">
              {{o.名称}}
            </dd>
            <dd class="wntitle">
              <p class="cases_description">{{o.平台名}}</p>
            </dd>
            </div>
          </dl>
        </div>


      </el-container>
      <el-container style="width: 1200px;flex-wrap: wrap;margin-top: 40px">
        <title1 :data="{cntitle:'热门微课',entitle:'LESSONS'}"/>
        <div class="cases_dl" init="true" style="display: flex;
    opacity: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;">

          <dl class="w288" v-for="o in 热门微课">
            <dt>
              <a :href="o.链接" target="_blank">
                <img class="img_case" :alt="o.名称"
                     :src="o.封面"
                     width="380px" height="235px"></a>
            </dt>
            <div style="padding: 0 10px;background-color: #f8f8f8">
            <dd class="cases_name">
              {{o.名称}}
            </dd>
            <dd class="wntitle">
              <p class="cases_description">{{o.平台名}}</p>
            </dd>
            </div>
          </dl>
        </div>


      </el-container>
      <new1 :leftnews="leftnews" :rightnews="rightnews"/>


    </el-container>
    <ryfooter/>
  </div>
</template>

<style scoped>
.cases{
  padding: 0;
}
.lay-container {
  flex-direction: column;
  align-items: center;
  display: flex;
}

.card-header i {
  vertical-align: -0.2em;
  font-size: 16px;
  margin-right: 5px;
}

.el-card__header {
  background: aliceblue !important;
}

.bianlan .el-card__header {
  background: aliceblue !important;
}

.zlunbo img {
  height: 100%;
}


.w288 {
  margin-bottom: 10px;
  width: 288px !important;
}

.w288 dt {
  width: 288px;
  height: 162px
}

.w288 dt a img {

  width: 100%;
  height: 100%;
  transition: all 0.5s ease 0s;
}

.w288 dt a img:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
}

.w288 dd {
  background-color: #f8f8f8;
}

.wntitle {
  padding: 5px 0;
  font-size: 12px;
  color: #999;
}
</style>