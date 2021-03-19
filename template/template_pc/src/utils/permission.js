import router from '@/router/index';
import { Message } from 'element-ui';
import store from '@/store/index';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import TokenFactory from './tokenFactory'; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/404', '/system/account', '/system/role']; // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start();

  // determine whether the user has logged in
  const hasToken = TokenFactory.getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        const hasGetUserPermission = store.getters.permission;
        if (hasGetUserPermission) {
          if (hasGetUserPermission.includes(to.meta.power)) next();
          else next({ path: '/404' });
        } else {
          try {
            // get user info
            await store.dispatch('user/getInfo');
            if (store.getters.permission.includes(to.meta.power)) next();
            else next({ path: '/404' });
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken');
            Message.error(error || 'Has Error');
            // next(`/login?redirect=${to.path}`)
            next(`/login`);
            NProgress.done();
          }
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      Message('未检测到Token，请先登录');
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(`/login`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
