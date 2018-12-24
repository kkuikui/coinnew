<template>
    <div class="tradeCenter">
        <div class="wrapper">
            <section class="trade-group">
                <i class="tips"></i>
                <!-- <span class="tips-word">{{$t("otc.ad")}}{{this.coin.toUpperCase()}}</span> -->
                <!-- <a href="/user/merchants">申请为认证商家&gt;&gt;</a> -->
                <a href="/#/identbusiness" v-if="userlevel != 2">{{$t('otc.applymerchant')}}&gt;&gt;</a>
                <a href="/#/identbusiness" v-else>{{$t('otc.unapplymerchant')}}&gt;&gt;</a>
            </section>
            <section class="list-content">
                <Tabs :value="tabPage" v-model="tabPage">
                    <TabPane :label="$t('otc.buyin')" name="buy">
                     <!--列表表格-->
                        <div class="list-table">
                            <Table :no-data-text="$t('common.nodata')" :border="showBorder" :stripe="showStripe"
                             :show-header="showHeader" :height="fixedHeader ? 250 : ''"
                             :size="tableSize" :data="advertiment.ask.rows"
                             :columns="advertiment.columns" :loading="loading"></Table>
                            <div class="pagelist">
                                <div class="pageitem">
                                    <Page v-if="advertiment.ask.totalElement > 0" :pageSize="advertiment.ask.pageNumber"
                                     :total="advertiment.ask.totalElement" :current="advertiment.ask.currentPage"
                                      @on-change="changePage"></Page>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane :label="$t('otc.sellout')" name="sell">
                        <div class="list-table">
                            <Table :no-data-text="$t('common.nodata')" :border="showBorder"
                             :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''"
                             :size="tableSize" :data="advertiment.bid.rows"
                             :columns="advertiment.columns" :loading="loading"></Table>
                            <div class="pagelist">
                                <div class="pageitem">
                                    <Page v-if="advertiment.bid.totalElement > 0" :pageSize="advertiment.bid.pageNumber"
                                     :total="advertiment.bid.totalElement" :current="advertiment.bid.currentPage"
                                      @on-change="changePage"></Page>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </section>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    var self = this;
    return {
      loginmsg: this.$t("common.logintip"),
      userlevel: 0,
      userStatus: {},
      showBorder: false,
      showStripe: true,
      showHeader: true,
      showIndex: false,
      showCheckbox: false,
      fixedHeader: false,
      loading: true,
      dataCount: 10,
      tableSize: "large",
      tabPage: "buy",
      advertiment: {
        //卖出的广告数据
        ask: {
          rows: [],
          currentPage: 1,
          totalPage: 1,
          pageNumber: 10,
          totalElement: 0
        },
        //买入的广告数据
        bid: {
          rows: [],
          currentPage: 1,
          totalPage: 1,
          pageNumber: 10,
          totalElement: 0
        },
        columns: [
          {
            title: self.$t("otc.merchant"),
            key: "memberName",
            width: 250,
            align: "center",
            ellipsis: true,
            render: function(h, params) {
              var avatar = params.row.avatar,
                haveAvatar = false;
              var innerCNT = [];
              if (avatar != null && avatar != "") {
                innerCNT[0] = h(
                  "div",
                  {
                    attrs: {
                      class: "user-avatar-public"
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: avatar,
                        width: "45px",
                        height: "45px"
                      },
                      style: {
                        "border-radius": "50%"
                      }
                    })
                  ]
                );
              } else {
                innerCNT[0] = h(
                  "div",
                  {
                    attrs: {
                      class: "user-avatar-public"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        attrs: {
                          class: "user-avatar-in"
                        }
                      },
                      params.row.memberName
                        .replace(/^\s+|\s+$/g, "")
                        .slice(0, 1)
                    )
                  ]
                );
              }
              innerCNT[1] = h(
                "p",
                {
                  attrs: {
                    class: "user-avatar-name"
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: {
                        marginRight: "8px",
                        cursor: "pointer",
                        paddingTop: "5px"
                      },
                      class: {
                        // renzhengA: params.row.renzheng
                      },
                      on: {
                        click: function() {
                          if (self.isLogin) {
                            self.$router.push(
                              "/checkuser?id=" + params.row.memberName
                            );
                          } else {
                            self.$router.push("/login");
                          }
                        }
                      }
                    },
                    params.row.memberName
                  ),
                  h(
                    "div",
                    {
                      class: {
                        // renzheng: params.row.renzheng
                      }
                    },
                    ""
                  )
                ]
              );
              if (params.row.level == 2)
                innerCNT[2] = h(
                  "div",
                  {
                    attrs: {
                      class: "user-business-v"
                    },
                    style: {
                      display: "inline-block",
                      "vertical-align": "middle"
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: require("../../assets/images/business_v.png")
                      }
                    })
                  ]
                );
              return h("div", innerCNT);
            }
          },
          {
            title: self.$t("otc.volume"),
            key: "transactions",
            align: "center"
          },
          {
            title: self.$t("otc.amount"),
            key: "remainAmount",
            align: "center"
          },
          {
            title: self.$t("otc.price_coin"),
            key: "price",
            width: 170,
            align: "center",
            render: function(h, params) {
              return h("div", [
                h(
                  "p",
                  {
                    attrs: {
                      class: params.row.advertiseType === 0 ? "price1" : "price"
                    }
                  },
                  parseFloat(params.row.price)
                    .toFixed(3)
                    .slice(0, -1) + "CNY"
                ),
                h(
                  "p",
                  {
                    attrs: {
                      class: "price2"
                    }
                  },
                  params.row.minLimit + "-" + params.row.maxLimit + "CNY"
                )
              ]);
            }
          },
          {
            title: self.$t("otc.paymethod"),
            key: "payMode",
            width: 150,
            align: "center",
            render: function(h, params) {
              var stylecoin = [];
              var paymode = params.row.payMode.split(",");
              let arr = [];

              for (var i = 0; i < paymode.length; i++) {
                if (paymode[i] === "支付宝") {
                  stylecoin.push(
                    h("img", {
                      attrs: {
                        src: require("../../assets/img/alipay.png"),
                        width: "25px",
                        height: "25px"
                      },
                      style: {
                        dispaly: "inline-block",
                        marginRight: "8px"
                      }
                    })
                  );
                }
                if (paymode[i] === "微信") {
                  stylecoin.push(
                    h("img", {
                      attrs: {
                        src: require("../../assets/img/wechat.png"),
                        width: "25px",
                        height: "25px"
                      },
                      style: {
                        dispaly: "inline-block",
                        marginRight: "8px"
                      }
                    })
                  );
                }
                if (paymode[i] === "银联") {
                  stylecoin.push(
                    h("img", {
                      attrs: {
                        src: require("../../assets/img/bankcard.png"),
                        width: "25px",
                        height: "25px"
                      },
                      style: {
                        dispaly: "inline-block",
                        marginRight: "8px"
                      }
                    })
                  );
                }
              }
              return h("div", stylecoin);
            }
          },
          {
            title: self.$t("otc.operate"),
            key: "buyBtn",
            align: "center",
            render: function(h, params) {
              return h("p", [
                h(
                  "a",
                  {
                    style: {
                      color: "#fff"
                    },
                    on: {
                      click: () => {
                        if (!self.isLogin) {
                          self.$router.push("/login");
                        } else if (!self.member.realVerified) {
                          self.$Message.error(self.$t("otc.validate"));
                          setTimeout(() => {
                            self.$router.push("/uc/safe");
                          }, 2000);
                        } else {
                          self.$router.push(
                            "/otc/tradeInfo?tradeId=" + params.row.advertiseId
                          );
                        }
                      }
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          // type:  params.row.advertiseType == 0 ? 'error':'success',
                          long: true
                        },
                        attrs: {
                          class: "user-button"
                        },
                        style: {
                          marginRight: "8px",
                          width: "80%",
                          color: "#fff"
                        }
                      },
                      [
                        h(
                          "span",
                          (params.row.advertiseType === 0
                            ? self.$t("otc.sell")
                            : self.$t("otc.buy")) + self.coin.toUpperCase()
                        )
                      ]
                    )
                  ]
                )
              ]);
            }
          }
        ]
      }
    };
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
    coin: function() {
      return this.$route.params[0];
    },
    lang: function() {
      return this.$store.state.lang;
    }
  },
  watch: {
    coin: function() {
      this.reloadAd();
    },
    lang: function() {
      this.updateLangData();
    }
  },
  methods: {
    updateLangData() {
      this.advertiment.columns[0].title = this.$t("otc.merchant");
      this.advertiment.columns[1].title = this.$t("otc.volume");
      this.advertiment.columns[2].title = this.$t("otc.amount");
      this.advertiment.columns[3].title = this.$t("otc.price_coin");
      this.advertiment.columns[4].title = this.$t("otc.paymethod");
      this.advertiment.columns[5].title = this.$t("otc.operate");
    },
    loadAd(pageNo, advertiseType, table) {
      //获取广告
      let params = {};
      table.rows = [];
      table.totalElement = 0;
      table.currentPage = pageNo;
      params["pageNo"] = pageNo;
      params["pageSize"] = table.pageNumber;
      params["advertiseType"] = advertiseType;
      params["unit"] = this.coin;
      this.$http
        .post(this.host + this.api.otc.advertise, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            if (resp.data.context) {
              table.rows = resp.data.context;
              table.totalElement = resp.data.totalElement;
            }
          } else {
            this.$Message.error(resp.message);
          }
          this.loading = false;
        });
    },
    changePage(page) {
      if (this.tabPage == "sell") {
        this.loadAd(page, 0, this.advertiment.bid);
      } else {
        this.loadAd(page, 1, this.advertiment.ask);
      }
    },
    reloadAd() {
      this.tabPage = "buy";
      this.loadAd(1, 0, this.advertiment.bid);
      this.loadAd(1, 1, this.advertiment.ask);
    },
    getMember() {
      let self = this;
      this.$http
        .post(this.host + "/uc/approve/certified/business/status")
        .then(res => {
          if (!res.data.code) {
            this.userStatus = res.data.data;
            this.userlevel = this.userStatus.memberLevel;
          } else this.$Message.error(res.message);
        })
        .catch(err => console.error(err));
    },
    getMemberList() {
      //获取个人安全信息
      var self = this;
      this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            var user = resp.data;
            self.member.realVerified = user.realVerified;
            self.$store.commit("setMember", self.member);
          } else {
            // this.$Message.error(this.loginmsg);
          }
        });
    }
  },
  created() {
    this.reloadAd();
    this.getMember();
    this.getMemberList();
  }
};
</script>

<style lang="less">
@import "../../styles/common.less";
.ivu-table-cell {
  .price {
    font-size: 16px;
    font-weight: bolder;
    color: #0da259;
  }
  .price1 {
    font-size: 16px;
    font-weight: bolder;
    color: #f16543;
  }
}
.ivu-table-cell .price2 {
  font-size: 12px;
  color: #8994a3;
  margin-top: 0;
}

.ivu-table-cell {
  .user-avatar-public {
    display: inline-block;
    line-height: 59px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .user-avatar-name {
    display: inline-block;
  }
  .user-business-v {
    display: inline-block;
    margin-top: 5px;
  }
}
.ivu-table-cell {
  .user-button {
    border-radius: 4px;
    height: 32px;
    background: @avatarColor;
    border-color: @avatarColor;
    &:active {
      border-color: @avatarColor;
    }
  }
}
</style>

<style scoped lang="less">
@import "../../styles/common.less";
.tradeCenter {
  .wrapper {
    .trade-group {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: @baseColor;
      margin-bottom: 20px;
      font-size: 14px;
      .tips {
        width: 4px;
        height: 22px;
        margin-right: 10px;
        background: @baseColor;
        display: inline-block;
        margin-left: 4px;
        background-size: 100% 100%;
      }
      .tips-word {
        flex-grow: 2;
        text-align: left;
      }
      a {
        color: @baseColor;
      }
    }
    .list-content {
      .list-table {
        .pagelist {
          margin: 20px 10px;
          overflow: hidden;
          .pageitem {
            float: right;
          }
        }
      }
    }
  }
}
</style>
