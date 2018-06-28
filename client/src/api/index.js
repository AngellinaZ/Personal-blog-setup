import fetch from '../config/fetch'

/*
 * 获取文章列表
 */
export const getArticleList = () => fetch('/api/getArticleList', {}, 'POST');

 /*
  * 获取文章信息
  */
export const getArticleDetail = id => fetch('/api/getArticleDetail', {
 	id: id
 }, 'POST');

 /*
  * 获取标签
  */
export const getTag = () => fetch('/api/getTag', {}, 'POST');

 /*
  * 增加标签
  */
export const addTag = tagName => fetch('/api/addTag', {
	tagName
}, 'POST');

 /*
  * 删除标签
  */
export const removeTag = _id => fetch('/api/removeTag', {
	_id
}, 'POST');

/*
  * 登录后台
  */
export const login = (userName, password) => fetch('/api/login', {
	password: password,
	username: userName
}, 'POST');


/*
  * 删除文章
  */
export const deleteArticle = id => fetch('/api/deleteArticle', {
	_id: id
}, 'POST');

/*
  * 修改文章
  */
export const updateArticle = (id, articleTitle, intro, articleContent, img, tags) => fetch('/api/updateArticle', {
	_id: id,
    title: articleTitle,
    intro: intro,
    content: articleContent,
    img: img,
    tag: tags
}, 'POST');

/*
  * 新增文章
  */
export const insertArticle = (articleTitle, intro, articleContent, img, tags) => fetch('/api/insertArticle', {
    title: articleTitle,
    intro: intro,
    content: articleContent,
    img: img,
    tag: tags
}, 'POST');

