import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/login01",
    component: () => import("@/views/Login01"),
  },
  {
    path: "/demo",
    component: () => import("@/views/demo"),
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  {
    path: "/search",
    component: () => import("@/views/search"),
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  }
];

const router = new VueRouter({
  routes,
});

export default router;
