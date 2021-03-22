<template>

  <div class="Menu" :style="isCollapse ? { width: '64px' } : { width: '240px' }">
    <transition name="fade" mode="out-in">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        class="el-menu-demo"
        :show-timeout="200"
        mode="vertical"
        :router="true"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
      >

        <tree-folder :routes="routes" father-route="/" />

      </el-menu>
    </transition>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { routes } from '@/router/index.js';
import TreeFolder from './TreeFolder.vue';
export default {
  name: 'Menu',
  components: {
    TreeFolder
  },
  data() {
    return {
      routes: []
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      console.log(route);
      const { path } = route;
      return path;
    },
    ...mapGetters(['permission', 'isCollapse'])
  },
  created() {
    routes.forEach((route) => {
      if (route.path === '/') {
        this.routes = route.children;
      }
    });
    console.log(this.routes);
  }
};
</script>

<style lang="scss">
  .el-submenu__title:hover {
    background-color: rgb(47, 49, 73) !important;
  }
  .el-menu-item:hover {
    background-color: rgb(47, 49, 73) !important;
  }
</style>

<style lang="scss" scoped >
  .Menu {
    z-index: 999;
    overflow: auto;
    width: 240px;
    height: calc(100% - 60px);
    padding: 15px 0;
    background: #304156;
    position: fixed;
    top: 60px;
    left: 0;
  }
</style>

