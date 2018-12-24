<template>
    <div class="moneyindex">
        <div class="wrapper">
        <div class="container">
            <div class="header">
                <h2>{{$t('uc.finance.personalassets')}}</h2>
                <div class="line">
                  <div class="line1"></div>
                </div>
            </div>
            <div class="order-table">
                <Table stripe :columns="tableColumnsMoney" :data="tableMoney" :loading="loading"></Table>
            </div>
        </div>
        </div>
        <Modal v-model="modal" :title="$t('uc.finance.money.match')" @on-ok="matchGCC" class="modal1">
          <p class="modal1-p">{{$t('uc.finance.money.matchtip1')}}：{{GCCMatchAmount}}</p>
          <p>
            <span>{{$t('uc.finance.money.matchtip2')}}：</span>
            <InputNumber class="modal1-input" type="text"
             v-model="matchAmount" :placeholder="$t('uc.finance.money.matchtip2')">
            </InputNumber>
          </p>
        </Modal>
        <Modal v-model="modal_msg" :title="$t('uc.finance.money.match')" class="modal2">
            <p>{{match_msg}}</p>
        </Modal>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            GCCMatchAmount:0,
            matchAmount:0,
            modal:false,
            loginmsg:this.$t('common.logintip'),
            loading: true,
            ordKeyword: '',
            tableMoney: [],
            canMatch:true,
            modal_msg:false,
            match_msg:''
        }
    },
    methods: {
        getMoney() {
            //获取
            this.$http.post(this.host + '/uc/asset/wallet').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableMoney = resp.data;
                    for (let i = 0; i < this.tableMoney.length; i++) {
                        this.tableMoney[i]['coinType'] = this.tableMoney[i].coin.unit
                    }
                    this.loading = false
                } else {
                    // this.$Message.error(resp.message);
                    //  this.$Message.info(this.$t('common.logintip'));
                  this.$Message.error(this.loginmsg);
                }
            })
        },
        getGCCMatchAmount() {
            //获取
            this.$http.post(this.host + '/uc/asset/wallet/match-check').then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.canMatch = true;
                this.GCCMatchAmount = resp.data;
              } else {
                this.canMatch = false;
                this.match_msg = resp.message;
                // this.$Message.error(this.loginmsg);
              }
              this.showMatchDailog();
            })
        },
        showMatchDailog() {
          if (this.canMatch)
            this.modal = true;
          else
            this.modal_msg = true;
        },
        matchGCC(){
            if (this.matchAmount <= 0) {
              this.$Message.warning(this.$t('uc.finance.money.matcherr1'));
            }else if(this.matchAmount > this.GCCMatchAmount) {
              this.$Message.warning(this.$t('uc.finance.money.matcherr2'));
            }else {
              //配对
              let params = {};
              params["amount"] = this.matchAmount;
              this.$http.post(this.host + '/uc/asset/wallet/match',params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(this.$t('uc.finance.money.matchsuccess'));
                  this.GCCMatchAmount = this.GCCMatchAmount - this.matchAmount;
                } else {
                  this.$Message.error(resp.message);
                }
              })
            }
        },
        resetAddress(unit){
            let params = {};
            params["unit"] = unit;
            this.$http.post(this.host + '/uc/asset/wallet/reset-address',params).then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(this.$t('uc.finance.money.resetsuccess'));
                setTimeout(function () {
                  window.location.reload();
                },3000);
              } else {
                this.$Message.error(resp.message);
              }
            })
        }
    },
    created() {
        this.getMoney();
        //this.getGCCMatchAmount();
    },
    computed: {
        tableColumnsMoney() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t('uc.finance.money.cointype'),
                key: 'coinType',
            });
            columns.push({
                title: this.$t('uc.finance.money.balance'),
                key: 'balance',
            });
            columns.push({
                title: this.$t('uc.finance.money.frozen'),
                key: 'frozenBalance',
            });
            columns.push({
                title: this.$t('uc.finance.money.operate'),
                key: 'operate',
                width: 300,
                render: function(h, params) {
                    var actions = [];
                    if(params.row.coin.canRecharge == 1){
                      if (params.row.address != null && params.row.address != "") {
                        actions.push(h('button', {
                                attrs: {
                                    class: 'button2'
                                },
                                on: {
                                    click: function() {
                                        self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                                    }
                                },
                                style: {
                                    marginRight: '8px',
                                },
                            }, self.$t('uc.finance.money.charge')));
                      }else {
                        actions.push(h('button', {
                          attrs: {
                            class: 'button1'
                          },
                          on: {
                            click: function() {
                              self.resetAddress(params.row.coin.unit)
                            }
                          },
                          style: {
                            marginRight: '8px',
                          },
                        }, self.$t('uc.finance.money.getaddress')));
                      }
                    }
                    if(params.row.coin.canWithdraw == 1){
                        actions.push(h('button', {
                                attrs: {
                                    class: 'button3'
                                },
                                on: {
                                    click: function() {
                                        self.$router.push('/finance/withdraw?name=' + params.row.coin.unit);
                                    }
                                },
                                style: {
                                    marginRight: '8px',
                                },
                            }, self.$t('uc.finance.money.pickup')));
                    }
                    if (params.row.coin.unit.toUpperCase() == "GCC") {
                        actions.push(h('Button', {
                          props: {
                            type: 'success',
                            size: 'small'
                          },
                          on: {
                            click: function() {
                              // self.showMatchDailog(params.row);
                              self.getGCCMatchAmount();
                              // self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                            }
                          },
                          style: {
                            marginRight: '8px',
                          },
                        }, self.$t('uc.finance.money.match')));
                    }
                    return h('p',actions);
                }
            });
            return columns;
        }
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
        width: 70px;
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
	.moneyindex{
      overflow: hidden;
	  .wrapper{
		.container{
            text-align: left;
            padding: 20px 20px;
            .header{
              margin-bottom: 20px;
			  h2{
                font-size: 18px;
                margin-left: 8px;
                margin-bottom: 5px;
                color: @baseColor;
                font-weight: 500;
              }
              .line {
                width: 100%;
                background: #eee;
                .line1 {
                  width: 8%;
                  height: 2px;
                  background: @baseColor;
                }
              }
            }
            .order-table {}
        }
      }
    }
    .modal1 {
      p{
        &.modal1-p{
          font-weight: bold;
          padding: 10px 0;
        }
        &.modal1-input{
          width: 150px;
        }
      }
    }
</style>
