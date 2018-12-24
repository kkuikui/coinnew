<template>
    <div class="order">
        <div class="wrapper">
            <!-- <p class="" class="routerstyle">
                <router-link to="/otc/order">{{$t('otc.myorder')}}</router-link>
            </p> -->
            <div class="container chat-in-box">
                <Row class="chat-in">
                    <Col span="10">
                        <div class="leftmenu chat-right">
                            <div class="chat-right-in">
                                <!-- <h6>
                                    <span v-if="tradeType==0">{{$t('otc.chat.seller')}}:</span>
                                    <span v-else>{{$t('otc.chat.buyer')}}:</span>
                                    <router-link :to="{ path: '/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                                </h6>
                                <h6>
                                    <span>{{$t('otc.chat.exchangeamount')}}:</span>
                                    <span>{{msg.money}}&nbsp;CNY</span>
                                </h6> -->
                                <div class="order-info1">
                                    <h5>
                                        <label class="order-name">{{$t('otc.chat.order')}}</label>
                                        <span>{{msg.orderSn}}</span>
                                    </h5>
                                    <p>
                                        {{$t('otc.chat.and')}}
                                        <router-link :to="{ path: '/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                                        {{$t('otc.chat.transition')}}
                                    </p>
                                </div>
                                <div class="order-info2">
                                    <h3>
                                        <label>{{$t('otc.chat.transprice')}}(CNY)：</label>
                                        <span>{{msg.price}}</span>
                                    </h3>
                                    <h3>
                                        <label>{{$t('otc.chat.transnum')}}({{msg.unit}})：</label>
                                        <span>{{msg.amount}}</span>
                                    </h3>
                                    <h3>
                                        <label>{{$t('otc.chat.transmoney')}}(CNY)：</label>
                                        <span>{{msg.money}}</span>
                                    </h3>
                                </div>
                                <div class="chat-top" type="flex" justify="space-between" v-show="statusBtn!=0">
                                    <div class="order-info" v-if="bankInfo&&bankInfo!=null">
                                        <i class="icons bankfor"></i>
                                        <span class="des">{{$t('otc.chat.bankfor')}}</span>
                                        <span>{{payInfo != null ? payInfo.realName : ""}} </span>
                                        <span>{{bankInfo.cardNo}}</span>
                                        <span>{{bankInfo.branch}}</span>
                                    </div>
                                    <div class="order-info" v-else>
                                        <i class="icons bankfor"></i>
                                        <span class="des">{{$t('otc.chat.bankfor')}}</span>
                                        <span class="nodes">{{$t('otc.chat.tip1')}}</span>
                                    </div>
                                    <div class="order-info" v-if="alipay&&alipay!=null">
                                        <i class="icons alipay"></i>
                                        <span class="des">{{$t('otc.chat.zfb')}}</span>
                                        <span>{{payInfo != null ? payInfo.realName : ""}} </span>
                                        <span>{{alipay.aliNo}}</span>
                                        <span v-if="alipay&&alipay!=null&&alipay.qrCodeUrl!=null&&alipay.qrCodeUrl!=''">
                                            <a @click="showQRCode(1)">
                                                <i class="code"></i>
                                            </a>
                                        </span>
                                    </div>
                                    <div class="order-info" v-else>
                                        <i class="icons alipay"></i>
                                        <span class="des">{{$t('otc.chat.zfb')}}</span>
                                        <span class="nodes">{{$t('otc.chat.tip2')}}</span>
                                    </div>
                                    <div class="order-info" v-if="wechatPay&&wechatPay!=null">
                                        <i class="icons wechat"></i>
                                        <span class="des">{{$t('otc.chat.wx')}}</span>
                                        <span>{{wechatPay.wechat}}</span>
                                        <span>{{payInfo != null ? payInfo.realName : ""}} </span>
                                        <span v-if="wechatPay&&wechatPay!=null&&wechatPay.qrWeCodeUrl!=null&&wechatPay.qrWeCodeUrl!=''">
                                            <a @click="showQRCode(2)">
                                                <i class="code"></i>
                                            </a>
                                        </span>
                                    </div>
                                    <div class="order-info" v-else>
                                        <i class="icons wechat"></i>
                                        <span class="des">{{$t('otc.chat.wx')}}</span>
                                        <span class="nodes">{{$t('otc.chat.tip3')}}</span>
                                    </div>
                                </div>
                                <div class="bottom-btn">
                                    <div class="orderstatus">
                                        <h6>
                                            <!-- {{$t('otc.chat.orderstatus')}}: -->
                                            <i class="status-order1 status" v-if="statusBtn==3"></i>
                                            <i class="status-order0 status" v-if="statusBtn==0"></i>
                                            <i class="status-order2 status2" v-if="statusBtn==2"></i>
                                            <span class="statustext">{{statusText}}</span>
                                            <div v-show="statusBtn==1" class="reserve-time">{{reserveTime}}<span class="wordstatus">{{$t('otc.chat.result_11')}}</span></div>
                                        </h6>
                                        <div v-show="statusBtn==1&&tradeType==0" class="buttongroup">
                                            <Button class="waitpay" type="primary" @click="modal1 = true">{{$t('otc.chat.orderstatus_1')}}</Button>
                                            <Button class="cancelpay" @click="modal2 = true" type="error">{{$t('otc.chat.orderstatus_4')}}</Button>
                                        </div>
                                        <div v-show="statusBtn==2&&tradeType==0" class="buttongroup">
                                            <Button class="waitappeal" type="primary" @click="appearOrder">{{$t('otc.chat.orderstatus_2')}}</Button>
                                            <Button class="cancelpay" @click="modal2 = true" type="error">{{$t('otc.chat.orderstatus_4')}}</Button>
                                        </div>
                                        <div v-show="statusBtn==2&&tradeType==1" class="buttongroup">
                                            <Button class="sureappeal" type="primary" @click="modal5 = true">{{$t('otc.chat.orderstatus_3')}}</Button>
                                            <Button class="cancelpay" @click="appearOrder">{{$t('otc.chat.orderstatus_5')}}</Button>
                                        </div>
                                        <!-- <Button type="primary" v-show="statusBtn==2" @click="modal4 = true" long></Button> -->
                                    </div>
                                </div>
                                <div class="mt20" v-if="tradeType==0">
                                    <h5>{{$t('otc.chat.operatetip')}}:</h5>
                                    <div>
                                        <p>1、{{$t('otc.chat.operatetip_1')}}“
                                            <em>{{$t('otc.chat.finishpayment')}}</em>”。{{$t('otc.chat.operatetip_1_1')}}。
                                        </p>
                                        <p>2、{{$t('otc.chat.operatetip_1_2')}}。</p>
                                    </div>
                                    <h5>{{$t('otc.chat.note')}}：</h5>
                                    <p>{{$t('otc.chat.notetip')}}</p><br>
                                </div>
                                <div class="mt20" v-else>
                                    <h5>{{$t('otc.chat.operatetip')}}:</h5>
                                    <div>
                                        <p>1、{{$t('otc.chat.operatetip_2_1')}}“
                                            <em>{{$t('otc.chat.confirmrelease')}}</em>”{{$t('otc.chat.paydigital')}}！
                                        </p>
                                        <p>2、{{$t('otc.chat.operatetip_2_2')}}</p>
                                        <p>3、{{$t('otc.chat.operatetip_2_3')}}</p>
                                    </div>
                                    <h5>{{$t('otc.chat.note')}}：</h5>
                                    <p>{{$t('otc.chat.notetip')}}</p><br>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span="14">
                        <div class="rightbox">
                            <chatline :msg="msg" :statusBtn = "statusBtn"></chatline>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <Modal v-model="modal1" @on-ok="ok1" class="modal1 modal">
            <h3 class="modaltitle">{{$t('otc.chat.orderstatus_1')}}</h3>
            <p class="modalcontent">{{$t('otc.chat.msg1')}}</p>
        </Modal>
        <Modal v-model="modal2" @on-ok="ok2" :loading="isloading" class="modal2 modal">
            <h3 class="modaltitle">{{$t('otc.chat.orderstatus_4')}}</h3>
            <p class="modalcontent">{{$t('otc.chat.msg2')}}</p>
        </Modal>
        <Modal v-model="modal3" @on-ok="ok3" class="modal3 modal">
            <h3 class="modaltitle">{{$t('otc.chat.orderstatus_4')}}</h3>
            <p class="modalcontent">{{$t('otc.chat.msg3')}}</p>
        </Modal>
        <Modal v-model="modal4" @on-ok="ok4" class="modal4 modal">
            <h3 class="modaltitle">{{$t('otc.chat.orderstatus_5')}}</h3>
            <Form :model="formItem" :label-width="80" class='shensu'>
                <FormItem :label="$t('otc.chat.comptype')">
                    <Select v-model="formItem.select">
                        <Option value="1">{{$t('otc.chat.msg4')}}</Option>
                        <Option value="2">{{$t('otc.chat.msg5')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('otc.chat.comptImage')">
                 
                    <div class="uploadimg">
                        <input type="hidden" name="aliPreview" :value="formItem.imgPhoto" />
                        <div class="imgPhoto" v-if='ali' style='width:180px;height:180px;'>
                            <img  id="aliImg" class="img-style" :src="aliImg">
                        </div>
                        <div v-else style='width:0px;height:0px;'>
                             <img  id="aliImg" class="img-style" :src="imgTransparent">
                        </div>
                        <div class="acc_sc">
                            <Upload class="uploadstyle" ref="upload" :show-upload-list="false"
                                :on-success="aliHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                            </Upload>
                        </div>
                    </div>
                    <div class="uploadimg">
                        <input type="hidden" name="aliPreview1" :value="formItem.imgPhoto1" />
                        <div class="imgPhoto" v-if='ali1' style='width:180px;height:180px;'>
                            <img  id="aliImg1" class="img-style" :src="aliImg1">
                        </div>
                        <div v-else class="imgPhoto"  style='width:0px;height:0px;'>
                            <img  id="aliImg1" class="img-style" :src="imgTransparent">
                        </div>
                        <div class="acc_sc">
                            <Upload class="uploadstyle" ref="upload" :show-upload-list="false"
                                :on-success="aliHandleSuccess1" :headers="uploadHeaders" :action="uploadUrl">
                                <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                            </Upload>
                        </div>
                    </div>
                                        
                </FormItem>
                <FormItem :label="$t('otc.chat.compremark')">
                    <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('otc.chat.willcomp')"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal5" :title="$t('otc.chat.tip')" @on-ok="ok5" class="modal5 modal">
            <P style="color:red;font-weight: bold;">
              {{$t('otc.chat.msg6')}}<br/>
              <Input type="password" v-model="fundpwd" :placeholder="$t('otc.chat.msg7')"></Input>
            </p>
        </Modal>
        <Modal v-model="modal6" class="modal6 modal">
            <h3 class="modaltitle">{{$t('otc.chat.qrcode')}}</h3>
            <div class="modalqrcode">
              <img :src="payCodeUrl">
            </div>
            <p slot="footer"></p>
        </Modal>
    </div>
</template>
<script>
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
import chatline from "../../components/otc/Chatline";
export default {
  components: {
    chatline
  },
  data() {
    return {
      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") },
      uploadUrl: this.host + "/uc/upload/oss/image",
      //   imgTransparent:require('../../assets/img/transparent.png'),
      imgTransparent: require("../../assets/img/transparent.png"),
      ali: false,
      ali1: false,
      watching: false,
      stompClient: null,
      reserveTime: "60",
      reserveInteval: null,
      fundpwd: "",
      statusBtn: 0,
      tradeType: 0,
      isloading: true,
      payTime: "",
      statusText: "",
      aliImg: "",
      aliImg1: "",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      formItem: {
        select: "",
        remark: "",
        imgPhoto: "",
        imgPhoto1: ""
      },
      msg: {},
      payInfo: {},
      bankInfo: {},
      alipay: {},
      wechatPay: {},
      payCodeUrl: ""
    };
  },
  created() {
    this.getDetail();
    this.initScok();
  },
  computed: {},
  methods: {
    aliHandleSuccess(res, file) {
      if (res.code == 0) {
        this.aliImg = this.formItem.imgPhoto = res.data;
        this.ali = true;
      } else {
        this.$Message.erroe(res.message);
      }
    },
    aliHandleSuccess1(res, file) {
      if (res.code == 0) {
        this.aliImg1 = this.formItem.imgPhoto1 = res.data;
        this.ali1 = true;
      } else {
        this.$Message.erroe(res.message);
      }
    },

    //让浏览器滚动条保持在最低部
    scrollToBottom: function() {
      // window.scrollTo(0, 900000);
    },
    initScok: function() {
      var socket = new SockJS(this.host + "/chat/chat-webSocket");
      this.stompClient = Stomp.over(socket);
      this.stompClient.debug = false;
    },
    watchOrderStutusNotice: function() {
      var self = this;
      this.stompClient.connect({}, function(frame) {
        self.stompClient.subscribe(
          "/user/" +
            self.msg.myId +
            "/order-notice/" +
            self.$route.query.tradeId,
          function(response) {
            if (self.reserveInteval != null) clearInterval(self.reserveInteval);
            var confirmPayMsg = JSON.parse(response.body);
            self.$Message.success(confirmPayMsg.content);
            self.statusBtn = confirmPayMsg.status;
            if (confirmPayMsg.status == 1) {
              self.statusText = self.$t("otc.chat.result_1");
              self.setReserveTime();
            } else if (confirmPayMsg.status == 2) {
              self.statusText = self.$t("otc.chat.result_2");
            } else if (confirmPayMsg.status == 3) {
              self.statusText = self.$t("otc.chat.result_3");
            } else if (confirmPayMsg.status == 4) {
              self.statusText = self.$t("otc.chat.result_4");
            } else if (confirmPayMsg.status == 0) {
              self.statusText = self.$t("otc.chat.result_5");
            }
          }
        );
      });
    },
    sendOrderStatusNotice: function(type) {
      if (this.reserveInteval != null) clearInterval(this.reserveInteval);
      var content = "";
      if (type == 1) content = "对方已付款，请查收并确认放行!";
      else if (type == 3) content = "对方已取消订单!";
      else if (type == 4) content = "对方已申诉!";
      else if (type == 5) content = "对方已放行,请查收!";
      var jsonParam = {
        uidTo: this.msg.hisId,
        uidFrom: this.msg.myId,
        orderId: this.$route.query.tradeId,
        content: content,
        messageType: 0
      };
      this.stompClient.send("/app/message/chat", {}, JSON.stringify(jsonParam));
    },
    showQRCode: function(type) {
      if (type == 1) {
        this.payCodeUrl = this.alipay.qrCodeUrl;
      } else {
        this.payCodeUrl = this.wechatPay.qrWeCodeUrl;
      }
      this.modal6 = true;
    },
    setReserveTime: function() {
      this.getReserveTime();
      this.reserveInteval = setInterval(() => {
        this.getReserveTime();
      }, 1000);
    },
    getReserveTime: function() {
      var d1 = new Date();
      var d2 = new Date(this.msg.createTime);
      var throughSeconds = parseInt(parseInt(d1 - d2) / 1000);
      var reserveSeconds = parseInt(this.msg.timeLimit) * 60 - throughSeconds;
      this.reserveTime =
        parseInt(reserveSeconds / 60) +
        ":" +
        (parseInt(reserveSeconds % 60) >= 10
          ? parseInt(reserveSeconds % 60)
          : "0" + parseInt(reserveSeconds % 60));
      if (reserveSeconds <= 0) {
        this.resetStatus();
      }
    },
    resetStatus: function() {
      //计时时间已到，重置状态
      clearInterval(this.reserveInteval);
      this.statusBtn = 5;
      this.ok3();
    },
    appearOrder: function() {
      var nowTime = new Date().getTime();
      var payTime = new Date(this.msg.payTime).getTime();

      if (parseInt((nowTime - payTime) / 1000) < 1200) {
        //付款时间小于30分钟不允许申诉
        this.$Message.info("付款完成20分钟后才允许申诉!");
        return;
      } else {
        this.modal4 = true;
      }
      // this.modal4 = true;
    },
    ok1() {
      this.$http
        .post(this.host + "/otc/order/pay", {
          orderSn: this.$route.query.tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            this.sendOrderStatusNotice(1);
            this.getDetail();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    ok2() {
      setTimeout(() => {
        this.isloading = false;
        this.modal2 = false;
        this.modal3 = true;
      }, 10000);
    },
    ok3() {
      this.$http
        .post(this.host + "/otc/order/cancel", {
          orderSn: this.$route.query.tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            this.sendOrderStatusNotice(3);
            this.getDetail();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    ok4() {
      //订单申诉
      //时间
      if (1 == 1) {
        let imgs = "";
        if (this.formItem.imgPhoto != "" && this.formItem.imgPhoto1 != "") {
          imgs = this.formItem.imgPhoto + ";" + this.formItem.imgPhoto1;
        } else if (this.formItem.imgPhoto != "") {
          imgs = this.formItem.imgPhoto;
        } else if (this.formItem.imgPhoto1 != "") {
          imgs = this.formItem.imgPhoto1;
        }
        var params = {};
        params["orderSn"] = this.$route.query.tradeId;
        params["remark"] = this.formItem.remark;
        params["imgUrls"] = imgs;

        this.$http
          .post(this.host + "/otc/order/appeal", params)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(resp.message);
              this.sendOrderStatusNotice(4);
              this.getDetail();
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    ok5() {
      var params = {};
      params["orderSn"] = this.$route.query.tradeId;
      params["jyPassword"] = this.fundpwd;
      if (this.fundpwd == "") {
        this.$Message.error(this.$t("otc.chat.msg7tip"));
        return;
      }
      this.$http
        .post(this.host + "/otc/order/release", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            this.sendOrderStatusNotice(5);
            this.getDetail();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getDetail() {
      //获取个人广告
      this.$http
        .post(this.host + "/otc/order/detail", {
          orderSn: this.$route.query.tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.msg = resp.data;
            this.payInfo = this.msg.payInfo;
            if (this.payInfo == null) {
              this.bankInfo = this.alipay = this.wechatPay == null;
            } else {
              this.bankInfo = this.msg.payInfo.bankInfo;
              this.alipay = this.msg.payInfo.alipay;
              this.wechatPay = this.msg.payInfo.wechatPay;
            }

            if (!this.watching) {
              this.watchOrderStutusNotice();
              this.watching = true;
            }

            this.statusBtn = resp.data.status;
            this.tradeType = resp.data.type;
            if (resp.data.status == 1) {
              this.statusText = this.$t("otc.chat.result_1");
              this.setReserveTime();
            } else if (resp.data.status == 2) {
              this.statusText = this.$t("otc.chat.result_2");
            } else if (resp.data.status == 3) {
              this.statusText = this.$t("otc.chat.result_3");
            } else if (resp.data.status == 4) {
              this.statusText = this.$t("otc.chat.result_4");
            } else if (resp.data.status == 0) {
              this.statusText = this.$t("otc.chat.result_5");
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    }
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
/* checkbox颜色修改 */
.ivu-checkbox-checked {
  &:hover {
    .ivu-checkbox-inner {
      border-color: @avatarColor;
    }
  }
  .ivu-checkbox-inner {
    border-color: @avatarColor;
    background-color: @avatarColor;
  }
}
// modal样式修改
.ivu-modal-footer {
  .ivu-btn-primary {
    color: #fff;
    border-color: @avatarColor;
    background-color: @avatarColor;
  }
}
</style>

<style scoped lang="less">
@import "../../styles/common.less";
.order {
  background: #eee;
  .wrapper {
    min-heigth: 700px;
    padding: 30px 0;
    .routerstyle {
      padding: 10px 0 10px 50px;
      font-size: 16px;
    }
    .container {
      background: #fff;
      padding: 30px;
      width: 1200px;
      margin: 0 auto;
      .chat-in {
        .leftmenu {
          margin-bottom: 60px;
          position: relative;
          text-align: left;
          padding: 0 20px;
          .chat-right-in {
            color: #333;
            margin-bottom: 8px;
            .order-info1 {
              line-height: 1.8;
              h5 {
                color: rgb(145, 143, 143);
                .order-name {
                  margin-right: 5px;
                }
                span {
                }
              }
              p {
                font-size: 20px;
                color: #000;
                a {
                  color: #69bb80;
                }
              }
            }
            .order-info2 {
              line-height: 2;
              margin-top: 20px;
              h3 {
                label {
                  margin-right: 15px;
                }
              }
            }
            .chat-top {
              margin-top: 40px;
              padding: 10px 0;
              font-size: 14px;
              .order-info {
                line-height: 2;
                span {
                  margin-right: 12px;
                  &.des {
                    margin-right: 15px;
                    color: rgb(145, 143, 143);
                  }
                  &.nodes {
                    color: rgb(145, 143, 143);
                  }
                  .code {
                    margin-left: 5px;
                    height: 17px;
                    margin-bottom: 7px;
                    vertical-align: middle;
                    &:before {
                      background-size: 100% 100%;
                      height: 17px;
                      width: 17px;
                      display: inline-block;
                      background-image: url("../../assets/img/qrcd.png");
                      content: "";
                    }
                  }
                }
                .icons {
                  margin-right: 5px;
                  height: 17px;
                  margin-bottom: 5px;
                  vertical-align: middle;
                  &:before {
                    background-size: 100% 100%;
                    height: 17px;
                    width: 17px;
                    display: inline-block;
                    content: "";
                  }
                  &.alipay {
                    &:before {
                      background-image: url("../../assets/img/alipay.png");
                    }
                  }
                  &.wechat {
                    &:before {
                      background-image: url("../../assets/img/wechat.png");
                    }
                  }
                  &.bankfor {
                    &:before {
                      background-image: url("../../assets/img/bankcard.png");
                    }
                  }
                }
              }
            }
            .bottom-btn {
              padding-top: 50px;
              .orderstatus {
                h6 {
                  font-weight: 600;
                  font-size: 18px;
                  .reserve-time {
                    display: inline-block;
                    color: #ed3f14;
                    font-weight: 700;
                    .wordstatus {
                      color: #000;
                      margin-left: 6px;
                    }
                  }
                  .status {
                    margin-right: 5px;
                    height: 35px;
                    margin-bottom: 5px;
                    vertical-align: middle;
                    &:before {
                      background-size: 100% 100%;
                      height: 35px;
                      width: 35px;
                      display: inline-block;
                      content: "";
                    }
                    &.status-order0 {
                      &:before {
                        background-image: url("../../assets/img/unfinish.png");
                      }
                    }
                    &.status-order1 {
                      &:before {
                        background-image: url("../../assets/img/finished.png");
                      }
                    }
                  }
                  .status2 {
                    margin-right: 5px;
                    height: 20px;
                    margin-bottom: 4px;
                    vertical-align: middle;
                    &:before {
                      background-size: 100% 100%;
                      height: 20px;
                      width: 20px;
                      display: inline-block;
                      content: "";
                    }
                    &.status-order2 {
                      &:before {
                        background-image: url("../../assets/img/waitappeal.png");
                      }
                    }
                  }
                  .statustext {
                  }
                }
                .buttongroup {
                  margin-top: 20px;
                  .waitpay {
                    color: #fff;
                    background: @avatarColor;
                  }
                  .cancelpay {
                    margin-left: 10px;
                    color: #000;
                    background: @buttonColor1;
                  }
                  .waitappeal {
                    background: @avatarColor;
                    color: #fff;
                  }
                  .sureappeal {
                    background: @avatarColor;
                    color: #fff;
                  }
                }
              }
            }
            .mt20 {
              line-height: 1.6;
              margin-top: 70px;
              h5 {
                margin-top: 20px;
              }
              p {
                em {
                  color: #f40a0a;
                  font-style: normal;
                }
              }
            }
          }
        }
        .rightbox {
          margin-left: 20px;
          margin-bottom: 40px;
        }
      }
    }
  }
}
.shensu .uploadimg {
  display: inline-block;
  width: 200px;
  .imgPhoto {
    img {
      width: 180px;
      height: 120px;
    }
  }
}
.modal {
  color: #000;
  .modalcontent {
    text-align: center;
    color: red;
    height: 80px;
    font-weight: bold;
  }
  .modaltitle {
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
  }
  .modalqrcode {
    text-align: center;
    margin: 20px 0;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>

