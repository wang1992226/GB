<script>
export default {
  name: "nav1",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted(){

  },
  methods: {

  }

}
</script>


<template>
  <div class="nav">
    <div class="navbuttom">
      <ul class="rmenu">
        <li v-for="(item, index) in data.nav" :key="index" :class="{ active: index === data.active }">
          <a :href="item.url">{{ item.label }}</a>
        </li>
      </ul>
    </div>
    <div class="navimg">
      <img :src="data.imgurl">
    </div>
  </div>
</template>


<style>
/*.rmenu li:not(:last-child)::after {
  content: "|";
  margin-left: 16px;
  color: white;
}*/
.rmenu li:not(:first-child)::before {
  content: "|";
  margin-right: 15px;
  color: white;
}

.active {
  background: cadetblue;
}

.rmenu li:first-child {
  text-align: center !important;
}

.rmenu {
  width: 1200px;
}

.rmenu li {
  text-align: left;
  width: 110px;
}

.rmenu li a {
  color: white !important;
}

.nav .navbuttom {
  display: flex;
  width: 100%;
  background: #00000052;
  position: absolute;
  justify-content: center;
}

.nav {

  //height: 480px;
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}

.navimg {
min-width: 1200px;
  display: flex;
  justify-content: center;
}

.navimg img {
  width: 100%;
  /* z-index: -22;
   position: fixed;
   top: 0;*/
}

.nav ul {
  width: 1200px;
  font-size: 18px;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}
</style>