<script setup>
import { ref,reactive, toRefs, onBeforeMount, onMounted, watchEffect, defineExpose } from 'vue'
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
// import demoData from './ganttData.json'
import {资源库任务,资源库项目,日志汇总} from '@/api/vika.js'

// console.log('gfdhfgdxhuidfjshgjdfkshgfd',new 资源库任务().get_all({'filterByFormula':'{项目}="3D max室内效果图制作-微课视频"'}))

// const data2 = vika.资源库任务();
// console.log('data', data2);
// console.log('data5555');
// const data = reactive({})
const demoData = reactive( {"data":[]})
const data = reactive({
  timeList: [
    // {
    //     name: "周",
    //     code: "week",
    // },
    {
      name: '月',
      code: 'month'
    },
    {
      name: '季',
      code: 'quarter'
    },
    {
      name: '年',
      code: 'year'
    }
  ],
  timeState: 'month'
})
const zoomConfig = {
  levels: [
    {
      name: 'day',
      scale_height: 60,
      scales: [{ unit: 'day', step: 1, format: '%d %M' }]
    },
    {
      name: 'week',
      scale_height: 60,
      scales: [
        {
          unit: 'week',
          step: 1,
          format: function (date) {
            let dateToStr = gantt.date.date_to_str('%m-%d')
            let endDate = gantt.date.add(date, -6, 'day')
            let weekNum = gantt.date.date_to_str('%W')(date) //第几周
            return dateToStr(endDate) + ' 至 ' + dateToStr(date)
          }
        },
        {
          unit: 'day',
          step: 1,
          format: '%d', // + "周%D"
          css: function (date) {
            if (date.getDay() == 0 || date.getDay() == 6) {
              return 'day-item weekend weekend-border-bottom'
            } else {
              return 'day-item'
            }
          }
        }
      ]
    },
    {
      name: 'month',
      scale_height: 60,
      min_column_width: 18,
      scales: [
        { unit: 'month', format: '%Y-%m' },
        {
          unit: 'day',
          step: 1,
          format: '%d',
          css: function (date) {
            if (date.getDay() == 0 || date.getDay() == 6) {
              return 'day-item weekend weekend-border-bottom'
            } else {
              return 'day-item'
            }
          }
        }
      ]
    },
    {
      name: 'quarter',
      height: 60,
      min_column_width: 110,
      scales: [
        {
          unit: 'quarter',
          step: 1,
          format: function (date) {
            let yearStr = new Date(date).getFullYear() + '年'
            let dateToStr = gantt.date.date_to_str('%M')
            let endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day')
            return yearStr + dateToStr(date) + ' - ' + dateToStr(endDate)
          }
        },
        {
          unit: 'week',
          step: 1,
          format: function (date) {
            let dateToStr = gantt.date.date_to_str('%m-%d')
            let endDate = gantt.date.add(date, 6, 'day')
            let weekNum = gantt.date.date_to_str('%W')(date)
            return dateToStr(date) + ' 至 ' + dateToStr(endDate)
          }
        }
      ]
    },
    {
      name: 'year',
      scale_height: 50,
      min_column_width: 150,
      scales: [
        { unit: 'year', step: 1, format: '%Y年' },
        { unit: 'month', format: '%Y-%m' }
      ]
    }
  ]
}
const initGantt = () => {
  gantt.config.grid_width = 350
  gantt.config.add_column = false //添加符号
  // gantt.config.zoom.setLevel('month') //切换到指定的缩放级别

  //时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状。
  gantt.config.autofit = false
  gantt.config.row_height = 30
  gantt.config.bar_height = 20
  gantt.config.fit_tasks = true //自动延长时间刻度，以适应所有显示的任务
  // gantt.config.auto_types = true //将包含子任务的任务转换为项目，将没有子任务的项目转换回任务
  // gantt.config.xml_date = '%Y-%m-%d' //甘特图时间格式
  gantt.config.readonly = true //是否只读
  gantt.i18n.setLocale('cn') //设置语言
  gantt.init('gantt_here')
  gantt.parse(demoData)

  gantt.ext.zoom.init(zoomConfig) //配置初始化扩展
  gantt.ext.zoom.setLevel('month') //切换到指定的缩放级别
}


const changeTime = () => {
  gantt.ext.zoom.setLevel(data.timeState)
}


defineExpose({
  ...toRefs(data)
})



// async function fetchData() {
//   // const data2 = await vika.资源库任务();
//   console.log('data5555');
//   // console.log('data', data2);
// }

// onMounted(async () => {
//   await fetchData();
// });

// onBeforeMount(() => {
// })
onMounted(() => {
  // const ziyuanku1=new 资源库任务();
  // const ziyuanku2=new 资源库项目();

  // new 资源库任务().get_all({filterByFormula:'{项目}="3D max室内效果图制作-微课视频"'})
  new 资源库任务().get_all()
  .then(data => {
    console.log('data222', data);
    const ganntData = [];
    for (let i = 0; i < data.length; i++) {
      data[i].fields.recordId = data[i].recordId;
      data[i].fields.createdAt = data[i].createdAt;
      ganntData.push(data[i].fields)
    }
    console.log('data3333', ganntData);

    // 应用转换函数
    const transformedData = transformData(ganntData);


// 输出结果
    console.log('transformedData',transformedData);
    demoData.data = transformedData;
    initGantt()
    })
  new 资源库项目().get_all();


  // vika22222.项目数据().更新({'id':2})
  // console.log('gggggggggg')
  // console.log(vika.资源库任务())
  // console.log('gggggggggg2')
  // initGantt()
})
// 修正后的unique函数，处理数组键
function unique(arr, key) {
  const seen = new Set();
  return arr.filter((item) => {
    const keyValue = item[key][0];
    return !seen.has(keyValue) && seen.add(keyValue);
  });
}
function transformData(data) {
  let allid=1
  // 步骤1：去重并提取学校名
  const data2 = unique(data, '学校').map((school, index) => ({ id: allid++, text: school['学校'][0], "open": true}));
  // 步骤2：构建data3，根据学校名和项目名，跳过已存在的项目名
  const data3 = [];
  data.forEach((item) => {
    const schoolName = item['学校'][0].toLowerCase(); // 转换为小写
    const schoolId  = data2.find((s) => s.text.toLowerCase() === schoolName).id; // 查找data2中与当前item学校名匹配的id
      const projectText = item['项目名称'][0];
      const existingProjectIndex = data3.findIndex((p) => p.text === projectText);
      if (existingProjectIndex === -1) {
        data3.push({ id: allid++, text: projectText, parent: schoolId });
      }
  });
  // 步骤3：生成data4
  const data4 = data.reduce((acc, item) => {
    const project = data3.find(project => project.text === item['项目名称'][0]);
    if (project) {
      const newTask = {
        id: allid++,
        text: item['任务名称'],
        parent: project.id,
        start_date: formattedDateString(item['createdAt']),
        "render": "split",
        // duration:"5"
      };
      acc.push(newTask);
    }
    return acc;
  }, []);
  // 步骤4：生成data5
  const data5 = data.reduce((acc, item) => {
    const project = data4.find(project => project.text === item['任务名称']);
    const sktime=item['设计开始时间']??item['createdAt']
    const sktime2=item['设计完成时间']??item['createdAt']
    const jiaotongtime2=item['后期开始时间']??item['createdAt']
    const houqitime=item['后期完成时间']??item['createdAt']
      let newTask = {
        id: allid++,
        text: '设计',
        parent: project.id,
        start_date: formattedDateString(sktime),
        end_date: formattedDateString(sktime2),
      };
      acc.push(newTask);
     newTask = {
      id: allid++,
      text: '交接',
      parent: project.id,
      start_date: formattedDateString(sktime2),
      end_date: formattedDateString(jiaotongtime2),
    };
    acc.push(newTask);
    newTask = {
      id: allid++,
      text: '后期',
      parent: project.id,
      start_date: formattedDateString(jiaotongtime2),
      end_date: formattedDateString(houqitime),
    };
    acc.push(newTask);
    return acc;
  }, []);
  // 合并data2, data3, data4
  const mergedData = [...data2, ...data3, ...data4,...data5];
  return mergedData;
}
function formattedDateString(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  return `${day}-${month}-${year}`;
}
// watchEffect(() => {})
</script>
<template>
  <section class="my-gantt">
    <div id="gantt_here" class="gantt-container"></div>
  </section>
</template>
<style scoped lang="scss">
.my-gantt {
  height: 100%;
  width: 100%;
  .gantt-container {
    width: 100%;
    height: 100%;
  }
}
</style>