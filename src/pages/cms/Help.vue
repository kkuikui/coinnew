<template>
    <div class="help">
        <img src="../../assets/images/call.png">
        <div class="wrapper">
            <Row class="serviceType">
                <Col span="8">
                    <router-link to="/notice">
						            <div class="borderWrapper">
                            <img src="../../assets/images/consult.png" class="center" >
                            <h2>{{$t('cms.noticecenter')}}</h2>
						            </div>
				           	</router-link>
                </Col>
                <Col span="8">
                    <router-link to="/newhelp/index?id=1">
						            <div class="borderWrapper">
                            <img src="../../assets/images/help.png" class="center" >
                            <h2>{{$t('cms.newshelp')}}</h2>
						            </div>
				           	</router-link>
                </Col>
                <Col span="8">
                    <router-link to="/">
						            <div class="borderWrapper">
                            <img src="../../assets/images/wechats.png" class="center" >
                            <h2>{{$t('cms.appdownload')}}</h2>
                            <!-- <h2  @click="showEwm">{{$t('cms.onlineservice')}}</h2> -->
						            </div>
				           	</router-link>
                </Col>
            </Row>
            <div v-show="isShowWeChat" style="position: absolute;right: 66px;">
                <img src="../../assets/images/wechats.png">
            </div>
            <Row class="commonQuestion">
                <Col span="24">
                    <p class="title">{{$t('cms.faq')}}</p>
                    <div v-for="item in FAQList" class="faqlist" >
                        <div class="fqtitle">
                          <p>{{item.title}}<span style="margin-left: 20px;">{{item.createTime}}</span></p>
                        </div>
                        <div class="fqcontent" v-html="item.content"></div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<style lang="less" scoped>
  @import '../../styles/common.less';
  .help{
    background: #fafafc;
    /* background:url(/assets/images/help_bg.png) no-repeat center; */
    min-height: 800px;
    background-size: cover;
    position: relative;
    overflow: hidden;
		.wrapper {
      height: 100%;
      width:1200px;
			.serviceType{
				margin: 50px 0;
				.borderWrapper{
					margin: 0 auto;
					width: 310px;
          height: 230px;
          background: #fff;     
          color: #464650;
          border-radius: 4px;
					border: 1px solid @borderLine;
					transition: all .25s;
					&:hover{
						box-shadow: 0 0 10px 5px @bgColor;
						transform: scale(1.02);
					}
					img{
						width: 60px;
						height: 50px;
						top: 40%;
					}
					h2{
						margin-top: 140px;
						font-size: 22px;
            text-align: center;
            padding-top: 5px;
            line-height: 35px;
            font-weight: 500;
					}
				}
			}
			.commonQuestion{
        text-align: center;
				.title{
          margin-bottom: 20px;
          font-size: 30px;
          line-height:50px;
				}
				.faqlist{
          text-align: left;
					padding: 40px 0;
					border-top: 1px solid @borderLine;
					.fqtitle{
						margin-bottom: 15px;
            font-size: 18px;
            p {
              background: whitesmoke;
              line-height: 51px;
              padding:0 15px;
            }
					}
					.fqcontent{
            color: #777;
            font-size: 14px;
            line-height:26px;
            padding:15px 15px;
            word-wrap: break-word;
					}
				}
			}
		}
	}

</style>
<script>
export default {
  data() {
    return {
      isShowWeChat:false,
      FAQContent:'',
      FAQList: [],
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit('navigate','nav-service');
      this.$store.state.HeaderActiveName = "1-7";

      this.loadFAQData();
    },
    loadFAQData(){
      let param = {};
      param["sysHelpClassification"] = 1;
      this.$http.post(this.host + "/uc/ancillary/system/help", param).then(response => {
        var resp = response.body;
        if(resp.code==0){
          this.FAQList = resp.data;
          // this.FAQContent = resp.data.content;
        }
      });
    }
    ,
    showEwm() {
      // let onlinechatUrl = "https://qiyukf.com/script/942019d72bd3a5b7722be74c63e0272b.js";
      // window.open(onlinechatUrl);
      return ;
            // this.isShowWeChat = !this.isShowWeChat;
      const title = this.$t('common.tip');
      const content = '<p>'+this.$t('common.expect')+'</p>';
          this.$Modal.info({
            title: title,
            content: content,
            closable: true
          });
    },
  }
};
</script>
