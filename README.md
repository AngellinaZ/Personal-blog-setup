# Personal-blog-setup
运用 vue2+node+express+mongodb 进行个人博客搭建

## 项目配置
 <pre>
    ├── server              ==> 后台接口
    │   └── bin              ==> express配置文件
    │   └── schemas
    │       └── schema.js   ==> 后台接口（数据库链接，富文本）
    │   └── views
    │   └── .gitignore       ==> git一些配置
    │   └── app.js
    │   └── package.json     ==> express配置
    ├── client
    │   └── build
    │   └── config
    │   └── dist              ==> 打包之后的文件夹，上传该文件夹到服务器
    │   └── src
    │       └── components    ==> 组件    
    |       └── pages         ==> 前端主要页面   
    │       └── router        ==> 路由
    │       └── App.vue       ==> 主组件
    │       └── main.js       ==> 前台入口文件
    │   └── static            ==> 静态资源
    │   └── .babelrc
    │   └── .editorconfig
    │   └── .gitignore
    │   └── .postcssrc.js
    │   └── index.html        ==> 主页面
    │   └── package-lock.json
    │   └── package.json      ==> vue配置
    ├── README.md             ==> 项目说明
  </pre>

## 进度
* 登录
* 文章列表展示
* 文章内容展示
* 标签管理
* 后台文章编辑(采用markdown编辑)
* 后台文章管理
* 后台标签管理
* 分页功能
* 评论功能

## 测试
* client模块 -- 负责前端页面
```js
npm install
npm run dev
```
* server模块 -- 负责后台(下载express)
```js
npm start
```
* 本地需要安装mongodb并启动服务
