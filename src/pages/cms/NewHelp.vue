<template>
    <div class="content-wrap">
        <div class="wrapper">
            <div class="container">
                <Row>
                    <Col span="4">
                        <div class="leftmenu">
                            <ul class="nav">
                                <li class="listtitle">{{$t('cms.newshelp')}}</li>
                                <li class="pill-item" v-for="item, index in newlist" 
                                 :class="{'active':ind === index}" @click="onlistdetails(item)">
                                    {{item.title}}
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col span="18">
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
    return {
        newlist: [
          {
            title: this.$t('cms.newhelp.newstart'),
            key: "1"
          },
          {
            title: this.$t('cms.newhelp.faq'),
            key: "2"
          },
          {
            title: this.$t('cms.newhelp.reguide'),
            key: "3"
          },
          {
            title: this.$t('cms.newhelp.trguide'),
            key:"4"
          },
        ]
    };
  },
  computed:{
    "ind":function () {
      let id = this.$route.query.id;
      if (typeof id != "undefined" && id != "") {
        return id - 1;
      }else {
        return 0;
      }
    },
    'lang': function () {
      return this.$store.state.lang;
    },
  },
  watch:{
    'lang':function () {
      this.updateLangData();
    },
  },
  methods: {
    updateLangData() {
      this.newlist[0].title = this.$t("cms.newhelp.newstart");
      this.newlist[1].title = this.$t("cms.newhelp.reguide");
      this.newlist[2].title = this.$t("cms.newhelp.trguide");
      this.newlist[3].title = this.$t("cms.newhelp.faq");
    },
    init() {
      // this.$store.state.HeaderActiveName = '4';
    },
    onlistdetails(item){
        this.$router.push({ path: '/newhelp/index', query: {id: item.key}})
    },
  },
  created: function() {
    this.init();
  }
};
</script>
<style scoped lang="less">
@import '../../styles/common.less';
@import '../../styles/left_content.less';
	.content-wrap{
		.wrapper{
   width:1200px;
.container{
        .leftmenu {
          .nav {
            .listtitle {
            }
            .pill-item {
            }
          }
        }
        .rightcontent {
          text-align: left;
          padding: 10px 20px;
        }
			}
		}
	}

</style>

