<template>
  <div class="Menu">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
    >

      <tree-folder :routes="routes" father-route="/" />

    </el-menu>
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
    ...mapGetters(['permission'])
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
		width: 70%;
		position: fixed;
		top: 0;
		left: 20%;
	}
</style>

