<template>
  <div class="el-submenu">
    <div v-for="route in routes" :key="route.path">
      <!--      <el-submenu v-if="route.children" v-show="permission.includes(route.meta.power) && !route.meta.display" :index="fatherRoute + route.path">-->
      <el-submenu v-if="route.children" :index="fatherRoute + route.path">
        <span
          slot="title"
        ><i :class="route.meta.style" />{{ route.meta.title }}</span>

        <tree-folder
          :routes="route.children"
          :father-route="fatherRoute + route.path + '/'"
        />
      </el-submenu>
      <!--      <el-menu-item v-else v-show="permission.includes(route.meta.power) && !route.meta.display" :index="fatherRoute + route.path">{{-->
      <!--        route.meta.title-->
      <!--      }}</el-menu-item>-->
      <el-menu-item v-else :index="fatherRoute + route.path"><i :class="route.meta.style" />{{
        route.meta.title
      }}</el-menu-item>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'TreeFolder',
  props: {
    routes: {
      type: Array,
      required: true
    },
    fatherRoute: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['permission'])
  }

};
</script>

<style scoped>
</style>
