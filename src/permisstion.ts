// 路由鉴权
import router from '@/router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from '@/store';
import setting from './setting';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore(pinia);
Nprogress.configure({ showSpinner: false }); //隐藏进度条加载时右上角的加载动画图标

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title} - ${to.meta.title}`;
  // to：你将来要访问的路由
  // from：从哪个路由而来
  // next：放行

  Nprogress.start();
  // 已登录时
  if (userStore.token) {
    // 判断是否已登录的状态时去登录页，是，则重定向回之前的路由
    if (to.path == '/login') {
      next({ path: from.path });
    } else {
      // 判断是否有用户信息，有则直接放行
      if (userStore.userName) {
        next();
      } else {
        // 没有用户信息时
        try {
          // 调用查询用户信息接口，并且接口查询成功时
          await userStore.userInfo();
          next();
        } catch (error) {
          // 调用查询用户信息接口，并且接口查询失败时（token过期）
          let result = await userStore.userLogOut();
          if (result === 'ok') {
            next({ path: '/login', query: { redirect: to.path } });
          }
        }
      }
    }
  } else {
    //未登录时
    // 判断是去登录页，是则直接放行
    if (to.path == '/login') {
      next();
    } else {
      // 未登录时，且不是去登录页时，重定向到登录页并带上想要去的路由地址
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
});

// 全局后置守卫
router.afterEach((to, from) => {
  Nprogress.done();
});
