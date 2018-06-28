<template>
	<div class="section-content">
		<div class="section-manage tags">
			<span class="tit">Label management</span>
			<ul class="flex_rs flex_wrap">
				<li v-for="item in tags" :key='item.id'> 
					<span>{{ item.name }}</span>
					<i @click='removeTag(item)'>X</i>
				</li>
				<li class="add" @click="addTag">
					<span>+</span>
				</li>
			</ul>	
		</div>
	</div>
</template>
<script>
import {addTag, getTag, removeTag} from '../../api/index.js'

export default {
	name: 'manage',
	data() {	
		return {
			tags: []
		}
	},
	mounted() {
		this.getTag();
	},
	methods: {
       // 获取标签
        getTag() {
        	getTag().then(res => {
        		if (res.code === 200) {
                    this.tags = res.data;
        		}
        	})
        },
        // 添加标签
        addTag() {
            let tagName = prompt('添加一个新的标签，请输入标签名', '')
            if (tagName) {
            	addTag(tagName).then(res => {
            		if (res.code === 200) {
	                    this.$message({
		                  	message: "添加成功!",
		                  	type: "success"
		                });
                        this.getTag()
	        		}
            	})
            } else {
                alert('请输入标签名！')
            }
        },
        // 删除标签
        removeTag(tag) {
            let { _id }  = tag;
            removeTag(_id).then(res => {
            	if (res.code === 200) {
            		this.$message({
	                  	message: "删除成功!",
	                  	type: "success"
	                });
                    this.getTag()
            	}
            })
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
		width: 47%;
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
	.tags {

		ul {
			padding: 2.5rem 0;
		}
		li {
	        margin-right: 1.5rem;
	        margin-top: 1rem;
	        padding: 0.4rem 1rem;
	        border-radius: 3px;
	        font-size: 14px;
	        position: relative;
	        background: #458B74;
	        color: #fff;

	        i {
	        	position: absolute;
	        	right: -.5rem;
	        	top: -.5rem;
	        	color: #8B0000;
	        	font-size: 10px;
	        	background: #eee;
	        	height: 1rem;
	        	width: 1rem;
	        	border-radius: 50%;
	        	cursor: pointer;
	        }
	    }
	    .add {
	    	cursor: pointer;
	    	transition: all 0.1s cubic-bezier(1, 0.1, 0, 0.9);
	    	background: #7AC5CD;
	    }
	    .add:hover {
	    	transform: scale(1.2);
	    }
	}
</style>
