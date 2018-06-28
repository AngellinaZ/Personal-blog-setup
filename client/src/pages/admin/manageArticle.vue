<template>
	<div class="section-content">
		<div class="section-manage">
			<span class="tit">Article management</span>
			<el-table
				:data="articles"
				style="width: 100%">
				<el-table-column
					prop="createTime"
					label="日期">
				</el-table-column>
				<el-table-column
					prop="title"
					label="标题">
				</el-table-column>
				<el-table-column
					prop="tag"
					label="标签">
				 	<template slot-scope="scope">
				        <el-tag>{{scope.row.tag}}</el-tag>
				    </template>
				</el-table-column>
				<el-table-column
			      	fixed="right"
			      	label="操作"
			      	width="100">
			      	<template slot-scope="scope">
			        	<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
			        	<el-button @click="deleteArticle(scope.row._id)" type="text" size="small">删除</el-button>
			      	</template>
			    </el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
import {getArticleList, deleteArticle} from '../../api/index.js'
import {formatDay} from '../../assets/common/com.js'

export default {
	name: 'manage',
	data() {	
		return {
			articles: []
		}
	},
	mounted() {
		this.getArticleList()
	},
	updated() {
		let tds = document.getElementsByTagName('td');
		for(let i = 0; i < tds.length; i++) {
    		tds[i].setAttribute('style', 'text-align: left');
    	}
	},
	methods: {
		getArticleList() {
			getArticleList().then(res => {
				if (res.code == 200) {
	            	for(let i = 0; i < res.data.length; i++) {
	            		res.data[i].createTime = formatDay(Number(res.data[i].createTime), 'yyyy-MM-dd hh:mm')
	            	}
	                this.articles = res.data
	            }
			});
		},
        deleteArticle (id) {
        	deleteArticle(id).then(res => {
        		if (res.code === 200) {
                	this.$message({
	                  	message: "删除成功!",
	                  	type: "success"
	                });
	                this.getArticleList();
                }
        	})
        },
        handleClick (item) {
            this.$router.push('/markdown?id='+ item._id);
        }
	}
};
</script>
<style lang="scss" scoped>
	.section-content {
		padding: 2rem;
		width: 100%;
		background: #F4F7FD;
	}
	.section-manage {
		background: #fff;
		width: 65%;
		height: 100%;
		padding: 1rem;
		margin: auto;

		.tit {
			color: #7AC5CD;
			font-size: 16px;
			text-transform: uppercase;
			letter-spacing: .05rem;
		}
	}
	td {
		text-align: left;
	}
</style>
