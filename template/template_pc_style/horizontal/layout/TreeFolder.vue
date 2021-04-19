<template>
  <div>
    <template v-for="route in routes">
      <el-submenu
        v-if="route.children"
        v-show="permission.includes(route.meta.power) && !route.meta.display"
        :key="route.path"
        :index="fatherRoute + route.path"
      >
        <span
          slot="title"
        ><i :class="route.meta.style" />{{ route.meta.title }}</span>

        <tree-folder
          :routes="route.children"
          :father-route="fatherRoute + route.path + '/'"
        />
      </el-submenu>
      <el-menu-item
        v-else
        v-show="permission.includes(route.meta.power) && !route.meta.display"
        :key="route.path"
        :index="fatherRoute + route.path"
      >{{
        route.meta.title
      }}</el-menu-item>
    </template></div>
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
