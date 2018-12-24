<template>
  <div class="content-wrap exchange_rule">
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
                <h2>{{$t('cms.exchangerule')}}</h2>
                <div class="line">
                  <div class="line1"></div>
                </div>
              </div>
              <div class=WordSection1 style="layout-grid:15.6pt;">
                <p class="MsoNormal"><b><span>法币交易区买入规则</span></b><b><span></span></b></p>
                <p class="MsoNormal">
                  <span lang=EN-US>1</span>
                  <span>、<span>法币</span></span>
                  <span>交易区买入时需完成实名认证。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>2</span>
                  <span>、买家需在“广告”规定的时间内完成付款，并点击确认付款按钮。买家主动取消订单或者订单超时取消，系统将记录买家取消订单一次。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>3</span>
                  <span>、买家当日累计<span lang=EN-US>3</span>笔取消订单，会限制当日买入功能。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>4</span>
                  <span>、因为卖家未提供有效支付方式，导致系统记录买家取消订单，买家因此被限制当天买入功能的，可以联系平台官方客服，要求解除限制。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>5</span>
                  <span>、请勿在未付款或不付款的情况下点击“我已付款”，该行为是属于恶意行为。当此类订单发生申诉，卖家可拒绝成交，情节严重的，系统将冻结买家账户。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>6</span>
                  <span>、如果您在<span lang=EN-US>20</span>分钟内未付款且不回应卖家，当此订单出现申诉时，卖家可拒绝成交。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>7</span>
                  <span>、请所有的买家用户选择与您实名一致的支付账户如银行卡来付款，如果您使用非实名账户付款，当此订单出现申诉时，卖家可选择退款不成交。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>8</span>
                  <span>、为了保证交易的及时性，请选择实时到账的汇款方式，例如支付宝、微信支付、银行实时汇款等。节假日或工作日的<span lang=EN-US>17</span>：<span lang=EN-US>00-9</span>：<span lang=EN-US>00</span>，超过<span lang=EN-US>5</span>万以上的汇款请分批支付，以确保到款的及时性。买家点击“我已付款”20分钟后，卖家未收到付款，订单出现申诉时，卖家可以拒绝成交。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>9</span>
                  <span>、进行中的订单对应的数字货币资产会锁定在平台；如您转账完成，并点击“我已付款”<span lang=EN-US>20</span>分钟后，卖家未放币，则您可选择申诉，如您完全符合以上操作，我们会判定资产属于您。</span>
                </p>
                <p class="MsoNormal">
                  <span>注：买家在转账时，汇款备注、说明里请备注“付款参考号”即可，请勿填写<span lang=EN-US>BTC</span>、比特币等数字货币字符字眼，防止您的汇款出现延迟的情况。</span>
                </p>
                <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
                <p class="MsoNormal"><b><span>法币交易区</span></b><b><span>卖出规则</span></b></p>
                <p class="MsoNormal">
                  <span lang=EN-US>1</span>
                  <span>、当您在卖出时，请认真确认您所卖出的价格，因广告价格问题产生的申诉，如买家无违规操作，我们会判定资产属于买家并直接划转。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>2</span>
                  <span>、买家点击“我已付款”<span lang=EN-US>20</span>分钟后未收到账，卖家可选择申诉；如买家不遵循先付款后点击付款、付款不能在规定以内到达账户或付款后订单取消，卖家可选择申诉，并退款不成交。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>3</span>
                  <span>、请核实买家的付款账户是否与平台的实名信息一致。如不一致，请卖家注意收款的风险，当此类订单发生申诉时，卖家可选择退款拒绝成交。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>4</span>
                  <span>、请在登录网银查看收款无误后，第一时间放行。买家无任何违规，买家标记订单状态为“已付款”后的<span lang=EN-US>20</span>分钟以内，卖家无法完成放行的，当此订单发生申诉时，买家有权要求退款不成交，如卖家拒绝协调，我们会直接放行给买家并冻结卖家账户。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>5</span>
                  <span>、为了确保交易的及时性，请发布广告时务必确保能在线并及时处理订单；如您无法保证及时处理交易订单，请及时下架，以免造成不必要的申诉纠纷。</span>
                </p>
                <p class="MsoNormal">
                  <span>注：对于交易纠纷，平台有最终裁判权。对于恶意冻结订单、恶意付款、利用交易涉嫌诈骗等行为，平台可选择冻结账户，必要时协助司法机关进行处理。</span>
                </p>
                <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
                <p class="MsoNormal"><strong><span>发布广告规则：</span></strong></p>
                <p class="MsoNormal">
                  <span lang=EN-US>1、</span>
                  <span>完成商家认证成为商家才能发布广告。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>2、</span>
                  <span>发布广告免费，但需200DYC作为保证金</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>3</span>
                  <span>、交易完成后不收取广告方作为手续费</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>4</span>
                  <span>、如您不在设备旁或离线无法及时处理订单，请提前下架广告。此类广告如产生订单，属于正常订单，按正常交易流程处理。</span>
                </p>
                <p class="MsoNormal">
                  <span lang=EN-US>5</span>
                  <span>、发布求购广告时，当天累计取消订单达到3笔的，系统会限制您当天的买入功能。</span>
                </p>
                <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
                <p class="MsoNormal"><strong><span>交易规则内容会根据市场及运营情况进行合理调整，请大家及时关注内容更新。</span></strong></p>
                <p class="MsoNormal"><strong><span lang=EN-US>&nbsp;</span></strong></p>
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
  @import '../../styles/common';
  @import '../../styles/left_content.less';
	.exchange_rule{
    padding-top: 0;
    background: #eee;
    overflow-x:hidden;
		.wrapper{
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
		  	.rightcontent{
          text-align: left;
          padding: 0 20px;
          .header{
            height: 70px;
			    	h2{
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
              text-align:left;
              span{
                font-family: 宋体;
                color:black;
                font-size: 14px;
              }
            }
          }
	  		}
      }
		}
	}

</style>
