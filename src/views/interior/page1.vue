<script>
import axios from "axios";
export default {
  name: "page1",
  data() {
    return {
      olddata:{
        "myQuestion.id": "",
        "myQuestion.title": '',
        // 多选：“87764518df4341638ac5b05291c369a8”；单选："fc64b1e7875641e5b7935b508051684a"
        "typeId": "fc64b1e7875641e5b7935b508051684a",
        "bankId": '',
        "attrValue": '{"zhzj_difficulty":"2"}',
        "description": '',
        "option": '',
        "params.currentBankId": '',
        "params.tags": "",
        "params.cloudCode": "",
        "params.cloudUserName": "",
        "myQuestion.fatherId": "",
        "myQuestion.analysis": "",
        "myQuestion.inputBoxStyle": '{"qTitleStyle":"0","qAnswerStyle":["0","0","0","0","0"],"qAnalysisStyle":"0","reference":""}',
        "myQuestion.resourcePath": "",
        "myQuestion.resourceSourceType": "",
        "myQuestion.resourceUploadId": "",
        "params.fileSize": "",
        "params.videoTime": "",
        "params.cloudFileOrignName": "",
        "params.searchRootId": "74b6d9d524a14f01ac34b6803ca17418",
        "params.webtrnMark": "mooc",
        "params.optType": "firstAdd",
        "params.opt": "add"
      },
      tigan:'',
      xuanxiang:'',
      bankId:'402883e48eb9ba3c018ebd1725b714be',
      daan:'',
      form:{
        url:'https://spoc-exam.icve.com.cn/zhzjExam/zhzjQuestionManage_saveOrUpdateQuestion.action',
        data:'',
        headers:JSON.stringify({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': '_abfpc=65890996a3a7448e9662d8bd928f44ba7a65e8bb_2.0; cna=bf2860a8130b0e9becfe1a3417ebb628; token=63230672-7d6d-4cb7-973d-f9add2ae39d2; JSESSIONID=7CE96A2FA26EC0E841BB44C8AE686C55.web-45; JSESSIONID=7CE96A2FA26EC0E841BB44C8AE686C55.web-45; USERSESSIONID=3d587e78d5014d6791b850cf44faf82d#interface#batchCode#attachData; acw_tc=0b32822217125576031446396e75162e90b73adc1f85279b7012b18fcdb01d; SERVERID=032c750e4ace1962f730410e643c240a|1712557800|1712555731; ssxmod_itna=QqGx2D9Dn70=DtG8WDX7WvxYTQ9iKrqrDgiE=llGx0HYPGzDAxn40iDtrrLliCbGqh5=7Ph0D3P8A2Pu5UYYpPoijz7Gp4bVtbx0aDbqGkqnC8PGG0xBYDQxAYDGDDPCDj4ibDY3s8DjY5zlgvCjxiOD7eDXxGCDQ9hRxGWDiPD7oHxYii1eDDzbopKZnDDEYyzhcBhN4D1qjvxKY5D9x0CDlaeg9oD0EdXeeBz2tLEj09+d40OD0Img=9wDBb1q9H8Iz+4ji3PVA23rBRDKlDo3Gn4vi+MYGpB3cDqei+BNGDKGuNxDDpxtDKQ0onGDD===; ssxmod_itna2=QqGx2D9Dn70=DtG8WDX7WvxYTQ9iKrqrDgiE=llDn98nw4Ds+qDLnmFwb/rtHkAINk8UPL7052jpQF0v=+rA9n58YCWH6YbLOd8iIYCfaOrPcWKjA86rdKrYg+rvFnHin6Ov6r8R9AnW2ay=VPe4VZcsTpAGE2BFrSywScpw1PvNThFh7t7m8IgsDn4+R2OE9i7H9BwEcnOHlxkG2Ddb7hk=wakENa8rs1d0N8djacPWyFe1ufTXLOnWL=D2WEqHWVdiCvl9qnkrqfCEA=aWmbmCmtUrm+FiXKeSyzUf1LmS7LXMZwZl0FSAvyzyS/5cKYVUFRiKin5xg07ju=m29B4xkGxUKTKiqbyqlRMQiYwqe=mKYx4jFiGceLxjzqQgTdr4KhgRI4UjBQyRKLO897r0pKSbMDR7YY4FxDKkqt0oNrx=+eSxN9hDo4xmGeSBxo1=OpHCaYjnthMKe73PAAKA8ofxfZKHa5m=Uhgwr6U1ZUEhUqix1SDzr6SP04to6pTN0Na6TYiPSaxQFYxKY80DD7=DYKFtG5ZQIOOY0AkLwen0eyG84hOp+4bgKNDq+348LKeejhhWQ0D/oEwfW+i49nDYxLHiW=GvdrenGDD=; tfstk=fn0ocyTom0rSpQ5pEq4WoI-IDYxANTaI8vQLpyee0-yfyJUJFqbnNvq8Y0p5Yw2md8E-TLinnbDP9XdPJy033vd7vYpSKDcsIkQpP0n3TxunJ2E7ww2E1YD3AQwLLJDKT0dvWFhSNyae-dL9W76HztDl8w7yTEP__wHfnAcSNy1bjSKZ2bs3YEieZykUu-P89yWUav74g-NQTTPFzIc4hWzFz8rPu-P39gyUTbKMaJuE4qR6IbK0Bf5S37quKwEc-DMlW-ewY8_co8Vaq0hznw7EomZasC2yfseQy8GzZvT1PzrnfXFnEUbrKfgjnSkw-NerGfnTV4-dWl48Ek3zS68riz2ub4ElaZMZiXoTmqdw5z4zUDUS91v-i4D-NqcdTizuymqirP81UJnxs2VnRpTmIfgjnSkw-LSzNiSwDgbQgB3cAMZzGS2sdnMfZZhyeZRDiTqQ4SN3BIAcApEzGS72iIXltuPbwH1..'
        })
      },
      postdata: '',
      posrres: '',
      tixing:''
    }
  },
  methods: {
    testpost() {
      const data={
        url:this.form.url,
        data:JSON.parse(this.form.data),
        headers:JSON.parse(this.form.headers)
      }
      console.log(data)
      axios.post(`${process.env.VUE_APP_API_URL}/addmoocq/addq`,data)
          .then(res => {
            console.log(res.data)
            this.posrres = JSON.stringify(res.data)
            this.$message.success(res.statusText)
            // if (res.statusText=='OK'){this.tigan='';this.xuanxiang='';this.daan='',this.form.data=''}
            if (res.data.retCode==='0'){this.tigan='';this.xuanxiang='';this.daan='',this.form.data=''}

          })
    },

    qsdata(tigan,xuanxiang,daan,weizhi,tixing){
      if(tigan)this.olddata["myQuestion.title"]=tigan
      if(xuanxiang)this.olddata["description"]=JSON.parse(`[${xuanxiang}]`)
      if(daan)this.olddata["option"]=JSON.parse(`[${daan}]`)
      if(weizhi){this.olddata["bankId"]=weizhi;this.olddata["params.currentBankId"]=weizhi;}
      if(tixing)this.olddata["typeId"]=tixing
      this.form.data= JSON.stringify(this.olddata)
    },
  }
}
</script>

<template>
  <el-form :model="form" label-width="auto" >
    <el-form-item label="接口">
      <el-input v-model="form.url" />
    </el-form-item>

    <el-form-item label="头部">
      <el-input v-model="form.headers" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }"/>
    </el-form-item>

    <el-form-item label="数据预览">
      <el-input disabled v-model="form.data" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }"/>
    </el-form-item>


    <el-form-item label="bankId">
      <el-input v-model="bankId"  @input="qsdata(false,false,false,bankId)"/>
    </el-form-item>

    <el-form-item label="题型">
      <el-select @change="qsdata(false,false,false,false,tixing)" v-model="tixing" placeholder="题型">
        <el-option label="单选" value="fc64b1e7875641e5b7935b508051684a" />
        <el-option label="多选" value="87764518df4341638ac5b05291c369a8" />
        <el-option label="判断" value="de3477c4cf3a49ed9e6f3c9c6768793c" />
      </el-select>
    </el-form-item>

    <el-form-item label="题干">
      <el-input v-model="tigan"  @input="qsdata(tigan)"/>
    </el-form-item>
    <el-form-item label="选项">
      <el-input v-model="xuanxiang"  @input="qsdata(false,xuanxiang)"/>
    </el-form-item>
    <el-form-item label="答案">
      <el-input v-model="daan"  @input="qsdata(false,false,daan)"/>
    </el-form-item>



<!--    <el-form-item label="方式">-->
<!--      <el-select v-model="form.region" placeholder="please select your zone">-->
<!--        <el-option label="post" value="post" />-->
<!--        <el-option label="get" value="get" />-->
<!--      </el-select>-->
<!--    </el-form-item>-->
    <el-button @click="testpost">提交</el-button>
  </el-form>







  <el-input
      v-model="posrres"
      :autosize="{ minRows: 4, maxRows: 8 }"
      type="textarea"
  />
</template>

<style scoped>

</style>