<template>
  <div class="logo">
    通用系统模板
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
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 60px;
  background: #374f6d;
}
</style>
