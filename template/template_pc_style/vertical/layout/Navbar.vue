<template>
  <div class="nav" :style="isCollapse ? { width: 'calc(100% - 64px)' } : { width: 'calc(100% - 240px)' }">
    <i
      style="
        color: #000000;margin: 18px;
        float: left;
        font-size: 24px;
        cursor: pointer;"
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="$store.commit('system/SET_ISCOLLAPSE', !isCollapse)"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ name ? name : '超级管理员' }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    ...mapGetters([
      'avatar',
      'name',
      'isCollapse'
    ])
  },
  methods: {
    loginOut() {
      this.$store.dispatch('user/loginOut').then(() => {
        this.$router.push({ path: '/login' });
      }).catch(() => {
      });
    }
  }
};
</script>

<style lang="scss" scoped >
.nav {
  height: 60px;
  background-color: #ffffff;
  width: calc(100% - 240px);
  padding-right: 20px;
  font-size: 20px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
  text-align: right;
  line-height: 60px;
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  .el-dropdown-link {
    cursor: pointer;
    color: #000;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}

</style>
