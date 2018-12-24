<template>
<div class="avatarWrapper" :style="avatarStyle">
	<div class="avatar">{{text}}</div>
</div>
</template>

<script>

export default {
	name: 'Avatar',
	props: {
		text: {
			type: String
		},
		avatarStyle: {}
	},
	data() {
		return {
			
		}
	},
	methods: {
		initData() {
			
		}
	},
	created() {
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import '../../style/common.css';
/* 用户首字母头像 */
.ball(@wh: 70px, @background-color: #65CAF2) {
		display: inline-block;
		width: @wh;
		height: @wh;
		border-radius: 50%;
		line-height: @wh;
		background-color: @background-color;
}
.avatarWrapper{
	position: relative;
	.ball(80px, #fff);
	border: 1px solid #65CAF2;
	box-shadow: 0 0 5px 1px #65CAF2;
	.avatar{
		.ball();
		// .font(22px, #fff, center, 40px);
		.center{
	        display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.font(@font-size: 20px, @color: #fff, @text-align: center, @line-height: 40px) {
	        font-size: @font-size;
			color: @color;
			font-weight: bolder;
	        text-align: @text-align;
			line-height: @line-height;
		}
		background-size: cover;
		background-repeat: no-repeat;
	}
}
</style>
