<template>
	<div class="footer" :class="{backColor: backStatus}">
		<div class="wrapper">
            <div class="footerLeft">
                <img src="../../assets/images/footer_logo.png"></img>
				<p class="title">{{$t("footer.gsmc")}}</p>
                <ul class="otherchat">
                    <li>
                        <a target="blank"  href="https://weibo.com/u/6619623793">
                            <img src="../../assets/images/weibo.png" alt="">
                        </a>
                    </li>
                <!-- </ul>
                <ul> -->
                    <li>
                        <a target="blank"  href="https://0.plus/CoindyBiDui">
                            <img src="../../assets/images/wechat.png" alt="">
                        </a>
                    </li>
                <!-- </ul>
                <ul> -->
                    <li>
                        <a target="blank" href="#" >
                            <img src="../../assets/images/facebook.png" alt="">
                        </a>
                    </li>
                <!-- </ul>
                <ul> -->
                    <li>
                        <a target="blank" href="#">
                            <img src="../../assets/images/twitter.png" alt="">
                        </a>
                    </li>
                </ul>
				<p class="copyright">Copyright © 2017 - 2018&nbsp;&nbsp;</p>
			</div>
            <div class="footerRight">
                <ul>
                    <li class="title">
                        <span>{{$t("footer.gsjj")}}</span>
                    </li>
                    <li>
                        <router-link to="/about-us">{{$t("footer.gywm")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/join-us">{{$t("footer.jrwm")}}</router-link>
                    </li>
                </ul>
                <ul>
                    <li class="title">
                        <span>{{$t("footer.bzzx")}}</span>
                    </li>
                    <li>
                        <!--<a href="#">{{$t("footer.xsrm")}}</a>-->
                        <router-link to="/newhelp/index?id=1">{{$t("footer.xsrm")}}</router-link>
                    </li>
                    <li>
                        <!--<a href="#">{{$t("footer.czzn")}}</a>-->
                        <router-link to="/newhelp/index?id=3">{{$t("footer.czzn")}}</router-link>
                    </li>
                    <li>
                        <!--<a href="#">{{$t("footer.jyzn")}}</a>-->
                        <router-link to="/newhelp/index?id=4">{{$t("footer.jyzn")}}</router-link>
                    </li>
                </ul>
                <ul>
                    <li class="title">
                        <span>{{$t("footer.ptsm")}}</span>
                    </li>
                    <li>
                        <router-link to="/about-rule">{{$t("footer.fysm")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/about-protocol">{{$t("footer.fwtk")}}</router-link>
                    </li>
                    <li>
                        <router-link to="/about-fee">{{$t("footer.fltk")}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    backStatus() {
      return this.$store.state.backStatus; // 用来判断登录和注册页面的footer和其他页面不一样
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === "/login" || to.path === "/register") {
        this.$store.commit("setBackStatus", true);
      } else {
        this.$store.commit("setBackStatus", false);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
@import "css/footer.less";
</style>
