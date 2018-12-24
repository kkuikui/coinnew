<template>
    <div class="container exchange">
        <div class="sidebar">
          <div v-if="isLogin" style="padding: 16px 10px 16px 20px;" class="hd hd_login">
            <!-- <h3 style="padding-bottom:20px;font-size:20px;">{{$t("exchange.allAsset")}}：</h3> -->
            <span>{{$t("exchange.canuse")}}</span>
            <b>{{wallet.coin}}</b>
            <span>{{currentCoin.coin}}</span>
            <span style="padding-left:10px;font-size:14px;"> ≈ {{wallet.coin*form.buy.limitPrice*CNYRate|toFixed(2)}} CNY</span>
            <a :href="rechargeCoinUrl" style="color: #2371d8;">{{$t("exchange.recharge")}}</a>
          </div>
          <div class="hd" style="padding: 16px 10px 16px 20px;" v-else>
            <router-link to="/login" style="color: #2371d8;">{{$t("common.login")}}</router-link>
            {{$t("exchange.or")}}<router-link to="/register" style="color: #2371d8;">{{$t("common.register")}}</router-link>{{$t("exchange.starttrade")}}
          </div>
            <div class="sc">
                {{$t("exchange.market")}}
            </div>
            <Tabs  size="small" style="width:100%;" id="exTab" v-model="tabValue">
              <TabPane label="USDT" name="usdt">
                <Table @on-current-change="gohref"  key=1 highlight-row id="USDT" v-show="true" :columns="coins.columns" :data="coins.USDT"></Table>
              </TabPane>
              <TabPane label="BTC" name="btc">
                <Table @on-current-change="gohref" highlight-row id="BTC" v-show="true" :columns="coins.columns" :data="coins.BTC"></Table>
              </TabPane>
              <TabPane label="ETH" name="eth">
                <Table @on-current-change="gohref" highlight-row id="ETH" v-show="true" :columns="coins.columns" :data="coins.ETH"></Table>
              </TabPane>
              <TabPane  icon='android-star' name="star">
                <Table no-data-text="暂无记录" id="collect"  @on-current-change="gohref"  highlight-row  v-show="true" :columns="coins.columns" :data="coins.favor"></Table>
              </TabPane>
            </Tabs>
            <!-- <div class="sc_filter">
                <span class="active">USDT</span>
                <span>BTC</span>
                <span>ETH</span>
                <Icon style="line-height:32px;" type="android-star"></Icon>
            </div>
            <Table @on-current-change="gohref" highlight-row id="USDT" v-show="true" :columns="coins.columns" :data="coins.USDT"></Table>
            <Table @on-current-change="gohref" highlight-row id="BTC" v-show="false" :columns="coins.columns" :data="coins.BTC"></Table>
            <Table @on-current-change="gohref" highlight-row id="ETH" v-show="false" :columns="coins.columns" :data="coins.ETH"></Table>
            <Table no-data-text="暂无记录" id="collect" v-show="false" :columns="coins.columns" :data="coins.favor"></Table> -->
        </div>
        <div class="kline">
            <div class="mod_hd">
                <dl>
                    <dt>
                        {{currentCoin.symbol}}
                        <span>{{currentCoin.closeStr | toFixed(baseCoinScale)}}</span>
                    </dt>
                    <dd>
                        <span>≈ {{currentCoin.closeStr*CNYRate | toFixed(2)}} CNY</span>
                    </dd>
                    <dd>
                        <span>{{$t("service.Change")}} <label :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.rose}}</label></span>
                    </dd>
                    <dd>
                        <span>{{$t("exchange.high")}} {{currentCoin.high | toFixed(baseCoinScale)}}</span>
                    </dd>
                    <dd>
                        <span>{{$t("exchange.low")}} {{currentCoin.low | toFixed(baseCoinScale)}}</span>
                    </dd>
                    <dd>
                        <span>{{$t("exchange.vol")}} {{currentCoin.volume}} {{currentCoin.coin}}</span>
                    </dd>
                </dl>
            </div>
            <div id="kline_container">

            </div>
        </div>
        <!-- <div class="kline">

        </div> -->
        <div class="trade_wrap">
          <div class="trade_panel trade_panel_logout">
              <div class="trade_hd">
                  <div class="mod_tab">
                      <ul>
                          <li id="limited_price" @click="limited_price" :class="{ active: isActive }">{{$t("exchange.limited_price")}}</li>
                          <li id="market_price" @click="market_price" :class="{ active: isActives }">{{$t("exchange.market_price")}}</li>
                      </ul>
                  </div>
                  <div class="feesRate">
                      <a href="#/about-fee" style="color: #2371d8;">{{$t("exchange.fees_rate")}}</a>
                  </div>
              </div>
              <div class="trade_bd">
                  <div class="panel panel_buy">
                      <div v-if="isLogin" class="hd hd_login">
                          <span>{{$t("exchange.canuse")}}</span>
                          <b>{{wallet.base}}</b>
                          <span>{{currentCoin.base}}</span>
                          <a :href="rechargeUSDTUrl" style="color: #2371d8;">{{$t("exchange.recharge")}}</a>
                      </div>
                      <div class="hd" v-else>
                          <router-link to="/login" style="color: #2371d8;">{{$t("common.login")}}</router-link>
                        {{$t("exchange.or")}}<router-link to="/register" style="color: #2371d8;">{{$t("common.register")}}</router-link>{{$t("exchange.starttrade")}}
                      </div>
                      <div class="bd bd_limited" v-show="!showMarket">
                          <Form ref="formValidate">
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.buyprice")}}
                              </p>
                              <FormItem>
                                  <Input @on-keyup="keyEvent" v-model="form.buy.limitPrice"></Input>
                                  <label>{{currentCoin.base}}</label>
                                  <p class="math_price">≈ {{form.buy.limitPrice*CNYRate*currentCoin.baseUsdRate|toFixed(2)}} CNY</p>
                              </FormItem>
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.buynum")}}
                              </p>
                              <FormItem>
                                  <Input @on-keyup="keyEventOnOff('limitBuyVa')" v-model="form.buy.limitAmount"></Input>
                                  <label>{{currentCoin.coin}}</label>
                              </FormItem>
                            <div class="total buy_total">
                                {{$t("exchange.amount")}} <span>{{form.buy.limitTurnover}}</span> {{currentCoin.base}}
                              </div>
                              <!-- <div @click="sclick('limitBuyVa')" class="sliderWarp">
                                <div class="roundWarp">
                                  <div  class="roundFlexWarp">
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                  </div>
                                </div>
                                <Slider v-model="sliderValue.limitBuyVa"  ></Slider>
                              </div> -->
                              <Button class="buyBtn" @click="buyWithLimitPrice" :disabled='isDisabled1' v-show="isLogin">{{$t("exchange.buyin")}}{{currentCoin.coin}}</Button>
                          </Form>
                      </div>
                      <div class="bd bd_market" v-show="showMarket">
                          <Form ref="formValidate">
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.buyprice")}}
                              </p>
                              <FormItem>
                                  <Input disabled :placeholder="$t('exchange.buytip')"></Input>
                                  <label>{{currentCoin.base}}</label>
                              </FormItem>
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.amount")}}
                              </p>
                              <FormItem>
                                  <Input  @on-keyup="keyEventOnOff('marketBuyVa')" v-model="form.buy.marketAmount"></Input>
                                  <label>{{currentCoin.base}}</label>
                              </FormItem>
                              <!-- <div @click="sclick('marketBuyVa')" class="sliderWarp">
                                <div class="roundWarp">
                                  <div  class="roundFlexWarp">
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                  </div>
                                </div>
                                <Slider v-model="sliderValue.marketBuyVa"   ></Slider>
                              </div> -->
                              <Button class="buyBtn" @click="buyWithMarketPrice" :disabled='isDisabled2' style="background: #2eb363;" v-show="isLogin">{{$t("exchange.buyin")}}{{currentCoin.coin}}</Button>
                          </Form>
                      </div>
                  </div>
                  <div class="panel panel_sell">
                      <div v-if="isLogin" class="hd hd_login">
                          <span>{{$t("exchange.canuse")}}</span>
                          <b>{{wallet.coin}}</b>
                          <span>{{currentCoin.coin}}</span>
                          <a :href="rechargeCoinUrl" style="color: #2371d8;">{{$t("exchange.recharge")}}</a>
                      </div>
                      <div class="hd" v-else>
                          <router-link to="/login" style="color: #2371d8;">{{$t("common.login")}}</router-link>
                        {{$t("exchange.or")}}<router-link to="/register" style="color: #2371d8;">{{$t("common.register")}}</router-link>{{$t("exchange.starttrade")}}
                      </div>
                      <div class="bd bd_limited" v-show="!showMarket">
                          <Form ref="formValidate">
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.sellprice")}}
                              </p>
                              <FormItem>
                                  <Input @on-keyup="keyEvent" v-model="form.sell.limitPrice"></Input>
                                  <label>{{currentCoin.base}}</label>
                                  <p class="math_price">≈ {{form.sell.limitPrice*CNYRate*currentCoin.baseUsdRate|toFixed(2)}}CNY</p>
                              </FormItem>
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.sellnum")}}
                              </p>
                              <FormItem>
                                  <Input @on-keyup="keyEventOnOff('limitSellVa')" v-model="form.sell.limitAmount"></Input>
                                  <label>{{currentCoin.coin}}</label>
                              </FormItem>
                            <div class="total sell_total">
                                {{$t("exchange.amount")}} <span>{{form.sell.limitTurnover}}</span> {{currentCoin.base}}
                              </div>
                              <!-- <div @click="sclick('limitSellVa')" class="sliderWarp">
                                <div class="roundWarp">
                                  <div  class="roundFlexWarp">
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                  </div>
                                </div>
                                <Slider v-model="sliderValue.limitSellVa"  ></Slider>
                                </div> -->
                              <Button class="sellBtn" @click="sellLimitPrice" :disabled='isDisabled3' v-show="isLogin">{{$t("exchange.sellout")}}{{currentCoin.coin}}</Button>
                          </Form>
                      </div>
                      <div class="bd bd_market" v-show="showMarket">
                          <Form ref="formValidate">
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.sellprice")}}
                              </p>
                              <FormItem>
                                  <Input disabled :placeholder="$t('exchange.selltip')"></Input>
                                  <label>{{currentCoin.base}}</label>
                              </FormItem>
                              <p style="font-size:10px;color:#61688A;">
                                {{$t("exchange.sellnum")}}
                              </p>
                              <FormItem>
                                  <Input @on-keyup="keyEventOnOff('marketSellVa')" v-model="form.sell.marketAmount"></Input>
                                  <label>{{currentCoin.coin}}</label>
                              </FormItem>
                              <!-- <div @click="sclick('marketSellVa')" class="sliderWarp">
                                <div class="roundWarp">
                                  <div  class="roundFlexWarp">
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                    <div class="round"></div>
                                  </div>
                                </div>
                              <Slider v-model="sliderValue.marketSellVa" ></Slider>
                              </div> -->
                              <Button  class="sellBtn" @click="sellMarketPrice" :disabled='isDisabled4' v-show="isLogin">{{$t("exchange.sellout")}}{{currentCoin.coin}}</Button>
                          </Form>
                      </div>
                  </div>
              </div>
          </div>
          <div class="order_book">
              <div class="order_book_hd" style="padding: 0 10px;">
                {{$t("service.NewPrice")}}&nbsp;&nbsp;{{currentCoin.price | toFixed(baseCoinScale)}}&nbsp;&nbsp;{{currentCoin.base}}
                <span style="font-size: 12px;color: #61688A;"> ≈ {{currentCoin.closeStr*CNYRate | toFixed(2)}} CNY</span>
              </div>
              <Table :height="200" @on-row-click="buyPlate"  ref="currentRowTable" class="sell_table latest"
                :columns="plate.columns" :data="plate.askRows"></Table>
              <Table :height="175" @on-row-click="sellPlate" class="buy_table latest"
              :columns="plate.columns" :data="plate.bidRows"></Table>
          </div>
          <div class="deal_record">
              <div class="deal_record_hd">
                {{$t("exchange.realtransaction")}}
              </div>
              <Table height="500" :columns="trade.columns" :data="trade.rows"></Table>
          </div>
      </div>
        <div class="open_orders" v-show="isLogin">
          <Tabs>
              <TabPane :label="$t('exchange.curdelegation')" class="minHeight">
                  <Table :height="fixHistoryHeight" :columns="currentOrder.columns" :data="currentOrder.rows"></Table>
              </TabPane>
              <TabPane :label="$t('exchange.hisdelegation')" class="minHeight">
                  <Table :height="fixHistoryHeight"  :columns="historyOrder.columns" :data="historyOrder.rows"></Table>
                  <div style="float: right;margin-top:15px;">
                      <Page v-if="historyOrder.rows.length>0" :total="historyOrder.total" :page-size="historyOrder.pageSize" :current="historyOrder.page + 1" size="small" @on-change="getHistoryOrder"></Page>
                  </div>
              </TabPane>
          </Tabs>
      </div> 
      <div class="open_orders marginLeft" v-show="isLogin">
          <Tabs>
              <TabPane :label="$t('exchange.depgraph')">
                  <depth :depData='depData'></depth>
              </TabPane>
          </Tabs> 
      </div>
    </div>
</template>
<style>
@import url(../../assets/css/exchange.css);
</style>

<script>
import expandRow from "@components/exchange/expand.vue";
import depth from "@components/exchange/depth.vue";
import Datafeeds from "@js/charting_library/datafeed/bitrade.js";
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var moment = require("moment");
/*
require.ensure([],function(require){
  require('jquery');

});
*/
export default {
  components: { expandRow, depth },
  data() {
    let self = this;
    return {
      timer:null,
      CNYRate: null,
      CNYRateU: 1,
      CNYRateB: 1,
      CNYRateR: 1,
      CNYRateE: 1,
      baseUsdRateU: null,
      baseUsdRateB: null,
      baseUsdRateE: null,
      datafeed: null,
      isActives: false,
      isActive: true,
      num: 0,
      defaultPath: "btc_usdt",
      coinScale: "4",
      baseCoinScale: "4",
      depData: {},
      currentCoin: {
        symbol: ""
      },
      tabValue: "usdt",
      sliderValue: {
        limitBuyVa: 0,
        marketBuyVa: 0,
        limitSellVa: 0,
        marketSellVa: 0
      },
      switch: {
        limitBuyVa: true,
        marketBuyVa: true,
        limitSellVa: true,
        marketSellVa: true
      },
      //当前市场上的交易币种，按交易对分
      coins: {
        _map: [],
        USDT: [],
        BTC: [],
        ETH: [],
        favor: [],
        columns: [
          {
            title: this.$t("exchange.coin"),
            key: "coin",
            sortable: false,
            render: (h, params) => {
              //市场

              let text = "";
              if (params.row.isFavor && this.tabValue == "star") {
                text = params.row.symbol;
              } else {
                text = params.row.coin;
              }
              return h(
                "span",
                {},
                text
                // row.rose
              );
            }
          },
          {
            title: this.$t("exchange.lastprice"),
            key: "closeStr",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
            render: (h, params) => {
              //市场

              let rowPrice = "";
              let symbol = params.row.base;
              if (symbol == "USDT") {
                rowPrice = "₮";
              } else if (symbol == "BTC") {
                rowPrice = "฿";
              } else if (symbol == "ETH") {
                rowPrice = "E";
              }
              return h("span", {}, rowPrice + params.row.closeStr);
            }
          },
          {
            title: this.$t("exchange.daychange"),
            key: "rose",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
              let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
            render: (h, params) => {
              //市场
              const row = params.row;
              const className = parseFloat(row.rose) < 0 ? "sell" : "buy";
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                row.rose
              );
            }
          },
          {
            title: this.$t("exchange.favorite"),
            key: "collection",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: params.row.isFavor
                      ? "android-star"
                      : "android-star-outline",
                    size: 18
                  },
                  style: {
                    marginRight: "8px",
                    width: "80%",
                    paddingLeft: "5px"
                  },
                  nativeOn: {
                    click: () => {
                      event.stopPropagation();
                      if (this.isLogin) {
                        //阻止事件冒泡
                        if (
                          event.currentTarget.className ==
                          "ivu-icon ivu-icon-android-star"
                        ) {
                          this.cancelCollect(params.index, params.row);
                          event.currentTarget.className ==
                            "ivu-icon ivu-icon-android-star-outline";
                        } else {
                          this.collect(params.index, params.row);
                          event.currentTarget.className =
                            "ivu-icon ivu-icon-android-star";
                        }
                      } else {
                        this.$Message.info(this.$t("common.logintip"));
                        this.$router.push("/login");
                      }
                    }
                  }
                })
              ]);
            }
          }
        ]
      },
      wallet: {
        base: 0.0,
        coin: 0.0
      },
      showMarket: false,
      fixHistoryHeight: 300,
      // rechargeUrl:'#/finance/recharge',
      // rechargeUSDTUrl:'#/finance/recharge?name=USDT',
      form: {
        buy: {
          limitPrice: 0.0,
          limitAmount: 0.0,
          marketAmount: 0.0,
          limitTurnover: 0.0
        },
        sell: {
          limitPrice: 0.0,
          limitAmount: 0.0,
          marketAmount: 0.0,
          limitTurnover: 0.0
        }
      },
      trade: {
        rows: [],
        columns: [
          {
            title: self.$t("exchange.num"),
            key: "amount",
            render: (h, params) => {
              const title = params.row.amount.toFixed(this.coinScale);
              return h("span", {}, title);
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.num") + "(" + self.currentCoin.coin + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.price"),
            key: "price",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction == "BUY" ? "buy" : "sell";

              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                params.row.price.toFixed(this.baseCoinScale)
              );
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.price") + "(" + self.currentCoin.base + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.direction"),
            key: "direction",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction == "BUY" ? "buy" : "sell";
              const direction =
                row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout");
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                direction
              );
            }
          },
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              //return h(this.timeFormat(params.row.time))
              const title = this.timeFormat(params.row.time);
              return h("span", {}, title);
            }
          }
        ]
      },
      plate: {
        maxPostion: 7,
        columns: [
          {
            title: self.$t("exchange.stall"),
            key: "postion",

            render: (h, params) => {
              const row = params.row;
              const className = row.direction.toLowerCase();
              const title =
                (row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout")) +
                " " +
                row.position;
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                title
              );
            }
          },
          {
            title: self.$t("exchange.price"),
            key: "price",

            render: (h, params) => {
              const title = params.row.price.toFixed(this.baseCoinScale);
              return h("span", {}, title);
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.price") + "(" + self.currentCoin.base + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.num"),
            key: "amount",

            render: (h, params) => {
              const title = params.row.amount.toFixed(this.coinScale);
              return h("span", {}, title);
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.num") + "(" + self.currentCoin.coin + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.total"),
            key: "totalAmount",

            render: (h, params) => {
              if (params.row.totalAmount) {
                const title = params.row.totalAmount.toFixed(this.coinScale);
                return h("span", {}, title);
              } else {
                return h("span", {}, "-");
              }
            },
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.total") + "(" + self.currentCoin.coin + ")";
              return h("span", {}, title);
            }
          }
        ],
        askRows: [],
        bidRows: []
      },
      currentOrder: {
        columns: [
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              const title = this.dateFormat(params.row.time);
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.direction"),
            key: "direction",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction.toLowerCase();
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout")
              );
            }
          },
          {
            title: self.$t("exchange.price"),
            key: "price",
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.price") + "(" + self.currentCoin.base + ")";

              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.num"),
            key: "amount",
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.num") + "(" + self.currentCoin.coin + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.traded"),
            key: "tradedAmount",
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.traded") + "(" + self.currentCoin.coin + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.action"),
            key: "operate",
            width: 110,
            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    background: "#54677F",
                    borderColor: "#54677F",
                    height: "20px",
                    lineHeight: "15px"
                  },
                  on: {
                    click: () => {
                      this.cancel(params.index);
                    }
                  }
                },
                self.$t("exchange.undo")
              );
            }
          }
        ],
        rows: []
      },
      historyOrder: {
        pageSize: 10,
        total: 10,
        page: 0,
        columns: [
          {
            type: "expand",
            width: 40,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  rows: params.row.detail,
                  currentCoin: self.currentCoin,
                  direction: params.row.direction
                }
              });
            }
          },
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              const title = this.dateFormat(params.row.time);
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.direction"),
            key: "direction",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction.toLowerCase();
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout")
              );
            }
          },
          {
            title: self.$t("exchange.price"),
            key: "price",
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.price") + "(" + self.currentCoin.base + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.delegationnum"),
            key: "amount",
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.delegationnum") +
                "(" +
                self.currentCoin.coin +
                ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.done"),
            key: "tradedAmount",
            renderHeader: (h, params) => {
              const title =
                self.$t("exchange.done") + "(" + self.currentCoin.coin + ")";
              return h("span", {}, title);
            }
          },
          {
            title: self.$t("exchange.status"),
            key: "status",
            render: (h, params) => {
              const status = params.row.status;

              if (status == "COMPLETED") {
                return h("span", {}, self.$t("exchange.finished"));
              } else if (status == "CANCELED") {
                return h("span", {}, self.$t("exchange.canceled"));
              } else {
                return h("span", {}, "-");
              }
            }
          }
        ],
        rows: []
      },
      //   防重复提交按钮
      isDisabled1: false,
      isDisabled2: false,
      isDisabled3: false,
      isDisabled4: false
    };
  },
  computed: {
    rechargeUSDTUrl: function() {
      return "#/finance/recharge?name=" + this.currentCoin.base;
    },
    rechargeCoinUrl: function() {
      return "#/finance/recharge?name=" + this.currentCoin.coin;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
    lang: function() {
      return this.$store.state.lang;
    },
    ecoin: function() {
      return this.$store.getters.ecoin;
    }
  },
  watch: {
    "form.buy.limitPrice": function(val) {
      this.form.buy.limitTurnover = (val * this.form.buy.limitAmount).toFixed(
        8
      );
    },
    "form.buy.limitAmount": function(val) {
      this.form.buy.limitTurnover = (val * this.form.buy.limitPrice).toFixed(8);
    },
    "form.sell.limitPrice": function(val) {
      this.form.sell.limitTurnover = (val * this.form.sell.limitAmount).toFixed(
        8
      );
    },
    "form.sell.limitAmount": function(val) {
      this.form.sell.limitTurnover = (val * this.form.sell.limitPrice).toFixed(
        8
      );
    },
    "sliderValue.limitBuyVa": function() {
      if (this.switch.limitBuyVa) {
        var maxAmount = this.wallet.base / this.form.buy.limitPrice;
        this.form.buy.limitAmount = (
          this.sliderValue.limitBuyVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },

    "sliderValue.marketBuyVa": function() {
      if (this.switch.marketBuyVa) {
        var maxAmount = this.wallet.base;
        this.form.buy.marketAmount = (
          this.sliderValue.marketBuyVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },
    "sliderValue.limitSellVa": function() {
      if (this.switch.limitSellVa) {
        var maxAmount = this.wallet.coin;
        this.form.sell.limitAmount = (
          this.sliderValue.limitSellVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },
    "sliderValue.marketSellVa": function() {
      if (this.switch.marketSellVa) {
        var maxAmount = this.wallet.coin;
        this.form.sell.marketAmount = (
          this.sliderValue.marketSellVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },
    "currentOrder.rows": function() {
      this.getDep(this.currentCoin.symbol);
    },
    plate: function() {
      this.getCurrentOrder();
    },
    lang: function() {
      this.updateLangData();
    },
    currentCoin: function() {
      this.updateTitle();
    },
    "currentCoin.price": function() {
      this.updateTitle();
    }
  },
  created: function() {
    this.getSymbol();
    this.init();
    setTimeout(() => {
      document.querySelector(".layout-ceiling").scrollIntoView();
    }, 0);
  },
  mounted: function() {
    this.getSymbolScale();
    let that=this;
    this.timer=setInterval(function(){
       that.getCNYRate();
    },1000*60*5)
    // this.getSymbol();
    this.getPlate();
    this.getTrade();
    if (this.isLogin) {
      //   this.getFavor();
      this.getWallet();
      this.getCurrentOrder();
      this.getHistoryOrder();
    }
  },
  methods: {
    sclick(event) {
      this.switch[event] = true;
      this[event]();
    },

    limitBuyVa() {
      if (this.switch.limitBuyVa) {
        var maxAmount = this.wallet.base / this.form.buy.limitPrice;
        this.form.buy.limitAmount = (
          this.sliderValue.limitBuyVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },

    marketBuyVa() {
      if (this.switch.marketBuyVa) {
        var maxAmount = this.wallet.base;
        this.form.buy.marketAmount = (
          this.sliderValue.marketBuyVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },
    limitSellVa() {
      if (this.switch.limitSellVa) {
        var maxAmount = this.wallet.coin;
        this.form.sell.limitAmount = (
          this.sliderValue.limitSellVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },
    marketSellVa() {
      if (this.switch.marketSellVa) {
        var maxAmount = this.wallet.coin;
        this.form.sell.marketAmount = (
          this.sliderValue.marketSellVa /
          100 *
          maxAmount
        ).toFixed(this.coinScale);
      }
    },
    updateTitle() {
      let title =
        this.currentCoin.price +
        " " +
        this.currentCoin.rose +
        " " +
        this.currentCoin.coin +
        "/" +
        this.currentCoin.base;
      title += "领衔全球的数字资产交易平台 -- 【币对】";
      window.document.title = title;
    },
    updateLangData() {
      this.coins.columns[0].title = this.$t("exchange.coin");
      this.coins.columns[1].title = this.$t("exchange.lastprice");
      this.coins.columns[2].title = this.$t("exchange.daychange");
      this.coins.columns[3].title = this.$t("exchange.favorite");

      this.trade.columns[0].title = this.$t("exchange.num");
      this.trade.columns[1].title = this.$t("exchange.price");
      this.trade.columns[2].title = this.$t("exchange.direction");
      this.trade.columns[3].title = this.$t("exchange.time");

      this.plate.columns[0].title = this.$t("exchange.stall");
      this.plate.columns[1].title = this.$t("exchange.price");
      this.plate.columns[2].title = this.$t("exchange.num");
      this.plate.columns[3].title = this.$t("exchange.total");

      this.currentOrder.columns[0].title = this.$t("exchange.time");
      this.currentOrder.columns[1].title = this.$t("exchange.direction");
      this.currentOrder.columns[2].title = this.$t("exchange.price");
      this.currentOrder.columns[3].title = this.$t("exchange.num");
      this.currentOrder.columns[4].title = this.$t("exchange.traded");
      this.currentOrder.columns[5].title = this.$t("exchange.action");

      this.historyOrder.columns[1].title = this.$t("exchange.time");
      this.historyOrder.columns[2].title = this.$t("exchange.direction");
      this.historyOrder.columns[3].title = this.$t("exchange.price");
      this.historyOrder.columns[4].title = this.$t("exchange.delegationnum");
      this.historyOrder.columns[5].title = this.$t("exchange.done");
      this.historyOrder.columns[6].title = this.$t("exchange.status");

      // window.tvWidget.options.time_frames[0].title = this.$t("exchange.realtime");
    },
    init() {
      var params = this.$route.params[0];
      if (params == undefined) {
        this.$router.push("/exchange/" + this.defaultPath);
        params = this.defaultPath;
      }
      this.tabValue = params.split("_")[1];
      var coin = params.toUpperCase().split("_")[0];
      var base = params.toUpperCase().split("_")[1];
      this.currentCoin.symbol = coin + "/" + base;
      this.currentCoin.coin = coin;
      this.currentCoin.base = base;
      this.$store.commit("setCoin", base);
      this.$store.commit("navigate", "nav-exchange");
    },
    getCNYRate() {
      this.$http
        .post(this.host + "/market/exchange-rate/" + "usd-cny")
        .then(response => {
          var resp = response.body;
          this.CNYRateR = resp.data;
          this.getCNY();
        });
    },
    getCNY() {
      if (this.ecoin == "USDT") {
        this.CNYRate = this.CNYRateR * this.baseUsdRateU;
      } else if (this.ecoin == "BTC") {
        this.CNYRate = this.baseUsdRateB * this.CNYRateR;
      } else if (this.ecoin == "ETH") {
        this.CNYRate = this.baseUsdRateE * this.CNYRateR;
      }
    },
    getDep(coin) {
      let data = {};
      data.symbol = coin;
      this.$http
        .post(this.host + "/market/exchange-plate-full", data)
        .then(response => {
          var resp = response.body;
          this.depData = resp;
          localStorage.setItem("coinType", this.currentCoin.base);
          this.depData.coin = this.currentCoin.coin;
        });
    },
    getCoin(symbol) {
      return this.coins._map[symbol];
    },
    getKline() {
      var that = this;
      require(["@js/charting_library/charting_library.min.js"], function(tv) {
        var widget = (window.tvWidget = new TradingView.widget({
          fullscreen: true,
          symbol: that.symbol,
          interval: "1",
          timezone: "Asia/Shanghai",
          toolbar_bg: "#18202a",
          container_id: "kline_container",
          datafeed: that.datafeed,
          library_path:
            process.env.NODE_ENV === "production"
              ? "/assets/charting_library/"
              : "src/assets/js/charting_library/",
          locale: "zh",
          debug: false,
          drawings_access: {
            type: "black",
            tools: [{ name: "Regression Trend" }]
          },
          disabled_features: [
            "header_resolutions",
            "timeframes_toolbar",
            "header_symbol_search",
            "header_chart_type",
            "header_compare",
            "header_undo_redo",
            "header_screenshot",
            "header_saveload",
            "use_localstorage_for_settings",
            "left_toolbar",
            "volume_force_overlay"
          ],
          enabled_features: [
            "hide_last_na_study_output",
            "move_logo_to_main_pane"
          ],
          custom_css_url: "bundles/common.css",
          supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
          charts_storage_url: "http://saveload.tradingview.com",
          charts_storage_api_version: "1.1",
          client_id: "tradingview.com",
          user_id: "public_user_id",
          overrides: {
            "paneProperties.background": "#1B1E2E",
            "paneProperties.vertGridProperties.color": "#1B1E2E", // 网格线竖线颜色
            "paneProperties.horzGridProperties.color": "#454545",
            //"scalesProperties.textColor" : "#AAA",
            "scalesProperties.textColor": "#61688A",
            "mainSeriesProperties.candleStyle.upColor": "#589065",
            "mainSeriesProperties.candleStyle.downColor": "#AE4E54",
            "mainSeriesProperties.candleStyle.drawBorder": false,
            "mainSeriesProperties.candleStyle.wickUpColor": "#589065",
            "mainSeriesProperties.candleStyle.wickDownColor": "#AE4E54",
            "paneProperties.legendProperties.showLegend": false,

            "mainSeriesProperties.areaStyle.color1": "rgba(71, 78, 112, 0.5)",
            "mainSeriesProperties.areaStyle.color2": "rgba(71, 78, 112, 0.5)",
            "mainSeriesProperties.areaStyle.linecolor": "#9194a4",

             "mainSeriesProperties.candleStyle.borderColor": "#fff",
            "mainSeriesProperties.candleStyle.borderUpColor": "green",
            "mainSeriesProperties.candleStyle.borderDownColor": "#AE4E54",
          },
          time_frames: [
            {
              text: "1min",
              resolution: "1",
              description: "realtime",
              title: that.$t("exchange.realtime")
            },
            { text: "1min", resolution: "1", description: "1min" },
            { text: "5min", resolution: "5", description: "5min" },
            { text: "15min", resolution: "15", description: "15min" },
            { text: "30min", resolution: "30", description: "30min" },
            {
              text: "1hour",
              resolution: "60",
              description: "1hour",
              title: "1hour"
            },
            /*{ text: "4hour", resolution: "240", description: "4hour",title: "4hour" },*/
            {
              text: "1day",
              resolution: "1D",
              description: "1day",
              title: "1day"
            },
            {
              text: "1week",
              resolution: "1W",
              description: "1week",
              title: "1week"
            },
            { text: "1mon", resolution: "1M", description: "1mon" }
          ]
        }));
        widget.onChartReady(function() {
          widget.chart().executeActionById("drawingToolbarAction");
          widget
            .chart()
            .createStudy("Moving Average", false, false, [5], null, {
              "plot.color": "#965FC4"
            });
          widget
            .chart()
            .createStudy("Moving Average", false, false, [10], null, {
              "plot.color": "#84AAD5"
            });

          widget
            .createButton()
            .attr("title", "realtime")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(3);
              widget.setSymbol("", "1");
            })
            .append(`<span>${that.$t("exchange.realtime")}</span>`);

          widget
            .createButton()
            .attr("title", "1min")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1");
            })
            .append("<span>1min</span>")
            .addClass("selected");

          widget
            .createButton()
            .attr("title", "5min")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "5");
            })
            .append("<span>5min</span>");

          widget
            .createButton()
            .attr("title", "15min")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "15");
            })
            .append("<span>15min</span>");

          widget
            .createButton()
            .attr("title", "30min")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "30");
            })
            .append("<span>30min</span>");

          widget
            .createButton()
            .attr("title", "1hour")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "60");
            })
            .append("<span>1hour</span>");

          widget
            .createButton()
            .attr("title", "1day")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1D");
            })
            .append("<span>1day</span>");

          widget
            .createButton()
            .attr("title", "1week")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1W");
            })
            .append("<span>1week</span>");

          widget
            .createButton()
            .attr("title", "1month")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1M");
            })
            .append("<span>1mon</span>");
        });
      });
    },
    getFavor() {
      //查询自选
      this.$http
        .post(this.host + this.api.exchange.favorFind, {})
        .then(response => {
          var resp = response.body;
          let that = this;

          for (var i = 0; i < resp.length; i++) {
            let coin = that.getCoin(resp[i].symbol);
            if (coin != null) {
              coin.isFavor = true;
              that.coins.favor.push(coin);
            }
          }
        });
    },
    getSymbol() {
      this.$http
        .post(this.host + this.api.market.thumb, {})
        .then(response => {
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            var coin = resp[i];
            coin.price = resp[i].closeStr;
            coin.rose =
              resp[i].chg > 0
                ? "+" + (resp[i].chg * 100).toFixed(2) + "%"
                : (resp[i].chg * 100).toFixed(2) + "%";
            coin.coin = resp[i].symbol.split("/")[0];
            coin.base = resp[i].symbol.split("/")[1];
            coin.href = (coin.coin + "_" + coin.base).toLowerCase();
            coin.isFavor = false;
            this.coins._map[coin.symbol] = coin;
            if (this.coins[coin.base] != undefined) {
              this.coins[coin.base].push(coin);
            }
            if (this.coins.USDT.length > 0) {
              this.baseUsdRateU = this.coins.USDT[0].baseUsdRate;
            }
            if (this.coins.BTC.length > 0) {
              this.baseUsdRateB = this.coins.BTC[0].baseUsdRate;
            }
            if (this.coins.ETH.length > 0) {
              this.baseUsdRateE = this.coins.ETH[0].baseUsdRate;
            }
            if (coin.symbol == this.currentCoin.symbol) {
              this.currentCoin = coin;
              this.getDep(this.currentCoin.symbol);
              this.form.buy.limitPrice = this.form.sell.limitPrice = coin.price;
            }
            this.getCNYRate();
          }
          require(["../../assets/js/exchange.js"], function(e) {
            e.clickScTab();
          });

          this.startWebsock();
        })
        .then(res => {
          if (this.isLogin) {
            this.getFavor();
          }
        });
    },
    filter(coin) {
      if (coin.closeStr != undefined)
        coin.closeStr = parseFloat(coin.closeStr).toFixed(this.baseCoinScale);
      if (coin.high != undefined)
        coin.high = parseFloat(coin.high).toFixed(this.baseCoinScale);
      if (coin.low != undefined)
        coin.low = parseFloat(coin.low).toFixed(this.baseCoinScale);
      if (coin.open != undefined)
        coin.open = parseFloat(coin.open).toFixed(this.baseCoinScale);
      if (coin.price != undefined)
        coin.price = parseFloat(coin.price).toFixed(this.baseCoinScale);
      if (coin.chg != undefined)
        coin.chg = parseFloat(coin.chg).toFixed(this.baseCoinScale);
      if (coin.change != undefined)
        coin.change = parseFloat(coin.change).toFixed(this.baseCoinScale);
    },
    getSymbolScale() {
      let that = this;
      //获取精度
      return this.$http
        .post(this.host + this.api.market.symbolInfo, {
          symbol: this.currentCoin.symbol
        })
        .then(response => {
          var resp = response.body;

          if (resp != null) {
            this.coinScale = resp.coinScale;
            this.baseCoinScale = resp.baseCoinScale;
          }
        })
        .then(res => {
        //   that.getSymbol();
        });
    },
    getPlate() {
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      this.$http
        .post(this.host + this.api.market.plate, params)
        .then(response => {
          var resp = response.body;
          let askNum = 0;
          resp.ask.map(item => {
            askNum = item.amount + askNum;
            item.totalAmount = askNum;
          });
          let bidNum = 0;
          resp.bid.map(item => {
            bidNum = item.amount + bidNum;
            item.totalAmount = bidNum;
          });
          if (resp.ask && resp.ask.length > 0) {
            if (resp.ask.length >= this.plate.maxPostion) {
              for (var i = this.plate.maxPostion; i > 0; i--) {
                var ask = resp.ask[i - 1];
                ask.direction = "SELL";
                ask.position = i;
                this.plate.askRows.push(ask);
              }
            } else {
              for (var i = resp.ask.length; i > 0; i--) {
                var ask = resp.ask[i - 1];
                ask.direction = "SELL";
                ask.position = i;
                this.plate.askRows.push(ask);
              }
            }
          }
          if (resp.bid && resp.bid.length > 0) {
            for (var i = 0; i < resp.bid.length; i++) {
              var bid = resp.bid[i];
              bid.direction = "BUY";
              bid.position = i + 1;
              this.plate.bidRows.push(bid);
              if (i == this.plate.maxPostion - 1) break;
            }
            //this.plate.bidRows = this.plate.bidRows.slice(0,this.plate.maxPostion);
          }
        });
    },
    getTrade() {
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["size"] = 20;
      this.$http
        .post(this.host + this.api.market.trade, params)
        .then(response => {
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            this.trade.rows.push(resp[i]);
          }
        });
    },
    startWebsock() {
      var stompClient = null;
      var that = this;
      var socket = new SockJS(that.host + that.api.market.ws);
      stompClient = Stomp.over(socket);
      stompClient.debug = false;

      this.datafeed = new Datafeeds.WebsockFeed(
        that.host + "/market",
        that.currentCoin,
        stompClient,
        that.baseCoinScale
      );
      that.getKline();
      stompClient.connect({}, function(frame) {
        // 订阅价格变化消息
        stompClient.subscribe("/topic/market/thumb", function(msg) {
          var resp = JSON.parse(msg.body);
          var coin = that.getCoin(resp.symbol);
          if (coin != null) {
            // that.filter(coin);

            coin.price = resp.closeStr;
            coin.rose =
              resp.chg > 0
                ? "+" + (resp.chg * 100).toFixed(2) + "%"
                : (resp.chg * 100).toFixed(2) + "%";
            coin.closeStr = resp.closeStr;
            coin.baseUsdRate = resp.baseUsdRate;
            coin.high = resp.high.toFixed(that.baseCoinScale);
            coin.low = resp.low.toFixed(that.baseCoinScale);
            coin.volume=resp.volume;
            coin.turnover = parseInt(resp.volume);
          }
        });
        //订阅实时成交信息
        stompClient.subscribe(
          "/topic/market/trade/" + that.currentCoin.symbol,
          function(msg) {
            // that.getCurrentOrder()
            var resp = JSON.parse(msg.body);
            if (resp.length > 0) {
              for (var i = 0; i < resp.length; i++) {
                that.trade.rows.unshift(resp[i]);
              }
            }
            if (that.trade.rows.length > 30) {
              that.trade.rows = that.trade.rows.slice(0, 30);
            }
          }
        );
        if (that.isLogin) {
          //订阅委托取消信息
          stompClient.subscribe(
            "/topic/market/order-canceled/" +
              that.currentCoin.symbol +
              "/" +
              that.member.id,
            function(msg) {
              var resp = JSON.parse(msg.body);
              that.refreshAccount();
            }
          );
          //订阅委托交易完成
          stompClient.subscribe(
            "/topic/market/order-completed/" +
              that.currentCoin.symbol +
              "/" +
              that.member.id,
            function(msg) {
              var resp = JSON.parse(msg.body);
              that.refreshAccount();
            }
          );
        }

        //订阅盘口消息
        stompClient.subscribe(
          "/topic/market/trade-plate/" + that.currentCoin.symbol,
          function(msg) {
            var resp = JSON.parse(msg.body);
            if (resp.direction == "SELL") {
              var asks = resp.items;
              let askNum = 0;
              resp.items.map(item => {
                askNum = item.amount + askNum;
                item.totalAmount = askNum;
              });

              that.plate.askRows = [];

              if (asks.length >= that.plate.maxPostion) {
                for (var i = that.plate.maxPostion; i > 0; i--) {
                  var ask = asks[i - 1];
                  ask.direction = "SELL";
                  ask.position = i;
                  that.plate.askRows.push(ask);
                }
              } else {
                for (var i = asks.length; i > 0; i--) {
                  var ask = asks[i - 1];
                  ask.direction = "SELL";
                  ask.position = i;
                  that.plate.askRows.push(ask);
                }
              }
            } else {
              let bidNum = 0;
              resp.items.map(item => {
                bidNum = item.amount + bidNum;
                item.totalAmount = bidNum;
              });
              var bids = resp.items;
              that.plate.bidRows = [];
              for (var i = 0; i < bids.length; i++) {
                var bid = bids[i];
                bid.direction = "BUY";
                bid.position = i + 1;
                that.plate.bidRows.push(bid);
                if (i == that.plate.maxPostion - 1) break;
              }
              // that.plate.bidRows = that.plate.bidRows.slice(0,that.plate.maxPostion);
            }
          }
        );
      });
    },
    limited_price() {
      this.isActives = false;
      this.showMarket = false;
      this.isActive = true;
    },
    market_price() {
      this.isActive = false;
      this.showMarket = true;
      this.isActives = true;
    },
    collect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.exchange.favorAdd, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.do_favorite"));
            this.getCoin(row.symbol).isFavor = true;
            row.isFavor = true;
            this.coins.favor.push(row);
          } else {
            console.log(response.body.message);
            this.$Message.error(response.body.message);
          }
        });
    },
    cancelCollect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.exchange.favorDelete, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.cancel_favorite"));
            this.getCoin(row.symbol).isFavor = false;
            for (var i = 0; i < this.coins.favor.length; i++) {
              var favorCoin = this.coins.favor[i];
              if (favorCoin.symbol == row.symbol) {
                this.coins.favor.splice(i, 1);
                break;
              }
            }
          }
        });
    },
    gohref(currentRow, oldCurrentRow) {
      location.href = "/#exchange/" + currentRow.href;
      //   this.datafeed.baseCoinScaleFunc(localStorage.baseCoinScale)
      location.reload();
    },
    buyWithLimitPrice() {
      if (this.form.buy.limitAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.buyamounttip")
        });
        return;
      }
      //判断第一个字符是否为数字
      let isNum = Number(this.form.buy.limitPrice[0]);
      if (isNaN(isNum)) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.buyamounttipwarningNum")
        });
        return;
      } else {
        var maxAmount = this.wallet.base / this.form.buy.limitPrice;
        if (this.form.buy.limitAmount > maxAmount) {
          this.$Notice.error({
            title: this.$t("exchange.tip"),
            desc: this.$t("exchange.buyamounttipwarning") + maxAmount
          });
          return;
        }

        this.isDisabled1 = true;
        var that = this;
        var params = {};
        params["symbol"] = this.currentCoin.symbol;
        params["price"] = this.form.buy.limitPrice;
        params["amount"] = this.form.buy.limitAmount;
        params["direction"] = "BUY";
        params["type"] = "LIMIT_PRICE";

        this.$http
          .post(this.host + this.api.exchange.orderAdd, params)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Notice.success({
                title: that.$t("exchange.tip"),
                desc: that.$t("exchange.success")
              });
              this.isDisabled1 = false;
              this.getWallet();
              this.getCurrentOrder();
              this.getHistoryOrder();
              this.form.buy.limitAmount = 0;
            } else {
              this.$Notice.error({
                title: that.$t("exchange.tip"),
                desc: resp.message
              });
              this.isDisabled1 = false;
            }
          });
      }
    },
    buyWithMarketPrice() {
      if (this.form.buy.marketAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.pricetip")
        });
        return;
      }
      if (this.form.buy.marketAmount > parseFloat(this.wallet.base)) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.pricetipwarning") + this.wallet.base
        });
        return;
      }
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] = 0;
      params["amount"] = this.form.buy.marketAmount;
      params["direction"] = "BUY";
      params["type"] = "MARKET_PRICE";
      this.isDisabled2 = true;
      var that = this;
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success")
            });
            this.isDisabled2 = false;
            this.refreshAccount();
            this.form.buy.marketAmount = "";
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message
            });
            this.isDisabled2 = false;
          }
        });
    },
    sellLimitPrice() {
      // var userkey = localStorage.getItem('USERKEY');
      // if (userkey != "aisizx") {
      //     this.$Notice.error({
      //         title: this.$t('exchange.tip'),
      //         desc: "Submit failed"
      //     });
      //     return;
      // }
      if (this.form.sell.limitAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellamounttip")
        });
        return;
      }
      if (this.form.sell.limitPrice == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellpricetip")
        });
        return;
      }
      //判断第一个字符是否为数字
      let isNum = Number(this.form.sell.limitPrice[0]);
      if (isNaN(isNum)) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.buyamounttipwarningNum")
        });
        return;
      } else {
        if (this.form.sell.limitAmount > parseFloat(this.wallet.coin)) {
          this.$Notice.error({
            title: this.$t("exchange.tip"),
            desc: this.$t("exchange.sellamounttipwarning") + this.wallet.coin
          });
          return;
        }
        if (
          this.currentCoin.base.toLowerCase() == "usdt" &&
          this.currentCoin.coin.toLowerCase() == "gcx"
        ) {
          // if(this.form.sell.limitAmount > 2 || this.form.sell.limitPrice < 16.80) {
          // if(this.form.sell.limitPrice < 16.80) {
          if (this.form.sell.limitPrice < 8.0) {
            this.$Notice.error({
              title: this.$t("exchange.tip"),
              desc: "Submit failed"
            });
            return;
          }
        }
        var params = {};
        params["symbol"] = this.currentCoin.symbol;
        params["price"] = this.form.sell.limitPrice;
        params["amount"] = this.form.sell.limitAmount;
        params["direction"] = "SELL";
        params["type"] = "LIMIT_PRICE";
        this.isDisabled3 = true;
        var that = this;
        this.$http
          .post(this.host + this.api.exchange.orderAdd, params)
          .then(response => {
            var resp = response.body;

            if (resp.code == 0) {
              this.$Notice.success({
                title: that.$t("exchange.tip"),
                desc: that.$t("exchange.success")
              });
              this.isDisabled3 = false;
              this.refreshAccount();
              this.form.sell.limitAmount = 0;
            } else {
              this.$Notice.error({
                title: that.$t("exchange.tip"),
                desc: resp.message
              });
              this.isDisabled3 = false;
            }
          });
      }
    },
    sellMarketPrice() {
      if (this.form.sell.marketAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellamounttip")
        });
        return;
      }
      if (this.form.sell.marketAmount > parseFloat(this.wallet.coin)) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellamounttipwarning") + this.wallet.coin
        });
        return;
      }
      /*
            this.$Notice.error({
                title: this.$t('exchange.tip'),
                desc: "Submit failed"
            });
            return;*/

      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] = 0;
      params["amount"] = this.form.sell.marketAmount;
      params["direction"] = "SELL";
      params["type"] = "MARKET_PRICE";
      this.isDisabled4 = true;
      var that = this;
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success")
            });
            this.isDisabled4 = false;
            this.form.sell.marketAmount = "";
            this.refreshAccount();
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message
            });
            this.isDisabled4 = false;
          }
        });
    },
    buyPlate(currentRow) {
      this.form.buy.limitPrice = String(currentRow.price);
      this.form.sell.limitPrice = String(currentRow.price);
    },
    sellPlate(currentRow) {
      this.form.buy.limitPrice = String(currentRow.price);
      this.form.sell.limitPrice = String(currentRow.price);
    },
    /**
     * 获取钱包信息
     */
    getWallet() {
      this.$http
        .post(this.host + this.api.uc.wallet + this.currentCoin.base, {})
        .then(response => {
          var resp = response.body;
          this.wallet.base = resp.data.balance;
        });
      this.$http
        .post(this.host + this.api.uc.wallet + this.currentCoin.coin, {})
        .then(response => {
          var resp = response.body;
          this.wallet.coin = resp.data.balance;
        });
    },
    getCurrentOrder() {
      //查询当前委托
      var params = {};
      params["pageNo"] = 0;
      params["pageSize"] = 100;
      params["symbol"] = this.currentCoin.symbol;
      // this.currentOrder.rows = [];
      var that = this;
      this.$http
        .post(this.host + this.api.exchange.current, params)
        .then(response => {
          var resp = response.body;
          if (resp.content) {
            this.currentOrder.rows = resp.content;
            this.currentOrder.rows.forEach((row, index) => {
              row.price =
                row.type == "MARKET_PRICE"
                  ? that.$t("exchange.marketprice")
                  : row.price.toFixed(that.baseCoinScale);
              row.amount =
                row.type == "MARKET_PRICE" && row.direction == "BUY"
                  ? "--"
                  : row.amount.toFixed(that.coinScale);
            });
          }
        });
    },
    getHistoryOrder(pageNo) {
      //查询历史委托
      if (pageNo == undefined) {
        pageNo = this.historyOrder.page;
      } else {
        pageNo = pageNo - 1;
      }
      this.historyOrder.rows = [];
      var params = {};
      params["pageNo"] = pageNo;
      params["pageSize"] = this.historyOrder.pageSize;
      params["symbol"] = this.currentCoin.symbol;
      var that = this;
      this.$http
        .post(this.host + this.api.exchange.history, params)
        .then(response => {
          var resp = response.body;
          if (resp.content.length && resp.content.length > 0) {
            this.historyOrder.total = resp.totalElements;
            this.historyOrder.page = resp.number;
            for (var i = 0; i < resp.content.length; i++) {
              var row = resp.content[i];
              row.price =
                row.type == "MARKET_PRICE"
                  ? that.$t("exchange.marketprice")
                  : row.price;
              this.historyOrder.rows = resp.content;
            }
          }
        });
    },
    cancel(index) {
      var order = this.currentOrder.rows[index];
      this.$Modal.confirm({
        content: this.$t("exchange.undotip"),
        onOk: () => {
          this.$http
            .post(
              this.host + this.api.exchange.orderCancel + "/" + order.orderId,
              {}
            )
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.refreshAccount();
              } else {
                this.$Notice.error({
                  title: this.$t("exchange.tip"),
                  desc: resp.message
                });
              }
            });
        }
      });
    },
    refreshAccount: function() {
      this.getCurrentOrder();
      this.getHistoryOrder();
      this.getWallet();
    },
    timeFormat: function(tick) {
      return moment(tick).format("HH:mm:ss");
    },
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    keyEvent(event) {
      // this.getSymbolScale().then(function(){
      var re1 = new RegExp(
        "([0-9]+.[0-9]{" + this.baseCoinScale + "})[0-9]*",
        ""
      );
      if (this.form.buy.limitPrice == "00") {
        this.form.buy.limitPrice = this.form.buy.limitPrice
          .toString()
          .replace("00", "0");
      }
      if (this.form.sell.limitPrice == "00") {
        this.form.sell.limitPrice = this.form.sell.limitPrice
          .toString()
          .replace("00", "0");
      }
      this.form.buy.limitPrice = this.form.buy.limitPrice
        .toString()
        .replace(re1, "$1");
      this.form.sell.limitPrice = this.form.sell.limitPrice
        .toString()
        .replace(re1, "$1");
    },
    checkText(val, name) {
      var reg = /([\u4E00-\u9FA5]|[A-Za-z])+/; //只要包含中文或者字母就提示
      if (reg.test(val)) {
        if (name === "this.form.buy.marketAmount") {
          this.form.buy.marketAmount = "";
        } else if (name === "this.form.buy.limitAmount") {
          this.form.buy.limitAmount = "";
        } else if (name === "this.form.sell.limitAmount") {
          this.form.sell.limitAmount = "";
        } else if (name === "this.form.sell.marketAmount") {
          this.form.sell.marketAmount = "";
        }

        return false;
      }
    },
    keyEventOnOff(event) {
      this.switch[event] = false;
      var re1 = new RegExp(
        "([0-9]+.[0-9]{" + this.baseCoinScale + "})[0-9]*",
        ""
      );
      var re2 = new RegExp("([0-9]+.[0-9]{" + this.coinScale + "})[0-9]*", "");
      if (this.form.buy.marketAmount == "00") {
        this.form.buy.marketAmount = this.form.buy.marketAmount
          .toString()
          .replace("00", "0");
      }
      if (this.form.buy.limitAmount == "00") {
        this.form.buy.limitAmount = this.form.buy.limitAmount
          .toString()
          .replace("00", "0");
      }
      if (this.form.sell.limitAmount == "00") {
        this.form.sell.limitAmount = this.form.sell.limitAmount
          .toString()
          .replace("00", "0");
      }
      if (this.form.sell.marketAmount == "00") {
        this.form.sell.marketAmount = this.form.sell.marketAmount
          .toString()
          .replace("00", "0");
      }
      this.form.buy.marketAmount = this.form.buy.marketAmount
        .toString()
        .replace(re1, "$1");
      this.form.buy.limitAmount = this.form.buy.limitAmount
        .toString()
        .replace(re2, "$1");
      this.form.sell.limitAmount = this.form.sell.limitAmount
        .toString()
        .replace(re2, "$1");
      this.form.sell.marketAmount = this.form.sell.marketAmount
        .toString()
        .replace(re2, "$1");
      this.sliderValue.limitBuyVa =
        this.form.buy.limitAmount /
        (this.wallet.base / this.form.buy.limitPrice) *
        100;
      // })
      this.sliderValue.marketBuyVa =
        this.form.buy.marketAmount / this.wallet.base * 100;
      this.sliderValue.limitSellVa =
        this.form.sell.limitAmount / this.wallet.coin * 100;
      this.sliderValue.marketSellVa =
        this.form.sell.marketAmount / this.wallet.coin * 100;
      this.checkText(this.form.buy.marketAmount, "this.form.buy.marketAmount");
      this.checkText(this.form.buy.limitAmount, "this.form.buy.limitAmount");
      this.checkText(this.form.sell.limitAmount, "this.form.sell.limitAmount");
      this.checkText(
        this.form.sell.marketAmount,
        "this.form.sell.marketAmount"
      );
    }
  },
  beforeDestroy:function(){
        window.clearInterval(this.timer)
    },
};
</script>
<style>
.trade_bd button.buyBtn,
.sellBtn {
}
.trade_bd button.buyBtn {
  background: #2eb363;
}
.trade_bd button.sellBtn {
  background: #ee6560;
}
.container.exchange .ivu-icon-android-star {
  color: #bc9105;
}
.ivu-table-with-fixed-top .ivu-table-cell {
}
#exTab .ivu-tabs-nav-scroll div.nav-text.ivu-tabs-nav {
  width: 100%;
}
#exTab .ivu-tabs-nav-scroll div.nav-text.ivu-tabs-nav .ivu-tabs-tab {
  width: 25%;
  margin: 0;
  text-align: center;
}
.sliderWarp {
  position: relative;
}
.roundWarp {
  position: absolute;
  width: 100%;
  height: 100%;
}
.roundFlexWarp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.round {
  width: 2px;
  height: 10px;
  background: #fff;
  border-radius: 1px;
}
</style>

