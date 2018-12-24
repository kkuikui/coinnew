<template>
    <div class="myextension">
        <div class="wrapper">
            <div class="container">
                <!-- <ButtonGroup>
                    <Button v-for="(list,index) in buttonLists" :key="list.text" class="btStyle" :class="{active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                </ButtonGroup> -->
                <ul class="billTitle">
                    <li v-for="(list,index) in buttonLists" :key="index"
                     class="btStyle" :class="{active:changeActive == index}"
                     @click="actives(index)">{{list.text}}</li>
                </ul>
                <div class="message" v-if="this.changeActive==0">
                    <p class="tips">{{$t('uc.extension.linkdesc')}}</p>
                    <div class="inner-box">
                        <p class="describe">{{$t('uc.extension.linktitle')}}</p>
                        <div class="title">
                            <Input v-model="qrcode.value" readonly class="inputstyle" size="large"></Input>
                            <a v-clipboard:copy="qrcode.value" v-clipboard:success="onCopy"
                             v-clipboard:error="onError" href="javascript:;"
                              id="copyBtn" class="link-copy">
                              <Button type="primary" class="btnstyle">{{$t('uc.extension.copy')}}
                              </Button>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="message" v-else-if="this.changeActive==1">
                    <Table stripe :columns="tablePromoteFriends" :data="dataPromoteFriends" :loading="loading"></Table>
                </div>
                <div class="message" v-else>
                    <Table stripe :columns="tablePromoteMoney" :data="dataPromoteMoney" :loading="loading"></Table>
                    <!--<Col span="12" class="commission">-->
                        <!--<p>{{$t('uc.extension.currcommission')}}：<span><strong>{{currentCommission}}</strong>{{$t('uc.extension.yuan')}}</span></p>-->
                    <!--</Col>-->
                    <!--<Col span="12" class="commission">-->
                        <!--<p>{{$t('uc.extension.currcommission')}}：<span>{{$t('uc.extension.managerfee')}}<strong>{{commissionPaying}}</strong></span></p>-->
                    <!--</Col>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      buttonLists: [
        {
          text: this.$t("uc.extension.title1")
        },
        {
          text: this.$t("uc.extension.title2")
        },
        {
          text: this.$t("uc.extension.title3")
        }
      ],
      currentCommission: "0.00",
      commissionPaying: "6%",
      changeActive: 0,
      qrcode: {
        value: "",
        size: 200
      },
      loading: true,
      tablePromoteFriends: [
        {
          title: this.$t("uc.extension.username"),
          key: "username",
          align: "center"
        },
        {
          title: this.$t("uc.extension.createdtime"),
          key: "createTime",
          align: "center"
        },
        {
          title: this.$t("uc.extension.userlevel"),
          key: "level",
          align: "center",
          render: function(h, params) {
            return h("span", parseInt(params.row.level) + 1 + "级");
          }
        }
      ],
      dataPromoteFriends: [],
      tablePromoteMoney: [
        {
          title: this.$t("uc.extension.symbol"),
          key: "symbol",
          width: 200,
          align: "center"
        },
        {
          title: this.$t("uc.extension.amount"),
          key: "amount",
          width: 200,
          align: "center"
        },
        {
          title: this.$t("uc.extension.amounttime"),
          key: "createTime",
          width: 200,
          align: "center"
        },
        {
          title: this.$t("uc.extension.remark"),
          key: "remark",
          align: "center"
        }
      ],
      dataPromoteMoney: []
    };
  },
  watch: {
    lang: function() {
      this.updateLangData();
    }
  },
  methods: {
    updateLangData() {
      this.buttonLists[0].text = this.$t("uc.extension.title1");
      this.buttonLists[1].text = this.$t("uc.extension.title2");
      this.buttonLists[2].text = this.$t("uc.extension.title3");
      this.tablePromoteFriends[0].title = this.$t("uc.extension.username");
      this.tablePromoteFriends[1].title = this.$t("uc.extension.createdtime");
      this.tablePromoteFriends[2].title = this.$t("uc.extension.userlevel");
      this.tablePromoteMoney[0].title = this.$t("uc.extension.symbol");
      this.tablePromoteMoney[1].title = this.$t("uc.extension.amount");
      this.tablePromoteMoney[2].title = this.$t("uc.extension.amounttime");
      this.tablePromoteMoney[3].title = this.$t("otc.myad.operate");
    },
    getList() {
      this.loading = false;
    },
    actives(index) {
      this.changeActive = index;
      if (index === 1) {
        this.getPromotionList();
      } else if (index === 2) {
        this.getPromotionMoney();
      }
    },
    qrcodeM() {
      var promotionCode = this.user.promotionCode;
      this.qrcode.value =this.url+ "#/register?agent=" + promotionCode;
    },
    onCopy(e) {
      this.$Message.success(this.$t("uc.extension.copy_msg1") + e.text);
    },
    onError(e) {
      this.$Message.error(this.$t("uc.extension.copy_msg2"));
    },
    getPromotionList() {
      this.$http.post(this.host + "/uc/promotion/record", {}).then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.dataPromoteFriends = resp.data.content;
        } else {
          // this.$Message.error(resp.message);
        }
      });
    },
    getPromotionMoney() {
      this.$http
        .post(this.host + "/uc/promotion/reward/record", {})
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.dataPromoteMoney = resp.data.content;
          } else {
            // this.$Message.error(resp.message);
          }
        });
    }
  },
  created() {
    this.actives(this.changeActive);
    this.qrcodeM();
    this.getList();
    this.getPromotionList();
    this.getPromotionMoney();
  },
  computed: {
    lang: function() {
      return this.$store.state.lang;
    },
    user: function() {
      return JSON.parse(localStorage.getItem("MEMBER"));
    }
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
// 表格内容修改
.ivu-table-tip {
  table {
    tbody {
      tr {
        td {
          padding: 30px 0;
          span {
            &:before {
              margin: 10px auto;
              background-size: 100% 100%;
              width: 45px;
              height: 60px;
              display: block;
              content: "";
              background-image: url(../../assets/img/noorder.png);
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
@import "../../styles/common.less";
.myextension {
  .wrapper {
    overflow: hidden;
    .container {
      padding: 30px;
      font-size: 14px;
      text-align: left;
      color: #666;
      .billTitle {
        display: flex;
        width: 100%;
        margin-bottom: 50px;
        border-bottom: 1px solid #eee;
        .btStyle {
          cursor: pointer;
          margin-right: 50px;
          width: 150px;
          height: 42px;
          line-height: 42px;
          font-size: 14px;
          text-align: center;
          background: #fff;
          box-sizing: border-box;
          &.active {
            color: @avatarColor;
            border-bottom: 2px solid @avatarColor;
          }
        }
      }
      .message {
        width: 96%;
        margin: 0 auto;
        font-size: 16px;
        color: #636363;
        padding-bottom: 140px;
        .tips {
          text-align: left;
          padding-bottom: 50px;
          border-bottom: 1px dashed #e9e9e9;
        }
        .inner-box {
          display: table-cell;
          width: 100%;
          .describe {
            float: left;
            margin: 52px 36px 0 0;
          }
          .title {
            float: left;
            margin: 46px 0 0px 0;
            .inputstyle {
              width: 600px;
            }
            .link-copy {
              margin-left: 10px;
              .btnstyle {
                width: 80px;
                background: @avatarColor;
                color: #fff;
                font-size: 14px;
                border: none;
              }
            }
          }
        }
      }
      .commission {
        padding-bottom: 50px;
        border-bottom: 1px dashed #e9e9e9;
        span {
          color: #ff3533;
        }
        strong {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
