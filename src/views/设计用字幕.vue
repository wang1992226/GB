<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox, ElTable} from "element-plus";
import axios from "axios";
import AudioWaveform from "@/components/音频波纹.vue";
import ReportWrong from "@/components/dialog/报告读错.vue";
import ZimuLiebiao from "@/components/字幕列表.vue";
import XiugaiZimu from "@/components/修改字幕.vue";
const path = ref<string>('')
const username = ref('')
const audio_name = ref('')
const loading = ref(false)
const ip_address = ref('')
onMounted(() => {
  const url = window.location.href;
  const params = new URLSearchParams(url.split("?")[1]);
  path.value = params.get("path");
  ip_address.value = params.get("ipaddress");
  // 去除地址最后的\任务进度更新.json
  path.value = path.value.replace('\\任务进度更新.json', '');
  username.value = params.get("username");
  loading.value = true;
  axios.get(`${process.env.LOCAL_API_URL}/getsrtdata`, {params: {path: path.value},timeout: 30000})
      .then(res => {
        str_json.value = res.data.data;
        audio_name.value = res.data.audio_path
        audwf.value.waveSurfer.load('./audio_cache/' + res.data.audio_path)
        console.log(res.data)
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
const handleRowClick = (row: any, event: MouseEvent, column: any) => {
  if (是否提交.value==true){
    selectedRows.value=[]
    是否提交.value=false
  }
  if (Array.isArray(row)) {
    row = event;
  }
  const rowIndex = row.index;
  if (selectedRows.value.includes(rowIndex)) {
    // 如果行已经被选中，则取消选中
    const currentIndex = parseInt(rowIndex);
    selectedRows.value = selectedRows.value.filter(index => parseInt(index) < currentIndex);
  } else {
    // 否则选中该行
    selectedRows.value.push(rowIndex);
    // 确保选中的行是连续的
    selectedRows.value.sort((a, b) => parseInt(a) - parseInt(b));
    // 选中最小到最大之间的所有行
    const minIndex = Math.min(...selectedRows.value.map(index => parseInt(index)));
    const maxIndex = Math.max(...selectedRows.value.map(index => parseInt(index)));

    for (let i = minIndex; i <= maxIndex; i++) {
      if (!selectedRows.value.includes(i.toString())) {
        selectedRows.value.push(i.toString());
      }
    }
    // 再次排序以确保顺序
    selectedRows.value.sort((a, b) => parseInt(a) - parseInt(b));
    console.log(selectedRows.value)
  }
  // 更新表格的选中状态
  (tableRef.value as InstanceType<typeof ElTable>).clearSelection();
  selectedRows.value.forEach(index => {
    const row = str_json.value.find(item => item.index === index);
    if (row) {
      (tableRef.value as InstanceType<typeof ElTable>).toggleRowSelection(row, true);
    }
  });

  // 更新切割开始时间和结束时间
  if (selectedRows.value.length > 0) {
    const minIndex = Math.min(...selectedRows.value.map(index => parseInt(index)));
    const maxIndex = Math.max(...selectedRows.value.map(index => parseInt(index)));

    const minRow = str_json.value.find(item => item.index === minIndex.toString());
    const maxRow = str_json.value.find(item => item.index === maxIndex.toString());

    if (minRow && maxRow) {
      // console.log('ghtrhtr',minRow.start_time_int, maxRow.end_time_int)
      cut_starttime.value = minRow.start_time_int/1000;
      cut_endtime.value = maxRow.end_time_int/1000;
    }
  } else {
    cut_starttime.value = 0;
    cut_endtime.value = 0;
  }
  // updateCutTimes();
  console.log(cut_starttime.value, cut_endtime.value)

  audwf.value.setregions(cut_starttime.value, cut_endtime.value)

};
// 更新切割开始时间和结束时间
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
const 报告读错 = (row) => {
  // console.log(row)
  let data = {
    '提交人': username.value,
    '项目地址': path.value,
    '字幕': row.text,
    '提交时间': new Date().toLocaleString(),
  }
  reportWrong.value.openDialog(data)
}
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
  // let selectedRows的最后的index= parseInt(selectedRows.value[selectedRows.value.length-1])
  // let 最后一个的结束时间=srttimetosecond(str_json.value[selectedRows的最后的index-1].end_time)
  // let 下一个的开始时间=''
  // if (str_json.value.length<=selectedRows的最后的index){
  //   selectedRows的最后的index=str_json.value.length
  //   下一个的开始时间=srttimetosecond(str_json.value[selectedRows的最后的index-1].end_time)
  // }else{
  //   下一个的开始时间=srttimetosecond(str_json.value[selectedRows的最后的index].start_time)
  // }
  // 计算中间的时间点
  // let 时间间隔=下一个的开始时间-最后一个的结束时间
  // let 时间点=最后一个的结束时间+时间间隔/2
  // console.log('最后一个的结束时间',seconds_to_time(最后一个的结束时间))
  // console.log('下一个的开始时间',seconds_to_time(下一个的开始时间))
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
const 发送PPTAPI = () => {
  let data=逐字时间()
  data['ip_address']=ip_address.value
  console.log('data',data)
  axios.post(`${process.env.LOCAL_API_URL}/cutaudio`, data).then(res => {
    console.log(res)
  })
  是否提交.value=true
  // window.chrome.webview.postMessage(JSON.stringify(data));
  // try {
  //   sendToPowerPoint(data)
  // }catch (e) {
  //   console.log(e)
  // }
}

// async function sendToPowerPoint(data) {
//   try {
//     const response = await fetch('http://localhost:8899/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8'
//       },
//       body: JSON.stringify(data)//转字符串中文乱码问题
//     });
//
//     const result = await response.json();
//     console.log('发送成功：', result);
//   } catch (error) {
//     console.error('发送失败：', error);
//   }
// }

// const net = require('net');
// const path2 = require('path');

// function exec(context) {
//   return new Promise((resolve, reject) => {
//     // 使用正确的管道路径格式
//     const pipePath = '\\\\.\\pipe\\PPTAddinPipe';
//
//     // 创建客户端连接
//     const client = net.connect(pipePath, () => {
//       console.log('已连接到管道服务器');
//
//       // 获取要发送的消息
//       // const message = context.getVarValue('message') || 'Hello from Node.js!';
//
//       // 发送消息（确保以换行符结束）
//       client.write(context + '\n');
//
//       // 设置编码以正确处理文本
//       client.setEncoding('utf8');
//
//       // 接收服务器响应
//       let response = '';
//
//       client.on('data', (data) => {
//         response += data;
//         if (response.includes('\n')) {
//           // 收到完整响应后关闭连接
//           client.end();
//         }
//       });
//
//       client.on('end', () => {
//         // 将响应保存到变量
//         context.setVarValue('response', response.trim());
//         resolve(`发送成功! 服务器响应: ${response.trim()}`);
//       });
//     });
//
//     // 错误处理
//     client.on('error', (err) => {
//       reject(`连接错误：${err.message}`);
//     });
//
//     // 设置连接超时
//     client.setTimeout(5000, () => {
//       client.destroy();
//       reject('连接超时');
//     });
//   });
// }

// 导出函数
// module.exports = { exec };
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
  <el-table ref="tableRef" :data="str_json" :cell-style="{padding: '0',}" style="width: 100%;height: calc(100vh - 260px - 40px - 26px - 20px)" @select="handleRowClick"  @select-all="handleSelectionChange">
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
        <el-button type="danger" size="small"  @click="报告读错(scope.row)">报告影响设计</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="control-container">
    <AudioWaveform style="margin-top: 20px"  @timeupdated="settime" ref="audwf"/>
    <div class="buttonconten">
      <el-button style="width: 40%" type="primary" :disabled="selectedRows.length === 0" @click="逐字时间">逐字时间</el-button>
      <el-button style="width: 40%" type="primary" :disabled="selectedRows.length === 0" @click="发送PPTAPI">音频写入剪贴板</el-button>
<!--      <el-button style="" type="primary" :disabled="selectedRows.length === 0" @click="发送PPTAPI">发送PPTAPI</el-button>-->
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