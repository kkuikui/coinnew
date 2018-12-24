<template>
    <div class="withdrawadd">
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h2>{{$t('uc.finance.withdraw.addressmanager')}}</h2>
                    <div class="line">
                        <div class="line1"></div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="action-inner">
                        <Form ref="formValidate" :label-width="85">                  
                            <FormItem :label="$t('uc.finance.withdraw.symbol')" prop="symbol">
                                <Select v-model="coinType" class="formitem" size="large" @on-change="getAddrList">
                                    <Option v-for="item in coinList" :value="item" :key="item">{{ item }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem :label="$t('uc.finance.withdraw.address')" prop="address">                            
                                <Input v-model="withdrawAddr" class="formitem" size="large"></Input>
                            </FormItem>
                            <FormItem :label="$t('uc.finance.withdraw.remark')" prop="remark">                            
                                <div class="title">
                                    <Input v-model="remark" class="formitem" size="large"></Input>
                                </div>
                            </FormItem>
                            <div class="action-foot">
                                <div class="buttonapply" @click='addAddr'>{{$t('uc.finance.withdraw.add')}}</div>
                            </div>
                        </Form>
                    </div>
                    <div class="action-content">
                        <div class="action-body">
                            <p class="acb-p1">{{$t('uc.finance.withdraw.addresslist')}}</p>
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsRecharge" :data="dataRecharge" ></Table>
                                <div class="pagelist">
                                    <div class="pageitem">
                                        <Page :total="dataCount" :current="index" :page-size="pageSize" @on-change="changePage" :loading="loading"></Page>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- model -->
        <Modal v-model="modal2" width="360" class="modal2">
            <p slot="header" class="modalheader">
                <Icon type="email"></Icon>
                <span>{{$t('uc.finance.withdraw.safevalidate')}}</span>
            </p>
            <div class="modalform" >
                <Form ref="formValidateAddr" :model="formValidateAddr" :rules="ruleValidate" :label-width="85">
                    <!-- 手机号 -->
                    <FormItem :label="$t('uc.finance.withdraw.telno')" prop="mobileNo" v-show="validPhone">
                        <Input disabled size="large" v-model="formValidateAddr.mobileNo"></Input>
                    </FormItem>
                    <!-- 手机验证码 -->
                    <FormItem :label="$t('uc.finance.withdraw.smscode')" prop="vailCode2" v-show="validPhone">
                        <Input v-model="formValidateAddr.vailCode2" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div slot="append">
                            <Button @click="send(2)" :disabled="disbtn" class="timebox">
                                <span v-if="sendMsgDisabled2">{{time2+$t('uc.finance.withdraw.second')}}</span>
                                <span v-if="!sendMsgDisabled2">{{$t('uc.finance.withdraw.clickget')}}</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                    <!-- 邮箱 -->
                    <FormItem :label="$t('uc.finance.withdraw.email')" prop="email" v-show="validEmail">
                        <Input disabled v-model="formValidateAddr.email" size="large"></Input>
                    </FormItem>
                    <!-- 邮箱验证码 -->
                    <FormItem :label="$t('uc.finance.withdraw.emailcode')" prop="vailCode1" v-show="validEmail">
                        <Input v-model="formValidateAddr.vailCode1" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div slot="append">
                            <Button @click="send(1)" :disabled="disbtn" class="timebox">
                                <span v-if="sendMsgDisabled1">{{time1+$t('uc.finance.withdraw.second')}}</span>
                                <span v-if="!sendMsgDisabled1">{{$t('uc.finance.withdraw.clickget')}}</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="modalfooter">
                <Button class="buttonmodal" type="primary" size="large" long @click="handleSubmit('formValidateAddr')">{{$t('uc.finance.withdraw.save')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  components: {},

  data() {
    var that = this;
    return {
      disbtn: false,
      dataCount: 10,
      pageSize:10,
      index:1,
      loading: true,
      //else
      sendMsgDisabled1: false,
      sendMsgDisabled2: false,
      time1: 60, // 发送验证码倒计时
      time2: 60, // 发送验证码倒计时
      modal2: false,
      modal_loading: false,
      withdrawAddr: "",
      remark: "",
      coinType: "",
      validEmail: false,
      validPhone: false,
      coinList: [],
      tableColumnsRecharge: [
        {
          title: this.$t("uc.finance.withdraw.symbol"),
          key: "unit"
        },
        {
          title: this.$t("uc.finance.withdraw.address"),
          key: "address"
        },
        {
          title: this.$t("uc.finance.withdraw.remark"),
          key: "remark"
        },
        {
          title: this.$t("uc.finance.withdraw.operate"),
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "button",
                {
                  attrs: {
                    class: "button1"
                  },
                  on: {
                    click: () => {
                      this.del(params.row.id);
                      this.getList(0, this.coinType);
                    }
                  }
                },
                that.$t("uc.finance.withdraw.delete")
              )
            ]);
          }
        }
      ],
      dataRecharge: [],
      formValidateAddr: {
        mobileNo: "",
        vailCode2: "",
        email: "",
        vailCode1: ""
      },
      ruleValidate: {
        mobileNo: [
          {
            required: this.validPhone,
            message: this.$t("uc.finance.withdraw.telerr"),
            trigger: "blur"
          }
        ],
        vailCode2: [
          {
            required: this.validPhone,
            message: this.$t("uc.finance.withdraw.codeerr"),
            trigger: "change"
          }
        ],
        email: [
          {
            required: this.validEmail,
            type: "email",
            message: this.$t("uc.finance.withdraw.emailerr"),
            trigger: "blur"
          }
        ],
        vailCode1: [
          {
            required: this.validEmail,
            message: this.$t("uc.finance.withdraw.codeerr"),
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getMember();
    this.getList(0);
    this.coinType = this.$route.query.name;
    this.getCoin();
  },
  methods: {
    getAddrList(){
        this.getList(0,this.coinType)
    },
    getMember() {
      //获取个人安全信息
      this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            if (resp.data.mobilePhone) {
              this.formValidateAddr.mobileNo = resp.data.mobilePhone;
              this.validPhone = true;
              this.validEmail = false;
            } else {
              this.formValidateAddr.email = resp.data.email;
              this.validPhone = false;
              this.validEmail = true;
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getCoin() {
      //币种
      this.$http
        .post(this.host + "/uc/withdraw/support/coin")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            for (let i = 0; i < resp.data.length; i++) {
              this.coinList.push(resp.data[i]);
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getList(pageNo,unit) {
      //获取地址
      let params = {};
      params["pageNo"] = pageNo;
      params["pageSize"] = this.pageSize;
      if(unit!=undefined&&unit!=''){
            params["unit"] = unit;
      }

      this.$http
        .post(this.host + "/uc/withdraw/address/page", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0 && resp.data.content) {
            this.dataRecharge = resp.data.content;
            this.index=resp.data.number+1
            this.dataCount = resp.data.totalElements;
          } else {
            this.$Message.error(resp.message);
          }
          this.loading = false;
        });
    },
    remove(index) {
      this.dataRecharge.splice(index, 1);
    },
    send(index) {
      let me = this;
      this.disbtn = true;
      if (index == 1) {
        if (this.formValidateAddr.email) {
          //获取邮箱code
          this.$http.post(this.host + "/uc/add/address/code").then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(resp.message);
              me.sendMsgDisabled1 = true;
              let interval = window.setInterval(function() {
                if (me.time1-- <= 0) {
                  me.time1 = 60;
                  me.sendMsgDisabled1 = false;
                  window.clearInterval(interval);
                  me.disbtn = false;
                }
              }, 1000);
            } else {
              this.$Message.error(resp.message);
              this.disbtn = false;
            }
          });
        } else {
          this.$refs.formValidateAddr.validateField("email");
          this.disbtn = false;
        }
      } else if (index == 2) {
        if (this.formValidateAddr.mobileNo) {
          //获取手机code
          this.$http
            .post(this.host + "/uc/mobile/add/address/code")
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(resp.message);
                me.sendMsgDisabled2 = true;
                let interval = window.setInterval(function() {
                  if (me.time2-- <= 0) {
                    me.time2 = 60;
                    me.sendMsgDisabled2 = false;
                    window.clearInterval(interval);
                    me.disbtn = false;
                  }
                }, 1000);
              } else {
                this.$Message.error(resp.message);
                this.disbtn = false;
              }
            });
        } else {
          this.$refs.formValidateAddr.validateField("mobileNo");
          this.disbtn = false;
        }
      }
    },
    addAddr() {
      if (!this.coinType) {
        this.$Message.warning(this.$t("uc.finance.withdraw.symboltip"));
      } else if (!this.withdrawAddr) {
        this.$Message.warning(this.$t("uc.finance.withdraw.addresstip"));
      } else if (!this.remark) {
        this.$Message.warning(this.$t("uc.finance.withdraw.remarktip"));
      } else if (this.coinType && this.remark && this.withdrawAddr) {
        this.modal2 = true;
      }
    },
    changePage(index) {
      this.getList(index-1,  this.coinType);
    },
    del(id) {
      const title = this.$t("common.tip");
      const content = "<p>" + this.$t("common.delete") + "</p>";
      this.$Modal.confirm({
        title: title,
        content: content,
        onOk: () => {
          let params = {};
          params["id"] = id;
          this.$http
            .post(this.host + "/uc/withdraw/address/delete", params)
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(resp.message);
                this.getList(0, this.coinType);
              } else {
                this.$Message.error(resp.message);
              }
              this.loading = false;
            });
        },
        onCancel: () => {}
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submit(name);
        } else {
          this.$Message.error(this.$t("uc.finance.withdraw.savemsg1"));
        }
      });
    },
    submit(name) {
      let param = {};
      param["address"] = this.withdrawAddr;
      param["unit"] = this.coinType;
      if (this.validPhone) {
        param["aims"] = this.formValidateAddr.mobileNo;
        param["code"] = this.formValidateAddr.vailCode2;
      } else {
        param["aims"] = this.formValidateAddr.email;
        param["code"] = this.formValidateAddr.vailCode1;
      }
      param["remark"] = this.remark;

      this.$http
        .post(this.host + "/uc/withdraw/address/add", param)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.finance.withdraw.savemsg2"));
            this.getList(0, this.coinType);
            this.modal2 = false;
            this.withdrawAddr = "";
            this.disbtn=false;
            this.sendMsgDisabled1=false;
            this.sendMsgDisabled2=false;
            this.formValidateAddr.vailCode2='';
            this.formValidateAddr.vailCode1='';
            this.remark = "";
          } else {
            this.$Message.error(resp.message);
          }
        });
    }
  },
  computed: {}
};
</script>

<style lang="less">
.ivu-table-cell {
  button {
    color: #fff;
    height: 25px;
    border-radius: 3px;
    width: 40px;
    &.button1 {
      background: #ff7070;
    }
  }
}
</style>
<style scoped lang="less">
@import "../../styles/common.less";
.withdrawadd {
  overflow: hidden;
  .wrapper {
    .container {
      text-align: left;
      padding: 20px 20px;
      .header {
        margin-bottom: 20px;
        h2 {
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
            width: 11%;
            height: 2px;
            background: @baseColor;
          }
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
              color: #676577;
              font-weight: 600;
              line-height: 50px;
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
.modal2 {
  .modalheader {
    color: #f60;
    text-align: center;
  }
  .modalform {
    text-align: center;
    .timebox {
      color: #fff;
      background: @avatarColor;
    }
  }
  .modalfooter {
    .buttonmodal {
      color: #fff;
      background: @avatarColor;
    }
  }
}
</style>


