<template>
    <section class="section-content">
        <article class="article-detail" ref="detail">
            <h2>{{ title }}</h2>
            <div class="tag">
                <span>发布时间：{{ createTime | formatDate }}</span>
                <span v-if="tag">标签：{{ tag }}</span>
            </div>
            <div class="img"><img :src="img"></div>
            <div v-html="content" class='content flex_cs align_start'></div>
        </article>
    </section>
</template>

<script>
import {formatDay} from '../assets/common/com.js'
import showdown  from 'showdown'
import {getArticleDetail} from '../api/index.js'

export default {
    name: 'article-detail',
    data () {
        return {
            id: this.$route.query.id,
            title: '',
            content: '',
            img: '',
            createTime: '',
            tag: ''
        }
    },
    methods: {
        getDetail () {
        	var converter = new showdown.Converter();
            getArticleDetail(this.id).then(res => {
                if (res.code == 200) {
                    this.title = res.data.title
                    this.content = converter.makeHtml(res.data.content)
                    // console.log(this.content)
                    this.img = res.data.img
                    this.createTime = res.data.createTime
                    this.tag = res.data.tag
                }
            })
        }
    },
    filters: {
        formatDate: (value) => formatDay(Number(value), 'yyyy-MM-dd hh:mm')
    },
    mounted () {
    	this.$nextTick(() => {
	      	if (this.id) {
            	this.getDetail()
       		}
	    })
        
    },
    updated() {
    	let content = document.getElementsByClassName('content')[0];
    	let uls = content.getElementsByTagName('ul');
    	let lis = content.getElementsByTagName('li');
    	let ps = content.getElementsByTagName('p');
    	let pres = content.getElementsByTagName('pre');
    	for(let i = 0; i < lis.length; i++) {
    		lis[i].setAttribute('style', 'list-style-type: disc');
    	}
    	for(let i = 0; i < uls.length; i++) {
    		uls[i].setAttribute('style', 'display: flex; text-align: left; justify-content: flex-start; align-items: flex-start; flex-direction: column');
    	}
    	for(let i = 0; i < ps.length; i++) {
    		ps[i].setAttribute('style', 'text-align: left');
    	}
    	for(let i = 0; i < pres.length; i++) {
    		pres[i].setAttribute('style', 'width: 100%; background: #fff; text-align: left; padding: 0.5rem; line-height: 2rem;');
    	}
	},
};
</script>
<style lang="scss" scoped>
	.section-content {
		padding: 2rem;
		width: 100%;
		background: #F4F7FD;
	}
	.article-detail {
		width: 65%;
		height: 100%;
		margin: 0 auto;
	}
	.content {
		li {
			list-style-type:circle;
		}
		ul {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items:  flex-start;
			display: -webkit-flex;
			-webkit-flex-direction: column;
			-webkit-justify-content:  space-around;
			-webkit-align-items:  flex-start;
		}
	}
	li {
		list-style-type:circle !important;
	}
</style>
