<template>
  <div
    class="logo"
    :style="isCollapse ? { width: '64px' } : { width: '240px' }"
  >
    <svg-icon name="logo" class="logo-icon" />
    {{ isCollapse ? '' : '通用系统模板' }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Logo',
  components: {
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['isCollapse'])
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
    .logo-icon {
      font-size: 18px;
    }
  }
</style>
