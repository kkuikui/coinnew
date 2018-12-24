<template>
    <div class="content-wrap">
        <div class="wrapper">
            <div class="container">
                <Row>
                    <Col span="4">
                        <div class="leftmenu">
                            <ul class="nav nav-pills nav-stacked">
                                <li class="listtitle">{{$t('uc.member.accountcenter')}}</li>                                
                                <li>
                                    <router-link class="pill-item" to="/uc/safe">{{$t('uc.member.securitysetting')}}</router-link>
                                </li>
                                <li>
                                    <router-link class="pill-item" to="/uc/account">{{$t('uc.member.accountsetting')}}</router-link>
                                </li>
                                <li>
                                    <router-link class="pill-item" to="/uc/myextension">{{$t('uc.member.myextension')}}</router-link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col span="20">
                        <div class="rightcontent">
                        <!-- <keep-alive> -->
                        <router-view></router-view>
                         <!-- </keep-alive> -->
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit("navigate", "nav-uc");
      this.$store.state.HeaderActiveName = "1-6";
      if (!localStorage.TOKEN || !localStorage.MEMBER) {
        this.$Message.success(this.$t("common.logintip"));
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "../../styles/common.less";
@import "../../styles/left_content.less";
.content-wrap {
  .wrapper {
    width: 1200px;
    .container {
      width: 1200px;
      .leftmenu {
        .nav {
          .listtitle {
          }
          .pill-item {
            &:hover {
              color: #000;
            }
          }
        }
      }
      .rightcontent {
        padding: 10px 20px;
      }
    }
  }
}
</style>

