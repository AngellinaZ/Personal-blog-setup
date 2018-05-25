<template>
	<section class="section-content flex_cc">
		<div class="login">
			<span class="tit">后台登录</span>
			<div class="input" style="margin-top: 2rem;">
				<input type="text" v-model="userName" @click="getInput('isFous')" @blur="getBlur"/>
        		<label :class="{trans: isFous}">用户名</label>
			</div>
			<div class="input">
				<input type="password" v-model="password" @click="getInput('isFous1')" @blur="getBlur"/>
        		<label :class="{trans: isFous1}">密码</label>
			</div>
			<button @click="login">进入</button>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default {
		name: 'backstage',
		data() {	
			return {
				isFous: false,
				isFous1: false,
            	userName: '',
            	password: '',
			}
		},
		methods: {
	        //登录
	        getInput(v) {
	            this[v] = true
	        },
	        getBlur() {
	            if (this.userName === '') {
	                this.isFous = false
	            } 
	            if (this.password === '') {
	                this.isFous1 = false
	            }
	        },
	        login: function () {
	            this.$http({
	                method: 'post',
	                url: this.HOST + '/api/login',
	                params: {
	                    username: this.userName,
	                    password: this.password
	                },
	                headers: {
	                  'Content-Type': 'application/x-www-form-urlencoded'
	                }
	            }).then(response => {
	                var datas = response.data
	                console.log(datas)
	                if (datas.code == 200) {
	                    // 登录成功写入 localStorage
	                    localStorage.setItem('isLogin', true)
	                    this.$router.push('/markdown');
	                }
	            }).catch(error => {
	                
	            })
	        }
	    }
	}
</script>
<style lang="scss" scoped>
	.section-content {
		width: 100%;
		padding: 2rem;
		background: #F4F7FD;
	}
	.login {
		padding: 1.5rem;
		background: #fff;

		.tit {
			display: inline-block;
			color: #458B74;
			border-bottom: 1px solid #458B74;
			padding-bottom: 0.2rem;
		}
		button {
			padding: 0.5rem 1.5rem;
			background: #458B74;
			color: #fff;
			border: none;
			margin-top: 3rem;
			font-size: 16px;
		}
	}
	.input {
		width: 20rem;
		height: 4rem;
		position: relative;
		line-height: 4rem;
		background: #fff;
		margin-top: 1rem;
		
		input {
			width: 100%;
			background: transparent;
			-webkit-appearance: none;
			appearance: none;
			border: none;
			border-bottom: 1px solid #eee;
			height: 30px;
			outline: none;  /*focus时的边框色*/
			padding-bottom: 5px;
		}
		label {
			position: absolute;
			top: 2px;
			left: 0;
			z-index: 22;
			/*transform: translateZ(0) scale(1);*/
			transition: all .45s linear;  
			color: #cdcdcd;
		}
		.trans {
			transform: translate3d(-10px,-28px,0) scale(.85);   /*转变*/
			transition: all .45s linear;   /*过渡  cubic-bezier(.23,1,.32,1)三次贝塞尔曲线*/
		}
	}
</style>