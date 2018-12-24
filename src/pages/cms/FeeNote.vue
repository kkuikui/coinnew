<template>
  <div class="content-wrap about_fee">
    <img src="../../assets/images/call.png">
    <div class="wrapper">
      <div class="container">
        <Row>
          <Col span="4">
            <div class="leftmenu">
              <ul class="nav">
                <li class="listtitle">{{$t('cms.about')}}</li>
                <li><router-link to="/about-rule" class="pill-item">{{$t('cms.exchangerule')}}</router-link></li>
                <li><router-link to="/about-protocol" class="pill-item">{{$t('cms.useprotocol')}}</router-link></li>
                <li><router-link to="/about-fee" class="pill-item">{{$t('cms.feenote')}}</router-link></li>
                <li><router-link to="/about-merchant" class="pill-item">{{$t('cms.merchantprocotol')}}</router-link></li>
              </ul>
            </div>
          </Col>
          <Col span="20">
            <div class="rightcontent">
              <div class="header">
                <h2>{{$t('cms.feenote')}}</h2>
                <div class="line">
                  <div class="line1"></div>
                </div>
              </div>
            <div class="WordSection1" style="layout-grid:15.6pt">
              <p class="MsoNormal"><span lang=EN-US>bidui</span><span>平台交易手续费说明</span></p>
              <p class="MsoNormal"><b><span>一、法币交易费率</span></b></p>
              <p class="MsoNormal"><span lang=EN-US>1</span><span>、法币交易区买入和卖出数字资产手续费全免；</span></p>
              <p class="MsoNormal"><span lang=EN-US>2</span><span>、法币交易区发布广告完成交易收取广告方交易额的1%作为手续费。</span></p>
              <p class="MsoNormal"><b><span lang=EN-US>&nbsp;</span></b></p>

              <p class="MsoNormal"><b><span>二、充币费率</span></b></p>
              <p class="MsoNormal"><span lang=EN-US>1</span><span>、充值任何数字货资产，均无手续费。</span></p>
              <p class="MsoNormal"><b><span lang=EN-US>&nbsp;</span></b></p>

              <p class="MsoNormal"><b><span lang=EN-US>三、</span></b><b><span>币币交易费率</span></b></p>
              <p class="MsoNormal">
                  <span>注：从2018年9月13日起，币币交易中所有买卖单免手续费，如有变动，以公告为准！</span>
              </p>
              <table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 align=left width=0 style='background:white;border-collapse:collapse;border:none;'>
                <tr style="height:18.45pt">
                  <td width=131 style='width:98.0pt;border:dotted windowtext 1.0pt;padding: 0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>交易对</span>
                  </td>
                  <td width=200 style='width:149.9pt;border:dotted windowtext 1.0pt;border-left:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span>基币费率</span>
                  </td>
                  <td width=239 style='width:179.35pt;border:dotted windowtext 1.0pt;border-left:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span>交易币费率</span>
                  </td>
                </tr>
                <tr style="height: 18.45pt" v-for="(item,index) in symbol" :key="index"> 
                  <td width=131 style='width:98.0pt;border:dotted windowtext 1.0pt;border-top:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{item.symbol}}</span>
                  </td>
                  <td width=200 style='width:149.9pt;border-top:none;border-left:none;border-bottom:dotted windowtext 1.0pt;border-right:dotted windowtext 1.0pt;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{parseFloat(item.baseFee*100) + "%"}}</span>
                  </td>
                  <td width=239 style='width:179.35pt;border-top:none;border-left:none;border-bottom:dotted windowtext 1.0pt;border-right:dotted windowtext 1.0pt;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{parseFloat(item.fee*100) + "%"}}</span>
                  </td>
                </tr>
              </table>

              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
              <p class="MsoNormal"><span>提示</span></p>
              <p class="MsoNormal"><span lang=EN-US>1</span><span>、挂单是你所下的限价单并未与当前挂单成交，并被放在买卖盘中等待成交的摆单，它增加了买卖盘的流动性。</span></p>
              <p class="MsoNormal"><span lang=EN-US>2</span><span>、当其他人的摆单主动与你所下的摆单成交，你将支付挂单交易手续费（请注意当其他人的限价单与你的限价单成交，而下单时间又早于你时，你将支付吃单费）。</span></p>
              <p class="MsoNormal"><span lang=EN-US>3</span><span>、吃单是你所下的限价单或市价单与当前的挂单直接成交。</span></p>
              <p class="MsoNormal"><span lang=EN-US>4</span><span>、当你所下的摆单主动与其他人的摆单成交，你将支付吃单交易手续费。</span></p>
              <p class="MsoNormal"><span lang=EN-US>5</span><span>、交易手续费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币交易手续费。</span></p>
              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>

              <p class="MsoNormal"><b><span>四、提币费率</span></b></p>
              <table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 align=left width=0 style='background:white;border-collapse:collapse;border:none;'>
                <tr style='height:18.45pt'>
                  <td width=131 style='width:98.0pt;border:dotted windowtext 1.0pt;padding: 0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>币种</span>
                  </td>
                  <td width=200 style='width:149.9pt;border:dotted windowtext 1.0pt;border-left:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span>是否允许提币</span>
                  </td>
                  <td width=239 style='width:199.35pt;border:dotted windowtext 1.0pt;border-left:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span>每次提币手续费（个）</span>
                  </td>
                  <td width=239 style='width:179.35pt;border:dotted windowtext 1.0pt;border-left:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span>最小提币量（个）</span>
                  </td>
                  <td width=239 style='width:179.35pt;border:dotted windowtext 1.0pt;border-left:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span>最大提币量（个）</span>
                  </td>
                  <td width=239 style='width:179.35pt;border:dotted windowtext 1.0pt;border-left:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span>自动提币阀值（个）</span>
                  </td>
                </tr>
                <tr style="height: 18.45pt" v-for="(item,index) in fee" :key="index">
                  <td width=131 style='width:98.0pt;border:dotted windowtext 1.0pt;border-top:none;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{item.name}}</span>
                  </td>
                  <td width=200 style='width:149.9pt;border-top:none;border-left:none;border-bottom:dotted windowtext 1.0pt;border-right:dotted windowtext 1.0pt;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{item.enableWithdraw}}</span>
                  </td>
                  <td width=239 style='width:179.35pt;border-top:none;border-left:none;border-bottom:dotted windowtext 1.0pt;border-right:dotted windowtext 1.0pt;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{item.withdrawFee}}</span>
                  </td>
                  <td width=239 style='width:179.35pt;border-top:none;border-left:none;border-bottom:dotted windowtext 1.0pt;border-right:dotted windowtext 1.0pt;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{item.minWithdrawAmount}}</span>
                  </td>
                  <td width=239 style='width:179.35pt;border-top:none;border-left:none;border-bottom:dotted windowtext 1.0pt;border-right:dotted windowtext 1.0pt;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{item.maxWithdrawAmount}}</span>
                  </td>
                  <td width=239 style='width:179.35pt;border-top:none;border-left:none;border-bottom:dotted windowtext 1.0pt;border-right:dotted windowtext 1.0pt;padding:0cm 18.0pt 0cm 18.0pt;height:18.45pt'>
                    <span lang=EN-US>{{item.withdrawThreshold}}</span>
                  </td>
            </tr>
          </table>
              <!-- <p class="MsoNormal"><span>提币平台不收取任何费用，但您需要支付矿工费。</span></p> -->
              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>

              <p class="MsoNormal">
                  <span>本资费从2018年9月13日起执行。{{this.url}}拥有解释权。</span>
              </p>

              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>

             </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../styles/common";
@import "../../styles/left_content.less";
.about_fee {
  padding-top: 0;
  background: #eee;
  overflow-x: hidden;
  .wrapper {
    padding-top: 20px;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    .container {
      .leftmenu {
        .listtitle {
          font-size: 20px;
          padding: 5px;
        }
        .pill-item {
          &:hover {
            color: #000;
          }
        }
      }
      .rightcontent {
        text-align: left;
        padding: 0 20px;
        .header {
          height: 70px;
          h2 {
            font-size: 18px;
            margin-left: 5px;
            padding: 10px 0;
            color: @baseColor;
            font-weight: 500;
          }
          .line {
            width: 100%;
            background: #eee;
            .line1 {
              width: 10%;
              height: 2px;
              background: @baseColor;
            }
          }
        }
        .WordSection1 {
          padding-bottom: 20px;
          .MsoNormal {
            text-indent: 2em;
            margin-bottom: 10px;
            text-align: left;
            span {
              font-family: 宋体;
              color: black;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.rightcontent table {
  margin: 10px 0;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-spacing: 0;
  border-collapse: collapse;
}
.rightcontent table th,
.rightcontent table td {
  border: 1px solid #e6e6e6 !important;
  font-weight: normal;
  padding: 0 24px;
  line-height: 36px;
  text-align: center;
}
</style>
<script>
export default {
  data() {
    return {
      symbol: [],
      fee: []
    };
  },
  mounted: function() {
    this.getSymbol();
    this.getWithdrawFee();
  },
  methods: {
    getSymbol: function() {
      this.$http.post(this.host + "/market/symbol").then(response => {
        var result = response.body;
        this.symbol = result;
      });
    },
    getWithdrawFee: function() {
      this.$http.post(this.host + "/uc/coin/supported").then(response => {
        var result = response.body;
        this.fee = result;
        this.convertFee();
      });
    },
    convertFee: function() {
      for (var i = 0; i < this.fee.length; i++) {
        switch (this.fee[i].name) {
          case "Bitcoin":
            this.fee[i].name = "BTC";
            break;
          case "Bitcoincash":
            this.fee[i].name = "BCH";
            break;
          case "Ethereum":
            this.fee[i].name = "ETH";
            break;
          case "GalaxyChain":
            this.fee[i].name = "GCC";
            break;
          case "Litecoin":
            this.fee[i].name = "LTC";
            break;
        }

        switch (this.fee[i].enableWithdraw) {
          case "1":
            this.fee[i].enableWithdraw = "允许";
            break;
          default:
            this.fee[i].enableWithdraw = "不允许";
            break;
        }

        switch (this.fee[i].enableRecharge) {
          case "1":
            this.fee[i].enableRecharge = "允许";
            break;
          default:
            this.fee[i].enableRecharge = "不允许";
            break;
        }

        if (this.fee[i].withdrawFee.indexOf("E-") > -1) {
          var leftV = parseFloat(this.fee[i].withdrawFee.split("E-")[0]);
          var rightV = parseFloat(this.fee[i].withdrawFee.split("E-")[1]);
          for (var s = 0; s < rightV; s++) {
            leftV = leftV / 10;
          }
          this.fee[i].withdrawFee = leftV;
        }

        this.fee[i].rechargeFee = 0;
      }
    },
    getFeeBySymbol: function(coin) {
      var fee = "0%";
      for (var i = 0; i < this.symbol.length; i++) {
        if (this.symbol[i].symbol == coin) {
          fee = parseFloat(this.symbol[i].fee * 100) + "%";
          break;
        }
      }
      return fee;
    }
  }
};
</script>
