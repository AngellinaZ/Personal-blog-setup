//首页
const home = param => require.ensure([], () => param(require('../pages/home')), 'home');

//后台
const backstage = param => require.ensure([], () => param(require('../pages/admin/backstage')), 'backstage');
const markdown = param => require.ensure([], () => param(require('../pages/admin/markdown')), 'markdown');
const manage = param => require.ensure([], () => param(require('../pages/admin/manage')), 'manage');
const articleDetail = param => require.ensure([], () => param(require('../pages/articleDetail')), 'articleDetail');


export default [
	{
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/articleDetail',
    name: 'articleDetail',
    component: articleDetail
  },
  {
    path: '/backstage',
    name: 'backstage',
    component: backstage
  },
  {
    path: '/markdown',
    name: 'markdown',
    component: markdown
  },
  {
    path: '/manage',
    name: 'manage',
    component: manage
  }
]
 	