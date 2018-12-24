<template>
    <div>
        <div id="container" style="min-width:400px;height:400px"></div>
    </div>
</template>
<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import Highmaps from "highcharts/modules/map";

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);
export default {
  props: ["depData"],
  data() {
    return {
        units:"",
    };
  },
  mounted() {
    // this.initChart();
  },
  computed: {
    dep: function() {
      return this.depData;
    }
  },
  created() {
    // this.units=this.depData.ask.symbol.split('/')[1]
    // console.log(this.depData)
    this.set();
  },
  watch: {
    dep: function() {
      this.initChart();
      this.set();
    }
  },
  methods: {
    initChart() {
      let that = this;
      var chartTheme = {
        colors: ["#314144", "#482d3f"],
        chart: {
          backgroundColor: "#202436",
          //borderColor: "#fff",
          //borderRadius: 0,
          //plotShadow: !0,
          //plotBorderWidth: 1,
          height: 460
        },
        xAxis: {
          gridLineWidth: 0,
          lineColor: "#000",
          tickColor: "#000",
          labels: {
            style: {
              color: "#6d7493"
            }
          },
          title: {
            style: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          opposite: true,
          gridLineWidth: 0,
          lineColor: "#000",
          tickColor: "#000",
          lineWidth: 1,
          tickWidth: 1,
          labels: {
            style: {
              color: "#6d7493"
            }
          },
          title: {
            style: {
              color: "#fff"
            }
          }
        },
        plotOptions: {
          series: {
            fillOpacity: 1
          }
        }
      };
      Highcharts.setOptions(chartTheme);
      Highcharts.zdy_chart = new Highcharts.Chart("container", {
        chart: {
          type: "area"
          //renderTo: "chart_depth"
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        credits: {
          text: "",
          href: ""
        },
        xAxis: {
          title: {
            // text: '比特币价格'
            text: '价格' +this.dep.ask.symbol.split('/')[1]
          },
          labels: {
            formatter: function() {
            //   return "￥" + this.value;
                let velues=String(this.value)
                if(velues.indexOf('e')==-1){
                    return velues+that.dep.ask.symbol.split('/')[1]
                }else{
                    
                    
                    return   this.value.toFixed(8)+that.dep.ask.symbol.split('/')[1]
                }
            }
          },
          min:0,
        },
        yAxis: {
          title: {
            text: '数量',
          },
          labels: {
            formatter: function() {
              if (that.dep.coin) {
                return this.value + that.dep.coin;
              } else {
                return this.value +that.dep.coin;
              }
            }
          },
          min:0,
        },
        tooltip: {
          shared: !0,
          formatter: function() {
              let coinUnit= localStorage.getItem('coinType')|| '';
            return (
             '委 托 价 ：' + this.points[0].x + coinUnit  +"<br>" + this.points[0].series.name + "：" + '累计数量' + this.points[0].y
            ); //Math.round(this.points[0].y)
          }
        },
        plotOptions: {
          area: {
            pointStart: 0,
            marker: {
              enabled: !1,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: !0
                }
              }
            }
          }
        },
        series: [
          {
            name:  '买盘委托',
            data: [
              [214, 99],
              [289, 78],
              [305, 59],
              [458, 36],
              [500, 45],
              [780, 12],
              [900, 12]
            ]
          },
          {
            name:  '卖盘委托',
            data: [
              [910, 8],
              [1000, 14],
              [1100, 29],
              [1200, 45],
              [1300, 59],
              [1400, 81.2]
            ]
          }
        ]
      });
    },
    set() {
      if (this.dep.ask || this.dep.ask) {
        let buy = Array.from(this.dep.ask.items).map(item => {
          let temp = [];
          temp[0] = item.price;
          temp[1] = item.amount;
          return temp;
        });
        let sell = Array.from(this.dep.bid.items).map(item => {
          let temp = [];
          temp[0] = item.price;
          temp[1] = item.amount;
          return temp;
        });
        Highcharts.zdy_chart.series[0].setData(sell);
        Highcharts.zdy_chart.series[1].setData(buy);

        //   Highcharts.zdy_chart.yAxis.labels.formatter('bch')
      }
    }
  }
};
</script>
<style>
</style>

