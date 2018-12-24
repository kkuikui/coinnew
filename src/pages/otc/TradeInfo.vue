<template>
    <div class="tradeinfo">
        <div class="wrapper">
            <div class="container">
                <div class="user-info">
                    <div class="avatar-box">
                        <div class="user-avatar-public">
                            <img v-if="user.avatar != null && user.avatar != ''"
                             :src="user.avatar" class="user-face">
                            <span v-else class="user-avatar-in">{{usernameS}}</span>
                        </div>
                        <div class="user-m">
                            <div class="user-person">
                                <span class="ml10">{{user.username}}</span>
                                <i class="identify"></i>
                                <i v-show="alipaymode" class="alipay iconfont"></i>
                                <i v-show="wechatpaymdoe" class="wechatpay iconfont"></i>
                                <i v-show="bankpaymode" class="bankpay iconfont"></i>
                            </div>
                            <div class="location">
                                <label>{{$t('otc.tradeinfo.location')}}：</label>
                                <span>{{$t('otc.tradeinfo.location_text')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="trade-right-box">
                        <p>
                            <label class="label-trade">{{$t('otc.tradeinfo.price')}}</label>
                            <span class="trade-price trade-span">{{user.price}} CNY / {{user.unit}}</span>
                            <label class="label-trade">{{$t('otc.tradeinfo.num')}}</label>
                            <span class="trade-span">{{user.number}}&nbsp;{{user.unit}}</span>
                        </p>
                        <p>
                            <label class="label-trade">{{$t('otc.tradeinfo.exchangelimitamount')}}</label>
                            <span class="trade-span">{{user.minLimit}} - {{user.maxLimit}} CNY</span>
                            <label class="label-trade">{{$t('otc.tradeinfo.exchangeperiod')}}</label>
                            <span class="trade-span">{{user.timeLimit}}{{$t('otc.tradeinfo.minute')}}</span>
                        </p>
                    </div>
                </div>
                <div class="trade-operation">
                    <div class="trade-price-input">
                        <p class="price-input-list">
                            <Poptip trigger="focus" :content="text1" class="poptip">
                                <Input @on-change="transform1" v-model="buyPrice" class="inputstyle"
                                 size="large" :placeholder="$t('otc.tradeinfo.amounttip')">
                                    <span slot="prepend">CNY</span>
                                </Input>
                            </Poptip>
                        </p>
                        <span class="exchange1">
                            <Icon type="arrow-swap"></Icon>
                        </span>
                        <p class="price-input-list">
                            <Poptip trigger="focus" :content="text2" class="poptip">
                                <Input @on-change="transform2" v-model="nuyNum" class="inputstyle"
                                 size="large" :placeholder="$t('otc.tradeinfo.numtip')">
                                    <span slot="prepend">{{user.unit}}</span>
                                </Input>
                            </Poptip>
                        </p>
                    </div>
                    <textarea v-model="remark" type="text" 
                    :placeholder="$t('otc.tradeinfo.remarktip')" class="text-inputs"></textarea>
                    <div class="price-box">
                        <p class="show-price">
                            <em>{{type}}:</em>
                            <span>&nbsp;&nbsp;{{buyPrice}} CNY / {{nuyNum}} {{user.unit}}</span>
                        </p>
                        <button class="btn-trade-in" @click="submit" :disabled="btnDisabled">{{btnType}}</button>
                    </div>
                </div>
                <div class="trade-remark">
                    <h5 class="titles">
                        <span>{{$t('otc.tradeinfo.remarktitle')}}</span>
                    </h5>
                    <p class="content">{{user.remark}}</p>
                    <h5 class="titles">
                        <span>{{$t('otc.tradeinfo.exchangetitle')}}</span>
                    </h5>
                    <div class="content">
                        <p>{{$t('otc.tradeinfo.exchange_tip1')}}</p>
                        <p>{{$t('otc.tradeinfo.exchange_tip2')}}</p>
                        <p>{{$t('otc.tradeinfo.exchange_tip3')}}</p>
                        <p>{{$t('otc.tradeinfo.exchange_tip4')}}</p>
                        <p>{{$t('otc.tradeinfo.exchange_tip5')}}</p>
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
            usernameS: '',
            text1: '',
            text2: '',
            btnDisabled: false,
            submitBtn: false,
            btnType: '',
            type: '',
            remark: '',
            user: {},
            // price: '',
            buyPrice: '',
            nuyNum: 0,
            minLimit: 100,
            maxLimit: 1000,
            // number:0.6,
            advertiseType: 1,
            alipaymode: false,
            wechatpaymdoe: false,
            bankpaymode: false,
            mode:0,
        }
    },
    methods: {
        update() {
            // this.price = '100';
            // this.user.advertiseType=1
        },
        transform1() {
            this.mode = 1;
            if (!Number.isNaN(Number(this.buyPrice))) {
                this.nuyNum = this.round(this.div(this.buyPrice, this.priceNow), 8)
                if (/^\d+(\.\d{1,2})?$/.test(this.buyPrice)) {
                    this.submitBtn = true
                } else {
                    this.submitBtn = false
                    this.text1 = this.$t('otc.tradeinfo.warning1');
                }
            } else {
                this.text1 = this.$t('otc.tradeinfo.warning2') + this.user.minLimit + '~' + this.user.maxLimit
                this.submitBtn = false
                return false
            }
        },
        transform2() {
            this.mode = 1;
            if (!Number.isNaN(Number(this.nuyNum))) {
                this.buyPrice = this.round(this.mul(this.nuyNum, this.priceNow), 2)
                if (this.nuyNum < this.user.number) {
                    if (/^\d+(\.\d{1,8})?$/.test(this.nuyNum)) {
                        this.submitBtn = true
                    } else {
                        this.submitBtn = false
                        this.text2 = this.$t('otc.tradeinfo.warning3');
                    }
                } else {
                    this.submitBtn = false
                    return false
                }

            } else {
                this.text2 = this.$t('otc.tradeinfo.warning4') + this.minNum + '~' + this.user.number
                this.submitBtn = false
                return false
            }
        },
        getIdAdv() {
            //获取id广告信息
            this.$http.post(this.host + '/otc/order/pre', { 'id': this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.user = resp.data
                    this.text1 = this.$t('otc.tradeinfo.warning2') + this.user.minLimit + '~' + this.user.maxLimit
                    // this.minNum = (this.user.minLimit/this.user.price).toFixed(8);
                    this.text2 = this.$t('otc.tradeinfo.warning4') + this.minNum + '~' + this.user.number
                    // console.log(this.user)
                    if (this.user.advertiseType == 1) {
                        this.btnType = this.$t('otc.tradeinfo.confirmbuyin');
                        this.type = this.$t('otc.tradeinfo.buyin');
                    } else if (this.user.advertiseType == 0) {
                        this.btnType = this.$t('otc.tradeinfo.confirmsellout');
                        this.type = this.$t('otc.tradeinfo.sellout');
                    }
                    this.usernameS = (this.user.username + '').replace(/^\s+|\s+$/g, "").slice(0, 1)
                    this.paymodelist(this.user.payMode)
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        paymodelist(paymode) {
            var paymodelist = paymode.split(',')
            for (var i=0; i < paymodelist.length; i++){
                if(paymodelist[i]==='支付宝') {
                    this.alipaymode = true
                }
                if(paymodelist[i] === '微信') {
                    this.wechatpaymdoe = true
                }
                if (paymodelist[i] === '银联'){
                    this.bankpaymode = true
                }
            }
        },
        submit() {
            let self=this;
            if (this.submitBtn) {
                self.btnDisabled = true;
                if (this.user.advertiseType == 1) {
                    let param = {}
                    param['id'] = this.$route.query.tradeId
                    param['coinId'] = this.user.otcCoinId
                    param['price'] = this.user.price
                    param['money'] = this.buyPrice
                    param['amount'] = this.nuyNum
                    param['remark'] = this.nuyNum
                    param['mode'] = this.mode
                    this.$http.post(this.host + '/otc/order/buy', param).then(response => {
                      
                        var resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.success(resp.message);
                            setTimeout(() => {
                              
                                self.$router.push('/chat?tradeId=' + resp.data);
                            }, 2000)
                        } else {
                            this.$Message.error(resp.message);
                            self.btnDisabled = false;
                        }
                    })

                } else if (this.user.advertiseType == 0) {
                    let param = {}
                    param['id'] = this.$route.query.tradeId
                    param['coinId'] = this.user.otcCoinId
                    param['price'] = this.user.price
                    param['money'] = this.buyPrice
                    param['amount'] = this.nuyNum
                    param['remark'] = this.nuyNum
                    param['mode'] = this.mode
                    this.$http.post(this.host + '/otc/order/sell', param).then(response => {
                     
                        var resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.success(resp.message);
                            setTimeout(() => {
                                 self.btnDisabled = false;
                                self.$router.push('/chat?tradeId=' + resp.data);
                            }, 2000)
                        } else {
                            this.$Message.error(resp.message);
                            self.btnDisabled = false;
                        }
                    })
                }
            } else {
                this.$Message.error(this.$t('otc.tradeinfo.warning5'));
            }

        },
        mul(a, b) {
            var c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) { }
            try {
                c += e.split(".")[1].length;
            } catch (f) { }
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        },
        div(a, b) {
            var c, d, e = 0,
                f = 0;
            try {
                e = a.toString().split(".")[1].length;
            } catch (g) { }
            try {
                f = b.toString().split(".")[1].length;
            } catch (g) { }
            return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
        },
        round(v, e) {
            var t = 1;
            for (; e > 0; t *= 10, e--);
            for (; e < 0; t /= 10, e++);
            return Math.round(v * t) / t;
        },
    },
    created() {
        // console.log(this.$route.query)
        // console.log(this.div(121.03, 121.03) + '--00--')
        // this.update()
        this.getIdAdv()


    },
    computed: {
        priceNow: function() {
            return (this.user.price + '').replace(/,/g, '').replace(/[^\d|.]/g, '') - 0;
        },
        minNum: function() {
            return (this.user.minLimit / this.priceNow).toFixed(8);
        },
        maxNum: function() {
            return this.user.maxLimit / this.priceNow
        }
    }
}
</script>

<style scoped lang="less">
@import '../../styles/common.less';
	.tradeinfo{
      padding: 20px 0;
      background-color: #eee;
      min-height: 750px;    
	  .wrapper{
		.container{
          text-align: left;
          padding:30px 50px;
          width:1200px;
          margin:0 auto;
          background: #fff;
          .user-info{
            height: 60px;
            margin-bottom: 20px;
            .avatar-box{
              float: left;
              height: 60px;
              line-height: 30px;
              .user-avatar-public{
                vertical-align: middle;
                margin-top: 6px;
                .user-face{
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                }
                .user-avatar-in{
                }
              }
              .user-m{
                float: right;
                margin-left: 10px;
                width: 400px;
                height: 60px;
                .user-person{
                  height: 30px;
                  line-height: 30px;
                  .ml10{
                    height: 30px;
                    font-size: 14px;
                    display: inline-block;
                  }
                  .identify{
                    height: 20px;
                    margin-bottom: 3px;
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
                  .iconfont{
                    margin-left: 5px;
                    height: 20px;
                    margin-bottom: 5px;
                    vertical-align: middle;
                    &:before {
                      background-size: 100% 100%;
                      width: 20px;
                      height: 20px;
                      display: inline-block;
                      content: '';
                    }
                    &.alipay{
                      &:before {
                        background-image: url('../../assets/img/alipay.png');
                      }
                    }
                    &.wechatpay{
                      &:before {
                        background-image: url('../../assets/img/wechat.png');
                      }
                    }
                    &.bankpay{
                      &:before {
                        background-image: url('../../assets/img/bankcard.png');
                      }
                    }
                  }
                }
                .location{
                  height: 30px;
                }
              }
              
            }
            .trade-right-box{
              color: #0d214e;
              float: right;
              margin-left: 20px;
              font-size: 14px;
              p{
                line-height: 1.6;
                .label-trade{
                  margin-left: 40px;
                }
                .trade-span{
                  margin-left: 20px;
                  &.trade-price{
                    color: #5BBE7B;
                    font-weight: 550;
                  }
                }
              }
            }
          }
          .trade-operation{
            padding: 20px;
            margin-bottom: 20px;
            .trade-price-input{
              margin: 0 auto;
              display: flex;
              padding: 20px 0;
              .price-input-list{
                display: inline-block;
                .poptip{
                  .inputstyle{
                    width: 500px;
                  }
                }
              }
              .exchange1{
                width: 10%;
                text-align: center;
                font-size: 24px;
                display: inline-block;  
              }
            }
            .text-inputs{
              height: 100px;
              width: 100%;
              resize: none;
              padding: 20px;
              font-size: 14px;
              border-radius: 4px;
              margin-bottom: 20px;
              border: 1px solid #c5cdd7;
            }
            .price-box{
              display: flex;
              vertical-align: middle;
              .show-price{
                border: 1px solid #c5cdd7;
                width: 80%;
                height: 58px;
                line-height: 58px;

                em {
                  font-style: normal;
                  color: #000;
                  font-size: 16px;
                  color: #0d214e;
                  padding-left:5px;
                }
                span {
                  font-size: 18px;
                  color: #ee6543;
                  font-weight: bolder;
                }
              }
              .btn-trade-in{
                color: white;
                padding: 14px 20px;
                background-color: #234dd8;
                cursor: pointer;
                width: 20%;
                text-align: center;
                font-size: 20px;
              }
            }
          }
          .trade-remark{
            margin-bottom: 30px;
            padding: 20px;
            .titles {
              margin-bottom: 15px;
              span {
                font-size: 16px;
                color: #0d214e;
              }
            }
            .content{
              margin-bottom: 30px;
              font-size: 14px;
              color: #8994a3;
              line-height: 1.8;
            }
          }
        }
      }
    }

</style>


