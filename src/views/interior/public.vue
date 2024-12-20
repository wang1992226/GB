<script>
export default {
  name: "public",
  data() {
    return {
      active: '',
      menu: []
    }
  },
  mounted() {

  },
  watch: {
    $route() {
      this.showThis()
    },
  },
  created() {
    this.showThis()
    this.getmenu()
  },
  methods: {
    goToPage(path) {
      this.$router.push({path: path});
    },
    // 高亮
    showThis() {
      // console.log(this.$router.options.routes)

      this.active = this.$route.path
    },
    getmenu() {
      const arr = this.$router.options.routes
      const result = arr.find(obj => obj.name === "interior");
      console.log(result.children[0])
      this.menu = result.children
    }
  },

}
</script>

<template>

  <el-container class="">
    <el-header style="text-align: right; font-size: 12px">

      <div class="toolbar">
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px"
          >
            <setting
            />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>Tom</span>
      </div>

    </el-header>
    <el-container style="height: 100%">
      <el-aside width="200px">

        <el-scrollbar>
          <el-menu :default-openeds="['r1']">
            <template v-for="obj in menu">
              <el-sub-menu v-if="obj.children && obj.children.length > 0" :index="obj.name">
                <template #title> {{ obj.name }}</template>
                <el-menu-item v-for="child in obj.children" :class="{ 'is-active': active === child.path }"
                              @click="goToPage(child.path)">
                  {{ child.name }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :key="obj.path" :class="{ 'is-active': active === obj.path }" @click="goToPage(obj.path)">
                {{ obj.name }}
              </el-menu-item>
            </template>

<!--            <el-sub-menu index="1">-->
<!--              <template #title>-->
<!--                <el-icon>-->
<!--                  <Odometer/>-->
<!--                </el-icon>-->
<!--                集 一-->
<!--              </template>-->
<!--              <el-menu-item-group>-->
<!--                <template #title>分组 1</template>-->

                <!--                <el-menu-item v-for="obj in menu" :class="{ 'is-active': active === obj.path }"-->
                <!--                              @click="goToPage(obj.path)">-->
                <!--                  {{ obj.name }}-->
                <!--                </el-menu-item>-->

                <!--                <el-menu-item :class="{ 'is-active': active === '/interior/page1' }" @click="goToPage('/interior/page1')">页 面 1-->
                <!--                </el-menu-item>-->
                <!--                <el-menu-item :class="{ 'is-active': active === '/interior/page2' }" @click="goToPage('/interior/page2')">页 面 2-->
                <!--                </el-menu-item>-->
<!--              </el-menu-item-group>-->

              <!--              <el-menu-item-group title="工具类">-->
              <!--                <el-menu-item :class="{ 'is-active': active === '/interior/pptindex' }" @click="goToPage('/interior/pptindex')">ppt网页上传-->
              <!--                </el-menu-item>-->
              <!--                <el-menu-item :class="{ 'is-active': active === '/interior/tencos' }" @click="goToPage('/interior/tencos')">腾讯cos上传</el-menu-item>-->
              <!--              </el-menu-item-group>-->
              <!--              <el-sub-menu index="1-4">-->
              <!--                <template #title>Option4</template>-->
              <!--                <el-menu-item index="1-4-1">Option 4-1</el-menu-item>-->
              <!--              </el-sub-menu>-->
<!--            </el-sub-menu>-->
            <!--            <el-sub-menu index="2">-->
            <!--              <template #title>-->
            <!--                <el-icon><Edit /></el-icon>-->
            <!--                Navigator Two-->
            <!--              </template>-->
            <!--              <el-menu-item-group>-->
            <!--                <template #title>Group 1</template>-->
            <!--                <el-menu-item index="2-1">Option 1</el-menu-item>-->
            <!--                <el-menu-item index="2-2">Option 2</el-menu-item>-->
            <!--              </el-menu-item-group>-->
            <!--              <el-menu-item-group title="Group 2">-->
            <!--                <el-menu-item index="2-3">Option 3</el-menu-item>-->
            <!--              </el-menu-item-group>-->
            <!--              <el-sub-menu index="2-4">-->
            <!--                <template #title>Option 4</template>-->
            <!--                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>-->
            <!--              </el-sub-menu>-->
            <!--            </el-sub-menu>-->
            <!--            <el-sub-menu index="3">-->
            <!--              <template #title>-->
            <!--                <el-icon>-->
            <!--                  <setting/>-->
            <!--                </el-icon>-->
            <!--                Navigator Three-->
            <!--              </template>-->
            <!--              <el-menu-item-group>-->
            <!--                <template #title>Group 1</template>-->
            <!--                <el-menu-item index="3-1">Option 1</el-menu-item>-->
            <!--                <el-menu-item index="3-2">Option 2</el-menu-item>-->
            <!--              </el-menu-item-group>-->
            <!--              <el-menu-item-group title="Group 2">-->
            <!--                <el-menu-item index="3-3">Option 3</el-menu-item>-->
            <!--              </el-menu-item-group>-->
            <!--              <el-sub-menu index="3-4">-->
            <!--                <template #title>Option 4</template>-->
            <!--                <el-menu-item index="3-4-1">Option 4-1</el-menu-item>-->
            <!--              </el-sub-menu>-->
            <!--            </el-sub-menu>-->
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main style="padding: 30px;background-color: #fbfbfb">
        <el-scrollbar>
          <router-view>

          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>


</template>

<style scoped>


.el-aside {
  width: 200px;

  background-color: #38383a;

  min-height: calc(100vh - 60px);

}

.el-mian {
  background-color: #eaedf1;

  margin: 0px;

  color: #333;

  text-align: center;

  height: calc(100vh - 60px);

}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>