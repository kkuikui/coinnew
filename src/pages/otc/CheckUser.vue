<template>
<div class="checkuser">
    <div class="wrapper">
        <div class="container">
            <div class="user-top">
                <div class="trade-box">
                    <div class="trade-price">
                        <ul class="tit">
                            <li class="user-in">{{$t('otc.checkuser.language')}}: {{$t('otc.checkuser.languagetext')}}</li>
                            <li class="user-in">{{$t('otc.checkuser.registtime')}}: {{user.createTime}}</li>
                            <li class="user-in">{{$t('otc.checkuser.exchangetimes')}}: {{user.transactions}}</li>
                        </ul>
                    </div>
                </div>
                <div class="user-info">
                    <div class="avatar-box">
                        <div class="user-avatar-public">
                          <img v-if="user.avatar != null && user.avatar != ''"
                           :src="user.avatar" class="user-face">
                          <span v-else class="user-avatar-in" >{{usernameS}}</span>
                        </div>
                        <span class="ml10">{{user.username}}</span>
                        <i class="identify"></i>
                    </div>
                    <div class="deal-market-info">
                        <p v-if="user.emailVerified==1" class="iden">
                            <i class="iconfont icon-youxiang111"></i>
                            <span class="unmarket">{{$t('otc.checkuser.emaildone')}}</span>
                        </p>
                        <p v-else class="iden">
                            <i class="iconfont icon-youxiang"></i>
                            <span class="unmarket">{{$t('otc.checkuser.emailundo')}}</span>
                        </p>
                        <p v-if="user.phoneVerified==1" class="iden">
                            <i class="iconfont icon-dianhua111"></i>
                            <span class="unmarket">{{$t('otc.checkuser.teldone')}}</span>
                        </p>
                        <p v-else class="iden">
                            <i class="iconfont icon-dianhua"></i>
                            <span class="unmarket">{{$t('otc.checkuser.telundo')}}</span>
                        </p>
                        <p v-if="user.realVerified==1" class="iden">
                            <i class="iconfont icon-renzheng111"></i>
                            <span class="unmarket">{{$t('otc.checkuser.idcarddone')}}</span>
                        </p>
                        <p v-else class="iden">
                            <i class="iconfont icon-renzheng"></i>
                            <span class="unmarket">{{$t('otc.checkuser.idcardundo')}}</span>
                        </p>
                    </div>
                </div>
                <!-- <div class="deal-user-trade-info">
                    <p>交易次数：
                        <em class="trade-times">{{user.transactions}}</em>
                    </p>
                    <p>平均放行：
                        <em>666 分钟</em>
                    </p>
                </div> -->
            </div>
            <div class="right-safe">
                <div class="tabbox">
                    <Tabs value="name1">
                        <TabPane :label="$t('otc.checkuser.tablabel1')" name="name1">
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsOrderSell" :data="tableOrderSell" :loading="loading"></Table>
                                <!-- <div class="pagelist">
                                    <div class="pageitem">
                                        <Page :total="100" :current="1" @on-change="changePage"></Page>
                                    </div>
                                </div> -->
                            </div>
                        </TabPane>
                        <TabPane :label="$t('otc.checkuser.tablabel2')" name="name2">
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsOrderBuy" :data="tableOrderBuy" :loading="loading"></Table>
                                <!-- <div class="pagelist">
                                    <div class="pageitem">
                                        <Page :total="100" :current="1" @on-change="changePage"></Page>
                                    </div>
                                </div> -->
                            </div>
                        </TabPane>
                    </Tabs>
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
        return {
            loading: true,
            hasRealName: false,
            usernameS: '',
            user: {
                username: '',
                email: true,
                mobileNo: false,
                idCard: true,
            },
            tableOrderSell: [],
            tableOrderBuy: [],
        }
    },
    created() {
        this.getAdv()

    },
    computed: {
        'isLogin': function() {
            return this.$store.getters.isLogin;
        },
        'member': function() {
            return this.$store.getters.member;
        },
        tableColumnsOrderSell() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t('otc.checkuser.col_symbol'),
                key: 'unit',
            });
            
            columns.push({
                title: this.$t('otc.checkuser.col_num'),
                key: 'remainAmount',
            });
            columns.push({
                title: this.$t('otc.checkuser.col_price')+'/BTC',
                key: 'price',
                width: 170,
                render: function(h, params) {
                    return h('div', [
                        h('p', {
                            attrs: {
                                class: 'price'
                            },
                        },  parseFloat(params.row.price).toFixed(3).slice(0,-1) + 'CNY'),
                        h('p', {
                            attrs: {
                                class: 'price2'
                            },
                        }, params.row.minLimit + '-' + params.row.maxLimit + 'CNY'),
                    ]);
                },
            });
            columns.push({
                title: this.$t('otc.checkuser.col_paymode'),
                key: 'payMode',
                render: function(h, params) {
                    var stylecoin = []
                    var paymode = params.row.payMode.split(',')
                    for (var i=0; i < paymode.length; i++){
                        if(paymode[i]==='支付宝'){
                            stylecoin.push(
                                h('img', {
                                    attrs: {
                                        src: require('../../assets/img/alipay.png'),
                                        width:'25px',
                                        height:'25px',
                                    },
                                    style:{
                                        dispaly: 'inline-block',
                                        marginRight: '8px',
                                    }
                                })
                            );
                        }
                        if(paymode[i]==='微信'){
                            stylecoin.push(
                                h('img', {
                                    attrs: {
                                        src: require('../../assets/img/wechat.png'),
                                        width:'25px',
                                        height:'25px',
                                    },
                                    style:{
                                        dispaly: 'inline-block',
                                        marginRight: '8px',
                                    }
                                })
                                );
                            }
                            if(paymode[i]==='银联'){
                                stylecoin.push(
                                    h('img', {
                                    attrs: {
                                        src: require('../../assets/img/bankcard.png'),
                                        width:'25px',
                                        height:'25px',
                                    },
                                    style:{
                                        dispaly: 'inline-block',
                                        marginRight: '8px',
                                    }
                                })
                            );
                        }
                    }
                    return h('div',stylecoin);
                },
            });
            columns.push({
                title: this.$t('otc.checkuser.col_created'),
                key: 'createTime',
                width: 160,
            });
            columns.push({
                title: this.$t('otc.checkuser.col_operate'),
                key: 'buyBtn',
                render: function(h, params) {
                    return h('p', [
                        h('a', {
                            on: {
                                click: function() {
                                    if (!self.isLogin) {
                                        self.$router.push('/login');
                                    } else if (!self.member.realName) {
                                        self.$Message.error(self.$t('otc.checkuser.operatemsg'));
                                        setTimeout(() => {
                                            self.$router.push('/uc/safe');
                                        }, 2000)
                                    } else {
                                        self.$router.push('/otc/tradeInfo?tradeId=' + params.row.advertiseId);
                                    }
                                }
                            },
                            style: {
                                color: '#fff'
                            },
                        }, [
                                h('button', {
                                    attrs: {
                                        class: 'user-button'
                                    },
                                    style: {
                                        marginRight: '8px',
                                        width: '80%'
                                    },

                                }, 
                                [h('span',self.$t('otc.checkuser.buyin')+params.row.unit.toUpperCase())]
                                )
                            ]),
                    ]);
                }
            });

            return columns;
        },
        tableColumnsOrderBuy() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t('otc.checkuser.col_symbol'),
                key: 'unit',
            });
            columns.push({
                title: this.$t('otc.checkuser.col_num'),
                key: 'remainAmount',
            });
            columns.push({
                title: this.$t('otc.checkuser.col_price')+'/BTC',
                key: 'price',
                width: 170,
                render: function(h, params) {
                    return h('div', [
                        h('p', {
                            attrs: {
                                class: 'price1'
                            },
                        }, params.row.price + 'CNY'),
                        h('p', {
                            attrs: {
                                class: 'price2'
                            },
                        }, params.row.minLimit + '-' + params.row.maxLimit + 'CNY'),
                    ]);
                },
            });
            columns.push({
                title: this.$t('otc.checkuser.col_paymode'),
                key: 'payMode',
                render: function(h, params) {
                    var stylecoin = []
                    var paymode = params.row.payMode.split(',')
                    for (var i=0; i < paymode.length; i++){
                        if(paymode[i]==='支付宝'){
                            stylecoin.push(
                                h('img', {
                                    attrs: {
                                        src: require('../../assets/img/alipay.png'),
                                        width:'25px',
                                        height:'25px',
                                    },
                                    style:{
                                        dispaly: 'inline-block',
                                        marginRight: '8px',
                                    }
                                })
                            );
                        }
                        if(paymode[i]==='微信'){
                            stylecoin.push(
                                h('img', {
                                    attrs: {
                                        src: require('../../assets/img/wechat.png'),
                                        width:'25px',
                                        height:'25px',
                                    },
                                    style:{
                                        dispaly: 'inline-block',
                                        marginRight: '8px',
                                    }
                                })
                                );
                            }
                            if(paymode[i]==='银联'){
                                stylecoin.push(
                                    h('img', {
                                    attrs: {
                                        src: require('../../assets/img/bankcard.png'),
                                        width:'25px',
                                        height:'25px',
                                    },
                                    style:{
                                        dispaly: 'inline-block',
                                        marginRight: '8px',
                                    }
                                })
                            );
                        }
                    }
                    return h('div',stylecoin);
                },
            });
            columns.push({
                title: this.$t('otc.checkuser.col_created'),
                key: 'createTime',
                width: 160,
            });
            columns.push({
                title: this.$t('otc.checkuser.col_operate'),
                key: 'buyBtn',
                render: function(h, params) {
                    return h('p', [
                        h('a', {
                            on: {
                                click: function() {
                                    if (!self.isLogin) {
                                        self.$router.push('/login');

                                    } else if (!self.member.realName) {
                                        self.$Message.error(self.$t('otc.checkuser.operatemsg'));
                                        setTimeout(() => {
                                            self.$router.push('/uc/safe');
                                        }, 2000)
                                    } else {
                                        self.$router.push('/otc/tradeInfo?tradeId=' + params.row.advertiseId);
                                    }
                                }
                            },
                            style: {
                                color: '#fff'
                            },
                        }, [
                                h('button', {
                                    attrs: {
                                        class: 'user-button'
                                    },
                                    style: {
                                        marginRight: '8px',
                                        width: '80%'
                                    },

                                }, [h('span',self.$t('otc.checkuser.sellout')+params.row.unit.toUpperCase())])
                            ]),
                    ]);
                }
            });
            return columns;
        }
    },
    methods: {
        changePage() {

        },
        getAdv() {
            //获取个人账户信息
            this.$http.post(this.host + '/otc/advertise/member', { 'name': this.$route.query.id }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.loading = false
                    this.tableOrderBuy = resp.data.buy
                    this.tableOrderSell = resp.data.sell
                    this.user = resp.data
                    this.usernameS = (this.user.username + '').replace(/^\s+|\s+$/g, "").slice(0, 1)
                } else {
                    this.$Message.error(resp.message);
                }
            })
        }
    },
}
</script>

<style lang="less">
@import '../../styles/common.less';
  .ivu-table-cell {
    .price {
      font-size: 16px;
      font-weight: bolder;
      color: #0DA259;
    }
    .price1{
      font-size: 16px;
      font-weight: bolder;
      color: #f16543;
    }
    .price2 {
      font-size: 12px;
      color: #8994a3;
      margin-top: 0;
    }
  }
  .ivu-table-cell{
    .user-button{
      color: #fff;
      border-radius: 4px;
      height: 32px;
      background: @avatarColor;
      border-color: @avatarColor;
    }
  }
  
  // 表格内容修改
  .ivu-table-tip{
    table{
      tbody{
        tr{
          td{
            padding: 30px 0;
            span{
              &:before{
                margin: 10px auto;
                background-size: 100% 100%;
                width: 45px;
                height: 60px;
                display: block;
                content: '';
                background-image: url(../../assets/img/noorder.png);
              }
            }
          }
        }
      }
    }
  }

</style>
<style scoped lang="less">
@import '../../styles/common.less';
	.checkuser{
      padding: 20px 0;
      background-color: #eee;
      min-height: 750px;    
	  .wrapper{
		.container{
          text-align: left;
          min-height: 700px;
          padding:30px;
          width:1200px;
          margin:0 auto;
          background: #fff;
          .user-top{
            padding: 0 15px 10px;
            .trade-box{
              height: 20px;
              .trade-price{
                float: right;
                .tit{
                  color: #B4B4B4;
                  .user-in{
                    margin-left: 40px;
                    float: left;
                  }
                }
              }
            }
            .user-info{
              height: 80px;
              padding-bottom: 20px;
              border-bottom: 1px dashed #ebeff5;
              .avatar-box{
                float: left;
                height: 60px;
                line-height: 60px;
                vertical-align: middle;
                .user-avatar-public{
                  vertical-align: middle;
                  .user-avatar-in{
                  }
                  .user-face{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                  }
                }
                .ml10 {
                  color: #0d214e;
                  margin-left: 5px;
                  font-size: 14px;
                  display: inline-block;
                }
                .identify {
                  height: 50px;
                  margin-bottom: 2px;
                  vertical-align: middle;
                  &:before {
                    background-size: 100% 100%;
                    width: 50px;
                    height: 20px;
                    display: inline-block;
                    content: '';
                    background-image: url(../../assets/images/business_v.png);
                  }
                }
              }
              .deal-market-info{
                padding: 20px 0 20px 20px;
                float: right;
                .iden{
                  float: left;
                  height: 30px;
                  line-height: 30px;
                  margin-left: 50px;
                  .iconfont{
                    margin-right: 10px;
                    height: 20px;
                    margin-bottom: 2px;
                    vertical-align: middle;
                    &:before {
                      background-size: 100% 100%;
                      width: 20px;
                      height: 20px;
                      display: inline-block;
                      content: '';
                    }
                    &.icon-youxiang111{
                      &:before {
                        background-image: url(../../assets/img/t1-2.png);
                      }
                    }
                    &.icon-youxiang{
                      &:before {
                        background-image: url(../../assets/img/t1-1.png);
                      }
                    }
                    &.icon-dianhua111{
                      &:before {
                        background-image: url(../../assets/img/t2-2.png);
                      }
                    }
                    &.icon-dianhua{
                      &:before {
                        background-image: url(../../assets/img/t2-1.png);
                      }
                    }
                    &.icon-renzheng111{
                      &:before {
                        background-image: url(../../assets/img/t3-2.png);
                      }
                    }
                    &.icon-renzheng{
                      &:before {
                        background-image: url(../../assets/img/t3-1.png);
                      }
                    }
                  }
                  .unmarket{
                    display: inline-block;
                  }
                }
              }
            }
          }
          .right-safe{
            .tabbox{
              padding: 20px 15px;
              .order-table {
                .pagelist {
                  margin: 20px 10px;
                  .pageitem {
                    float: right;
                  }
                }
              }
            }
          }
        }
      }
    }

</style>


