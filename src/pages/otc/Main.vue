<template>
    <div class="otc content-wrap">
        <div class="wrapper">
            <div class="container">
                <Row>
                    <Col span="4">
                        <div class="leftmenu">
                            <ul class="nav">
                                <li class="listtitle">{{$t('otc.transaction')}}</li>
                                <li class="pill-item" v-for="item, index in coins"
                                 :class="{'active':ind === item.unit}" @click="menuSelected(`coin-${index}`)">
                                    {{item.unit}}
                                </li>
                                <li class="pill-item" @click="menuSelected('ad')" :class="{'active':ind === 'ad'}">{{$t('otc.myad.title')}}</li>
                                <li class="pill-item" @click="menuSelected('order')" :class="{'active':ind === 'order'}">{{$t('otc.myorder')}}</li>
                            </ul>
                        </div>
                    </Col>
                    <Col span="20">
                        <div class="rightcontent">
                            <!-- <keep-alive> -->
                            <router-view></router-view>
                            <!-- </keep-alive> -->
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      coins: [],
      activeMenuName: "coin-0",
      coin: ""
    };
  },
  methods: {
    init() {
      this.$store.commit("navigate", "nav-otc");
      this.$http.post(this.host + this.api.otc.coin).then(response => {
        if (response.body.code == 0) {
          this.coins = response.body.data;
        }
      });
    },
    menuSelected(menuName) {
      if (menuName.startsWith("coin")) {
        this.coin = this.coins[menuName.split("-")[1]].unit;
        this.$router.push("/otc/trade/" + this.coin);
      } else {
        this.coin = menuName;
        this.$router.push("/otc/" + menuName);
      }
    }
  },
  computed: {
    ind: function() {
      if (this.coin != "undefined" && this.coin != "") {
        return this.coin;
      } else {
        let list = this.$route.path.split("/");
        if (list[2] === "ad" || list[2] === "order") {
          return list[2];
        }
        if (list[2] === "trade") {
          return list[3];
        }
      }
    }
  },
  created: function() {
    this.init();
  },
  mounted: function() {}
};
</script>
<style scoped lang="less">
@import "../../styles/common.less";
@import "../../styles/left_content.less";
.content-wrap {
  .wrapper {
    width: 1200px;
    .container {
      width: 1200px;
      .leftmenu {
        .nav {
          .listtitle {
          }
          .pill-item {
          }
        }
      }
      .rightcontent {
        padding: 10px 20px;
      }
    }
  }
}
</style>