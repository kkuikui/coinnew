<template>
    <div class="record">
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h2>{{$t('uc.finance.billdetail')}}</h2>
                    <div class="line">
                        <div class="line1"></div>
                    </div>
                </div>
                <div class="form-group">
                    <span>
                        {{$t('uc.finance.record.start_end')}} ：
                    </span>
                    <DatePicker v-model="rangeDate" type="daterange" class="datepick"></DatePicker>
                    <!--<DatePicker v-model="startDate" type="date"></DatePicker>-->
                    <!--<span>-->
                        <!--{{$t('uc.finance.record.to')}}-->
                    <!--</span>-->
                    <!--<DatePicker v-model="endDate" type="date"></DatePicker>-->
                    <span>
                        {{$t('uc.finance.record.operatetype')}} ：
                    </span>
                    <Select v-model="recordValue" clearable class="opselect">
                        <Option v-for="item in recordType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button @click="queryOrder" class="buttonsearch">{{$t('uc.finance.record.search')}}</Button>
                </div>
                <div class="order-table">
                    <Table stripe :no-data-text="$t('common.nodata')" :columns="tableColumnsRecord" :data="tableRecord"></Table>
                    <div class="pagelist">
                        <div class="pageitem">
                            <Page :total="total" :pageSize="pageSize" show-total
                             :current="page+1" @on-change="changePage"></Page>
                        </div>
                    </div>
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
      ordKeyword: "",
      rangeDate: "",
      startDate: "",
      endDate: "",
      recordValue: "",
      recordType: [
        {
          value: 0,
          label: this.$t("uc.finance.record.charge")
        },
        {
          value: 1,
          label: this.$t("uc.finance.record.pickup")
        },
        {
          value: 2,
          label: this.$t("uc.finance.record.transaccount")
        },
        {
          value: 3,
          label: this.$t("uc.finance.record.exchange")
        },
        {
          value: 4,
          label: this.$t("uc.finance.record.otcbuy")
        },
        {
          value: 5,
          label: this.$t("uc.finance.record.otcsell")
        },
        {
          value: 6,
          label: this.$t("uc.finance.record.activityaward")
        },
        {
          value: 7,
          label: this.$t("uc.finance.record.promotionaward")
        },
        {
          value: 8,
          label: this.$t("uc.finance.record.dividend")
        },
        {
          value: 9,
          label: this.$t("uc.finance.record.vote")
        },
        {
          value: 10,
          label: this.$t("uc.finance.record.handrecharge")
        },
        {
          value: 11,
          label: this.$t("uc.finance.record.match")
        },
        {
          value: 12,
          label: this.$t("uc.finance.record.deposit")
        },
        {
          value: 13,
          label: this.$t("uc.finance.record.get_back_deposit")
        },
         {
          value: 22,
          label: this.$t("uc.finance.record.three1")
        },
         {
          value: 23,
          label: this.$t("uc.finance.record.three2")
        },
       
        // {
        //   value: 14,
        //   label: this.$t("uc.finance.record.legalrecharge")
        // }
        // {
        //   value: 15,
        //   label: this.$t("uc.finance.record.assetexchange")
        // },
        // {
        //   value: 16,
        //   label: this.$t("uc.finance.record.channelaward")
        // },
        // {
        //   value: 19,
        //   label: this.$t("uc.finance.record.airdrop")
        // }
      ],
      pageSize: 10,
      page: 0,
      total: 0,
      tableRecord: []
    };
  },
  created: function() {
    this.getList(this.page);
  },
  methods: {
    changePage(pageindex) {
      this.getList(pageindex - 1);
    },
    queryOrder() {
      let rangedate = "";

      if (this.rangeDate.length == 0) {
        this.$Message.error("请选择搜索日期范围");
        return;
      } else {
        try {
          rangedate +=
            this.rangeDate[0].getFullYear() +
            "-" +
            (this.rangeDate[0].getMonth() + 1) +
            "-" +
            this.rangeDate[0].getDate();
          rangedate += "~";
          rangedate +=
            this.rangeDate[1].getFullYear() +
            "-" +
            (this.rangeDate[1].getMonth() + 1) +
            "-" +
            this.rangeDate[1].getDate();
        } catch (ex) {
          this.$Message.error("请选择搜索日期范围");
          return;
        }
      }

      let params = {};
      params["dateRange"] = rangedate;
      params["pageNo"] = 0;
      params["pageSize"] = 10;
      if (typeof this.recordValue == "number")
        params["type"] = this.recordValue;
      this.$http
        .post(this.host + "/uc/asset/transaction/all", params)
        .then(response => {
          var resp = response.body;
          if (resp.content) {
            this.tableRecord = resp.content;
            this.total = resp.totalElements;
            this.loading = false;
            this.page = resp.number;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getList(pageNo) {
      //获取tableWithdraw
      let params = {};
      params["pageNo"] = pageNo;
      params["pageSize"] = this.pageSize;
      this.$http
        .post(this.host + "/uc/asset/transaction/all", params)
        .then(response => {
          var resp = response.body;
          if (resp.content) {
            this.tableRecord = resp.content;
            this.total = resp.totalElements;
            this.loading = false;
            this.page = resp.number;
          } else {
            this.$Message.error(resp.message);
          }
        });
    }
  },
  computed: {
    tableColumnsRecord() {
      let columns = [];
      var that = this;
      columns.push({
        title: this.$t("uc.finance.record.chargetime"),
        key: "createTime",
        width: 200
      });
      columns.push({
        title: this.$t("uc.finance.record.type"),
        key: "type",
        width: 250,
        render: function(h, params) {
          var type = "";
          if (params.row.type == 0) {
            type = that.$t("uc.finance.record.charge");
          } else if (params.row.type == 1) {
            type = that.$t("uc.finance.record.pickup");
          } else if (params.row.type == 2) {
            type = that.$t("uc.finance.record.transaccount");
          } else if (params.row.type == 3) {
            type = that.$t("uc.finance.record.exchange");
          } else if (params.row.type == 4) {
            type = that.$t("uc.finance.record.otcbuy");
          } else if (params.row.type == 5) {
            type = that.$t("uc.finance.record.otcsell");
          } else if (params.row.type == 6) {
            type = that.$t("uc.finance.record.activityaward");
          } else if (params.row.type == 7) {
            type = that.$t("uc.finance.record.promotionaward");
          } else if (params.row.type == 8) {
            type = that.$t("uc.finance.record.dividend");
          } else if (params.row.type == 9) {
            type = that.$t("uc.finance.record.vote");
          } else if (params.row.type == 10) {
            type = that.$t("uc.finance.record.handrecharge");
          } else if (params.row.type == 11) {
            type = that.$t("uc.finance.record.match");
          } else if (params.row.type == 12) {
            type = that.$t("uc.finance.record.deposit");
          } else if (params.row.type == 13) {
            type = that.$t("uc.finance.record.get_back_deposit");
          } else if (params.row.type == 22) {
            type = that.$t("uc.finance.record.three1");
          } else if (params.row.type == 23) {
            type = that.$t("uc.finance.record.three2");
          }
          //  else if (params.row.type == 14) {
          //   type = that.$t("uc.finance.record.legalrecharge");
          // }
          //    else if (params.row.type == 15) {
          //     type = that.$t("uc.finance.record.assetexchange");
          //   } else if (params.row.type == 16) {
          //     type = that.$t("uc.finance.record.channelaward");
          //   } else if (params.row.type == 19) {
          //     type = that.$t("uc.finance.record.airdrop");
          //   }
          return h("span", type);
        }
      });
      columns.push({
        title: this.$t("uc.finance.record.symbol"),
        key: "symbol"
      });
      columns.push({
        title: this.$t("uc.finance.record.num"),
        key: "amount"
      });
      columns.push({
        title: this.$t("uc.finance.record.fee"),
        key: "fee"
      });
      columns.push({
        title: this.$t("uc.finance.record.status"),
        key: "status",
        render: (h, params) => {
          return h("span", that.$t("uc.finance.record.finish"));
        }
      });
      return columns;
    }
  }
};
</script>
<style scoped lang="less">
@import "../../styles/common.less";
.record {
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
            width: 8%;
            height: 2px;
            background: @baseColor;
          }
        }
      }
      .form-group {
        margin-bottom: 20px;
        .datepick {
          width: 200px;
          margin-right: 10px;
        }
        .opselect {
          width: 200px;
        }
        .buttonsearch {
          padding: 6px 50px;
          margin-left: 10px;
          background: @avatarColor;
          border-radius: 3px;
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
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
</style>
