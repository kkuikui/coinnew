<template>
  <div class="content-wrap identbusiness">
    <div class="wrapper">
      <div class="content" :class="certStatus != 0 ? 'applying' : ''">
        <div class="top-content">
          <div class="ident-title" v-if="certStatus === 0">
            <h3>{{$t('uc.identity.apply')}}</h3>
            <p class="slogon">{{$t('uc.identity.applytip')}}</p>
          </div>
          <div class="ident-title" v-else-if="certStatus == 1">
            <h3>{{$t('uc.identity.applying')}}</h3>
          </div>
          <div class="ident-title" v-else-if="certStatus == 2">
            <h3>{{$t('uc.identity.applyed')}}</h3>
          </div>
          <div class="ident-title" v-else-if="certStatus == 3">
            <h3>{{$t('uc.identity.failapply')}}</h3>
          </div>
          <div class="ident-title" v-else-if="certStatus == 5">
            <h3>{{$t('uc.identity.cancelling')}}</h3>
          </div>
          <div class="ident-title" v-else-if="certStatus == 6">
            <h3>{{$t('uc.identity.failcancel')}}</h3>
          </div>
          <div class="ident-title" v-else-if="certStatus == 7">
            <h3>{{$t('uc.identity.cancelled')}}</h3>
          </div>
          
          <Steps class="apply-step" :current="certStatus == 2 ? 3 : certStatus == 3 ? 2 : certStatus"
           :status="certStatus == 3 ? 'error' :'finish'" 
           v-if="certStatus != 0 && certStatus != 5 && certStatus != 6 && certStatus != 7">
            <Step :title="$t('uc.identity.prepare')"></Step>
            <Step :title="$t('uc.identity.review')"></Step>
            <Step :title="certStatus == 1 || certStatus == 0  ? $t('uc.identity.waitres') : certStatus == 2 ? $t('uc.identity.certified') : $t('uc.identity.adfail')"></Step>
          </Steps>

          <Steps class="apply-step" :current="certStatus == 5 ? 1 : certStatus == 6 ? 2 : 3"
          :status="certStatus == 6 ? 'error':'finish'"
            v-if="certStatus == 5 || certStatus == 6 || certStatus == 7">
            <Step :title="$t('uc.identity.cancelmer')"></Step>
            <Step :title="$t('uc.identity.submission')"></Step>
            <Step :title="certStatus == 5 ? $t('uc.identity.waitres') : certStatus == 6 ? $t('uc.identity.adfail') : $t('uc.identity.certified')"></Step>
          </Steps>

          <div v-if="certStatus == 6" class="result-title">
            <Button type="info" class="result-button" @click="modal_return=true" long size="large">{{$t('uc.identity.resub')}}</Button>
            <div class="fail-reason">
              <Icon type="alert" color="red" size="16"/>
              <span>{{$t('uc.identity.reason')}}：{{refuseReason}}</span>
            </div>
          </div>

          <div v-if="certStatus == 7" class="result-title">
            <Button type="info" class="result-button" @click="modal_read=true" long size="large">{{$t('uc.identity.reapply')}}</Button>
          </div>

          <div v-if="certStatus == 3" class="result-title">
            <Button type="info" class="result-button"
             @click="modal_read=true" long size="large">{{$t('uc.identity.resub')}}</Button>
            <div class="fail-reason">
              <Icon type="alert" color="red" size="16"/>
              <span>{{$t('uc.identity.reason')}}：{{certReason}}</span>
            </div>
          </div>

          <div v-else-if="certStatus == 2" class="result-title">
            <Button type="info" class="result-button" @click="publishAd" long size="large">{{$t('uc.identity.adapply')}}</Button>
            <div class="fail-reason">
              <a @click="returnAdit">{{$t('uc.identity.refunapply')}}</a>
            </div>
          </div>
          <div v-if="certStatus == 2" class="line"></div>
        </div>
        <!-- 认证商家 -->
        <div class="ipshang">
          <div class="ident-title" v-if="certStatus == 3">
            <h3>{{$t('uc.identity.apply')}}</h3>
            <p class="slogon">{{$t('uc.identity.applytip')}}</p>
          </div>
          <div class="ident-title" v-else-if="certStatus == 2">
            <h2 class="getadv">{{$t('uc.identity.rightget')}}</h2>
          </div>
          <Row>
            <Col span="8">
              <div class="business-function">
                <img alt="" src="../../assets/images/business_show.png">
                <p class="slo-word">{{$t('uc.identity.seat')}}</p>
                <span>{{$t('uc.identity.right1')}}</span>
              </div>
            </Col>
            <Col span="8">
              <div class="business-function">
                <img alt="" src="../../assets/images/business_service.png">
                <p class="slo-word">{{$t('uc.identity.service')}}</p>
                <span>{{$t('uc.identity.right2')}}</span>
              </div>
            </Col>
            <Col span="8">
              <div class="business-function" >
                <img alt="" src="../../assets/images/business_fee.png">
                <p class="slo-word">{{$t('uc.identity.lowfee')}}</p>
                <span>{{$t('uc.identity.right3')}}</span>
              </div>
            </Col>
          </Row>

          <div v-show="certStatus === 0" class="agree">
            <Checkbox v-model="single" ></Checkbox>
            <span>{{$t('uc.identity.agree')}}</span>
            <router-link target="_blank" to="/about-merchant" class="cur">{{$t('uc.identity.agreement')}}</router-link>
          </div>
          <div v-show="certStatus === 0" class="sq">
            <button  @click="apply" class="sqbutton">{{$t('uc.identity.applyfor')}}</button>
          </div>
        </div>
  
        <!-- 商家end -->
        <!-- 发送邮件 -->
        <div class="mail" v-show="isShowMailt">
          <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input><br/>
          <Input v-model="value" placeholder="Enter something..." style="width:202px"></Input>
          <Button type="info">{{$t('uc.identity.sendcode')}}</Button><br/>
          <Button type="info" style="margin-top: 25px; width: 297px;">{{$t('uc.identity.confirm')}}</Button>
        </div>
        <!-- 邮件end -->
      </div>
      <!-- 提交审核中 -->
      <div class="submittedAudit" v-show="activeStepIndex === 1">
        <img src="../../assets/img/accomplish.png" alt="">
      </div>
      <!-- end -->
      <!-- 审核成功 -->
      <div class="auditSuccess" v-show="activeStepIndex === 2">
        <img src="../../assets/img/accomplish.png" alt="">
      </div>
    </div>
    <Modal v-model="modal_read" class="modal-applying1">
      <p slot="header">
        <span class="tit">{{$t('uc.identity.howapply')}}</span>
      </p>
      <div class="apply-note">
        <h3>{{$t('uc.identity.step1')}}</h3>
        <p>{{$t('uc.identity.step1tip')}}：<br>{{$t('uc.identity.step1tip1')}}</p>
        <h3>{{$t('uc.identity.step2')}}</h3>
        <p>{{$t('uc.identity.step2tip')}}</p>
        <h3>{{$t('uc.identity.step3')}}</h3>
        <p>{{$t('uc.identity.step3tip')}}</p>
        <!-- <div class="agree" style="text-align: left;padding: 30px 0;">
          <Checkbox v-model="agreeFrozen" ></Checkbox> <span>同意冻结<font color="#2AABFE">{{auditText}}</font>作为商家保证金</span>
        </div>
        <Button type="info" @click="apply2" long style="font-size: 16px;">申请成为商家</Button> -->
      </div>
      <p slot="footer" class="modal-footer">
        <span class="checkagree">
          <Checkbox v-model="agreeFrozen" ></Checkbox>
          <span>{{$t('uc.identity.agreefreeze')}}
            <font class="agreecolor">{{auditText}}</font>
          {{$t('uc.identity.fordeposit')}}</span>
        </span>
        <button class="buttonagree" @click="apply2">{{$t('uc.identity.forapply')}}</button>
      </p>
    </Modal>
    <Modal v-model="modal_apply" class="modal-applying2">
      <p slot="header"></p>
      <div class="apply-content">
        <div class="apply-title">
          <h3>{{$t('uc.identity.subinfor')}}</h3>
          <p>{{$t('uc.identity.subtip1')}}</p>
        </div>
        <Form class="apply-form" :model="apply_form" label-position="top">
          <FormItem :label="$t('uc.identity.phone')">
            <Input v-model="apply_form.telno"></Input>
          </FormItem>
          <FormItem :label="$t('uc.identity.wx')">
            <Input v-model="apply_form.wechat"></Input>
          </FormItem>
          <FormItem :label="$t('uc.identity.qq')">
            <Input v-model="apply_form.qq"></Input>
          </FormItem>
          <Row>
            <Col span="8">
              <FormItem :label="$t('uc.identity.coinsym')">
                <Select v-model="apply_form.coinSymbol" :placeholder="$t('uc.identity.chosym')" @on-change="onCoinChange">
                  <Option v-for="(item, index) in auditCurrency" :key="index" :value="item.coin.unit">{{item.coin.unit}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8"><span>&nbsp;</span></Col>
            <Col span="8">
              <FormItem :label="$t('uc.identity.marginum')">
                <Label v-model="apply_form.amount">{{apply_form.amount}}</Label>
              </FormItem>
            </Col>
          </Row>
          <Row class="applyupload">
            <Col span="8">
              <img v-if="loadsucc1" class="imgupload" :src="apply_form.assetData">
              <p>{{$t('uc.identity.assetpro')}}</p>
              <Upload type="drag" ref="upload" :on-success="assetHandleSuccess" :show-upload-list="false"
               :headers="uploadHeaders" class="uploadstyle" :action="uploadUrl" :on-remove="assetRemove">
                <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.identity.upload')}}</Button>
              </Upload>
            </Col>
            <Col span="8"><span>&nbsp;</span></Col>
            <Col span="8">
              <img  v-if="loadsucc2" class="imgupload" :src="apply_form.tradeData">            
              <p>{{$t('uc.identity.assetcer')}}</p>
              <Upload type="drag" ref="upload" :on-success="tradeHandleSuccess" :show-upload-list="false"
              :headers="uploadHeaders" class="uploadstyle" :action="uploadUrl" :on-remove="tradeRemove">
                <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.identity.upload')}}</Button>
              </Upload>
            </Col>
          </Row>
          <FormItem class="buttonapply">
            <button @click.prevent="apply3('apply_form')" :disabled="applyBtn">{{$t('uc.identity.applyfor')}}</button>
          </FormItem>
        </Form>
      </div>
      <p slot="footer"></p>
    </Modal>
    <Modal v-model="modal_return" @on-ok="returnAudit" class="modal-applying3">
      <p slot="header" class="modalheader">{{$t('common.tip')}}</p>
      <p class="modalcontent">{{$t('uc.identity.loggouttip')}}</p>
      <p class="modalcontent">{{$t('uc.identity.sureop')}}？</p>
      <Input v-model="returnReason" type="textarea" :placeholder="$t('uc.identity.filreason')" :rows="4"></Input>
    </Modal>
</div>

</template>
<script>
export default {
   data(){
       return {
          loadsucc1: false,
          loadsucc2: false,
          loginmsg:this.$t('common.logintip'),
          single: false,
          value:'',
          isShowShang:true,
          isShowMailt:false,
          isShowSubmitted:false,
          isShowSuccess:false,
          activeStepIndex:0,
          emailAdress:'kefu@caymanex.pro',
          steps:[this.$t('uc.identity.prepare'),this.$t('uc.identity.review'),this.$t('uc.identity.passed')],
          certStatus:0,  // 认证申请状态，("未认证"),//0("认证-待审核"), //1("认证-审核成功"),//2("认证-审核失败"),  //3("保证金不足"), //4("退保-待审核"), //5("退保-审核失败"), //6("退保-审核成功") //7
          certReason:'',
          auditCurrency:'',
          auditText:'',
          modal_read:false,
          modal_return:false,
          agreeFrozen:false,
          modal_apply:false,
          applyBtn:false,
          apply_form:{
            telno:"",
            wechat:"",
            qq:"",
            coinSymbol:"",
            amount:"",
            assetData:"",
            tradeData:"",
          },
         uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
         uploadUrl:this.host+'/uc/upload/oss/image',
         returnReason:'',
         refuseReason:'',
       }
   },
 methods: {
   islogin(){
     let self = this
     this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
       var resp = response.body;
       if (resp.code == 0) {
         if (resp.data.realName == null || resp.data.realName == "") {
           this.$Message.warning(this.$t('otc.publishad.submittip1'));
           self.$router.push('/uc/safe');
         } else if (resp.data.phoneVerified == 0) {
           this.$Message.warning(this.$t('otc.publishad.submittip2'));
           self.$router.push('/uc/safe');
         } else if (resp.data.fundsVerified == 0) {
           this.$Message.warning(this.$t('otc.publishad.submittip3'));
           self.$router.push('/uc/safe');
         }
       } else {
         this.$Message.error(resp.message);
       }
     })
   },
    timer() {
        setInterval(()=>{
            this.getSetting();
        },10000)
    },
     publishAd(){
       this.$router.push('/otc/ad/create');
     },
   returnAdit(){
      this.modal_return = true;
   },
   returnAudit(){
     var params = {};
     params["detail"] = this.returnReason;
     this.$http.post(this.host + '/uc/approve/cancel/business',params).then(res =>{
         let resp = res.body;
         if (resp.code == 0) {
           this.$Message.success("提交成功!");
           this.modal_return = false;
           this.getSetting();
         }else {
           this.$Message.error(resp.message);
         }
       });
   },
   getAudiCoin(symbol) {
     var coin = null;
     for (var i=0;i<this.auditCurrency.length;i++) {
       if (symbol == this.auditCurrency[i].coin.unit) {
         coin = this.auditCurrency[i];
         break;
       }
     }
     return coin;
   },
   onCoinChange(value){
     var coin = this.getAudiCoin(value);
     if (coin != null) {
       this.apply_form.amount = coin.amount;
     }
   },
    getSetting() {
         this.$http.get(this.host + this.api.uc.identification)
         .then(res =>{
              let certifiedBusinessStatus = res.body.data.certifiedBusinessStatus;
              this.activeStepIndex = certifiedBusinessStatus;
              this.certStatus = certifiedBusinessStatus;
              this.certReason = res.body.data.detail;
              this.refuseReason = res.body.data.reason;
         })
        .catch(function (error) {
         });
    },
    assetHandleSuccess(res,file){
        if(res.code==0){
            this.apply_form.assetData = res.data;
            this.loadsucc1 = true;
        }else{
            this.$Message.warning(res.message);   
        }
     
    },
    tradeHandleSuccess(res,file){
     
       if(res.code==0){
            this.apply_form.tradeData = res.data;
            this.loadsucc2 = true;
        }else{
            this.$Message.warning(res.message);   
        }
    },
    assetRemove(file,fileList){
      this.apply_form.assetData = "";
    },
    tradeRemove(file,fileList){
       this.apply_form.tradeData = "";
     },
    getAuthFound(){
        this.$http.get(this.host + "/uc/approve/business-auth-deposit/list").then(res =>{
            var resp = res.body;
            if (resp.code == 0) {
            this.auditCurrency = resp.data;
            var tempText = "";
            for (var i=0;i<resp.data.length;i++) {
                if (i == 0) {
                    this.apply_form.coinSymbol = resp.data[i].coin.unit;
                    this.apply_form.amount = resp.data[i].amount;
                }
                tempText += resp.data[i].amount + this.$t('uc.identity.one') +resp.data[i].coin.unit;
                if (i < resp.data.length - 1) tempText += this.$t('uc.identity.or');
            }
            this.auditText = tempText;
            }
        })
    },
    apply(){
       let stasingle =  this.single
       if(stasingle == false){
         this.$Message.warning(this.$t('uc.identity.approve'));
         return;
       }
       this.modal_read=true;
       return;

      this.$http.get(this.host + this.api.uc.apply).then(res =>{
          var resp = res.body;
          if (resp.code == 0) {
              this.$Message.success(resp.message);
              this.activeStepIndex = 1;
          }else {
              this.$Message.warning(resp.message);
          }
         }).catch(function (error) {
             this.$Message.error(error);
         });
  },
   apply2(){
     let agreeFrozen =  this.agreeFrozen;
     if(agreeFrozen == false){
       this.$Message.warning("请同意冻结相应数量的币");
       return;
     }
     this.modal_read=false;
     this.modal_apply=true;
   },
   apply3(form){
     if (this.apply_form.telno == "") {
       this.$Message.error("请填写手机号");
       return;
     }
     if (this.apply_form.wechat == "") {
       this.$Message.error("请填写微信号");
       return;
     }
     if (this.apply_form.qq == "") {
       this.$Message.error("请填写qq号");
       return;
     }
     if (this.apply_form.assetData == "") {
       this.$Message.error("请上传资产证明");
       return;
     }
     if (this.apply_form.tradeData == "") {
       this.$Message.error("请上传交易证明");
       return;
     }
     this.applyBtn=true;
     var params = {};
     params["businessAuthDepositId"] = this.getAudiCoin(this.apply_form.coinSymbol).id;
     params["json"] = JSON.stringify(this.apply_form);
     this.$http.post(this.host + "/uc/approve/certified/business/apply",params).then(res =>{
       var resp = res.body;
       if (resp.code == 0) {
            this.$Message.success("提交成功!");
            this.applyBtn=false;
            this.modal_apply = false;
            this.certStatus = 1;
       }else {
            this.$Message.error(resp.message);
           this.applyBtn=false;
       }
     })
   }

},
  created(){
 //this.timer();
    this.islogin();
    this.getSetting();
    this.getAuthFound();
}

};
</script>

<style lang="less">
@import '../../styles/common.less';
//button样式修改
.ivu-btn-ghost{
  border: none;
  &:active {
    color: @avatarColor;
    background-color: transparent;
    border: none;
  }
}

// modal样式修改
.ivu-modal-footer {
  .ivu-btn-primary {
    color: #000;
    border-color: @avatarColor;
    background-color: @avatarColor;
    &:hover{
      color: #000;
      border-color: @avatarColor;
      background-color: @avatarColor;
    }
  }
}

// 步骤条样式修改
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
    background-color: #C4BF98 !important;
    border-color: #C4BF98 !important;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner>
  .ivu-steps-icon, .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span {
    color: #FFF !important;
  }
  .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
    border-color: @baseColor !important;
    background-color: @baseColor !important;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after {
    background: @baseColor !important;
  }
</style>

<style scoped lang="less">
@import '../../styles/common.less';
	.identbusiness{
    background: #fafafc;
    padding: 81px;
    padding-top: 20px;
	  .wrapper{
      width:1200px;
		  .content{
        &.applying {
          background: #fff;
        }
        width: 1200px;
        text-align: center;
        padding: 30px 0;
        height: 100%;
        .top-content {
          // width: 80%;
          margin: 0 auto;
          margin-bottom: 70px;
          .ident-title{
            color: #1C1B2C;
            h3{
              font-size: 30px;
              font-weight: 500;
            }
            .slogon{
              font-size: 14px;
              margin-top: 10px;
              color: #99989D;
            }
          }
          .apply-step{
            width: 80%;
            padding: 50px 0;
            margin: 0 0 0 265px;
            text-align: left;
          }
          .result-title{
            width: 500px;
            margin: 0 auto;
            .result-button{
              width: 120px;
              color: #fff;
              background: @avatarColor;
              border-color: @avatarColor;
            }
            .fail-reason{
              margin-top: 20px;
              font-size: 16px;
              span{
                margin-left: 10px;
              }
              a{
                color: #aaa;
              }
            }
          }
          .line {
              height: 1px;
              background: #efefef;
              width: 1100px;
              margin: 40px auto;
            }
        }
        .ipshang{
          .ident-title {
            .getadv{
              padding-bottom: 40px;
            }
          }
          .business-function{
            background: #fff;            
            width: 300px;
            margin: 0 auto;
            margin-bottom: 90px;
            border-radius: 4px;
            padding: 60px 0;
            height: 350px;
            border: 1px solid @borderLine;
            &:hover{
						  box-shadow: 0 0 10px 5px @bgColor;
						  transform: scale(1.02);
					  }           
            .slo-word{
              padding-top: 40px;
              padding-bottom: 10px;
              font-weight: 600;
              font-size: 18px;              
            }
            span {
              font-size: 14px;
              color: #99989D;
            }
          }
          .agree{
            font-size: 13px;
            color: #99989D;
          }
          .sq{
            .sqbutton{
              font-size: 18px;
              width: 350px;
              height: 60px;
              color: #fff;
              text-align: center;
              margin: 20px auto;
              border-radius: 40px;
              background: @avatarColor;
            }
          }
        }
        .mail {
          width: 1000px;
          margin: 87px auto;
          line-height: 50px;
          display: none;
        }
      }
      .submittedAudit {
        width: 1000px;
        margin: 87px auto;
        text-align: center;
        display: none;
      }
      .auditSuccess {
        width: 1000px;
        margin: 87px auto;
        text-align: center;
        display: none;
      }
    }
  }

  .modal-applying1{
    .tit {
      font-size: 16px;
      line-height: 25px;
      // border-left: 5px solid #3faef5;
      // padding-left: 15px;
    }
    .apply-note {
      font-size: 14px;
      h3{
        padding-top: 40px;
        padding-bottom: 10px;
        font-size: 16px;
      }
      p{
        color: #aaa;
      }
    }
    .modal-footer {
      font-size: 14px;
      padding: 25px 0;
      .checkagree {
        float: left;
        line-height: 30px;
        text-align:left;
        .agreecolor{
          color: @avatarColor;
        }
      }
      .buttonagree{
        background: @avatarColor;
        font-size: 16px;
        height: 30px;
        width: 120px;
        border-radius: 4px;
        color: #fff;
      }
    }
  }

  .modal-applying2{
    .apply-content{
      padding: 10px 15px;
      .apply-title{
        text-align: center;
        h3{
          font-size: 16px;
        }
        p{
          padding: 7px 0;
          color: #aaa;
        }
      }
      .apply-form{
        .applyupload{
          text-align: center;
          margin-bottom: 30px;
          .uploadstyle{
            text-align: center; 
            margin: 10px auto 0;
            width: 95px;
            .ivu-btn-ghost{
              height: 30px;
              // border: 1px solid @buttonColor1;
              &:hover{
                color: @baseColor;
              }
            }
          }
          .imgupload {
            width: 130px;
            height: 100px;
          }
        }
        .buttonapply {
          margin-top: 20px;
          button {
            width: 100%;
            background: @avatarColor;
            border-radius: 4px;
            color: #fff;
          }
        }
      }
    }
  }
  
  .modal-applying3{
    .modalheader {
      text-align: center;
    }
    .modalcontent {
      text-align: center;
      font-size: 14px;
    }
  }

</style>


