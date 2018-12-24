<template>
	<div class="leftNavContent">
		<div class="wrapper">
			<div :style="navStyle" class="leftNav">
				<slot name="leftNav">
					<h1>左侧边栏</h1>
				</slot>
			</div>
			<div :style="contentStyle" class="mainContent">
				<slot name="mainContent">
					<h1>主体内容</h1>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'leftNavContent',
	props: {
		navStyle: {},
		contentStyle: {}
	},
	created() {
	}
}
</script>

<style lang="less" scoped>
	.leftNavContent{
		position: relative;
		min-height: 600px;
		background-color: #fff;
		.wrapper{
			overflow: auto;
			.leftNav{
				float: left;
				width: 200px;
				min-height: 150px;
				padding: 20px 0;
				text-indent: 20px;
				margin-left: 100px;
			}
			.mainContent{
				// margin-left: 20px;
				// padding: 0 50px;
				float: left;
				min-width: 900px;
				max-width: 1200px;
				min-height: 600px;
				background-color: #fff;
			}
		}
	}
</style>


