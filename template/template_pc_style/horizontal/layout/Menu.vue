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
      <!--      <el-menu-item index="/application" v-if="permission.includes('app')"><i class="el-icon-menu"></i>应用管理</el-menu-item>-->
      <!--      <el-menu-item index="/model" v-if="permission.includes('model')"><i class="el-icon-coin"></i>模型管理</el-menu-item>-->
      <!--			      <el-submenu index="/system">-->
      <!--			        <span slot="title">系统管理</span>-->
      <!--			        <el-menu-item index="/system/account"><i class="el-icon-s-custom"></i>用户管理</el-menu-item>-->
      <!--			        <el-menu-item index="/system/role"><i class="el-icon-s-check"></i>角色管理</el-menu-item>-->
      <!--			        <el-menu-item index="/system/log" v-if="permission.includes('log')"><i class="el-icon-s-order"></i>日志管理</el-menu-item>-->
      <!--			      </el-submenu>-->

      <tree-folder :routes="routes" father-route="/" />

      <!-- <el-submenu index="/dataShow">
				<span slot="title"><i class="el-icon-coin"></i>数据展示</span>
				<el-menu-item index="/dataShow/areaMonitor">区域监测</el-menu-item>
			</el-submenu>
			<el-submenu index="/appMarket">
				<span slot="title"><i class="el-icon-s-goods"></i>应用超市</span>
				<el-menu-item index="/appMarket/appMarket">我的超市</el-menu-item>
				<el-menu-item index="/appMarket/appDetail">应用详情</el-menu-item>
				<el-menu-item index="/appMarket/appDock">应用对接</el-menu-item>
				<el-menu-item index="/appMarket/appOpen">在线开通</el-menu-item>
			</el-submenu>

			<el-submenu index="/operationManage">
				<span slot="title"><i class="el-icon-s-shop"></i>运营管理</span>
				<el-menu-item index="/operationManage/modelType"
					>模块类型管理</el-menu-item
				>
				<el-menu-item index="/operationManage/modelManage"
					>模块管理</el-menu-item
				>
				<el-menu-item index="/operationManage/template">模板管理</el-menu-item>
				<el-menu-item index="/operationManage/tenant">租户管理</el-menu-item>
				<el-menu-item index="/operationManage/user">用户管理</el-menu-item>
				<el-menu-item index="/operationManage/enterprise"
					>企业认证审核</el-menu-item
				>
				<el-menu-item index="/operationManage/order">订单管理</el-menu-item>
				<el-menu-item index="/operationManage/appAudit">应用审核</el-menu-item>
				<el-menu-item index="/operationManage/personal"
					>个人认证审核</el-menu-item
				>
				<el-menu-item index="/operationManage/content"
					>内容认证审核</el-menu-item
				>
				<el-menu-item index="/operationManage/statistics"
					>运营统计分析</el-menu-item
				>
				<el-menu-item index="/operationManage/appMonitor"
					>应用监控与预警</el-menu-item
				>
				<el-menu-item index="/operationManage/docker">Docke监控</el-menu-item>
			</el-submenu>

			<el-submenu index="/smartConnect">
				<span slot="title"><i class="el-icon-s-ticket"></i>智能连接</span>
				<el-menu-item index="/smartConnect/access">接入管理</el-menu-item>
				<el-menu-item index="/smartConnect/device">设备管理</el-menu-item>
				<el-menu-item index="/smartConnect/configuration"
					>组态管理</el-menu-item
				>
				<el-menu-item index="/smartConnect/mechanism">机构管理</el-menu-item>
				<el-menu-item index="/smartConnect/assembly">组件管理</el-menu-item>
			</el-submenu>

			<el-submenu index="/appDevelop">
				<span slot="title"><i class="el-icon-menu"></i>应用开发</span>
				<el-menu-item index="/appDevelop/myApp">我的应用</el-menu-item>
				<el-menu-item index="/appDevelop/appDevelop">开发文档</el-menu-item>
				<el-menu-item index="/appDevelop/appAccess">应用接入</el-menu-item>
			</el-submenu>

			<el-submenu index="/containerManage">
				<span slot="title"><i class="el-icon-s-platform"></i>容器管理</span>
				<el-menu-item index="/containerManage/image">镜像管理</el-menu-item>
				<el-menu-item index="/containerManage/container">容器列表</el-menu-item>
			</el-submenu>

			<el-submenu index="/system">
				<span slot="title"><i class="el-icon-s-custom"></i>系统管理</span>
				<el-menu-item index="/system/account">用户管理</el-menu-item>
				<el-menu-item index="/system/role">角色管理</el-menu-item>
			</el-submenu> -->
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

