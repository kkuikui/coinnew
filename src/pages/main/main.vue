<template>
	<div class="main page" >
		<header>
			<Head></Head>
		</header>
		<body id="body">
			<router-view />
		</body>
		<footer>
			<Foot></Foot>
		</footer>
	</div>
</template>

<script>
import Head from '@/components/public/header';
import Foot from '@/components/public/footer';
export default {
	name: 'Main',
	components: {
		Head,
		Foot
	},
	created(){
		if (this.$route.path === '/login' || this.$route.path === '/register') { // 页面刷新 用来判断登录和注册页面的footer和其他页面不一样
				this.$store.commit('setBackStatus',true)
		} else {
				this.$store.commit('setBackStatus',false)
		}
	}
}
</script>
<style lang="less" scoped>
	@import '../../styles/common.less';
	.main{
		position: relative;
		min-height: 800px;
		padding-bottom: 200px;
		padding-top: 105px;
        overflow: auto;
		header{
			position: absolute;
			top: 0;
			width: 100%;
			height: 105px;
		}
		#body {
            height: 100%;
		}
		footer{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 200px;
		}
	}
</style>
