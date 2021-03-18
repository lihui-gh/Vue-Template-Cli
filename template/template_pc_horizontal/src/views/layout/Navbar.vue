<template>
  <div class="nav">
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
      'name'
    ])
  },
  methods: {
    loginOut() {
      console.log('123');
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
  background-color: #304156;
  width: 10%;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}

</style>
