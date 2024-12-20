<script>
import sharevideo from './video/video.vue'

export default {
  name: 'encryptedvideo',
  components: {
    sharevideo
  },
  data() {
    return {
      sourceurl: 'https://nas.yizhijiao.cn:8585',
    }
  },
}
</script>

<template>
  <sharevideo :sourceurl="sourceurl"></sharevideo>
</template>