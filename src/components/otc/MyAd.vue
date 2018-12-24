<template>
    <div class="myad">
        <div class="wrapper">
            <div class="container">
                <div class="advtop">
                    <p class="header">{{$t('otc.myad.title')}}</p>
                    <div class="linktoad">
                        <i class="release"></i>
                        <router-link to="/otc/ad/create" class="top-ad">{{$t('otc.myad.post')}}</router-link>
                        <!-- <div class="top-ad">
                            <Button icon="plus-round" type="primary" @click="publish">{{$t('otc.myad.post')}}</Button>
                        </div> -->
                    </div>
                </div>
                <div class="line">
                    <div class="line1"></div>
                </div>
                <Alert>{{$t('otc.myad.alert')}}</Alert>

                <div class="order-table hasBtn">
                    <Table stripe :columns="tableColumnsAdv" :data="tableAdv"
                     :no-data-text="$t('common.nodata')" 
                    :loading="loading" class="tables" ></Table>
                    <div class="pagelist">
                        <div class="pageitem">
                            <Page v-if="totalPage > 0" :pageSize="pageNumber"
                            :total="totalPage" :current="currentPage" @on-change="changePage"></Page>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        let self = this;
        return {
            loginmsg:this.$t('common.logintip'),
            dataCount: 0,
            tableAdv: [],
            loading: true,
            tableColumnsAdv: [
                {
                    title: self.$t('otc.myad.no'),
                    key: 'id',
                    width: 85,
                    align:'center',
                    render: function(h, params) {
                        return h('div', [
                            h('p', {
                                style: {
                                    color: '#2371d8'
                                },
                            }, params.row.id),
                        ]);
                    },
                },
                {
                    title: self.$t('otc.myad.type'),
                    key: 'advertiseType',
                    width: 90,
                     align:'center',
                    render: (h, params) => {
                        let text = ''
                        if (params.row.advertiseType == 0) {
                            text = self.$t('otc.myad.buy');
                        } else if (params.row.advertiseType == 1) {
                            text = self.$t('otc.myad.sell');
                        }
                        return h('div', [
                            h('p', text),
                        ]);
                    }
                },
                {
                    title: self.$t('otc.myad.limit'),
                    key: 'limit',
                    width: 120,
                     align:'center',
                    render: (h, params) => {
                        return h('div', [
                            h('p', params.row.minLimit + '~' + params.row.maxLimit),
                        ]);
                    }
                },
                {
                    title: self.$t('otc.myad.remain'),
                    key: 'remainAmount',
                    width: 130,
                     align:'center',
                },
                {
                    title: self.$t('otc.myad.coin'),
                    key: 'coinUnit',
                    width: 110,
                     align:'center',
                    render: (h, params) => {
                        return h('div', [
                            h('p', params.row.coin.unit),
                        ]);
                    }
                },
                {
                    title: self.$t('otc.myad.created'),
                    key: 'createTime',
                    width: 172,
                     align:'center',
                },
                {
                    title: self.$t('otc.myad.operate'),
                    key: 'buyBtn',
                    width: 200,
                     align:'center',
                    render: function(h, params) {
                        return h('p', [
                            h('a', {
                                on: {
                                    click: function() {
                                        if (params.row.status == 0) {
                                            self.$Message.error(self.$t('otc.myad.errmsg'));
                                        } else {
                                            self.$router.push('/otc/ad/update?id=' + params.row.id);
                                        }

                                    }
                                }

                            }, [
                                    h('button', {
                                        attrs: {
                                            class: 'button1'
                                        },
                                        style: {
                                            marginRight: '8px',
                                             width:'40px',
                                            // background: '#999'
                                        },
                                    }, self.$t('otc.myad.update')),
                                ]),
                            h('button', {
                                attrs: {
                                    class: 'button2'
                                },
                                style: {
                                    marginRight: '8px',
                                    width:'40px',
                                },
                                on: {
                                    click: () => {
                                        //要上架
                                        if (params.row.status == 1) {
                                            let canshu = {};
                                            canshu['id'] = params.row.id
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http.post(self.host + '/otc/advertise/on/shelves', canshu).then(response => {
                                                var resp = response.body;
                                                if (resp.code == 0) {
                                                    self.$Message.success(resp.message);
                                                    // self.$router.go(0)
                                                    self.getAd(self.currentPage)
                                                } else {
                                                    self.$Message.error(resp.message);
                                                }
                                            })
                                        } else if (params.row.status == 0) {
                                            let canshu = {};
                                            canshu['id'] = params.row.id
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http.post(self.host + '/otc/advertise/off/shelves', canshu).then(response => {
                                                var resp = response.body;
                                                if (resp.code == 0) {
                                                    self.$Message.success(resp.message);
                                                    // self.$router.go(0)
                                                    self.getAd(self.currentPage)
                                                } else {
                                                    self.$Message.error(resp.message);
                                                }
                                            })
                                        }

                                    }
                                }
                            }, params.row.status == 0 ? self.$t('otc.myad.dropoff') : self.$t('otc.myad.shelf')),
                            h('button', {
                                attrs: {
                                    class: 'button3'
                                },
                                style: {
                                   width:'40px', 
                                },
                                on: {
                                    click: () => {
                                        let canshu = {};
                                        canshu['id'] = params.row.id

                                        if (params.row.status == 1) {
                                          self.$Modal.confirm({
                                            title: self.$t('common.tip'),
                                            content: '<p>'+self.$t('common.delete')+'</p>',
                                            onOk: () => {
                                              self.$http.post(self.host + '/otc/advertise/delete', canshu).then(response => {
                                                var resp = response.body;
                                                if (resp.code == 0) {
                                                  self.$Message.success(resp.message);
                                                  self.remove(params.index)
                                                } else {
                                                  self.$Message.error(resp.message);
                                                }
                                              })
                                            }
                                          });
                                        }else {
                                          self.$Message.error("下架广告后才可以删除！");
                                        }
                                    }
                                }
                            }, self.$t('otc.myad.delete'))
                        ]);
                    }
                },
            ],
            totalPage:0,
            pageNumber:10,
            currentPage:1
        }
    },
    methods: {
        init() {
            this.$store.commit('leftmenu','ad');
            if (!this.isLogin) {
                this.$Message.error(this.$t("common.tipLogin"));
                this.$router.push('/login');
            }
        },
        updateLangData(){
            this.tableColumnsAdv[0].title = this.$t("otc.myad.no");
            this.tableColumnsAdv[1].title = this.$t("otc.myad.type");
            this.tableColumnsAdv[2].title = this.$t("otc.myad.limit");
            this.tableColumnsAdv[3].title = this.$t("otc.myad.remain");
            this.tableColumnsAdv[4].title = this.$t("otc.myad.coin");
            this.tableColumnsAdv[5].title = this.$t("otc.myad.created");
            this.tableColumnsAdv[6].title = this.$t("otc.myad.operate");
        },
        remove(index) {
            this.tableAdv.splice(index, 1);
        },
        changePage(index) {
            // console.log(this.tradeWay)
            this.currentPage = index
            this.getAd(index)
        },
        getAd(pageNo) {
            //获取个人广告
            let params = {};
            params['pageNo'] = pageNo;
            params['pageSize'] = this.pageNumber;
            this.$http.post(this.host + '/otc/advertise/all', params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableAdv = resp.data.content;
                    this.loading = false
                    //this.dataCount = resp.data.length
                    this.totalPage = resp.data.totalElements
                } else {
                    // this.$Message.error(resp.message);
                  this.$Message.error(this.loginmsg);
                }
            })
        },
        publish(){
            this.$router.push(this.api.otc.createAd);
        }

    },
    computed: {
        'lang': function () {
          return this.$store.state.lang;
        },
        'isLogin': function() {
            return this.$store.getters.isLogin;
        }
    },
    watch:{
      'lang':function () {
        this.updateLangData();
      }
    },
    created() {
        this.init();
        this.getAd(1);
    }
}
</script>
<style lang="less">
 .ivu-table-cell {
    button {
      color: #fff;
      height: 25px;
      border-radius: 3px;
      width: 40px;
      &.button1 {
        background: #ADBACA;
      }
      &.button2{
        background: #2371d8;
      }
      &.button3{
        background: #FF7070;
      }
    }
  }
</style>

<style scoped lang="less">
@import '../../styles/common.less';
 
  .myad{
    .hasBtn{
        .ivu-table-cell{
            button{
                width:40px !important;
            }
        }
    }
      
	.wrapper{
	  .container{
        padding:0 20px;
        text-align: left;
        .advtop{
          margin: 10px 15px;
          font-size: 14px;
          color: @baseColor;
          height: 30px;
          line-height: 30px;
          .header{
            float: left;
            font-size: 18px;
            font-weight: 500;
          }
          .linktoad {
            float: right;
            border-radius: 3px;
            background: #FDF8E2;
            text-align: center;
            width: 110px;
            height: 30px;
            line-height: 30px;
            vertical-align: middle;
            .release {
              vertical-align: middle;
              margin-bottom: 5px;
              height: 20px;
              width: 20px;
              background: url(../../assets/img/release.png) no-repeat center;
            }
            .top-ad {
              color: @baseColor;
              line-height: 30px;
            }
          }
        }
        .line {
          width: 100%;
          background: #eee;
          margin-bottom: 20px;
          .line1 {
            width: 9%;
            height: 2px;
            background: @baseColor;
          }
        }
        .order-table {
          .tables {

          }
          .pagelist {
            margin: 20px 10px;
            overflow: hidden;
            .pageitem {
              float: right;
            }
          }
        }
	  }
    }
  }

</style>
