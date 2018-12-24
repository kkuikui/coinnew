<template>
    <div class="recharge">
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h2>{{$t('uc.finance.charge')}}</h2>
                    <div class="line">
                        <div class="line1"></div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="action-inner">
                        <Form ref="formValidate" :label-width="85">                  
                            <FormItem :label="$t('uc.finance.recharge.symbol')" prop="symbol">
                                <Select v-model="coinType" class="itemform" @on-change="changeCoin" size="large">
                                    <Option v-for="item in coinList" :value="item.coin.unit"
                                     :key="item.coin.unit">{{ item.coin.unit }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem :label="$t('uc.finance.recharge.address')" prop="address">
                                <Input v-model="qrcode.value" readonly class="itemform" size="large"></Input>
                                <a v-clipboard:copy="qrcode.value" v-clipboard:success="onCopy"
                                 v-clipboard:error="onError" href="javascript:;" id="copyBtn"
                                 class="link-copy">{{$t('uc.finance.recharge.copy')}}</a>
                                <i class="link-qrcode" @click="showEwm"></i>
                                    <Modal v-model="isShowEwm" class="modallist">
                                      <!--<div v-show="isShowEwm" class="show-qrcode">-->
                                        <p slot="header" class="modal-p">充币地址二维码</p>
                                        <div class="show-qrcode">
                                           <!--<qriously :value="qrcode.coinName+':'+qrcode.value" :size="qrcode.size" />-->
                                            <qriously :value="qrcode.value" :size="qrcode.size" />
                                        </div>
                                        <div slot="footer"></div>
                                    </Modal>
                                </a>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="action-content">
                        <div class="action-body">
                            <p class="acb-p1">{{$t('common.tip')}}</p>
                            <p class="acb-p2">• {{$t('uc.finance.recharge.msg1')}}<br>• {{$t('uc.finance.recharge.msg3')}} {{minRechargeAmount}} {{$t('uc.finance.recharge.msg10')}}<br>• {{$t('uc.finance.recharge.msg4')}}<br>• {{$t('uc.finance.recharge.msg5')}}</p>
                        </div>
                    </div>
                    <div class="action-content">
                        <div class="action-body">
                            <h2 class="acb acb-p1">{{$t('uc.finance.recharge.record')}}</h2>
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsRecharge" :data="tableRecharge" :loading="loading"></Table>
                                <div class="pagelist">
                                    <div class="pageitem">
                                        <Page :total="dataCount" :page-size="pageSize" :current="current" @on-change="changePage"></Page>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

export default {
    components: {
        VueQriously
    },
    data() {
        return {
            isShowEwm: false,
            dataCount: 0,
            current:1,
            pageSize:10,
            loading: true,
               minRechargeAmount: 0,
            qrcode: {
                value: '',
                size: 200,
                coinName:'',
            },
            coinList: [
            ],
            tableRecharge: [],
            allTableRecharge: [],
            unit:""
           
        }
    },
    methods: {
        changePage(index) {
            this.current=index;
            this.getList(index-1, 0, this.unit)
        },
        getCurrentCoinRecharge() {
          if (this.coinType != "") {
            var temp = [];
            for (var i=0;i<this.allTableRecharge.length;i++){
              if (this.allTableRecharge[i].symbol == this.coinType) {
                temp.push(this.allTableRecharge[i]);
              }
            }
            this.tableRecharge = temp;
          }else {
            this.tableRecharge = this.allTableRecharge;
          }
        },
        showEwm() {
            this.isShowEwm = !this.isShowEwm;
        },
        onCopy(e) {
            this.$Message.success(this.$t('uc.finance.recharge.copysuccess') + e.text);
        },
        onError(e) {
            this.$Message.error(this.$t('uc.finance.recharge.copysuccess'));
        },
        changeCoin(value) {
            for (var i = 0; i < this.coinList.length; i++) {
                if ((this.coinList[i].coin.unit == value)) {
                    this.minRechargeAmount = this.coinList[i].coin.minRechargeAmount;
                    this.qrcode.value = this.coinList[i].address;
                    this.qrcode.coinName = this.coinList[i].coin.name.toLowerCase();
                    this.unit= this.coinList[i].coin.unit
                }
            }

            this.getList(0,0, this.unit)
            // this.getCurrentCoinRecharge();
        },
        getMoney() {
            //获取
            this.$http.post(this.host + this.api.uc.wallet).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    for (let i = 0; i < resp.data.length; i++) {
                        var coin = resp.data[i];
                        if(coin.coin.canRecharge == 1){
                            this.coinList.push(coin);
                        }
                    }
                    this.changeCoin(this.coinType)
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getList(pageNo, type,unit) {
            //获取tableRecharge
            let params = {}
            params['pageNo'] = pageNo
            params['pageSize'] = this.pageSize
            params['type'] = type;

            

            if(unit!=undefined && unit!=''){
                 params['unit'] = unit;
            }

            this.$http.post(this.host + '/uc/asset/transaction', params).then(response => {
                var resp = response.body;
                if (resp.content) {
                    this.allTableRecharge = resp.content;
                    // this.getCurrentCoinRecharge();
                    this.tableRecharge = resp.content
                    this.dataCount = resp.totalElements
                    this.loading = false
                }else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getMember() {
          let self = this
          this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              if (resp.data.realName == null || resp.data.realName == "") {
                this.$Message.success(this.$t('otc.publishad.submittip1'));
                self.$router.push('/uc/safe');
              } else if (resp.data.phoneVerified == 0) {
                this.$Message.success(this.$t('otc.publishad.submittip2'));
                self.$router.push('/uc/safe');
              } else if (resp.data.fundsVerified == 0) {
                this.$Message.success(this.$t('otc.publishad.submittip3'));
                self.$router.push('/uc/safe');
              }
            } else {
              this.$Message.error(resp.message);
            }
          })
        },
    },
    created() {
        this.coinType = this.$route.query.name || "";
        this.getMember();
        this.getMoney();
        this.getList(0, 0);
    },
    computed: {
        tableColumnsRecharge() {
            let columns = [];
            columns.push({
                title: this.$t('uc.finance.recharge.time'),
                key: 'createTime',
                align:'center',
            });
            columns.push({
                title: this.$t('uc.finance.recharge.symbol'),
                key: 'symbol',
                 align:'center',
            });
            columns.push({
                title: this.$t('uc.finance.recharge.address'),
                key: 'address',
                 align:'center',
            });
            columns.push({
                title: this.$t('uc.finance.recharge.amount'),
                key: 'amount',
                 align:'center',
            });
            return columns;
        }
    }
}
</script>
<style scoped lang="less">
@import '../../styles/common.less';
	.recharge{
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
                width: 5%;
                height: 2px;
                background: @baseColor;
              }
            }
          }
          .form-group {
            margin-bottom: 20px;
            padding: 23px 20px 20px;
            .action-inner {
              height: 200px;
              margin-right: 10px;
              border-bottom: 1px solid #eee;
              .itemform {
                width: 400px;
              }
              .link-copy {
                font-size: 14px;
                margin-left: 20px;
              }
              .link-qrcode {
                height: 30px;
                cursor: pointer;
                margin-bottom: 5px;
                margin-left: 20px;
                vertical-align: middle;
                &:before {
                  background-size: 100% 100%;
                  width: 30px;
                  height: 30px;
                  display: inline-block;
                  content: '';
                  background-image: url(../../assets/img/qrcd.png);
                }
              }
            }
            .action-content {
              margin-top: 30px;
              .action-body{
                color: #B4B4B4;
                .acb-p1{
                  font-size: 18px;
                  font-weight: 600;
                  line-height: 50px;
                }
                .acb-p2{
                  font-size: 14px;
                  line-height: 24px;
                }
                .abc{
                  color: #000;
                }
                .order-table {
                  .pagelist {
                    overflow: hidden;
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
    }
    .modallist{
        text-align: center;
    }

</style>
