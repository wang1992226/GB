<script lang="ts" setup>
import {reactive, ref} from "vue";
import dayjs from "dayjs";
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

import type {FormInstance} from 'element-plus'


const userdata = JSON.parse(localStorage.getItem('yizhijiao_user'))

const vikaxmdata = ref([]);
const isloading = ref(false)
const ydialogVisible = ref(false)
const tdialogVisible = ref(false)
const tdaytableData = ref({})
const tform = ref({})
const wanchengop = [{
  value: '待审核',
  label: '待审核',
}, {
  value: '已通过',
  label: '已通过',
}]

const getusertoday = () => {
  if (!userdata) return
  isloading.value = true
  axios.get(`${process.env.VUE_APP_API_URL}/workrecords/usertoday`,{params:{user:userdata.nickname}})
      .then(res => {
        console.log(res.data)
        tdaytableData.value = res.data
        // tdaytableData.value=res.data['今日工作内容']
        // ydaytableData.value=res.data['明日工作计划']
      })
      .finally(() => {
        isloading.value = false
      })
}
getusertoday()

const opentodaysave = () => {
  isloading.value = true
  axios.get(`${process.env.VUE_APP_API_URL}/yzjvika/getzykxm`)
      .then(res => {
        console.log(res.data)
        vikaxmdata.value = res.data
        tform.value = {}
        tdialogVisible.value = true
      })
      .finally(() => {
        isloading.value = false
      })
}

const nodes1 = ref([])
const nodes2 = ref([])
const nodes3 = ref([])
let id = 0
const props = ref({
  lazy: true,
  lazyLoad(node, resolve) {
    const {level} = node
    if (node.label) {
      if (tform.value['任务']) {
        tform.value['任务'] += '-' + node.label
      } else {
        tform.value['任务'] = node.label
      }
    }

    console.log(node.label)
    if (level == 0) {
      const schools = [...new Set(vikaxmdata.value['data'].map(item => item.学校[0]))];
      const nodes = schools.map((school) => {
        return {
          value: ++id,
          label: school,
          leaf: level >= 2,
        };
      });
      nodes1.value = nodes
      resolve(nodes)
    }
    if (level == 1) {
      const schools = vikaxmdata.value['data'].filter(item => item.学校[0] === node.label);
      // console.log(schools);
      const nodes = schools.map((school) => {
        return {
          value: ++id,
          label: school.项目名称类型,
          leaf: level >= 2,
          '类型': school.项目类型,
          '项目': school.项目名称,
        };
      });
      nodes2.value = nodes
      resolve(nodes)
    }
    if (level == 2) {
      // console.log(node)
      axios.get(`${process.env.VUE_APP_API_URL}/yzjvika/getzykrw`, {
        params: {
          'xiangmu': node.data['项目'],
          'leibie': node.data['类型']
        }
      })
          .then(res => {
            const resdata = res.data.data
            const nodes = resdata.map((item) => {
              return {
                value: ++id,
                label: item.任务名称,
                leaf: level >= 2,
              };
            })
            nodes3.value = nodes
            resolve(nodes)
          })
    }
  },
})
const tonAddItem = () => {
  // now.setDate(now.getDate() + 1)
  tdaytableData.value.push({
    任务名称: dayjs(new Date()).format('YYYY-MM-DD'),
    项目名称: 'Tom',
    完成进度: 'California',
    特殊备注: 'Los Angeles',
  })
}
const yonAddItem = () => {
  // now.setDate(now.getDate() + 1)
  ydaytableData.value.push({
    任务名称: dayjs(new Date()).format('YYYY-MM-DD'),
    项目名称: 'Tom',
    计划进度: 'California',
    特殊备注: 'Los Angeles',
  })
}

const formRef = ref<FormInstance>()


const todaysave = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {
      console.log(tform.value)
      console.log(nodes1.value, nodes2.value, nodes3.value)
      const xuexiao = nodes1.value.find(node => node.value === tform.value['任务'][0]);
      const xiangmu = nodes2.value.find(node => node.value === tform.value['任务'][1]);
      const renwu = nodes3.value.find(node => node.value === tform.value['任务'][2]);
      const todayform = {
        '任务': xuexiao.label + '-' + xiangmu.label + '-' + renwu.label,
        '进度': tform.value.进度+"%",
        '审核': tform.value.审核,
        '备注': tform.value.备注||''
      }
      const data = {
        'user':userdata['nickname'],
        'id':tdaytableData.value.id||0,
        "type": 'today',
        "model":'add',
        "data": todayform
      }

      axios.post(`${process.env.VUE_APP_API_URL}/workrecords/save`, data)
          .then(res => {
            console.log(res.data)
            if (res.data.code == 200) {
              ElMessage.success(res.data.message)
              tdaytableData.value.push(todayform)
            } else {
              ElMessage.error(res.data.message)
            }
          })

      tdaytableData.value['今日工作内容'] = tdaytableData.value['今日工作内容'] || [];
      tdaytableData.value['今日工作内容'].push(todayform)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const tdeleteRow = (index) => {
  tdaytableData.value['今日工作内容'].splice(index, 1)
}
const ydeleteRow = (index) => {
  tdaytableData.value['明日工作计划'].splice(index, 1)
}
</script>

<template>

  {{ userdata['nickname'] }}

  <el-card v-loading="isloading">
    <el-card style="width: 100%" header="今日工作内容">
      <el-table border :data="tdaytableData['今日工作内容']" style="width: 100%" height="250">
        <el-table-column fixed prop="任务" label="任务" min-width="50%"/>
        <el-table-column prop="进度" label="进度" min-width="10%"/>
        <el-table-column prop="审核" label="审核" min-width="10%"/>
        <el-table-column prop="备注" label="备注" min-width="30%"/>
        <el-table-column fixed="right" label="操作" width="60">
          <template #default="scope">
            <el-button
                link
                type="primary"
                size="small"
                @click.prevent="tdeleteRow(scope.$index)"
            >
              删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" type="primary" :loading="isloading" style="width: 100%" @click="opentodaysave">添加今日工作内容
      </el-button>
    </el-card>
    <el-card style="width: 100%" header="明日工作计划">
      <el-table border :data="tdaytableData['明日工作计划']" style="width: 100%" height="250">
        <el-table-column fixed prop="任务" label="任务" max-width="20%"/>
        <el-table-column prop="进度" label="进度" max-width="20%"/>
        <el-table-column prop="备注" label="备注" max-width="20%"/>
        <el-table-column fixed="right" label="操作" width="60">
          <template #default="scope">
            <el-button
                link
                type="primary"
                size="small"
                @click.prevent="ydeleteRow(scope.$index)"
            >
              删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="ydialogVisible=true">添加明日工作计划</el-button>
    </el-card>
  </el-card>

  <el-dialog
      v-model="tdialogVisible"
      title="添加今日工作项"
      width="90%"
  >

    <el-form
        ref="formRef"
        label-position="top"
        :model="tform"
    >
      <el-form-item label="任务" prop="任务" :rules="{
        required: true,
        message: '设置任务',
      }">
        <el-cascader  v-model="tform['任务']" :props="props" style="width: 100%"/>
      </el-form-item>

      <el-form-item prop="进度" :rules="{
        required: true,
        message: '设置完成度',
      }" label="完成度">
        <el-slider  v-model="tform['进度']"/>
      </el-form-item>

      <el-form-item label="审核情况" prop="审核" :rules="{
        required: true,
        message: '设置审核情况',
      }">
        <el-select v-model="tform['审核']" placeholder="Select" style="width: 100%">
          <el-option
              v-for="item in wanchengop"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="user">
        <el-input
            v-model="tform['备注']"
            style="width: 100%"
            :autosize="{ minRows: 4, maxRows: 6 }"
            type="textarea"
            placeholder="特殊情况备注"
        />
      </el-form-item>
      <el-form-item>
          <el-button @click="tdialogVisible = false">取 消</el-button>
          <el-button :loding="isloading" type="primary" @click="todaysave(formRef)">
            提 交
          </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog
      v-model="ydialogVisible"
      title="添加明日工作计划项"
      width="500"
      :before-close="yhandleClose"
  >
    <span>添加明日工作计划项</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="ydialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="ydialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<style scoped>

</style>