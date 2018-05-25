var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var DB_url = 'mongodb://localhost:27017/bolg';


/** 文章 **/
var articleSchema = mongoose.Schema({
    title: String,
    content: String,
    intro: String,
    img: String,
    createTime: String,
    tag: String
});
var article = mongoose.model('article', articleSchema)
// 插入文章
router.post('/insertArticle', function(req, res, next) {
    const { title, content, intro, img, tag, createTime = Date.parse(new Date()) } = req.query
    console.log(tag)
    console.log(title)
    console.log(content)
    console.log(img)
    console.log(createTime)

    mongoose.connect(DB_url, function(err) {
        if (err) {
            console.log('setTag连接失败')
        } else {
            new article({
                title: title,
                content: content,
                intro: intro,
                img: img,
                tag: tag,
                createTime: createTime
            }).save(function(err, doc) {
                if (err) {
                    res.send({
                        code: '500',
                        msg: "插入失败",
                        data: doc
                    });
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                        code: 200,
                        data: doc
                    });
                }
            });

        }
    });
});
// 获取文章列表
router.post('/getArticleList', function(req, res, next) {
    mongoose.connect(DB_url, function(err) {
        if (err) {

        } else {
            var article = mongoose.model('article', articleSchema);
            article.find(function(err, doc) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({
                    code: 200,
                    data: doc
                });
            });
        }
    });
});
// 获取文章详情
router.post('/getArticleDetail', function(req, res, next) {
    var id = req.query.id
    if (id) {
        mongoose.connect(DB_url, function(err) {
            if (!err) {
                var articleDetail = mongoose.model('article', articleSchema);
                articleDetail.findOne({
                    _id: id
                }, function(err, doc) {
                    if (doc) {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({
                            code: 200,
                            data: doc
                        });
                    }
                });
            }
        });
    }
});



// tag数据插入获取
var TagSchema = mongoose.Schema({
    name: String,
});
var Tag = mongoose.model('Tag', TagSchema);

router.post('/getTag', function(req, res, next) {
    mongoose.connect(DB_url, function(err) {
        if (err) {
            console.log('getTag连接失败');
            res.send({
                code: '500',
                msg: "获取数据失败",
                data: err
            });
        } else {
            console.log('getTag连接成功');
            Tag.find((err, doc) => {
                //res.json(doc);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({
                    code: 200,
                    data: doc
                });
            })
        }
    });
});
router.post('/addTag', function(req, res, next) {
    console.log(req.query)
    mongoose.connect(DB_url, function(err) {
        if (err) {
            console.log('addTag连接失败')
        } else {
            console.log('addTag连接成功')
            new Tag({
                name: req.query.tagName
            }).save((err, doc) => {
                if (err) {

                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                        code: 200,
                        msg: 'success'
                    });
                }
            });
        }
    });
});
// 删除标签
router.post('/removeTag', function (req, res) {
    console.log(req.query)
    let { _id } = req.query
    mongoose.connect(DB_url, function (err) {
        if (err) {
            console.log('removeTag连接失败')
        } else {
            console.log('removeTag连接成功')
            console.log(_id)
            Tag.remove({_id : _id}, (err, doc) => {
                if (doc) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                        code: 200,
                        data: doc
                    });
                } else {
                    res.send({
                        code: '500',
                        msg: "删除失败",
                        data: doc
                    });
                }
            }).exec();
        }
    });
});



//登录
var UserSchema = mongoose.Schema({
    username: String,
    password: Number
});
var User = mongoose.model('User', UserSchema);
// router.post('/login', function(req, res, next) {
//     console.log(req.query)
//     mongoose.connect(DB_url, function(err) {
//         if (err) {
//             console.log('getTag连接失败');
//             res.send({
//                 code: '500',
//                 msg: "登录失败",
//                 data: doc
//             });
//         } else {
//             console.log('getTag连接成功');
//             new User({
//                 username: req.query.username, 
//                 password: req.query.password
//             }).save((err, doc) => {
//                 if (err) {
//                     res.send({
//                         code: '500',
//                         msg: "插入失败",
//                         data: doc
//                     });
//                 } else {
//                     res.setHeader('Content-Type', 'application/json');
//                     res.status(200).send({
//                         code: 200,
//                         data: doc
//                     });
//                 }
//             })
//         }
//     });
// });

router.post('/login', function(req, res, next) {
    mongoose.connect(DB_url, function(err) {
        if (err) {
            console.log('getTag连接失败');
            res.send({
                code: '500',
                msg: "登录失败",
                data: doc
            });
        } else {
            console.log('getTag连接成功');

            User.findOne({
                username: req.query.username, //'fish',
                password: req.query.password, //'123'
            }, function(err, doc) {
                if (doc) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                        code: 200,
                        msg: '登录成功',
                        data: doc
                    });
                } else {
                    res.send({
                        code: '500',
                        msg: "登录失败",
                        data: doc
                    });
                }
            })
        }
    });
});


module.exports = router;