<template>

  <div v-show="!loading" class="common-layout" style="height: 100%">
    <el-container>
      <el-header style="background-color: #1d2029;">
        <el-row style="width: 100%;display: flex;justify-content: space-between;">
          <el-col style="font-size: 24px;width: 60px;max-width: 60px;">
            <div style="display: flex;align-items: center;justify-content: center;">
              <el-icon style="font-size: 28px;margin:0 10px;color: #fff" @click="drawer=true">
                <FolderOpened/>
              </el-icon>
            </div>
          </el-col>
          <el-col :class="{ 'title-hide-width': !show }" style="max-width: calc(100% - 120px);">
            <div style="display: flex;align-items: center;justify-content: center;">
              <el-divider style="font-size: 28px;" direction="vertical"/>
              <span
                  style="font-size: 24px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color: #fff;width: 100%;">
            案例：{{ title }}
            </span>
            </div>
          </el-col>
          <el-col v-show="show" style="width: 60px;max-width: 60px;">
            <div style="display: flex;align-items: center;justify-content: center; ">
              <el-divider style="font-size: 28px;" direction="vertical"/>
              <el-icon style="font-size: 28px;margin:0 10px;color: #fff" @click="toggleAside">
                <MoreFilled />
              </el-icon>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="container-item" style="height: calc(100% - 60px);">
        <el-main :class="{ 'full-screen': isFullScreen }" style="display: flex;padding: 20px;overflow: hidden;">
          <div class="container-video">
          <div class="video-cont">
                <div ref="scVideo" @contextmenu="handleContextMenu">
                </div>
          </div>
          </div>
        </el-main>
        <el-aside :class="{ 'hide-aside': isAsideHidden }"
                  style="width:25%;max-width:300px;min-width: 200px;background-color: #1d2029">
          <el-tabs style="padding: 20px">
            <el-tab-pane label="项目信息">
              <el-image style="width: 100%" :src="videoposter"/>
              <el-descriptions :column="1">
                <el-descriptions-item v-for="(item, index) in xmdata" :label="index">
                  {{ item }}
                </el-descriptions-item>
              </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="文件信息">
              <el-descriptions :column="1">
                <el-descriptions-item label="封面:">
                  <el-image style="width: 40%" :src="videoposter"/>
                </el-descriptions-item>
                <el-descriptions-item v-for="(item, index) in mp4data" :label="index">
                  {{ item }}
                </el-descriptions-item>
              </el-descriptions>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-drawer
            v-model="drawer"
            title="文件列表"
            direction="ltr"
            z-index="1000"
            style="min-width: 300px;"
        >
          <div style="padding: 20px">
            <span>无数据</span>
          </div>
        </el-drawer>
      </el-container>
    </el-container>
  </div>
  <div v-loading.fullscreen.lock="loading">
  </div>
  <!--  <el-card shadow="never" header="MP4点播">-->
  <!--  </el-card>-->
</template>

<script>
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
import axios from "axios";


export default {
  props: {
    sourceurl: {
      type: String,
      default: 'https://nas.yizhijiao.cn:8585'
    }
  },
  data() {
    return {
      show: false,
      isAsideHidden: false,
      isFullScreen: false,
      xmdata: {
        '学校:': '无数据',
        "类别:": '无数据',
        "年份:": '无数据',
      },
      mp4data: {
        '文件名:': '无数据',
        '文件大小:': '无数据',
        '时长:': '无数据',
        '分辨率:': '1920x1080',
        '码率:': '1200kbps',
        '视频格式:': 'mp4',
        '音频格式:': 'wav',
      },
      loading: true,
      videoUrl: '',
      loaded: false,
      drawer: false,
      title: '项目标题',
      videoposter: '',
      fontconfig: {
        content: '',
        font: {
          fontSize: 20,
          color: 'rgba(0, 100, 100, 0.4)',
        },
      },
      player: null
    }
  },
  mounted() {
    this.init()
    this.getvideodata()
    document.documentElement.classList.add("dark")
    this.handleResize()
    window.addEventListener('resize', this.handleResize);
  },

  methods: {
    toggleAside() {
      this.isAsideHidden = !this.isAsideHidden;
      this.isFullScreen = !this.isAsideHidden;
    },
    handleResize() {
      this.isAsideHidden = window.innerWidth < 1000;
      this.isFullScreen = !this.isAsideHidden;
      this.show = window.innerWidth < 1000;
    },

    getvideodata() {
      console.log(this.$route)
      axios.get(`${process.env.VUE_APP_API_URL}/encryptedvideo/synchronization`, {params: {record: this.$route.query.record}})
          .then(res => {
            // console.log(res.data)
            this.title = res.data.data.名称

            let sourcerurl = `${this.sourceurl}/CasePresentation/${res.data.data.类别}/${res.data.data.名称}`
            this.videoUrl = sourcerurl + '.mp4'
            this.videoposter = sourcerurl + '.jpg'

            this.xmdata = {
              '学校:': res.data.data.学校,
              "类别:": res.data.data.类别,
              "年份:": res.data.data.案例年份,
            }
            this.mp4data['文件名:'] = res.data.data.名称 + '.mp4'
            document.title = res.data.data.名称
            this.init()
          })
          .finally(() => {
            this.loading = false
          })
    },
    handleContextMenu(event) {
      event.preventDefault();
      // 处理自定义的右键菜单逻辑
    },
    init() {
      this.player = new Player({
        el: this.$refs.scVideo,
        url: this.videoUrl,
        // height: 200,
        // width: window.innerWidth,
        fluid: true,
        lang: 'zh-cn',
        poster: this.videoposter,
      })
    },
  },

}
</script>

<style lang="scss">
@import '@/style/style.scss';
.title-hide-width{
  max-width: calc(100% - 60px)!important;
}
.container-item, .el-aside {
  transition: all 0.3s ease;
}

.video-inner {
  width: 100%;
  height: 0;
  position: relative;
}
/* 通用样式 */
.container-video {
 width: 100%;
  height: 100%;
}
.sc-video {
  padding: 0;
}
.video-cont {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.video-box {
  position: absolute;
  inset:0;
}

.xgplayer{
  height: 100% !important;
  padding: 0!important;
}

.full-screen {
  padding: 0px;
  width: 100%;
}

.hide-aside {
  min-width: 0 !important;
  width: 0 !important;
  transform: translateX(100%);
}

html.dark .el-header, html.dark .el-main.nopadding, html.dark .el-footer {
  border-color: #0d0f15 !important;
}

.iconfont :hover {
  color: rgb(7 178 249);
  cursor: pointer;
}

</style>