<template>
    <div class="content-wrap finance">
        <div class="wrapper">
            <div class="container">
                <Row>
                    <Col span="4">
                        <div class="leftmenu">
                            <ul class="nav">
                                <li class="listtitle">{{$t('uc.finance.center')}}</li>
                                <li>
                                    <router-link class="pill-item" to="/finance/index">{{$t('uc.finance.personalassets')}}</router-link>
                                </li>
                                <li>
                                    <router-link class="pill-item" to="/finance/record">{{$t('uc.finance.billdetail')}}</router-link>
                                </li>
                                <li>
                                    <router-link class="pill-item" to="/finance/recharge">{{$t('uc.finance.charge')}}</router-link>
                                </li>
                                <li>
                                    <router-link class="pill-item" to="/finance/withdraw">{{$t('uc.finance.pickup')}}</router-link>
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
    components: {
    },
    data() {
        return {

        }
    },
    methods: {
        init() {
            this.$store.commit('navigate','nav-asset');
            this.$store.state.HeaderActiveName = '1-5';
            if (!localStorage.TOKEN || !localStorage.MEMBER) {
                this.$Message.success(this.$t('common.logintip'));
                this.$router.push('/login');
            }
        },
    },
    created: function() {
        this.init();
    },
}
</script>
<style scoped lang="less">
@import '../../styles/common.less';
@import '../../styles/left_content.less';
	.content-wrap{
	  .wrapper{
        width: 1200px;
		.container{
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

