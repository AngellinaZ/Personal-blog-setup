<template>
	<div class="section-content">
		<div class="section-main">
			<div class="title com_margin section-tit flex_rs">
				<label>write your title:</label>
				<input type="text" v-model="articleTitle">
			</div>
			<div class="intro com_margin section-tit flex_rs">
				<label>write your intro:</label>
				<input type="text" v-model="intro">
			</div>
			<div class="tags flex_cs align_start com_margin">
				<span>choose your tags:</span>
				<el-checkbox-group v-model="tags">
			    	<el-checkbox v-for="item in tagList" :label="item.name" :key="item.id">{{ item.name }}</el-checkbox>
			  	</el-checkbox-group>
			</div>
			<div class="upload flex_cs align_start com_margin">
				<span>upload your image:</span>
				<div>
					<img src="../../assets/images/upload.png">
					<input type="file" @change='upload'>
				</div>
			</div>
			<div class="content flex_cs align_start com_margin">
				<span>write your content:</span>
				<mavon-editor :ishljs="true" v-model="articleContent" style="width: 100%"/>
			</div>
		</div>
		<div class="com_margin submit">
			<button @click="submit">提交</button>
		</div>
	</div>
</template>
<script>
import {getTag, getArticleDetail, updateArticle, insertArticle} from '../../api/index.js'


export default { 	
	name: 'markdown',
	data() {	
		return {
			id: this.$route.query.id,
			articleTitle: '',
			intro: '',
			articleContent: '',
			tags: [],
			tagList: []
		}
	},
	mounted() {
		this.getTag();
		if (this.id) {
        	this.getDetail()
   		}
	},
	methods: {
		getDetail () {
			getArticleDetail(this.id).then(res => {
				if (res.code == 200) {
                    this.articleTitle = res.data.title;
                    this.articleContent = res.data.content;
                    this.intro = res.data.intro;
                    this.img = res.data.img;
                    this.tags = res.data.tag.split(',');
                }
			})
        },

		submit () {
            if (this.id) {
            	this.updateArticle();
            } else {
            	this.insertArticle()
            }
        },

        //新增
        insertArticle() {
        	insertArticle(this.articleTitle, this.intro, this.articleContent, this.img, this.tags.join(','))
        		.then(res => {
        			if (res.code == 200) {
	                	this.$message({
		                  	message: "添加成功!",
		                  	type: "success"
		                });
	                  	this.articleTitle = '';
	                  	this.intro = '';
	                    this.articleContent = '';
	                	this.img = '';
	                	this.tags = [];
	                }
        		})
        },

        //修改
        updateArticle() {
        	updateArticle(this.id, this.articleTitle, this.intro, this.articleContent, this.img, this.tags.join(','))
        		.then(res => {
        			if (res.code == 200) {
	                	this.$message({
		                  	message: "修改成功!",
		                  	type: "success"
		                });
	                  	this.articleTitle = '';
	                  	this.intro = '';
	                    this.articleContent = '';
	                	this.img = '';
	                	this.tags = [];
	                }
        		}) 
        },

		// 图片上传
        upload (event) {
            let files = event.target.files[0]
            var formData = new FormData()
            formData.append('files', files)

            console.log(formData)

            // this.$http.post(this.HOST + '/api/upload', formData, {
            //   headers: {
            //     'Content-Type': 'multipart/form-data'
            //   }
            // }).then((response) => {
            //     var datas = response.data
            //     if (datas.code == 200) {
            //         this.img = datas.data
            //     }
            // }).catch(error => {

            // });
        },

		// 获取标签
        getTag() {
        	getTag().then(res => {
        		if(res.code === 200) {
                    this.tagList = res.data;
        		}
        	})
        },

        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               $vm.$img2Url(pos, url);
           })
        }
    }
};
</script>
<style lang="scss" scoped>
	.section-content {
		width: 100%;
		padding: 2rem;
		background: #F4F7FD;
		padding-top: 0;
	}
	.section-main {
		margin: 0 auto;
		padding: 2rem 4rem;
		width: 65%;
		background: #fff;
	}
	.section-tit {

		input[type="text"] {
			height: 2rem;
			border: 1px solid #e0e0e0;
			background: #fff;
			padding: 0.5rem 1rem;
			width: 45rem;
			border-radius: 3px;
		}
		label {
	  		font-weight: bold;
	  		font-size: 12px;
	  		padding: 0 0.5rem;
			height: 3.1rem;
			line-height: 3.1rem;
			color: #fff;
			background: #7AC5CD;
			text-transform: uppercase;	
			letter-spacing: .05em;
			border-radius: 3px 0 0 3px;
		}
	}
	
	.tags, .content {
		width: 100%;

		span {
	  		font-weight: bold;
	  		font-size: 12px;
			height: 2.5rem;
			line-height: 2.5rem;
			color: #7AC5CD;
			text-transform: uppercase;	
			letter-spacing: .05em;
			border-radius: 3px 0 0 3px;
		}
	}
	.upload {
		span {
	  		font-weight: bold;
	  		font-size: 12px;
			height: 2.5rem;
			line-height: 2.5rem;
			color: #7AC5CD;
			text-transform: uppercase;	
			letter-spacing: .05em;
			border-radius: 3px 0 0 3px;
		}
		div {
			position: relative;
			height: 5rem;
			width: 5rem;
			border: 1px solid #e0e0e0;
			background: #fff;
		}
		img {
			position: absolute;
			top: 1.5rem;
			left: 1.5rem;
		}
		input[type="file"] {
			position: absolute;
			left: 0;
			top: 1.5rem;
			width: 5rem;
			color: #fff;
			opacity: 0;
		}
	}
	.submit {
		position: fixed;
		top: 2rem;
		right: 17rem;
		transition: all 0.3s liear;

		button {
			font-size: 14px;
			color: #fff;
			background: #458B74;
			height: 3rem;
			width: 3rem;
			border: none;
			border-radius: 50%;
		}
	}
	.submit:hover {
		transform: scale(1.2);
	}
	.com_margin {
		margin-bottom: 3rem;
	}
	.el-checkbox-group {
		background: #fff;
		border: 1px solid #e0e0e0;
		padding: 1rem;
	}
</style>
