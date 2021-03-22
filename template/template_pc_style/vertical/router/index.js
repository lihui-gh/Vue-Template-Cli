import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/layout/Index.vue';

Vue.use(VueRouter);

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

export const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/Index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/errPages/404.vue'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/system/account',
    children: [
      {
        path: 'system',
        redirect: '/system/account',
        component: () => import('@/views/admin/system/Index.vue'),
        // meta有可扩展属性 display: true，用于系统菜单对于非菜单路由的隐藏，isFirstNode表示一级菜单，用于菜单收缩时名字隐藏
        meta: { title: '系统管理', power: 'system', style: 'el-icon-s-custom', isFirstNode: true },
        children: [
          {
            path: 'account',
            component: () => import('@/views/admin/system/account/Index.vue'),
            name: 'account',
            meta: { title: '用户管理', power: 'account' }

          },
          {
            path: 'role',
            component: () => import('@/views/admin/system/role/Index.vue'),
            name: 'role',
            meta: { title: '角色管理', power: 'role' }
          }
          // {
          //   path: 'log',
          //   component: () => import('@/views/admin/system/log/Index.vue'),
          //   name: 'log',
          //   meta: { title: '日志管理', power: 'log' }
          // }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
