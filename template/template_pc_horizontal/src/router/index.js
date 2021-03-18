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
        meta: { title: '系统管理', power: 'system' },
        children: [
          {
            path: 'account',
            component: () => import('@/views/admin/system/account/Index.vue'),
            name: 'account',
            meta: { title: '用户管理', power: 'account', style: 'el-icon-s-custom' }

          },
          {
            path: 'role',
            component: () => import('@/views/admin/system/role/Index.vue'),
            name: 'role',
            meta: { title: '角色管理', power: 'role', style: 'el-icon-user' }
          }
          // {
          //   path: 'log',
          //   component: () => import('@/views/admin/system/log/Index.vue'),
          //   name: 'role',
          //   meta: { title: '日志管理', power: 'log' }
          // },
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
