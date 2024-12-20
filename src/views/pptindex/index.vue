<template>


  <el-main>
    <el-table :data="tableData"  border style="width: 100%;" max-height="600px">
      <el-table-column show-overflow-tooltip min-width="30%" prop="项目名" label="项目名"></el-table-column>
      <el-table-column label="链接">
        <template #default="scope">
          <a :href="occlink+scope.row.链接+'/'" target="_blank">{{ occlink + scope.row.链接 +'/'}}</a>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip width="180px" prop="时间" label="上传时间"></el-table-column>


      <el-table-column label="操作" width="140px">
        <template #default="scope">
          <el-button size="small" type="primary" @click="setshare(scope.row)">分享</el-button>
          <el-button size="small" type="primary" @click="deleteshare(scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>
  </el-main>

  <el-card shadow="never">
    <el-upload
        drag
        class="upload-demo"
        :action="prolink"
        multiple
        :on-success="getfolders"
        accept="application/zip"
    >
      <div class="el-upload__text">
        拖拽或 <em>点击</em>上传【zip】
      </div>
      <template #tip>
        <div class="el-upload__tip">
          zip名称用项目名，如“XXXXX平台”。
        </div>
      </template>

    </el-upload>
  </el-card>



  <el-dialog v-model="centerDialogVisible" title="分享" width="500" center>
    <div style="text-align: center">
      <img :src="qrCodeUrl" alt="二维码">
    </div>


    <el-input
        v-model="textarea2"
        style="width: 100%"
        :autosize="{ minRows: 8, maxRows: 12 }"
        type="textarea"
        placeholder="Please input"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="copyLink()">
          复制
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      occlink:`${process.env.FRONTEND_URL}/pptindex/`,
      prolink: process.env.VUE_APP_API_URL + '/pptindex/upload',
      uploadProgress: 0,
      tableData: [],
      centerDialogVisible: false,
      textarea2: '',
      qrCodeUrl: '',
    };
  },
  mounted() {
    this.getfolders()
  },
  methods: {
    setshare(row) {
      console.log(row)
      const url = this.occlink + row.链接
      this.textarea2 = `点击链接或平板网页扫码打开项目在线观看【${row.项目名}】：${url}/`
      this.qrCodeUrl = `${this.prolink}/code/${row.链接}.png`;
      this.centerDialogVisible = true
    },
    copyLink() {
      const item = new ClipboardItem({
        'text/html': new Blob(['<p><img src="' + this.qrCodeUrl + '">' + this.textarea2 + '</p>'], {type: 'text/html'}),
      });
      navigator.clipboard.write([item])
          .then(() => {
            this.$message.success('分享内容已复制到剪贴板');

          })
          .catch((e) => {
            this.$message.error('复制分享内容失败');
          });

    },
    deleteshare(row) {
      this.$messageBox.prompt('<strong>请填写删除码: <i style="color: red">确认删除</i> </strong>', '确认删除？', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
      })
          .then(({value}) => {
            if (value == '确认删除') {
              console.log(row)
              axios.delete(`${process.env.VUE_APP_API_URL}/pptindex/deleteshare`, {params: {'fileId': row.链接}})
                  .then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                      this.$message.success('删除成功！');
                      this.getfolders()
                    }
                    // this.tableData = res.data.data
                  })
            } else {
              this.$message({
                type: 'error',
                message: '请填写正确删除码',
              })
            }
          })
          .catch(() => {
          })
    },
    getfolders() {
      axios.get(`${process.env.VUE_APP_API_URL}/pptindex/getshares`)
          .then(res => {
            console.log(res)
            this.tableData = res.data.data
          })
    },
    uploadFile(fileObject) {
      const formData = new FormData();
      const file = fileObject.raw; // Access the file from fileObject
      formData.append('file', file);
      axios.post(`${process.env.VUE_APP_API_URL}/pptindex/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
      })
          .then((response) => {
            console.log(response.data);
            if (response.data.code == 200) {
              this.$message.success('上传成功');
              this.getfolders()
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>
<style scoped>
.table-container {
  height: 100%; /* 设置父容器高度为100% */
  width: 100%;
}
</style>