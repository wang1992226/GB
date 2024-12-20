<script setup lang="ts">

import {Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import axios from "axios";
import {ElMessage, ElMessageBox} from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
// 设置eldark主题
document.documentElement.classList.add("dark")

const userdata = JSON.parse(localStorage.getItem('yizhijiao_user'))

//初始化获取localStorage数据，获取menu
// const menu = JSON.parse(localStorage.getItem('menu') || '{}')
const menu = ref({index: 0, name: '全部'})

const menudata = ref([
  {
    name: '教学资源库',
    child: [
      {name: '全部',index: '教学资源库全部'},
      {name: '典型课程思政案例'},
      {name: '数字人案例'},
      {name: '学校宣传片'},
      {name: '课堂实录'},
      {name: '课程宣传片'},
      {name: '课程资源-微课样片'},  {name: '3D动画'}, {name: '交互式动画'},
      {name: '2D动画'},
      {name: '说课'},
      {name: '虚拟仿真项目'},
      {name: '行业名人故事'},
      {name: '研学纪录片'},
    ]
  },
  {
    name: '教学能力大赛',
    child: [
        {name: '全部',index: '教学能力大赛全部'},
      {name: '佐证材料网页系统'},
        {name: '国赛遴选参赛视频'},
      {name: '国赛总决赛视频'},
      {name: '教学工具应用'},
      {name: '教学视频拍摄'},
      {name: '实施报告文档'},
      {name: '教案文档'},
      {name: '教学游戏'},
      {name: '系统程序开发'},
      {name: '实施报告PPT'},
      {name: '教学视频拍摄_旧'},]
  },
  {
    name: '高校教师教学创新大赛',
    child: [
      {name: '全部',index: '高校教师教学创新大赛全部'},
        {name: '教学设计创新汇报'}]
  },
  {
    name: '其它比赛',
    child: [
      {name: '全部',index: '其它比赛全部'},
        {name: '高校青年教师教学大赛'}, {name: '班主任大赛'}, {name: '其它参赛类视频'}]
  }
])


const badgelx = (e) => {
  switch (e) {
    case '视频':
      return 'video'
    case 'PDF':
      return 'pdf'
    case '网页':
      return 'web'
    default:
      return 'other'
  }
}

const isloding = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const getdata = (e) => {
  menu.value = e
  // console.log(e)
  //设置localStorage数据
  localStorage.setItem('menu', JSON.stringify(e))
  searchword.value = ''
  showpage.value = 1
  console.log('showpage',showpage.value)
  getshowitem()
}
const synchronization = () => {
  //确认弹窗
  ElMessageBox.confirm('确认同步数据？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    //同步数据
    synchronizationData()
  }).catch(() => {
    console.log('取消同步')
  })
}
const synchronizationData = () => {
  isloding.value = true
  console.log("同步数据")
  axios.get(`${process.env.VUE_APP_API_URL}/encryptedvideo/syncvika`).then(res => {
    console.log(res)
    if (res.data.code === 200) {
      ElMessage.success('同步成功')
    } else {
      ElMessage.error('同步失败')
    }
  })
      .finally(() => {
        isloding.value = false
      })
}

const searchword = ref('')
const showitem = ref([])
const showtotal = ref(0)
const showpage = ref(1)
const showpagesize = ref(20)
const show = ref(true)
const getshowpage = (page: number) => {
  console.log('page',page)
  showpage.value = page
  getshowitem()
}
const getshowitem = () => {
  show.value = false
  console.log(menu.value.index)
  let search = ''
  let liebiaodata = []
  let quanbu=false
  switch (menu.value.index) {
    case '教学资源库全部':
      search = '教学资源库'
      break
    case '教学能力大赛全部':
      search = '教学能力大赛'
      break
    case '高校教师教学创新大赛全部':
      search = '高校教师教学创新大赛'
      break
    case '其它比赛全部':
      search = '其它比赛'
      break
    default:
      quanbu=true
  }
  if(quanbu){
    liebiaodata = [menu.value.index]
  }else{
    let clickmenu = menudata.value.find(item => item.name === search);
    liebiaodata = clickmenu && clickmenu.child ? clickmenu.child.map(item => item.name)  : [];
  }


  // const liebiaodata = menudata.value.find(item => item.name === menu.value.index)
  console.log('liebiaodata', liebiaodata)
  // return
  const token = localStorage.getItem('yizhijiao_token');  // 假设你已经获取到了token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.post(`${process.env.VUE_APP_API_URL}/encryptedvideo/getanliku`, {
      page: showpage.value,
      pageSize: showpagesize.value,
      keyword: searchword.value,
      leibie: liebiaodata
  }).then(res => {
    console.log(res)
    showitem.value = res.data.data
    showtotal.value = res.data.total
    // searchword.value = ''
  })
      .finally(() => {
        show.value = true
      })
}

//获取localStorage数据，初始化menu
menu.value = JSON.parse(localStorage.getItem('menu') || '{}')

getshowitem()
const itemclick = (wangluo,item) => {
  if (wangluo=='内网') {
    if (badgelx(item.文件类型) === 'pdf') {
      window.open(`https://192.168.1.2:8585/CasePresentation/${item.类别}/${item.名称}.pdf`)
    }else
    if (badgelx(item.文件类型) === 'video') {
      window.open(`https://occ.yizhijiao.cn/encryptedvideo?record=${item.record}`)
    }else
    if (badgelx(item.文件类型) === 'web') {
      window.open(`https://192.168.1.2:8585/CasePresentation/${item.类别}/${item.名称}/index.html`)
    }else{
      ElMessage.error('暂不支持此格式文件')
    }
  }
  if (wangluo=='外网') {
    if (badgelx(item.文件类型) === 'video') {
      window.open(`https://occ.yizhijiao.cn/sharevideo?record=${item.record}`)
    }else
    if (badgelx(item.文件类型) === 'pdf') {
      window.open(`https://nas.yizhijiao.cn:8585/CasePresentation/${item.类别}/${item.名称}.pdf`)
    }else
    if (badgelx(item.文件类型) === 'web') {
      window.open(`https://nas.yizhijiao.cn:8585/CasePresentation/${item.类别}/${item.名称}/index.html`)
    }else{
      ElMessage.error('暂不支持此格式文件')
    }
  }

}
const auth = () => {
  window.open('https://192.168.1.2:8585/CasePresentation/auth.html')
}
const sharecode = (item) => {
  if (badgelx(item.文件类型) === 'video') {
    window.open(`https://occ.yizhijiao.cn/linktoqrcode?code=https://occ.yizhijiao.cn/sharevideo?record=${item.record}`)
  }else{
    ElMessage.error('暂不支持分享')
  }
}

const authbtn = ref(false)
const changeurl=()=> {
  localStorage.setItem('wangluo', wangluo.value.toString())
  if (wangluo.value) {
    authbtn.value = false
    ziyaunurl.value = 'https://nas.yizhijiao.cn:8585/CasePresentation/'
  }else {
    authbtn.value = true
    ziyaunurl.value = 'https://192.168.1.2:8585/CasePresentation/'
  }
}

const wangluo = ref(false)
wangluo.value =localStorage.getItem('wangluo') === 'true';
const ziyaunurl = ref('https://192.168.1.2:8585/CasePresentation/')
changeurl()

const logout = () => {
  localStorage.removeItem('yizhijiao_user')
  localStorage.removeItem('isAuthenticated')
  router.push({path: '/login'}).href
}
</script>

<template>
  <!--  <div v-loading="isloding" class="common-layout" style="height: 100%;overflow: hidden;">-->
  <el-container v-loading="isloding">
    <el-header>
      <div class="" style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;width: 260px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <el-switch
              @change="changeurl"
              v-model="wangluo"
              class="mb-2"
              active-text="外网"
              inactive-text="本地"
          />
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button style="margin-left: 20px;" v-show="authbtn" type="primary" @click="auth">本地点击授权</el-button>
      </div>
      <div class="title"><h2>案例展示平台</h2></div>

      <div style="width: 260px;display: flex;flex-direction: row;align-items: center;justify-content: flex-end;" class="desc">{{ userdata.nickname }}
        <el-button style="margin-left: 20px;" type="primary" @click="logout()" >退出</el-button>
      </div>
    </el-header>

    <el-container style="max-height: calc(100% - 60px); /* 减去 header 和 footer 的高度 */">
      <el-aside width="250px">
        <!--          点击把index存进localStorage-->
        <el-menu
            :default-active="menu.index"
            @open="handleOpen"
            @close="handleClose"
        >
          <h2 class="mb-2" style="text-align: center;    margin: 30px 0;">案例库</h2>
          <el-sub-menu style="background-color: #3c3f41;" v-for="(item, index) in menudata" :index="item.name">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item style="background-color: #2b2b2b;" v-for="(child, index) in item.child"  @click="getdata" :index="child.index || child.name">{{ child.name }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main style="">
        <transition name="el-fade-in">
          <el-card class="ep-card" body-class="el-card__body2" v-show="show" shadow="never"
                   style="height: 100%;overflow: hidden;">
            <template #header>
              <el-row :gutter="20">
                <el-col :span="16">
                  <div class="ep-bg-purple">
                    <!--同步按钮-->
                    <el-button type="primary" @click="synchronization">同步数据</el-button>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="">
                    <el-form inline="true">
                      <el-form-item style="margin-bottom: 0px;">
                        <el-input v-model="searchword" placeholder="请输入搜索内容"></el-input>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;">
                        <el-button type="primary" icon="Search" @click="getshowitem">搜 索</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
              </el-row>
            </template>

            <!--            <div class="griditem-content">-->
            <el-scrollbar style="height: 100%;">
              <!--            <div class="griditem-content" style="width: 100%;height: 100%;overflow: auto;">-->
              <div class="grid-content">
                <el-card v-for="(item, index) in showitem" :key="index" shadow="never"
                         style="cursor: pointer; margin-right: 20px; margin-bottom: 20px;width: 400px;"
                         class="itemclass">
                  <el-badge :value="badgelx(item.文件类型)" :offset="[10, 5]"   class="badgeitem">
                    <el-image style="width: 360px;height: 203px;"
                              :src="`${ziyaunurl}${item.类别}/${item.名称}.jpg`"/>
                  </el-badge>
                    <div class="grid-content">
                      <h3 style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{ item.名称 }}</h3>
                    </div>
                  <div class="button-content">
                    <el-button type="primary" @click="itemclick('内网',item)" size="small">内网</el-button>
                    <el-button type="primary" @click="itemclick('外网',item)"  size="small">外网</el-button>
                    <el-button type="primary" @click="sharecode(item)" size="small">分享</el-button>
                  </div>
                </el-card>
              </div>
              <!--            </div>-->
            </el-scrollbar>
            <!--            </div>-->
            <template #footer>
              <el-pagination style="justify-content: center;" background layout="total, prev, pager, next"
                             :page-size="showpagesize" :current-page="showpage" @current-change="getshowpage" :total="showtotal"/>
            </template>
          </el-card>
        </transition>
      </el-main>
    </el-container>

  </el-container>
  <!--  </div>-->
</template>


<style lang="scss">
//应用eldark主题
@import 'element-plus/theme-chalk/src/dark/css-vars.scss';
.badgeitem img{
  border-radius:  10px
}
.badgeitem sup{
  --f:10px;
  border-radius:  var(--f) 0  var(--f) 0;
  background: linear-gradient(to right, #007bff, #00aaff);
  //描边0
  border: 0;
  width: 55px;
  font-size: 13px;


}
.button-content {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
.el-badge__content.is-fixed {
  width: 50px;
  font-size: 13px;
  transform: translateY(-50%) translateX(-313px);
}
.grid-content {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: bold;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.el-card__body2 {
  background-color: #0d0f15;
  overflow: auto;
  height: 100%;
  max-height: calc(100% - 140px);
}

.ep-card .el-card__header {
  padding: 0px 20px;
  line-height: 70px;
  height: 70px;
}

.common-layout {
  height: 100%;
}

.itemclass:hover {
  background-color: #2b2b2b;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
</style>