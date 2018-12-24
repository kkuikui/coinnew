<template>
    <div class="index-wrap">
        <div id="fullpage">
            <div class="page1">
                <Carousel autoplay :arrow="showArrow" :autoplay-speed="speed" v-model="valueCal" loop>
                    <CarouselItem v-for="(item,index) in picList" :key="index">
                        <div :style="'background-image: url('+item.url+')'" class="carousel-item">
                            <a v-show="item.linkUrl!=''&&item.linkUrl!='1'" style="display:block;width:100%;height: 100%;"
                             :href="item.linkUrl" target="_blank"></a>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <div class="page2">
                <div class="wrapper">
                    <ul class="row clearfix">
                        <li v-for="(item,index) in indexBtn" :key="index" @click="addClass(index)"
                         :class="['cell', { 'active': index==choseBtn}]">{{item.text}}</li>
                    </ul>
                </div>
            </div>
            <div class="page3">
                <div class="wrapper">
                    <Table id="USDT" v-show="true" :columns="coins.columns" :data="dataIndex" class="tables"></Table>
                </div>
                <!-- <div class="carouselRignt">
                    <Carousel autoplay :arrow="showArrow" :autoplay-speed="speed" v-model="valueCal" loop>
                        <CarouselItem v-for="(item,index) in picList" :key="index">
                            <div :style="'background-image: url('+item.url+')'" class="carousel-item">
                                <a v-show="item.linkUrl!=''&&item.linkUrl!='1'" style="display:block;width:100%;height: 100%;"
                                :href="item.linkUrl" target="_blank"></a>
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div> -->
            </div>
            <div class="page4">
                <div class="wrapper">
                    <Row>
                        <Col span="7">
                            <img src="../../assets/images/index11.png" alt="">
                            <p>{{$t('description.message1')}}</p>
                        </Col>
                        <Col span="7">
                            <img src="../../assets/images/index22.png" alt="">
                            <p>{{$t("description.message2")}}</p>
                        </Col>
                        <Col span="10">
                            <!-- <img src="../../assets/images/index33.png" alt="" style="margin-bottom:10px;"> -->
                            <h1 class="number">{{$t("description.message6")}}</h1>
                            <h1 class="eng">{{$t("description.message7")}}</h1>
                            <p class="word">{{$t("description.message3")}}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="section" id="page5">

            </div>
            <div class="page5">
                <div class="wrapper">
                    <h1 class="advH">{{$t("description.message4")}}</h1>
                    <p class="advm">{{$t("description.message5")}}</p>
                    <div class="download">
                        <div @click="donwload(0)" class="download1 downitem">
                            <i></i>
                            <span>{{$t("description.message8")}}</span>
                        </div>
                        <div @click="donwload(1)" class="download2 downitem">
                            <i></i>
                            <span>{{$t("description.message9")}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div id="onlineservice">
            <a href="http://kefu.caymanex.pro:80/im/text/15FwEk.html" target="_blank"></a>
        </div> -->
         <Modal v-model="qcCode"  title=""   class-name='qcCode' :footer-hide='true' >
            <qriously :value="qriously.value" :size="qriously.size" />
        </Modal>
    </div>
</template>

<script>
import Vue from "vue";
import VueQriously from "vue-qriously";
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var moment = require("moment");
import SvgLine from "@components/exchange/SvgLine.vue";
Vue.use(VueQriously);
export default {
  components: { SvgLine, VueQriously },
  data() {
    let self = this;
    return {
      qcCode: false,
      qriously: {
        value: "",
        size: 200
      },
      timer: null,
      CNYRate: null,
      zx: false,
      CNYRateU: 1,
      CNYRateB: 1,
      CNYRateR: 1,
      CNYRateE: 1,
      baseUsdRateU: null,
      baseUsdRateE: null,
      baseUsdRateB: null,
      // baseUsdRateB: null,
      // baseUsdRateE: null,
      dataIndex: [],
      //当前市场上的交易币种，按交易对分
      coins: {
        _map: [],
        USDT: [],
        BTC: [],
        ETH: [],
        favor: [],
        columns: [
          {
            title: self.$t("service.COIN"),
            align: "center",
            key: "coin",
            width: 100,
            render: function(h, params) {
              const className = params.row.href + "icon" + " indexicon";
              var iconName = "";
              let text = "";
              if (params.row.coin == "BTC") {
                iconName = "比特币";
              } else if (params.row.coin == "ETH") {
                iconName = "以太币";
              } else if (params.row.coin == "GCC") {
                iconName = "银河链";
              }
              if (params.row.isZX == true && self.zx == true) {
                text = params.row.symbol;
              } else {
                text = params.row.coin;
              }

              return h("div", [
                h(
                  "span",
                  {
                    attrs: {
                      //class: className
                    }
                  },
                  params.row.memberName
                ),
                h("span", {}, text)
              ]);
            }
          },
          {
            title: self.$t("service.NewPrice"),
            align: "center",
            key: "price",
            width: 220,
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
            render: function(h, params) {
              let symbol = params.row.symbol.split("/")[1].toUpperCase();
              let rowPrice = "";
              let CNYRate = null;
              if (symbol == "USDT") {
                CNYRate = self.CNYRateR * self.baseUsdRateU;
                rowPrice = "₮";
              } else if (symbol == "BTC") {
                // CNYRate = self.baseUsdRateB * self.CNYRateR;
                rowPrice = "฿";
              } else if (symbol == "ETH") {
                CNYRate = self.CNYRateE * self.baseUsdRateB;
                rowPrice = "E";
              }

              let rmb = parseFloat(params.row.price * 6.5)
                .toFixed(3)
                .slice(0, -1);

              if (CNYRate != null) {
                rmb = parseFloat(params.row.price * CNYRate).toFixed(2);
              }

              const isgreen =
                parseFloat(params.row.rose) < 0 ? "none" : "inline-block";
              const nogreen =
                parseFloat(params.row.rose) < 0 ? "inline-block" : "none";
              let v = rowPrice + params.row.closeStr + " /￥" + rmb;
              return h("div", [
                h("span", {}, v),
                h(
                  "Icon",
                  {
                    props: {
                      type: "arrow-up-c"
                    },
                    style: {
                      display: isgreen,
                      fontSize: "16px",
                      marginLeft: "5px",
                      verticalAlign: "middle"
                    },
                    class: {
                      green: true
                    }
                  },
                  "↑"
                ),
                h(
                  "Icon",
                  {
                    props: {
                      type: "arrow-down-c"
                    },
                    style: {
                      display: nogreen,
                      fontSize: "16px",
                      marginLeft: "5px",
                      verticalAlign: "middle"
                    },
                    class: {
                      red: true
                    }
                  },
                  "↓"
                )
              ]);
            }
          },
          {
            title: self.$t("service.ExchangeNum"),
            align: "center",
            key: "volume",
            width: 150,
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            }
            // render(h, params) {
            //   let length = params.row.closeStr.split(".")[1].length;
            //   let opens = parseFloat(params.row.volume).toFixed(length+1).slice(0,-1);
            //   return h("span", {}, opens);
            // },
          },
          {
            title: self.$t("service.OpenPrice"),
            align: "center",
            key: "open",
            width: 150,

            sortable: true,
            render(h, params) {
              // let length = params.row.closeStr.split(".")[1].length;
              //   console.log(length)
              let opens = params.row.open;
              return h("span", {}, opens);
            },
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            }
          },
          {
            title: self.$t("service.Change"),
            align: "center",
            key: "rose",
            width: 180,
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
              const row = params.row;
              const className = parseFloat(row.rose) < 0 ? "red" : "green";
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
            title: self.$t("service.PriceTrend"),
            align: "center",
            render: function(h, params) {
              let texts = [];
              if (params.row.trend != "") {
                texts = params.row.trend;
              } else {
                texts = [0];
              }
              return h(SvgLine, {
                props: {
                  values: params.row.trend,
                  rose: params.row.rose,
                  width: 100,
                  height: 40
                }
              });
            }
          },
          {
            title: self.$t("service.Operate"),
            align: "center",
            key: "buyBtn",
            width: 150,
            render: function(h, params) {
              return h("p", [
                h(
                  "a",
                  {
                    style: {
                      color: "#fff"
                    },
                    on: {
                      click: function() {
                        self.$router.push("/exchange/" + params.row.href);
                      }
                    }
                  },
                  [
                    h(
                      "button",
                      {
                        attrs: {
                          class: "buttonstyle"
                        },
                        style: {
                          marginRight: "8px",
                          width: "80%"
                        }
                      },
                      self.$t("service.Exchange")
                    )
                  ]
                )
              ]);
            }
          }
        ]
      },
      indexBtn: [
        {
          text: this.$t("service.USDT")
        },
        {
          text: this.$t("service.BTC")
        },
        {
          text: this.$t("service.ETH")
        },
        {
          text: this.$t("service.CUSTOM")
        }
      ],
      choseBtn: 0,
      valueCal: 0,
      showArrow: "never",
      speed: 5000,
      symbol: "",
      usdtData: [],
      usdtList: [],
      btcList: [],
      ethList: [],
      picList: [
        // {
        //   url:'../../assets/images/banner1.jpg'
        // },{
        //   url:'../../assets/images/banner2.jpg'
        // }
      ]
    };
  },
  created: function() {
    this.getCNYRate();
    this.init();
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    lang: function() {
      return this.$store.state.lang;
    }
  },
  watch: {
    lang: function() {
      this.updateLangData();
    },
    "currentCoin.price": function() {
      this.getCNYRate(this.currentCoin.base);
      this.getSymbolScale();
      this.getPlate();
    }
  },
  mounted: function() {
    this.getSymbol();
    let that = this;
    this.timer = setInterval(function() {
      that.getCNYRate();
    }, 1000 * 60 * 5);
  },
  methods: {
    updateLangData() {
      this.indexBtn = [
        {
          text: this.$t("service.USDT")
        },
        {
          text: this.$t("service.BTC")
        },
        {
          text: this.$t("service.ETH")
        },
        {
          text: this.$t("service.CUSTOM")
        }
      ];

      this.coins.columns[0].title = this.$t("service.COIN");
      this.coins.columns[1].title = this.$t("service.NewPrice");
      this.coins.columns[2].title = this.$t("service.ExchangeNum");
      this.coins.columns[3].title = this.$t("service.OpenPrice");
      this.coins.columns[4].title = this.$t("service.Change");
      this.coins.columns[5].title = this.$t("service.PriceTrend");
      this.coins.columns[6].title = this.$t("service.Operate");
    },
    openActivity(url) {},
    getCNYRate() {
      this.$http
        .post(this.host + "/market/exchange-rate/" + "usd-cny")
        .then(response => {
          var resp = response.body;
          this.CNYRateR = resp.data;
          //   console.log(this.CNYRateR);
        });

      this.$http
        .post(this.host + "/market/exchange-rate/cny/" + "usdt")
        .then(response => {
          var resp = response.body;
          this.CNYRateU = resp.data;
          // this.$store.commit('setUsdcny',resp.data);
        });
    },
    init() {
      this.$store.commit("navigate", "nav-index");
      this.$store.state.HeaderActiveName = "1-1";
      this.loadPicData();
      this.addClass(0);
    },
    //   getCNYRate(){
    //      this.$http.post(this.host + '/market/exchange-rate/usd-cny').then(response => {
    //        var resp = response.body;
    //        this.CNYRate = resp.data;
    //      });
    //   },
    donwload(type) {
      //   const title = this.$t("common.tip");
      //   const content = "<p>" + this.$t("common.expect") + "</p>";
      //   this.$Modal.info({
      //     title: title,
      //     content: content,
      //     closable: true
      //   });

      this.qcCode = true;

      this.qriously.value = this.url + "/update/download.html";
    },
    loadPicData() {
      let param = {};
      param["sysAdvertiseLocation"] = 1;
      this.$http
        .post(this.host + "/uc/ancillary/system/advertise", param)
        .then(response => {
          var result = response.body;
          if (result.code == 0 && result.data.length > 0) {
            this.picList = result.data;
          }
        });
    },
    getCoin(symbol) {
      return this.coins._map[symbol];
    },
    startWebsock() {
      var stompClient = null;
      var that = this;
      var socket = new SockJS(that.host + that.api.market.ws);
      stompClient = Stomp.over(socket);
      stompClient.debug = false;
      stompClient.connect({}, function(frame) {
        //订阅价格变化消息
        stompClient.subscribe("/topic/market/thumb", function(msg) {
          var resp = JSON.parse(msg.body);
          var coin = that.getCoin(resp.symbol);
          if (coin != null) {
            // that.filter(coin);
            coin.price = resp.close;
            coin.rose =
              resp.chg > 0
                ? "+" + (resp.chg * 100).toFixed(2) + "%"
                : (resp.chg * 100).toFixed(2) + "%";
            coin.close = resp.closeStr;
            coin.closeStr = resp.closeStr;
            coin.baseUsdRate = resp.baseUsdRate;
            // coin.high = resp.high.toFixed(2);
            // coin.low = resp.low.toFixed(2);
            coin.turnover = parseInt(resp.volume);
            coin.volume = resp.volume;
          }
        });
      });
    },
    round(v, e) {
      var t = 1;
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t;
    },
    mul(a, b) {
      var c = 0,
        d = a.toString(),
        e = b.toString();
      try {
        c += d.split(".")[1].length;
      } catch (f) {}
      try {
        c += e.split(".")[1].length;
      } catch (f) {}
      return (
        Number(d.replace(".", "")) *
        Number(e.replace(".", "")) /
        Math.pow(10, c)
      );
    },
    addClass(index) {
      this.choseBtn = index;
      if (index == 0) {
        this.dataIndex = this.coins.USDT;
        this.zx = false;
      } else if (index == 1) {
        this.dataIndex = this.coins.BTC;
        this.zx = false;
      } else if (index == 2) {
        this.dataIndex = this.coins.ETH;
        this.zx = false;
      } else if (index == 3) {
        if (this.isLogin) {
          this.dataIndex = this.coins.favor;
          this.zx = true;
        } else {
          this.$router.push("/login");
          this.zx = false;
        }
      }
      //   console.log(this.dataIndex)
    },
    // filter(coin) {
    //   if (coin.close != undefined)
    //     coin.close = parseFloat(coin.close).toFixed(this.baseCoinScale);
    //   if (coin.high != undefined)
    //     coin.high = parseFloat(coin.high).toFixed(this.baseCoinScale);
    //   if (coin.low != undefined)
    //     coin.low = parseFloat(coin.low).toFixed(this.baseCoinScale);
    //   if (coin.open != undefined)
    //     coin.open = parseFloat(coin.open).toFixed(this.baseCoinScale);
    //   if (coin.price != undefined)
    //     coin.price = parseFloat(coin.price).toFixed(this.baseCoinScale);
    //   if (coin.chg != undefined)
    //     coin.chg = parseFloat(coin.chg).toFixed(this.baseCoinScale);
    //   if (coin.change != undefined)
    //     coin.change = parseFloat(coin.change).toFixed(this.baseCoinScale);
    // },
    getSymbol() {
      this.$http
        .post(this.host + this.api.market.thumbTrend, {})
        .then(response => {
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            var coin = resp[i];
            // this.filter(coin);
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
            // this.coins[coin.base].push(coin);
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
          }
          if (this.isLogin) {
            this.getFavor();
          }
          this.startWebsock();
        });
    },
    getFavor() {
      //查询自选

      this.$http
        .post(this.host + this.api.exchange.favorFind, {})
        .then(response => {
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            var coin = this.getCoin(resp[i].symbol);
            if (coin != undefined) {
              coin.isZX = true;
              this.coins.favor.push(coin);
            }
          }
        });
    }
  },
  beforeDestroy: function() {
    window.clearInterval(this.timer);
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";

/* 二维码 */
.qcCode {
  .ivu-modal {
    width: 250px !important;
  }
  .ivu-modal-content {
    padding-top: 20px;
  }
  .ivu-modal-body {
    padding: 28px 20px 30px 26px;
  }
}

// Table样式修改
.page3 {
  .ivu-table-wrapper {
    position: relative;
    border: 0px solid #dddee1;
    border-bottom: 0;
    border-right: 0;
  }
  .ivu-table {
    &::before {
      height: 0px;
    }
    &::after {
      height: 0px;
    }
    .ivu-table-header {
      background: #fff;
    }
  }
}
// button等样式修改
.ivu-table-cell {
  .buttonstyle {
    color: @bgColor;
    height: 30px;
    background: @avatarColor;
    border-color: @avatarColor;
    border-radius: 20px;
  }
  .red {
    color: @fallColor !important;
  }
  .green {
    color: @riseColor !important;
  }
}
</style>

<style lang="less" scoped>
@import "../../styles/common.less";

.index-wrap {
  width: 100%;
  min-width: 1200px;
  .page1 {
    height: 575px;
    .carousel-item {
      background-repeat: no-repeat;
      background-position: center;
      height: 575px;
      background-size: cover;
    }
  }
  .page2 {
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    // color: @bgColor;
    // background-color:@bgColor;
    .wrapper {
      width: 1200px;
      .row {
        text-align: center;
        border-bottom: 1px solid #ddd;
        .cell {
          float: left;
          width: 20%;
          cursor: pointer;
          &:hover {
            // color: @bgColor;
            // background: #122f8f;
            color: #122f8f;
            border-bottom: 3px solid #122f8f;
          }
          &.active {
            position: relative;
            color: #122f8f;
            border-bottom: 3px solid #122f8f;
            // &:after {
            //   border-top: 10px solid #122f8f;
            //   border-left: 10px solid transparent;
            //   border-right: 10px solid transparent;
            //   bottom: -10px;
            //   left: 47%;
            //   position: absolute;
            //   content: " ";
            // }
          }
        }
      }
    }
  }
  .page3 {
    margin: 20px 0;
    padding: 0 50px;
    min-height: 150px;
    .wrapper {
      width: 1200px;
    }
  }
  .page4 {
    height: 350px;
    background-color: rgb(244, 245, 245);
    .wrapper {
      padding-top: 80px;
      width: 1200px;
      .ivu-col {
        text-align: center;
        p {
          font-size: 15px;
          margin: 30px 0;
          text-align: center;
          padding: 5px 25px;
        }
        .number {
          top: 0;
          text-align: left;
          color: @baseColor;
          font-size: 45px;
          margin-bottom: 10px;
          padding: 0 20px 0 25px;
        }
        .eng {
          text-align: left;
          color: #626262;
          font-size: 35px;
          padding: 0 20px 0 25px;
        }
        .word {
          margin-top: 25px;
          text-align: left;
          padding: 0 25px;
        }
      }
    }
  }
  .page5 {
    position: relative;
    height: 350px;
    background-color: @baseColor;
    .wrapper {
      padding-top: 80px;
      text-align: center;
      .advH {
        font-size: 30px;
        color: @bgColor;
      }
      .advm {
        padding: 10px 0;
        font-size: 18px;
        color: @borderLine;
        font-weight: 300;
      }
      .download {
        position: relative;
        margin: 20px 20%;
        text-align: center;
        cursor: pointer;
        height: 57px;
        .downitem {
          margin: 0 10px;
          display: inline-block;
          height: 55px;
          width: 200px;
          line-height: 55px;
          border-radius: 4px;
          &.download1 {
            border: 1px solid @avatarColor;
            background: @avatarColor;
            i {
              background: url("../../assets/images/iosi.png") no-repeat center;
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          &.download2 {
            border: 1px solid #dee6ff;
            background: #dee6ff;
            i {
              background: url("../../assets/images/and.png") no-repeat center;
            }
            span {
              color: @baseColor;
              font-size: 16px;
            }
          }
          i {
            width: 28px;
            height: 32px;
            vertical-align: middle;
            margin-bottom: 10px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>