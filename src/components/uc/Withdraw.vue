<template>
    <div class="withdraw">
        <div class="wrapper">
            <div class="container">
                <div class="advtop">
                    <p class="header">{{$t('uc.finance.pickup')}}</p>
                    <div class="linktoad">
                        <router-link to="/finance/withdraw/address">{{$t('uc.finance.withdraw.addressmanager')}}</router-link>
                    </div>
                </div>
                <div class="line">
                    <div class="line1"></div>
                </div>
                <div class="form-group">
                    <Row class="action-inner">
                        <Form ref="formValidate" :label-width="85">                                          
                            <FormItem :label="$t('uc.finance.withdraw.symbol')" prop="symbol">
                                <Select v-model="coinType" class="itemform" @on-change="getAddrList" size="large" >
                                    <Option v-for="item in coinList" :value="item.unit" :key="item.unit">{{ item.unit }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem :label="$t('uc.finance.withdraw.address')" prop="address">                            
                                <Select v-model="withdrawAdress" class="itemform" size="large"  ref='selectStore' clearable >
                                    <Option v-for="item in currentCoin.addresses" :value="item.address"
                                    :key="item.address">{{ item.remark +'('+ item.address+')' }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem :label="$t('uc.finance.withdraw.num')" prop="num">                     
                                <Poptip trigger="focus" 
                                 :content="$t('uc.finance.withdraw.tip1')+currentCoin.withdrawScale+$t('uc.finance.withdraw.tip11')+currentCoin.minAmount+' ,'+$t('uc.finance.withdraw.tip2')+currentCoin.maxAmount" style="width: 100%;">
                                    <InputNumber @on-change="computerAmount" :precision="currentCoin.withdrawScale" class="itemform"
                                     v-model="withdrawAmount" :placeholder="$t('uc.finance.withdraw.numtip1')"
                                      size="large"></InputNumber>
                                    <span class="unitcode">{{currentCoin.unit}}</span>
                                </Poptip>
                                <p class="itemform">
                                    <span class="avanum">【{{$t('uc.finance.withdraw.avabalance')}}】：
                                        <span class="label-pointer" id="valueAvailable">{{currentCoin.balance}}</span>
                                    </span>
                                    <span v-if="currentCoin.enableAutoWithdraw == 0">
                                        【{{$t('common.tip')}}】：{{$t('uc.finance.withdraw.msg1')}} {{currentCoin.threshold}} {{$t('uc.finance.withdraw.msg2')}}
                                    </span>
                                    <span>
                                        <a href="javascript:;" id="levelUp" style="display: none;">{{$t('uc.finance.withdraw.increase')}}</a>
                                    </span>
                                </p>
                            </FormItem>
                            <FormItem :label="$t('uc.finance.withdraw.fee')" prop="fee">                     
                                <!--<Poptip v-else trigger="focus" :content="$t('uc.finance.withdraw.tip1')+currentCoin.minTxFee+$t('uc.finance.withdraw.tip1')+currentCoin.maxTxFee" style="width: 100%;">-->
                                <InputNumber class="itemform" readonly v-model="withdrawFee"
                                 :min="currentCoin.minTxFee" :max="currentCoin.maxTxFee" size="large"></InputNumber>
                                <span class="unitcode">{{currentCoin.unit}}</span>
                                <!--</Poptip>-->
                                <div class="slider-span">
                                    <!-- <Slider v-if="currentCoin.maxTxFee > currentCoin.minTxFee" class="slideritem"
                                     v-model="withdrawFee" :step="(currentCoin.maxTxFee - currentCoin.minTxFee)/10"
                                    :max="currentCoin.maxTxFee" :min="currentCoin.minTxFee"></Slider> -->
                                    <!-- <span class="spanitem">
                                       【{{$t('uc.finance.withdraw.range')}}】：{{currentCoin.minTxFee}} - {{currentCoin.maxTxFee}}
                                    </span> -->
                                </div>
                            </FormItem>
                            <FormItem :label="$t('uc.finance.withdraw.arriamount')" prop="arriamount">                     
                                <InputNumber readonly v-model="withdrawOutAmount" class="itemform"
                                 :placeholder="$t('uc.finance.withdraw.arriamount')" size="large"></InputNumber>
                                <span class="unitcode">{{currentCoin.unit}}</span>
                            </FormItem>
                            <div class="action-foot">
                                <div class="buttonapply" @click="apply">{{$t('uc.finance.withdraw.pickup')}}</div>
                            </div>
                        </Form>
                    </Row>
                    <div class="action-content">
                        <div class="action-body">
                            <p class="acb-p1">{{$t('common.tip')}}</p>
                            <p class="acb-p2">• {{$t('uc.finance.withdraw.msg3')}}：{{currentCoin.minAmount}}{{$t('uc.finance.withdraw.msg4')}}。<br>• {{$t('uc.finance.withdraw.msg5')}}<br>• {{$t('uc.finance.withdraw.msg6')}} </p>
                        </div>
                    </div>
                    <div class="action-content">
                        <div class="action-body">
                            <p class="acb-p1 abc">{{$t('uc.finance.withdraw.record')}}</p>
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsWithdraw" :data="tableWithdraw" :loading="loading"></Table>
                                <div class="pagelist">
                                    <div class="pageitem">
                                        <Page :total="transaction.total" v-if="transaction.total > 0"
                                         :current="transaction.page" @on-change="changePage"></Page>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="modal" :title="$t('otc.chat.tip')" @on-ok="ok" class="modal1">
            <p class="modal-p">
             {{$t('uc.finance.withdraw.fundpwdtip')}}<br/>
                <Input type="password" v-model="fundpwd" :placeholder="$t('otc.chat.msg7')"></Input>
            </p>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      fundpwd: "",
      currentCoin: {},
      transaction: {
        page: 1,
        pageSize: 10,
        total: 100
      },
      loading: true,
      withdrawAdress: "",
      withdrawAmount: 0,
      withdrawFee: 0,
      withdrawOutAmount: 0,
      coinType: "",
      coinList: [],
      tableWithdraw: [],
      allTableWithdraw: [],
      isClick:false,
      clickIs:true,

    };
  },
  watch: {
    currentCoin: function() {
    //   this.withdrawFee = this.currentCoin.minTxFee + (this.currentCoin.maxTxFee - this.currentCoin.minTxFee) / 2;
    }
  },
  methods: {
    changePage(index) {
        if( this.isClick){
            // this.transaction.page=index-1;
            this.getList(index ,this.currentCoin.unit);
        }else{
            this.getList(index);
        }
        
      
    },
    getCurrentCoinRecharge() {
      if (this.coinType != "") {
        var temp = [];
        for (var i = 0; i < this.allTableWithdraw.length; i++) {
          if (this.allTableWithdraw[i].coin.unit == this.coinType) {
            temp.push(this.allTableWithdraw[i]);
          }
        }
        this.tableWithdraw = temp;
      } else {
        this.tableWithdraw = this.allTableWithdraw;
      }
    },
    ok() {
        if(this.clickIs){
            //  if (this.withdrawAdress == "") {
            //     this.$Message.error(this.$t("otc.chat.msg7tip"));
            //     return;
            // }
            if (this.fundpwd == "") {
                this.$Message.error(this.$t("otc.chat.msg7tip"));
                return;
            }
            this.clickIs=false;
            let params = {};
            params["unit"] = this.currentCoin.unit;
            params["address"] = this.withdrawAdress;
            params["amount"] = this.withdrawAmount;
            params["fee"] = this.withdrawFee;
            params["jyPassword"] = this.fundpwd;

        
            this.$http
                .post(this.host + "/uc/withdraw/apply", params)
                .then(response => {
                this.fundpwd = "";
                var resp = response.body;
                if (resp.code == 0) {
                    
                    this.getList(1,this.currentCoin.unit);
                    this.withdrawAmount = 0;
                    this.withdrawAdress='';
            
                    this.currentCoin.withdrawFee='';
                    this.withdrawOutAmount=0;
                    this.fundpwd='';
                    this.$Message.success(resp.message);
                    this.clickIs=true;
                
                } else {
                    
                    this.$Message.error(resp.message);
                    this.clickIs=true;
                }
            });
        } 
    
    },
    getAddrList() {
      //获取地址
      this.withdrawAdress = "";
      this.$http
        .post(this.host + "/uc/withdraw/support/coin/info")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0 && resp.data.length > 0) {
            this.coinList = resp.data;
          
            if (this.coinType) {
              for (let i = 0; i < resp.data.length; i++) {
                if (this.coinType == resp.data[i].unit) {
                    this.currentCoin = resp.data[i];
                    this.withdrawFee=this.currentCoin.maxTxFee;
                    this.$refs.selectStore.clearSingleSelect();
                    this.withdrawAmount=0;
                    this.withdrawOutAmount= 0;
                    this.transaction.page=0
                    this.transaction.total=0
                 
                  
                  break;
                }
              }
            } else {
                this.currentCoin = this.coinList[0];
                this.coinType = this.currentCoin.unit;
               this.withdrawFee=this.currentCoin.maxTxFee;
            }
          } else {
            // this.$Message.error(resp.message);
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: this.$t("uc.finance.withdraw.tipaddress")
            });
          }
        });
   
        if(this.currentCoin.unit!=undefined){
            this.isClick=true;
            this.getList(1,this.coinType)
            
        }else{
            this.getList(1,this.coinType)
        }
      
    },
    getList(pageNo,unit) {
      //获取tableWithdraw
      let params = {};
      params["pageNo"] = pageNo;
      params["pageSize"] = this.transaction.pageSize;
      
      if( unit!='' &&  unit!=undefined){
         params["unit"] = unit
      }
      this.$http
        .post(this.host + "/uc/withdraw/record", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.allTableWithdraw = resp.data.content;
            // this.getCurrentCoinRecharge();
            this.tableWithdraw = resp.data.content;
            this.transaction.total = resp.data.totalElements;
            this.transaction.page = resp.data.number+1;
            this.loading = false;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    accSub(arg1, arg2) {
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      //last modify by deeka
      //动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    round(v, e) {
      var t = 1;
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t;
    },
    computerAmount() {
      this.withdrawOutAmount = this.round(
        this.accSub(this.withdrawAmount, this.withdrawFee),
        this.currentCoin.withdrawScale
      );
    },
    computerAmount2() {
      this.withdrawAmount =
        (this.withdrawAmount + "").replace(/([0-9]+\.[0-9]{6})[0-9]*/, "$1") -
        0;
      this.withdrawOutAmount = this.round(
        this.accSub(this.withdrawAmount, this.withdrawFee),
        this.currentCoin.withdrawScale
      );
    },
    valid() {
      if (this.coinType == "") {
        this.$Message.error(this.$t("uc.finance.withdraw.symboltip"));
        return false;
      } else if (this.withdrawAdress == "") {
        this.$Message.error(this.$t("uc.finance.withdraw.addresstip"));
        return false;
      } else if (
        this.withdrawAmount == "" ||
        this.withdrawAmount == 0 ||
        this.withdrawAmount - 0 < this.minAmount
      ) {
        this.$Message.error(
          this.$t("uc.finance.withdraw.numtip2") + this.currentCoin.minAmount
        );
        return false;
      } else if (this.withdrawAmount - 0 < this.withdrawFee) {
        this.$Message.error(this.$t("uc.finance.withdraw.numtip3"));
        return false;
    //   } else if ( this.withdrawFee == "" || this.withdrawFee == 0 ||  this.withdrawFee - 0 > this.currentCoin.maxTxFee || this.withdrawFee - 0 < this.currentCoin.minTxFee ) {
    //     this.$Message.error(
    //       this.$t("uc.finance.withdraw.feetip1") +
    //         this.currentCoin.minTxFee +
    //         " , " +
    //         this.$t("uc.finance.withdraw.feetip2") +
    //         this.currentCoin.maxTxFee
    //     );
    //     return false;
      } else {
        return true;
      }
    },
    apply() {
      if (this.valid()) {
        this.modal = true;
        return;
      }
    }
  },
  created() {
    this.coinType = this.$route.query.name || "";
    this.getAddrList();
    // this.getList(0,this.currentCoin.unit);
  },
  computed: {
    tableColumnsWithdraw() {
      let columns = [];
      columns.push({
        title: this.$t("uc.finance.withdraw.transactionNumber"),
        width: 100,
        align:'center',
        key: "id"
      });

      columns.push({
        title: this.$t("uc.finance.withdraw.time"),
        width: 180,
         align:'center',
        key: "createTime"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.symbol"),
        key: "symbol",
         align:'center',
        render: function(h, params) {
          return h("span", params.row.coin.unit);
        }
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.address"),
        key: "address",
        width: 100,
         align:'center',
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.num"),
        key: "totalAmount",
         align:'center',
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.fee"),
        key: "fee",
         align:'center',
      });
      columns.push({
        title: 'TxHash',
         align:'center',
        
        key: "transactionNumber"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.status"),
        key: "status",
         align:'center',
        render: (h, params) => {
          let text = "";
          if (params.row.status == 0) {
            text = this.$t("uc.finance.withdraw.status_1");
          } else if (params.row.status == 1) {
            text = this.$t("uc.finance.withdraw.status_2");
          } else if (params.row.status == 2) {
            text = this.$t("uc.finance.withdraw.status_3");
          } else if (params.row.status == 3) {
            text = this.$t("uc.finance.withdraw.status_4");
          } else if (params.row.status == 4) {
            text = this.$t("uc.finance.withdraw.status_5");
          }
          return h("div", [h("p", text)]);
        }
      });
        columns.push({
            title: this.$t('uc.extension.remark'),
            key: 'errorMsg',
        });
      return columns;
    }
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
</style>

<style scoped lang="less">
@import "../../styles/common.less";
.withdraw {
  overflow: hidden;
  .wrapper {
    .container {
      text-align: left;
      padding: 20px 20px;
      .advtop {
        color: @baseColor;
        font-size: 14px;
        height: 30px;
        margin-left: 8px;
        margin-bottom: 5px;
        .header {
          float: left;
          font-size: 18px;
          font-weight: 500;
        }
        .linktoad {
          float: right;
          a {
            color: @baseColor;
          }
        }
      }
      .line {
        width: 100%;
        background: #eee;
        margin-bottom: 20px;
        .line1 {
          width: 5%;
          height: 2px;
          background: @baseColor;
        }
      }
      .form-group {
        margin-bottom: 20px;
        padding: 23px 20px 20px;
        .action-inner {
          width: 700px;
          margin: 0 auto;
          .itemform {
            width: 500px;
            .avanum {
              color: #b4b4b4;
            }
          }
          .unitcode {
            color: #000;
            font-size: 14px;
          }
          .slider-span {
            width: 500px;
            .slideritem {
              width: 300px;
              float: left;
            }
            .spanitem {
              float: right;
              color: #b4b4b4;
            }
          }
          .action-foot {
            text-align: center;
            padding: 40px 170px 0;
            .buttonapply {
              height: 40px;
              width: 400px;
              line-height: 40px;
              cursor: pointer;
              border-radius: 3px;
              background: @avatarColor;
              color: #fff;
            }
          }
        }
        .action-content {
          margin-top: 30px;
          .action-body {
            color: #b4b4b4;
            .acb-p1 {
              font-size: 18px;
              font-weight: 600;
              line-height: 50px;
            }
            .acb-p2 {
              font-size: 14px;
              line-height: 24px;
            }
            .abc {
              color: #000;
            }
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
}

.modal1 {
  .modal-p {
    color: red;
    font-weight: bold;
  }
}
</style>
