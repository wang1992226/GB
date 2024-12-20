<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox, ElTable} from "element-plus";
import axios from "axios";
import AudioWaveform from "@/components/音频波纹_字幕.vue";
import ReportWrong from "@/components/dialog/报告读错.vue";
import ZimuLiebiao from "@/components/字幕列表.vue";
import XiugaiZimu from "@/components/修改字幕.vue";
const path = ref<string>('')
const username = ref('')
const audio_name = ref('')
const loading = ref(false)

onMounted(() => {
  const url = window.location.href;
  const params = new URLSearchParams(url.split("?")[1]);
  path.value = params.get("path");
  // 去除地址最后的\任务进度更新.json
  // path.value = path.value.replace('\\任务进度更新.json', '');
  // username.value = params.get("username");
  loading.value = true;
  axios.get(`${process.env.LOCAL_API_URL}/api/utterancesjson`, {params: {path: path.value},timeout: 30000})
      .then(res => {
        str_json.value = res.data;
        // audio_name.value = res.data.audio_path
        // audwf.value.waveSurfer.load('./audio_cache/DesginAudio.mp3')

        // console.log(res.data)
        loading.value = false;
      })
})
const str_json = ref([])
// 获取表格实例
const tableRef = ref<InstanceType<typeof ElTable> | null>(null);
const audwf = ref()
// 选中的行
const selectedRows = ref<string[]>([]);
// 处理行点击事件
const cut_starttime = ref(0)
const cut_endtime = ref(0)


const updateCutTimes = () => {
  if (selectedRows.value.length > 0) {
    const minIndex = Math.min(...selectedRows.value.map(index => parseInt(index)));
    const maxIndex = Math.max(...selectedRows.value.map(index => parseInt(index)));

    const minRow = str_json.value.find(item => item.index === minIndex.toString());
    const maxRow = str_json.value.find(item => item.index === maxIndex.toString());

    if (minRow && maxRow) {
      cut_starttime.value = minRow.start_time;
      cut_endtime.value = maxRow.end_time;
    }
  } else {
    cut_starttime.value = 0;
    cut_endtime.value = 0;
  }
};

// 处理选择变化事件
const handleSelectionChange = (selection: any[]) => {
  // console.log('all',selection)
  selectedRows.value = selection.map(row => row.index);
  updateCutTimes();
};
const srttimetosecond = (time: string) => {
  // 00:00:00.000  时:分:秒.毫秒
  const timeArr = time.split(':');
  const second = parseInt(timeArr[0]) * 3600 + parseInt(timeArr[1]) * 60 + parseFloat(timeArr[2]);
  return second
}

const seconds_to_time = (seconds: number) => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0'); //补齐两位数
  const seconds_num = seconds % 60;
  const seconds_str = seconds_num.toFixed(3).toString().padStart(5, '0');
  return `${hours}:${minutes}:${seconds_str}`
}
const submit = () => {
  let data=逐字时间()
  console.log('data',data)
  axios.post(`${process.env.LOCAL_API_URL}/cutaudio`, data).then(res => {
    console.log(res)
  })
  是否提交.value=true
}
const zimuliebiao=ref(null)
const resettime=(SelectionRows) => {
  let starttime=srttimetosecond(SelectionRows[0].start_time)
  // 所有的start_time和end_time 都减去starttime
  for (let i = 0; i < SelectionRows.length; i++) {
    SelectionRows[i].starttime_number=srttimetosecond(SelectionRows[i].start_time)-starttime
    SelectionRows[i].endtime_number=srttimetosecond(SelectionRows[i].end_time)-starttime
  }
  return SelectionRows
}
const settime = (starttime: number, endtime: number) => {
  // console.log('settime', starttime, endtime)
  for (let i = 0; i < str_json.value.length; i++) {
    if ((srttimetosecond(str_json.value[i].start_time) < starttime || srttimetosecond(str_json.value[i].start_time) < endtime) &&
    (srttimetosecond(str_json.value[i].end_time) > starttime || srttimetosecond(str_json.value[i].end_time) > endtime))
    {
      tableRef.value.toggleRowSelection(str_json.value[i], true)
    }
  else
    {
      tableRef.value.toggleRowSelection(str_json.value[i], false)
    }
  }
}

import { useDark, useToggle } from '@vueuse/core';
// 使用 useDark 获取当前是否为暗黑模式
const isDark = useDark();

// 使用 useToggle 切换暗黑模式
const toggleDark = useToggle(isDark);
const reportWrong = ref()

const updateAudio = () => {
axios.get(`${process.env.LOCAL_API_URL}/updateaudio`, {params: {path: path.value}})
      .then(res => {
        ElMessage({
          type: res.data.code === 200 ? 'success' : 'error',
          message: res.data.message
        })
      })
}
const xiugaizimu = ref(null)
const 修改字幕 = (row) => {
  // console.log(row)
  let data = {
    'id': row.index,
    'srt': row.text,
    'new_srt': row.text,
  }
  xiugaizimu.value.opendialog(data)
}
const 逐字时间 = () => {
  let data={
    start_time: seconds_to_time(audwf.value.starttime),
    end_time: seconds_to_time(audwf.value.endtime),
    audio_path: 'D:\\Develop\\shenpian_foreend\\audio_cache\\' + audio_name.value,
    username: username.value,
    字幕文本: selectedRows.value.map(index => str_json.value.find(item => item.index === index).text).join(' '),
    // 字幕时间: [seconds_to_time(srttimetosecond(str_json.value.find(item => item.index === selectedRows.value[0]).start_time)),seconds_to_time(下一个的开始时间)].join('|'),
    字幕时间: [str_json.value.find(item => item.index === selectedRows.value[0]).start_time_int,str_json.value.find(item => item.index === selectedRows.value[selectedRows.value.length-1]).end_time_int].join('|'),
    字幕对象数组:resettime(tableRef.value.getSelectionRows())
  }
  let words_data=[]
  if ('words' in data.字幕对象数组[0]) {
    let starttime = data.字幕对象数组[0].words[0].start_time / 1000
    for (let j = 0; j < data.字幕对象数组.length; j++) {
      for (let i = 0; i < data.字幕对象数组[j].words.length; i++) {
        let word_data = {
          time: (data.字幕对象数组[j].words[i].start_time / 1000 - starttime + 0.5).toFixed(2),
          text: data.字幕对象数组[j].words[i].text,
        }
        words_data.push(word_data)
      }
    }
  }
  zimuliebiao.value.opendialog(words_data)

  return data
}
const 是否提交=ref(false)
const updateSubtitle = (data) => {
  console.log(data)
  let index = data.id
  let new_srt = data.new_srt
  let updata={
    index: index,
    srt_text: new_srt,
    path: path.value,
  }
  axios.post(`${process.env.LOCAL_API_URL}/uploadsrt`, updata).then(res => {
    console.log(res)
    if (res.data.code === 200) {
      ElMessage({
        type:'success',
        message: '修改字幕成功'
      })
      str_json.value[index-1].text = new_srt
    } else {
      ElMessage({
        type: 'error',
        message: '修改字幕失败'
      })
    }
  })
}
const set_regions = () => {
  audwf.value.set_regions(str_json.value)
}
</script>

<template>

<div class="container" v-loading="loading">
  <div class="title" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
    <el-switch v-model="isDark" @change="toggleDark"
               inline-prompt
               active-text="暗黑"
               inactive-text="明亮"/>
<!--    <el-button style="margin-left: 20px" type="info" size="small" @click="updateAudio">更新音频</el-button>-->
    <el-tag style="margin-left: 20px" type="primary">{{ username }}</el-tag>
    <el-text style="margin-left: 20px" class="mx-1" size="small">{{ path }}</el-text>
    </div>
  <el-table ref="tableRef" :data="str_json" :cell-style="{padding: '0',}" style="width: 100%;height: calc(100vh - 262px - 40px - 26px - 20px)" @select="handleRowClick"  @select-all="handleSelectionChange">
<!--    <el-table ref="tableRef" :data="str_json" height="800px" style="width: 100%" @selection-change="handleSelectionChange">-->
    <el-table-column type="selection" property="selected" width="55"/>
    <el-table-column property="index" label="id" width="80"/>
    <el-table-column label="srt-time" width="120">
      <template #default="scope">
        {{ scope.row.start_time }} {{ scope.row.end_time }}
      </template>
    </el-table-column>
    <el-table-column  property="text" label="字幕" @click="handleRowClick">
      <template #default="scope">
        <div class="full-cell" style="line-height: 46.73px" @click.stop="handleRowClick(scope.row, $event, scope.column)">
        {{ scope.row.text }}
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="220">
      <template #default="scope">
        <el-button type="primary" size="small" @click="修改字幕(scope.row)">修改字幕</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="control-container">
    <AudioWaveform style="margin-top: 20px"  @timeupdated="settime" ref="audwf"/>
    <div class="buttonconten">
      <el-button style="width: 40%" type="primary" :disabled="selectedRows.length === 0" @click="逐字时间">逐字时间</el-button>
      <el-button style="width: 40%" type="primary"  @click="set_regions">音频写入剪贴板</el-button>
    </div>
  </div>
</div>
<ReportWrong ref="reportWrong"/>
  <ZimuLiebiao ref="zimuliebiao" />
  <XiugaiZimu ref="xiugaizimu" @updateSubtitle="updateSubtitle" />
</template>

<style scoped>
.container {
  //width: 100%;
  min-width: 660px;
  padding: 20px;
}
.buttonconten {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

}
.el-table {
  padding: 0!important;
}
.el-table .cell {
  line-height: normal!important;
}

</style>