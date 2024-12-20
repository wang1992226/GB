<template>


  <el-space fill
            wrap
            fill-ratio=100
            direction="horizontal"
            style="width: 100%">
    <el-card>
      <el-text tag="b">资源前缀地址：{{ coslink }}</el-text>
    </el-card>
    <el-card>
      <template #header>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form inline>
              <el-form-item label="关键字">
                <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-upload :data="{'uploadtype':'add'}" :action="baseUrl+'/upload'"
                       :on-success="uploadSuccess" :on-progress="uploadProgress">
              <el-button type="primary">上传新文件</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </template>
      <el-table loding="isloding" :data="tableData"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                border style="width: 100%">
        <el-table-column width="50px" prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="文件名称"></el-table-column>
        <el-table-column width="196px" align="center" label="图片">

          <template  #default="scope">
            <div >
              <el-icon v-if="getFileType(scope.row.link) === 'mp4'">
                <svg t="1713152010361" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="10257" width="200" height="200">
                  <path
                      d="M160 0h512l256 256v704c0 35.3472-28.6528 64-64 64H160c-35.3472 0-64-28.6528-64-64V64c0-35.3472 28.6528-64 64-64z"
                      fill="#7C8EEE" p-id="10258"></path>
                  <path
                      d="M702.2976 579.2896l-298.5664 177.984c-19.9488 12.0192-45.3312-2.4128-45.3312-25.856v-355.968c0-22.848 25.3824-37.2736 45.3312-25.856l298.56 177.984c19.3408 12.032 19.3408 40.288 0 51.712z"
                      fill="#FFFFFF" p-id="10259"></path>
                  <path d="M672 0l256 256h-192c-35.3472 0-64-28.6528-64-64V0z" fill="#CAD1F8" p-id="10260"></path>
                </svg>
              </el-icon>
              <el-icon v-else-if="getFileType(scope.row.link) === 'document'">
                <svg t="1713151468578" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="10104" width="100px" height="100px">
                  <path
                      d="M160 0h512l256 256v704c0 35.3472-28.6528 64-64 64H160c-35.3472 0-64-28.6528-64-64V64c0-35.3472 28.6528-64 64-64z"
                      fill="#4876F9" p-id="10105"></path>
                  <path
                      d="M428.0192 768l77.1072-282.6688h1.4208L583.1808 768h43.0464L723.2 428.8h-43.52l-74.2656 284.5696H603.52L526.8864 428.8h-42.0992L407.68 713.3696h-1.8944L331.52 428.8H288l96.9728 339.2z"
                      fill="#FFFFFF" p-id="10106"></path>
                  <path d="M672 0l256 256h-192c-35.3472 0-64-28.6528-64-64V0z" fill="#B5C8FC" p-id="10107"></path>
                </svg>
              </el-icon>
              <el-icon style="width: 100px; height: 100px" v-else-if="getFileType(scope.row.link) === 'pdf'">
                <svg t="1713150553151" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="9950" width="200" height="200">
                  <path
                      d="M0 0m93.090909 0l837.818182 0q93.090909 0 93.090909 93.090909l0 837.818182q0 93.090909-93.090909 93.090909l-837.818182 0q-93.090909 0-93.090909-93.090909l0-837.818182q0-93.090909 93.090909-93.090909Z"
                      fill="#FA4E4E" p-id="9951"></path>
                  <path
                      d="M705.186909 643.991273c-40.145455-2.978909-78.789818-17.885091-110.010182-44.718546-60.939636 13.416727-118.923636 32.802909-176.896 56.645818C372.200727 737.896727 329.099636 779.636364 291.933091 779.636364c-7.435636 0-16.349091-1.489455-22.295273-5.957819-16.360727-7.447273-25.274182-23.854545-25.274182-40.250181 0-13.416727 2.967273-50.676364 144.186182-111.790546 32.698182-59.624727 57.984-120.738909 78.789818-184.832-17.838545-35.770182-56.482909-123.717818-29.730909-168.436363 8.925091-16.395636 26.763636-25.332364 46.08-23.854546 14.871273 0 29.730909 7.458909 38.656 19.386182 19.316364 26.833455 17.838545 83.467636-7.447272 166.946909a449.431273 449.431273 0 0 0 92.171636 119.237818c31.220364-5.957818 62.440727-10.426182 93.649454-10.426182 69.864727 1.489455 80.279273 34.280727 78.778182 53.655273 0 50.676364-49.047273 50.676364-74.309818 50.676364z m-416.232727 92.416l4.468363-1.489455c20.805818-7.447273 37.154909-22.353455 49.047273-41.739636-22.295273 8.948364-40.133818 23.854545-53.515636 43.229091z m197.701818-447.162182h-4.456727c-1.477818 0-4.456727 0-5.934546 1.489454-5.946182 25.332364-1.489455 52.165818 8.913455 76.020364 8.913455-25.344 8.913455-52.177455 1.489454-77.509818z m10.414545 216.122182l-1.489454 2.990545-1.489455-1.489454c-13.381818 34.280727-28.241455 68.561455-44.590545 101.352727l2.978909-1.489455v2.978909a863.883636 863.883636 0 0 1 101.073455-29.812363l-1.477819-1.489455h4.456728c-22.295273-22.353455-43.112727-47.697455-59.461819-73.041454z m202.170182 79.010909c-13.381818 0-25.274182 0-38.656 2.978909 14.871273 7.447273 29.730909 10.426182 44.602182 11.915636 10.402909 1.501091 20.805818 0 29.719273-2.978909 0-4.468364-5.934545-11.915636-35.665455-11.915636z"
                      fill="#FFFFFF" p-id="9952"></path>
                </svg>
              </el-icon>
              <el-image
                  v-else
                  style="width: 176px; height: 99px"
                  :src="coslink+scope.row.link+'?'+Date.now()"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[coslink+scope.row.link+'?'+Date.now()]"
                  fit="cover"
                  preview-teleported="true"
              />
            </div>
          </template>

        </el-table-column>
        <el-table-column label="腾讯COS名" width="180px">
          <template #default="scope">
            <a :href="coslink +scope.row.link" target="_blank">{{ scope.row.link }}</a>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280px">
          <template #default="scope">
            <el-button size="small" type="primary" @click="copyLink(coslink+scope.row.link)">复制链接</el-button>
            <el-button size="small" type="primary" @click="renameFile(scope.row)">更改名称</el-button>
            <el-button size="small" type="danger" @click="deleteFile(scope.row)">删除文件</el-button>

            <el-upload style="margin-top: 10px" :data="{'uploadtype':'cover','link':scope.row.link}"
                       :action="baseUrl+'/upload'" :on-success="uploadSuccess" :on-progress="uploadProgress">
              <el-button size="small" type="warning">上传覆盖</el-button>
            </el-upload>

          </template>
        </el-table-column>

      </el-table>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total">
      </el-pagination>
    </el-card>
  </el-space>
</template>

<script>
import {ElUpload, ElButton, ElTable, ElTableColumn} from 'element-plus';
import COS from 'cos-js-sdk-v5';
import axios from "axios";
import Clipboard from 'clipboard';


export default {
  data() {
    return {
      fileList: [],
      uploading: false,
      uploadPercentage: 0,
      row: {},
      isloding: false,
      coslink: 'https://qjzx.yizhijiao.cn/achievement/',
      baseUrl: process.env.VUE_APP_API_URL + '/tencentcos',
      tableData: [],
      progress: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的条数
      total: 0, // 总条数
      keyword: '', // 搜索关键字
    };
  },
  mounted() {
    this.get_coslist()
  },
  methods: {
    uploadProgress(percentage) {
      console.log(percentage)
      this.uploadPercentage = percentage;
    },
    uploadSuccess(response, file, fileList) {
      console.log(response)
      if (response.code === 200) {
        fileList.splice(fileList.indexOf(file), 1);
        this.$message.success('上传成功');
        this.currentPage = 1;
        this.get_coslist();
      } else {
        this.$message.error('上传失败');
      }
    },
    getFileType(link) {
      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
      const docExts = ['.doc', '.docx'];
      const pdfExts = ['.pdf'];
      const mp4Exts = ['.mp4'];
      const ext = link.substring(link.lastIndexOf('.')).toLowerCase();
      if (imageExts.includes(ext)) {
        return 'image';
      } else if (docExts.includes(ext)) {
        return 'document';
      } else if (pdfExts.includes(ext)) {
        return 'pdf';
      } else if (mp4Exts.includes(ext)) {
        return 'mp4';
      } else {
        return 'other';
      }
    },
    copyLink(link) {
      const clipboard = new Clipboard('.el-button', {
        text: () => link
      });
      clipboard.on('success', () => {
        this.$message.success('链接已复制到剪贴板');
        clipboard.destroy();
      });
      clipboard.on('error', () => {
        this.$message.error('复制链接失败');
        clipboard.destroy();
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.get_coslist();
    },
    search() {
      this.currentPage = 1;
      this.get_coslist();
    },
    get_coslist() {
      const params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
      };
      this.isloding = true
      axios.get(`${process.env.VUE_APP_API_URL}/tencentcos/coslist`, {params})
          .then(res => {
            console.log(res);
            this.tableData = res.data.data;
            this.total = res.data.total;
          })
          .finally(() => {
            this.isloding = false
          })
    },
    renameFile(filedata) {
      this.$prompt('请输入新的文件名,不用带文件后缀', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
        // inputErrorMessage: '文件名只能包含字母、数字、汉字'
      }).then(({value}) => {
        console.log(filedata)
        const ext = filedata.name.substring(filedata.name.lastIndexOf('.')).toLowerCase();
        axios.post(`${process.env.VUE_APP_API_URL}/tencentcos/rename`, {
          id: filedata.id,
          name: value + ext
        })
            .then(res => {
              console.log(res)
              this.currentPage = 1;
              this.get_coslist();
            })
      }).catch(() => {
      });
    },
    deleteFile(filedata) {
      this.$confirm(`确定要删除【${filedata.name}】吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        'lock-scroll': false
      }).then(() => {
            axios.post(`${process.env.VUE_APP_API_URL}/tencentcos/delete`, filedata).then(res => {
              console.log('deleteFile',res.data)
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this.currentPage = 1;
                this.get_coslist();
              }
            });
      }).catch(() => {
      });
    }
  }
};
</script>

<style >

</style>
