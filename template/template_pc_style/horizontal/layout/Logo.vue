<template>
  <div class="logo">
    <svg-icon name="logo" class="logo-icon" />通用系统模板
  </div>
</template>

<script>

export default {
  name: 'Logo',
  components: {
  },
  data() {
    return {

    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      console.log(route);
      const { path } = route;
      return path;
    }
  }
};
</script>

<style lang="scss" scoped >
.logo {
  font-size: 16px;
  color: #fff;
  line-height: 60px;
  text-align: center;
  width: 20%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 60px;
  background-color: #304156;
  .logo-icon {
    font-size: 18px;
    margin-right: 4px;
  }
}
</style>
