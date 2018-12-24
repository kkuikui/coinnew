<template>
  <div class="content-wrap about_us">
    <img src="../../assets/images/call.png">
    <div class="wrapper">
      <div class="container">
        <Row>
          <Col span="4">
            <div class="leftmenu">
              <ul class="nav">
                <li class="listtitle">{{$t('cms.about')}}</li>
                <li>
                  <router-link to="/about-us" class="pill-item">{{$t('cms.aboutus')}}</router-link>
                </li>
                <li>
                  <router-link to="/join-us" class="pill-item">{{$t('cms.joinus')}}</router-link>
                </li>
              </ul>
            </div>
          </Col>
          <Col span="20">
          <div class="rightcontent">
            <div class="WordSection1" style="layout-grid:15.6pt">
              <p class="MsoNormal"><b><span lang=EN-US>&nbsp;</span></b></p>
              <p class="MsoNormal">
                <span lang=EN-US>币对</span>
                <span>（{{this.url}}）是服务于全球专业交易者的数字资产交易平台，致力于为数字资产投资人以及优质的、有实体经济为依托的资产通证提供服务。</span>
              </p>
              <p class="MsoNormal">
                <span>我们的服务理念：正直严谨；开放创新；合作共赢。<br></span>
              </p>
              <p class="MsoNormal">
                <span>我们的服务优势：全球顶级安全风控体系；世界领先的技术优势；国际化专业运营团队。</span>
              </p>
              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
              <p class="MsoNormal"><b><span>全球顶级安全风控体系</span></b></p>
              <p class="MsoNormal">
                <span lang=EN-US class="dot">l<span class="dotspace">&nbsp; </span>
                </span>
               <span>全球首创的的数字资产研究评估体系</span>
              </p>
              <p class="MsoNormal">
                <span lang=EN-US  class="dot">l<span class="dotspace">&nbsp; </span></span>
                <span>深耕数字资产服务产业，提供权威的资产分析</span>
              </p>
              <p class="MsoNormal">
                <span lang=EN-US  class="dot">l<span class="dotspace">&nbsp; </span></span>
                <span>专业分布式架构和防DDOS攻击系统</span>
              </p>
              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
              <p class="MsoNormal"><b><span>世界领先的技术优势</span></b></p>
              <p class="MsoNormal">
                <span lang=EN-US  class="dot">l<span class="dotspace">&nbsp; </span></span>
                <span>经权威认证多机互备的高速内存撮合技术，处理速度高达10万单/秒，远高于行业平均水平。</span>
              </p>
              <p class="MsoNormal">
                <span lang=EN-US  class="dot">l<span class="dotspace">&nbsp; </span></span>
                <span lang=EN-US>SSL</span><span>SSL、动态身份验证等银行级别安全技术</span>
              </p>
              <p class="MsoNormal">
                  <span lang=EN-US  class="dot">l<span class="dotspace">&nbsp; </span></span>
                  <span>冷钱包、私钥离线化的热钱包等先进的技术</span>
                </p>
              <p class="MsoNormal"><span lang=EN-US>&nbsp;</span></p>
              <p class="MsoNormal"><b><span>国际化专业运营团队</span></b></p>
              <p class="MsoNormal">
                <span lang=EN-US  class="dot">l<span class="dotspace">&nbsp; </span></span>
                <span>提供比特币、莱特币、以太坊等数字资产的币币和衍生品交易服务</span>
              </p>
              <p class="MsoNormal">
                <span lang=EN-US class="dot">l<span class="dotspace">&nbsp; </span></span>
                <span>全球多个国家和地区设立交易服务中心</span>
              </p>
              <p class="MsoNormal">
                <span lang=EN-US  class="dot">l<span class="dotspace">&nbsp; </span></span>
                <span>众多的合作伙伴为平台提供流动性</span>
              </p>
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
	.about_us{
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
          .WordSection1 {
            padding-bottom: 20px;
            .MsoNormal{
              text-indent: 2em;
              margin-bottom: 10px;
              text-align:left;
              span{
                font-family: 宋体;
                color:black;
                font-size: 14px;
                &.dot {
                  font-family: Wingdings;
                }
                &.dotspace {
                  font: 7.0pt "Times New Roman";
                }
              }
            }
          }
	  		}
      }
		}
	}
  
</style>
