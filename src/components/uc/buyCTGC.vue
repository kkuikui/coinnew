<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record">
                <section class="trade-group merchant-top">
                    <i class="merchant-icon tips"></i>
                    <span class="tips-word">{{$t('uc.finance.buyCTGC.buyCTGC')}}</span>
                </section>
                <section>
                    <div class="table-inner action-box">
                        <i class="angle" style="right: 27px;"></i>
                        <div class="action-inner">
                            <div class="inner-left">
                                <p class="describe">{{$t('uc.finance.buyCTGC.symbol')}}</p>
                                <Select v-model="coinType" style="width:100px;margin-top: 14px;" @on-change="getCoin(coinType)">
                                    <Option v-for="item in CoinList" :value="item.unit" :key="item.unit">{{ item.unit }}</Option>
                                </Select>
                            </div>
                            <div class="inner-box">
                                <div class="form-group form-address">
                                    <label class="label-amount"> {{$t('uc.finance.buyCTGC.num')}}
                                       <p class="label-fr">
                                        <span>【{{$t('uc.finance.buyCTGC.avabalance')}}】：
                                            <span class="label-pointer" id="valueAvailable"></span>
                                        </span>
                                        </p>
                                    </label>
                                    <div class="input-group">
                                        <Input size="large" v-model="buynum" @on-change="computerAmount(buynum)" style="width: 740px;"></Input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group-container form-group-container2">
                            <div class="form-group form-fee">
                                <label class="label-amount"> {{$t('uc.finance.buyCTGC.transRate')}}
                                </label>
                                <div class="input-group">
                                    <Input readonly v-model="transRate" size="large" style="width: 440px;"></Input>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>{{$t('uc.finance.buyCTGC.arriamount')}}</label>
                                <div class="input-group">
                                    <Input readonly v-model="buyCTGCOutAmount" :placeholder="$t('uc.finance.buyCTGC.arriamount')"
                                     size="large" style="width: 100%;">
                                     <span slot="append">CTGC</span>
                                     </Input>
                                </div>
                            </div>
                        </div>
                        <div class="action-foot">
                            <Button id="BuySubmit" long size="large" type="primary" style="height:40px;" @click="apply">{{$t('uc.finance.buyCTGC.buy')}}</Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            loading: true,
            coinType: '',
            buynum: 0,
            buyCTGCOutAmount: 0,
            transRate: '',
            CoinList: [
                {
                    unit: 'BTC',
                    // transRate: '1BTC = 463000CTGC'
                },
                {
                    unit: 'ETH',
                    // transRate: '1ETH = 31900CTGC'
                },
                {
                    unit: 'USDT',
                    // transRate: '1USDT = 72.5CTGC'
                }
            ],
        }
    },
    methods: {
        apply () {

        },
        getCoin (coinType) {
            if(coinType == 'BTC') {
                this.transRate = '1BTC = 463000CTGC'
            } else if (coinType == 'ETH') {
                this.transRate = '1ETH = 31900CTGC'
            } else if (coinType == 'USDT') {
                this.transRate = '1USDT = 72.5CTGC'
            }
        },
        computerAmount (buynum) {
            if(isNaN(buynum)) {
                this.$Notice.error({
                    title: this.$t('common.tip'),
                    desc: this.$t('uc.finance.buyCTGC.tip1'),
                });
            }else {
                if(this.coinType == 'BTC') {
                    this.buyCTGCOutAmount = buynum * 463000
                } else if (this.coinType == 'ETH') {
                    this. buyCTGCOutAmount = buynum * 31900
                } else if (this.coinType == 'USDT') {
                    this.buyCTGCOutAmount = buynum * 72.5
                }
            }
            
        }
    }
}
</script>
<style scoped>
p.describe {
    font-size: 16px;
    font-weight: 600;
}

.action-box {
    position: relative;
    text-align: left;
    border-radius: 3px;
    padding: 10px 20px 20px;
}
.action-foot {
    text-align: center;
    padding: 40px 170px 0;
}

.hb-night .btn.btn-primary,
.hb-night .btn.btn_submit {
    background-color: #7A98F7;
    color: white;
}

.action-inner {
    width: 100%;
    display: table;
}

.action-inner .inner-box {
    display: table-cell;
    width: 80%;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
}
.form-group label {
    max-width: 100%;
    /* display: inline-block; */
    /* font-size: 14px; */
    font-weight: 600;
}

.form-group-container {
    display: table;
    width: 100%;
}

.form-group-container .form-amount {
    width: 100%;
}

.form-group-container .form-group {
    display: table-cell;
}

.form-group-container .form-group span.addon-tag:last-child {
    padding: 0 20px;
    border: none;
    background: none;
    cursor: default;
    position: absolute;
    right: 20px;
    top: 8px;
}

.form-group-container .form-group span.addon-tag:last-child.firstt {
    top: 8px;
}

.form-group-container2 {
    padding-top: 20px;
}

.form-group-container .form-fee {
    width: 50%;
    padding: 0 20px 0 0;
}

.label-amount .label-fr {
    float: right;
    color: #aaa;
    font-size: 12px;
}

.label-amount .label-fr span {
    margin-left: 2px;
}

.form-group-container .form-group {
    display: table-cell;
}

table.table .table-inner.action-box {
    margin: -1px -10px;
}

.merchant-top {
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #fff;
    padding: 0 15px;
    color: #0d214e;
}

.trade-group {
    margin-bottom: 20px;
    font-size: 14px;
}

.merchant-icon {
    display: inline-block;
    margin-left: 4px;
    background-size: 100% 100%;
}

.merchant-top .tips-word {
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    text-align: left;
}

.merchant-icon.tips {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: #1755FD;
}

.bill_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.rightarea {
    background: #fff;
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-bottom: 60px !important;
}

.nav-right {
    width: 1000px;
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}
</style>
