<template>
    <div class="article">
        <div class="wrapper">
            <div v-for="notice,index in noticeList">
                <div class="content">
                    <h3 class="titlestyle">{{notice.title}}</h3>
                    <span v-html="notice.content"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      key:0,
      noticeList:[],
    };
  },
  computed:{
    "helpindex":function () {
      let id = this.$route.query.id;
      if (typeof id != "undefined" && id != "") {
        return id - 1;
      }else {
        return 1;
      }
    }
  },
  watch:{
    'helpindex':function () {
      this.loadHelpByIndex()
    }
  },
   created() {
      this.init();
  },
  methods: {
    init(){
        this.loadHelpByIndex();
     },
    loadHelpByIndex(){
      let sysHelpClassification = this.helpindex;
      this.$http.post(this.host + '/uc/ancillary/system/help',{sysHelpClassification:sysHelpClassification}).then(response => {
        var result = response.body;
        if (result.code == 0) {
          this.noticeList = result.data;
        }
      });
    }
  }
}
</script>
<style lang="less">
    .article{
      
        .wrapper{
           
            img{
                max-width:810px !important;
            }
		}
	}
</style>

<style lang="less" scoped>
	@import '../../styles/common';
	.article{
        background: #fff;
        .wrapper{
            text-align: left;
            max-width: 800px;
            .content {
                // text-indent: 2em;
                .titlestyle{
                font-size: 16px;
                margin: 10px 0;
                }
            }
            img{
                max-width:843px ;
            }
		}
	}

</style>
