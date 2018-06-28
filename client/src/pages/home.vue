<template>
  <div class="section-content">
  	<article class="content-card flex_rs post flex_wrap"> 
  	 	<div class="card flex_cs align_start"> 
  	 		<img src="../assets/images/bg.jpg">
  	 		<p>海贼王</p>
  	 		<time>2018.5.15</time>
  	 	</div> 
  	 	<div class="card " v-for="item in articles" @click="articleDetail(item)"> 
  	 		<div></div>
  	 		<div class="flex_cs align_start">
  	 			<img src="../assets/images/bg.jpg">
	  	 		<p>{{ item.title }}</p>
	  	 		<time>{{ item.createTime | formDate }}</time>
  	 		</div>
  	 	</div> 
  	 </article>
  </div>
</template>

<script>
import {formatDay} from '../assets/common/com.js'
import {getArticleList} from '../api/index.js'

export default {
	name: 'home',
	data () {
		return {
			articles: []
		}
	},
	mounted() {
		getArticleList().then(res => {
			this.articles = res.data;
		}) 
	},
	filters: {
        formDate(value){
        	return formatDay(Number(value), 'yyyy-MM-dd')
        }
    },
	methods: {
        articleDetail (item) {
            this.$router.push('/articleDetail?id='+ item._id);
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.section-content {
		padding: 2rem;
		width: 100%;
		background: #F4F7FD;
	}
	.content-card {
		.card {
			background: #fff;
			margin-right: 2.5rem;
			box-shadow: 1px 1px 5px #ddd;
			width: 22%;

			img {
				width: 100%;
			}
			p {
				font-size: 18px;
				padding: 1rem 0.5rem;
			}
			time {
				font-size: 14px;
				color: #ccc;	
				padding: 0.5rem;
				margin-top: 2rem;
			}
		}
		.card:hover {
			box-shadow: 1px 1px 5px #888;
		}
	}
</style>
