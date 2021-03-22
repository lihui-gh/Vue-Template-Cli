<template>
  <div class="layout">
    <logo />
    <navbar />
    <main-menu />
    <breadcrumb />
    <router-view
      class="route_style"
      :style="isCollapse ? { margin: '30px 40px 40px 104px' } : { margin: '30px 40px 40px 280px' }"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import Breadcrumb from './Breadcrumb.vue';
import Menu from './Menu.vue';
import Logo from './Logo.vue';
import Navbar from './Navbar.vue';

export default {
  name: 'Home',
  components: {
    'main-menu': Menu,
    'logo': Logo,
    'navbar': Navbar,
    'breadcrumb': Breadcrumb
  },
  computed: {
    ...mapGetters(['isCollapse'])
  }
};
</script>

<style lang="scss" scoped >
.layout {
  height: 100%;
  // position: fixed;
  // top: 0
}
.route_style {
  // margin: 30px 50px 40px 270px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: #fff;
}
</style>
