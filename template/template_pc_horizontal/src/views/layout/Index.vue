<template>
  <div class="layout">
    <logo />
    <navbar />
    <main-menu />
    <breadcrumb />
    <router-view class="route_style" />
  </div>
</template>

<script>
// @ is an alias to /src
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
  }
};
</script>

<style lang="scss" scoped >
.layout {
  padding: 60px 5% 40px;
  // position: fixed;
  // top: 0
}
.route_style {
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: #fff;
}
</style>
