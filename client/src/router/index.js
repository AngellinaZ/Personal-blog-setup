//首页
const home = r => require.ensure([], () => r(require('../pages/home')), 'home');

//后台
const backstage = r => require.ensure([], () => r(require('../pages/admin/backstage')), 'backstage');
const markdown = r => require.ensure([], () => r(require('../pages/admin/markdown')), 'markdown');
const manageTag = r => require.ensure([], () => r(require('../pages/admin/manageTag')), 'manageTag');
const manageArticle = r => require.ensure([], () => r(require('../pages/admin/manageArticle')), 'manageArticle');
const articleDetail = r => require.ensure([], () => r(require('../pages/articleDetail')), 'articleDetail');


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
    path: '/manageTag',
    name: 'manageTag',
    component: manageTag
  },
  {
    path: '/manageArticle',
    name: 'manageArticle',
    component: manageArticle
  }
]
  