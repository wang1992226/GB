<script>
export default {
  mounted() {
    this.startCamera();
  },
  methods: {
    async startCamera() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
              this.$refs.videoElement.srcObject = stream;
            })
            .catch(error => {
              console.error('Error accessing media devices.', error);
            });
      } catch (error) {
        console.error('Error accessing camera: ', error);
      }
    }
  }
}
</script>

<template>
  <div id="reswh" class="" style="width: 100%;height: 100%;">
    <div style="z-index:5;position: absolute;width: 100%;height: 100%;">
      <div style="
                white-space: nowrap;
                transform: translate(50%, 0px);
                top: 7%;
                font-weight: bold;
                line-height: 100%;
                position: absolute;
                font-size: 7vh;
                color: #2deae1;
                right: 50%;">人脸识别登船
      </div>

      <img style="position: absolute;width: 100%;height: 100%;" src="/img/facerec/List 2_00101.png">
    </div>

    <div id="saomiao"
         style="width: 80vw;height:74vh;z-index: 3;position: absolute;top: 18%;left: 50%;transform: translate(-50%, 0);opacity: 1;">
      <img class="" style="height: 100%;width: 100%;" src="/img/facerec/Profile.gif" alt="">
    </div>
    <!-- <div id="bg" style="z-index:1;background-color: #0d0f12;position: absolute;width: 100%;height: 100%"></div> -->
    <video class="camera" ref="videoElement" autoplay></video>
  </div>
</template>

<style scoped>
img {
  pointer-events: none;
}

#button-container {
  font-size: 1rem;
  z-index: 9999;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

#button-container.show {
  opacity: 1;
}

.camera {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

body {
  margin: 0
}
</style>