<template>
    <div class="help">
        <div class="wrapper">
            <div class="title">
                <router-link to="/help">{{$t('cms.servicecenter')}}
                </router-link>->{{$t('cms.notice')}}
            </div>
            <Col span="24" class="mainContent">
              <div class="faqlist">
                <div v-for="item,index in FAQList" class="faqitem" @click="noticedeail(item.id)">
                  {{item.title}}
                  <span>{{item.createTime}}</span>
                  <!-- <span v-html="item.content" class="faqcontent"></span> -->
                </div>
              </div>
            </Col>
            <Col span="24" class="page">
               <Page :total="totalNum" :pageSize="pageSize" :current="pageNo" @on-change="loadDataPage"></Page>
            </Col>
        </div>
    </div>
</template>
<style lang="less" scoped>
	@import '../../styles/common';
	.help{
		padding: 20px 0;
    background: #F8F9FB;
    min-height: 800px;
    background-size: cover;
    position: relative;
    overflow: hidden;
		.wrapper{
        width:1200px;
      .title {
        line-height: 40px;
      }
			.mainContent{
        padding: 0 2%;
        color: #000;
        font-size: 18px;
        background: #fff;
        .faqlist {
          text-align: left;
          .faqitem {
            color:#777;
            font-size: 14px;
            line-height:26px;
            padding:15px 15px;
            word-wrap: break-word;
            border-bottom: 1px solid #ececec;
            cursor: pointer;
            span {
              float:right;
            }
            .faqcontent {
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .page {
        padding:100px 20px;
        .ivu-page {
          float: right;
        }
      }
		}
	}

</style>
<script>
export default {
  data() {
    return {
      pageNo:1,
      pageSize:10,
      totalNum:0,
      FAQList: [],
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$store.state.HeaderActiveName = "1-7";
      this.loadDataPage(this.pageNo);
    },
    loadDataPage(pageIndex){
        var param = {};
        param["pageNo"] = pageIndex,
        param["pageSize"] = this.pageSize,
        this.$http.post(this.host + this.api.uc.announcement, param).then(response => {
          var resp = response.body;
          if(resp.code==0){
            if (resp.data.content.length == 0) return;
            this.FAQList = resp.data.content;
            this.totalNum = resp.data.totalElements;
          }else{
            this.$Notice.error({
              title: this.$t('common.tip'),
              desc: resp.message
            });
          }
        });
    },
    noticedeail(id){
        var path =  {path:'/notice/index',query:{id:id}};
        this.$router.push(path);
    }
  }
};
</script>
