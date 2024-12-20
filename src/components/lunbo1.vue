<script>
export default {
  name: "lunbo1",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      itemwidth: 390,
      showint: 4,
      timer: null,
      ziyuanku: [
        {
          "_id": 223,
          "介绍": [
            {
              "insert": "\t学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。\n学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。\n"
            }
          ],
          "名称": "数控技术应用专业群",
          "封面": "cab3e63f8245e699ea3f123d63a1cfb6_252319_1920_1080.jpg"
        },
        {
          "_id": 224,
          "介绍": [
            {
              "insert": "\t学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。\n学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。\n"
            }
          ],
          "名称": "中餐烹饪专业群",
          "封面": "cab3e63f8245e699ea3f123d63a1cfb6_252319_1920_1080.jpg"
        },
        {
          "_id": 225,
          "介绍": [
            {
              "insert": "\t学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。\n学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。\n"
            }
          ],
          "名称": "计算机技术专业群",
          "封面": "cab3e63f8245e699ea3f123d63a1cfb6_252319_1920_1080.jpg"
        },
        {
          "_id": 226,
          "介绍": [
            {
              "insert": "\t学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。\n学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。\n"
            }
          ],
          "名称": "财经商务专业群",
          "封面": "cab3e63f8245e699ea3f123d63a1cfb6_252319_1920_1080.jpg"
        },
        {
          "_id": 227,
          "介绍": [
            {
              "insert": "\t学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。\n学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。\n"
            }
          ],
          "名称": "幼儿保育专业群",
          "封面": "cab3e63f8245e699ea3f123d63a1cfb6_252319_1920_1080.jpg"
        },
        {
          "_id": 228,
          "介绍": [
            {
              "insert": "\t学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。\n学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。\n"
            }
          ],
          "名称": "汽车技术专业群",
          "封面": "cab3e63f8245e699ea3f123d63a1cfb6_252319_1920_1080.jpg"
        },
        {
          "_id": 229,
          "介绍": [
            {
              "insert": "\t学校创办于1940年，前身为信宜师范学校，办学历史悠久、源远流长。2013年，为进一步优化职业教育结构布局信宜市委、市政府对城区的职业教育进行资源整合，保留信宜市职业技术学校、信宜市职业教育中心、信宜市教师进修学校、信宜市广播电视大学，实行“四个牌子、两个校区、一套班子”的管理模式。信宜市职业技术学校(信宜职教中心)是广东省重点中等职业学校、教育部县级职教中心改革发展课题广东省课题组成员单位，先后被评为全国中等职业学校班主任工作创新改革实验校、全国青少年校园足球特色学校等先进单位，是广东省中职德育队伍建设培训基地，也是目前茂名地区规模最大的中职学校，在全省享有“东有普宁、西有信宜”的盛誉。\n学校校园基础设施完善、环境优美，教学设备先进，紧紧扣住市场需求和就业热门方向，开设多门重点专业和品牌专业，中职生人数和在校生人数均是茂名地区第一，在全省也是排名前列的超万人“大中职”学校走内涵式的发展道路，坚持“德技双馨，品牌强校”的办学理念,积极探索实践职业教育铸魂、厚德、精艺严纪“四位一体”育人模式，加强各项工作管理,深化产教融合、校企合作,致力于提高人才培养质量。新时代新要求新作为，在习近平新时代中国特色社会主义思想指导下,学校将继续以“办大、办强、办优”为总目标，努力把学校建设成为广东省高水平中职学校。\n"
            }
          ],
          "名称": "电子信息专业群",
          "封面": "cab3e63f8245e699ea3f123d63a1cfb6_252319_1920_1080.jpg"
        }
      ]
    };
  },
  mounted() {
    this.initCarousel();
  },
  methods: {
    initCarousel() {
      const container = document.querySelector('.containera');
      const items = document.querySelectorAll('.itema');
      // 复制最前的3个元素到最后面
      for (let i = 0; i < this.showint; i++) {
        const clone = items[i].cloneNode(true);
        container.appendChild(clone);
      }
      // 自动滚动
      this.timer = setInterval(this.autoScroll, 4000);
    },
    // autoScroll() {
    //   this.currentIndex++;
    //   const container = document.querySelector('.containera');
    //   const items = document.querySelectorAll('.itema');
    //   if (this.currentIndex >= items.length-this.showint) {
    //     container.style.transform = `translateX(${-this.currentIndex * this.itemwidth}px)`;
    //     setTimeout(() => {
    //       container.style.transition = 'all 0s';
    //       container.style.transform = 'translateX(0)';
    //       this.currentIndex = 0;
    //     }, 900);
    //   } else {
    //     container.style.transition = 'all 1s';
    //     container.style.transform = `translateX(${-this.currentIndex * this.itemwidth}px)`;
    //   }
    // },
    prev() {
      clearInterval(this.timer);

      if (this.currentIndex > 0) {
        this.currentIndex--;
        const container = document.querySelector('.containera');
        container.style.transform = `translateX(${-this.currentIndex * this.itemwidth}px)`;
      }
      // this.timer = setInterval(this.autoScroll, 4000);
    },
    next() {
      clearInterval(this.timer);
      this.currentIndex++;
      const container = document.querySelector('.containera');
      const items = document.querySelectorAll('.itema');
      if (this.currentIndex >= items.length-this.showint) {
        container.style.transform = `translateX(${-this.currentIndex * this.itemwidth}px)`;
        setTimeout(() => {
          container.style.transition = 'all 0s';
          container.style.transform = 'translateX(0)';
          this.currentIndex = 0;
        }, 900);
      } else {
        container.style.transition = 'all 1s';
        container.style.transform = `translateX(${-this.currentIndex * this.itemwidth}px)`;
      }
      // this.timer = setInterval(this.autoScroll, 4000);
    }
  }
};
</script>

<template>


  <div class="cases">
    <div class="containeraa">

      <div id="prevBtn" class="btnbutton" @click="prev"><i class="layui-icon layui-icon-left"></i></div>
      <div id="nextBtn" class="btnbutton" @click="next"><i class="layui-icon layui-icon-right"></i></div>

      <div class="containera">
        <div v-for="item in data" :key="item._id" class="itema">
          <dl>
            <dt><a :href="`https://edu.yizhijiao.cn/route/resource/zysy?resid=${item._id}`" target="_blank"> <img
                class="img_case"
                :src="`https://yizhijiao-1301544870.cos.ap-guangzhou.myqcloud.com/projects/files/${item.封面}`"
                width="380px" height="235px"/> </a></dt>
            <dd class="cases_name"> {{ item.名称 }}</dd>
            <dd class="cases_int">
              <p class="cases_description" v-if="item.介绍[0].insert.trim()">
                {{ item.介绍[0].insert }}</p>
              <p class="cases_description" v-else>暂无简介</p>
            </dd>
          </dl>
        </div>
      </div>



    </div>
  </div>



</template>

<style scoped>
.cases {
  padding-bottom: 40px;
  width: 1200px;
  margin: 0 auto;
}

.containera {
  display: flex;
  align-items: flex-start;
  font-size: 0;
  transition: all 1s;
}

.containeraa {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.itema {
  font-size: 10px;
  display: inline-block;
  width: 380px;
  background-color: #f3f3f3;
  margin-right: 10px;
}

.cases_dl {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.cases_dl dl {
  padding-bottom: 20px;
}

.cases_name {
  color: #4a4a4a;
  font-size: 18px;
  font-weight: bold;
  padding: 0px 18px;
}

.cases_int {
  height: 60px;
  //padding-bottom: 10px;
}

.cases_description {
  padding: 0 18px;
  margin-bottom: 10px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  white-space: break-spaces;
}


.containeraa {
  position: relative;
}


.btnbutton {
  display: flex;
  text-align: center;
  color: white;
  font-weight: bold;
  height: 79px;
  width: 40px;
  background-color: #00000091;
  cursor: pointer;
  margin: 0 10px;
  top: 50%;
  transform: translateY(-59%);
  align-items: center;
  justify-content: center;
}

#prevBtn {
  position: absolute;
  z-index: 1000;
  left: 0;
}

#nextBtn {
  position: absolute;
  z-index: 1000;

  right: 0;
}
</style>