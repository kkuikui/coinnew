<template>
	<div class="header">
		<div class="page-content">
            <div class="layout">
                <div class="introduce">
                    <div v-for="item in advList" class='topAd' :key="item.index">
						            <i class="topnotice"></i>
                        <span class="noticetip" @click="noticedeail(item.id)">{{$t("header.ad")}}{{item.title}}
                        </span>
                        <!-- <router-link to="/notice">{{$t("header.seemore")}}</router-link> -->
                    </div>
                </div>
                <div class="layout-ceiling">
				     	<Row  type="flex" justify="center" class="layout-ceiling-main">
                        <Col span="2">
					    	<router-link to="/">
						        <div class="layout-logo"></div>
                            </router-link>
                        </Col>
					    <Col span="16" class="header_nav">
                            <Menu :active-name="activeNav" theme="light" width="auto" mode="horizontal">
							    <router-link to="/">
								    <MenuItem name="nav-index">{{$t("header.index")}}</MenuItem>
                                </router-link>
							    <router-link to="/otc/trade/BTC">
                                    <MenuItem name="nav-otc">{{$t("header.otc")}}</MenuItem>
                                </router-link>
							    <router-link to="/exchange">
                                    <MenuItem name="nav-exchange">{{$t("header.exchange")}}</MenuItem>
                                </router-link>
                                <router-link to="/finance/index">
                                    <MenuItem name="nav-asset">{{$t("header.asset")}}</MenuItem>
                                </router-link>
                                <router-link to="/uc/safe">
                                    <MenuItem name="nav-uc">{{$t("header.ucenter")}}</MenuItem>
                                </router-link>
                                <router-link to="/help">
                                    <MenuItem name="nav-service">{{$t("header.service")}}</MenuItem>
                                </router-link>
                                <a :href="linkTo">
                                    <MenuItem name="nav-link">{{$t("header.link")}}</MenuItem>
                                </a>
                            </Menu>
                        </Col>
                        <Col span="4" class="navBtnWrapper">
                            <div class="loginRegister" v-if="isLogin">
                                <Dropdown>
                                    <a href="javascript:void(0)">
                                        <Icon type="person" class="personstyle"></Icon>
                                        <span>{{member.username}}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <div @click="logout">
                                            <DropdownItem>
                                                <i class="dropout"></i> {{$t("common.logout")}}
                                            </DropdownItem>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="loginRegister" v-else>
                                <router-link to="/login">
                                 	<Button class="lorebtn" size="small">{{ $t('common.login') }}</Button>
                                </router-link>
                                <router-link to="/register">
                                    <Button class="lorebtn" type="text" size="small" >{{ $t('common.register') }}</Button>
                                </router-link>
                            </div>
                        </Col>
						<Col span="2" class="navBtnWrapper">
                            <Dropdown @on-click="changelanguage" class="dropLanguage">
                                <span>
                                    {{languageValue}}
                                    <Icon type="arrow-down-b"></Icon>
                                </span>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-if="languageValue=='简体中文'" name="en">English</DropdownItem>
                                    <DropdownItem v-else name="cn">简体中文</DropdownItem>
                                    <!-- <DropdownItem name="hk">繁体中文</DropdownItem> -->
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
				    </Row>
				</div>
			</div>
        </div>
	</div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "headlayout",
  data() {
    return {
      pageNo: 1,
      pageSize: 1,
      advList: [],
      topInfo: {
        name: "币对--领衔全球的数字资产交易平台",
        remark: "aaaa",
        createTime: "2018-01-10 11:37:27"
      },
      linkTo: ""
      // languageValue: '简体中文'
    };
  },
  watch: {
    activeNav: function() {
      switch (this.activeNav) {
        case "nav-exchange":
          break;
        default:
          window.document.title = "领衔全球的数字资产交易平台 -- 【币对】";
          break;
      }
    }
  },
  computed: {
    activeNav: function() {
      return this.$store.state.activeNav;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
    languageValue: function() {
      var curlang = this.$store.getters.lang;
      if (curlang == "English") this.$i18n.locale = "en";
      return curlang;
    }
  },
  created: function() {
    if (this.isMobileUserAgent()) {
      if (this.getParamString("agent") != undefined) {
        location.href =
          "https://www.coin-dy.com/register/#/signin?agent=" +
          this.getParamString("agent");
      }
    }
    var that = this;
    if (
      "-ms-scroll-limit" in document.documentElement.style &&
      "-ms-ime-align" in document.documentElement.style
    ) {
      // detect it's IE11
      window.addEventListener(
        "hashchange",
        function(event) {
          var currentPath = window.location.hash.slice(1);
          if (that.$router.path !== currentPath) {
            that.$router.push(currentPath);
          }
        },
        false
      );
    }
    this.initialize();
    this.loadDataPage(this.pageNo);
    this.getLinks();
  },
  methods: {
    //   接收参数
    getParamString(name) {
      let paramUrl = window.location.href;
      let paramStrs = paramUrl.split("?");
      let params = {};
      for (var index = 0; index < paramStrs.length; index++) {
        params[paramStrs[index].split("=")[0]] = decodeURI(
          paramStrs[index].split("=")[1]
        );
      }
      return params[name];
    },
    getLinks() {
      if (this.getParamString("agent") == undefined) {
        if (this.member == null) {
          this.$Message.success("请先登录");
          this.$router.push("/login");
        } else {
          this.$http
            .get(this.host + "/open/member/remote-login?uid=" + this.member.id)
            .then(response => {
              //   console.log(response);
              var result = response.body;
              if (result.code == 0) {
                this.linkTo = result.data;
              }
            });
        }
      }
    },
    loadDataPage(pageIndex) {
      var param = {};
      (param["pageNo"] = pageIndex),
        (param["pageSize"] = this.pageSize),
        this.$http
          .post(this.host + this.api.uc.announcement, param)
          .then(response => {
            var resp = response.body.data.content;
            this.advList = resp;
          });
    },
    noticedeail(x) {
      this.$router.push({ path: "/notice/index", query: { id: x } });
    },
    isMobileUserAgent: function() {
      return /iphone|ipod|android|windows.*phone|blackberry.*mobile/i.test(
        window.navigator.userAgent.toLowerCase()
      );
    },
    initialize() {
      this.$store.commit("navigate", "nav-index");
      this.$store.commit("recoveryMember");
      this.$store.commit("initLang");
      // this.loadTopInfo();
      this.checkLogin();
    },
    loadTopInfo() {
      /*获取首页顶部公告*/
      let param = {};
      param["sysAdvertiseLocation"] = 2;
      this.$http
        .post(this.host + "/uc/ancillary/system/advertise", param)
        .then(response => {
          var result = response.body;
          if (result.code == 0 && result.data.length > 0) {
            this.topInfo = result.data[0];
          }
        });
    },
    logout() {
      this.$http.post(this.host + "/uc/logout", {}).then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.$Message.success(resp.message);
          this.$store.commit("setMember", null);
          location.href = "/";
        } else {
          this.$Message.error(resp.message);
        }
      });
    },
    checkLogin() {
      this.$http.post(this.host + "/uc/check/login", {}).then(response => {
        var result = response.body;
        if (result.code == 0 && result.data == false) {
          this.$store.commit("setMember", null);
        }
      });
    },
    changelanguage: function(name) {
      if (name == "en") {
        this.$store.commit("setlang", "English");
        this.$i18n.locale = "en";
      }
      if (name == "cn") {
        this.$store.commit("setlang", "简体中文");
        this.$i18n.locale = "zh";
      }
      // if (name == 'hk') {
      //     this.languageValue = '繁体中文';
      // }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
@import "css/header.less";
@import "css/headerpatch.less";
</style>

