<template>
    <div class="account">
        <div class="wrapper">
            <div class="container">
                <section class="merchant-top">
                    <i class="merchant-icon"></i>
                    <span class="tips-word">{{$t('uc.account.pagetitle')}}</span>
                    <span class="tips-g">{{$t('uc.account.pagetip')}}</span>
                </section>
                <section class="accountContent">
                    <div class="account-in">
                        <div class="account-item">
                            <div class="account-item-in">
                                <i class="icons bankfor"></i>
                                <span class="card-number">{{$t('uc.account.backcardno')}}</span>
                                <p v-if="user.bankVerified==1" class="bankInfo">
                                    {{user.bankInfo.cardNo}}
                                </p>
                                <p v-else class="bankInfo">
                                  {{$t('uc.account.backcardtip')}}
                                </p>
                                <a class="btn" v-if="user.bankVerified==1" @click="showItem(1)">{{$t('uc.account.modify')}}</a>
                                <a class="btn" v-else @click="showItem(1)">{{$t('uc.account.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==1">
                                <div class="detail-list list-email">
                                    <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate" :label-width="85">
                                        <!-- name -->
                                        <FormItem :label="$t('uc.account.name')" prop="name">
                                            <Input disabled size="large" v-model="formValidate1.name"></Input>
                                        </FormItem>
                                        <!-- bankName -->
                                        <FormItem :label="$t('uc.account.bankaccount')" prop="bankName">
                                            <Select v-model="formValidate1.bankName" size="large">
                                                <Option v-for="item in bankNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                        <!-- bankBranch -->
                                        <FormItem :label="$t('uc.account.bankbranch')" prop="bankBranch">
                                            <Input v-model="formValidate1.bankBranch" size="large"></Input>
                                        </FormItem>
                                        <!-- bankNo -->
                                        <FormItem :label="$t('uc.account.bankno')" prop="bankNo">
                                            <Input v-model="formValidate1.bankNo" size="large" type="text"></Input>
                                        </FormItem>
                                        <!-- bankNoConfirm -->
                                        <FormItem :label="$t('uc.account.confirmbankno')" prop="bankNoConfirm">
                                            <Input v-model="formValidate1.bankNoConfirm" size="large" type="text"></Input>
                                        </FormItem>
                                        <!-- passwd -->
                                        <FormItem :label="$t('uc.account.fundpwd')" prop="password">
                                            <Input v-model="formValidate1.password" type="password" size="large"></Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button class="savebtn btn1" @click="handleSubmit('formValidate1')">{{$t('uc.account.save')}}</Button>
                                            <!-- <Button type="ghost" @click="handleReset('formValidate1')" style="margin-left: 8px">Reset</Button> -->
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div class="account-item">
                            <div class="account-item-in">
                                <i class="icons alipay"></i>
                                <span class="card-number">{{$t('uc.account.zfbaccount')}}</span>
                                <p v-if="user.aliVerified==1" class="bankInfo">
                                    {{user.alipay.aliNo}}
                                </p>
                                <p v-else class="bankInfo">
                                  {{$t('uc.account.zfbaccounttip')}}
                                </p>
                                <a class="btn" v-if="user.aliVerified==1" @click="showItem(2)">{{$t('uc.account.modify')}}</a>
                                <a class="btn" v-else @click="showItem(2)">{{$t('uc.account.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==2">
                                <div class="detail-list list-email">
                                    <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="85">
                                      <!-- <Row> -->
                                        <!-- <Col span="8">
                                        <input type="hidden" name="aliPreview" :value="aliPreview" />
                                        <img :alt="$t('uc.account.imgtip')" id="aliImg" style="width: 200px;height: 300px;" :src="aliImg">
                                        <div class="acc_sc">
                                          <Upload ref="upload" :on-success="aliHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                            <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                          </Upload>
                                        </div>
                                        </Col> -->
                                        <!-- <Col span="16"> -->
                                            <!-- name -->
                                            <FormItem :label="$t('uc.account.name')" prop="name">
                                                <Input disabled size="large" v-model="formValidate2.name"></Input>
                                            </FormItem>
                                            <!-- alipay -->
                                            <FormItem :label="$t('uc.account.zfbaccount')" prop="alipay">
                                                <Input v-model="formValidate2.alipay" size="large"></Input>
                                            </FormItem>
                                            <!-- passwd -->
                                            <FormItem :label="$t('uc.account.fundpwd')" prop="password">
                                                <Input v-model="formValidate2.password" type="password" size="large"></Input>
                                            </FormItem>
                                            <!-- 支付宝上传 -->
                                            <FormItem :label="$t('uc.account.paypwd')">
                                                <div class="uploadimg">
                                                    <input type="hidden" name="aliPreview" :value="aliPreview" />
                                                    <div class="imgPhoto">
                                                        <img :alt="$t('uc.account.imgtip')" id="aliImg" class="img-style" :src="aliImg">
                                                    </div>
                                                    <div class="acc_sc">
                                                        <Upload class="uploadstyle" ref="upload" :show-upload-list="false"
                                                         :on-success="aliHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                            <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                        </Upload>
                                                    </div>
                                                </div>
                                            </FormItem>
                                            <!-- Button -->
                                            <FormItem class="btn-group">
                                            <Button class="btn1 savebtn" @click="handleSubmit('formValidate2')">{{$t('uc.account.save')}}</Button>
                                            <!-- <Button type="ghost" @click="handleReset('formValidate2')" style="margin-left: 8px">Reset</Button> -->
                                            </FormItem>
                                        <!-- </Col> -->
                                      <!-- </Row> -->
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div class="account-item">
                            <div class="account-item-in">
                                <i class="icons wechat"></i>
                                <span class="card-number">{{$t('uc.account.wxaccount')}}</span>
                                <p v-if="user.wechatVerified==1" class="bankInfo">
                                    {{user.wechatPay.wechat}}
                                </p>
                                <p v-else class="bankInfo">
                                  {{$t('uc.account.wxaccounttip')}}
                                </p>
                                <a class="btn" v-if="user.wechatVerified==1" @click="showItem(3)">{{$t('uc.account.modify')}}</a>
                                <a class="btn" v-else @click="showItem(3)">{{$t('uc.account.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==3">
                                <div class="detail-list list-email">
                                    <Form ref="formValidate3" :model="formValidate3" :rules="ruleValidate" :label-width="85">
                                      <!-- <Row>
                                        <Col span="8"> -->
                                        <!-- </Col>
                                        <Col span="16"> -->
                                        <!-- name -->
                                        <FormItem :label="$t('uc.account.name')" prop="name">
                                            <Input disabled size="large" v-model="formValidate3.name"></Input>
                                        </FormItem>
                                        <!-- wechat -->
                                        <FormItem :label="$t('uc.account.wxaccount')" prop="wechat">
                                            <Input v-model="formValidate3.wechat" size="large"></Input>
                                        </FormItem>
                                        <!-- passwd -->
                                        <FormItem :label="$t('uc.account.fundpwd')" prop="password">
                                            <Input v-model="formValidate3.password" type="password" size="large"></Input>
                                        </FormItem>
                                        <!-- 支付宝上传 -->
                                        <FormItem :label="$t('uc.account.paypwd')">
                                            <div class="uploadimg">
                                                <input type="hidden" name="wePreview" :value="wePreview" />
                                                <div class="imgPhoto">
                                                    <img :alt="$t('uc.account.imgtip')" id="weImg" class="img-style" :src="weImg">
                                                </div>
                                                <div class="acc_sc">
                                                    <Upload class="uploadstyle" ref="upload" :show-upload-list="false"
                                                     :on-success="weHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                    </Upload>
                                                </div>
                                            </div>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button class="btn1 savebtn" @click="handleSubmit('formValidate3')">{{$t('uc.account.save')}}</Button>
                                            <!-- <Button type="ghost" @click="handleReset('formValidate3')" style="margin-left: 8px">Reset</Button> -->
                                        </FormItem>
                                        <!-- </Col>
                                      </Row> -->
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import aliImg1 from "@/assets/images/zhifu.jpg";
import wechat1 from "@/assets/images/wechat.jpg";
export default {
    components: {
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.account.banknomsg1')));
            // } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
            } else if (!/([0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.account.banknomsg1')));
            } else {
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.account.banknomsg1')));
            // } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
            } else if (!/([0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.account.banknomsg1')));
            } else if (value !== this.formValidate1.bankNo) {
                callback(new Error(this.$t('uc.account.banknomsg2')));
            } else {
                callback();
            }
        };
        return {
            uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
            uploadUrl:this.host+'/uc/upload/oss/image',
            aliImg:aliImg1,
            aliPreview:'',
            weImg:wechat1,
            wePreview:'',
            isNoName: true,
            msg: '',
            choseItem: 0,
            user: {},
            formValidate1: {
                name: '',
                password: '',
                bankName: '',
                bankBranch: '',
                bankNo: '',
                bankNoConfirm: '',

            },
            formValidate2: {
                name: '',
                alipay: '',
                password: '',
            },
            formValidate3: {
                name: '',
                wechat: '',
                password: '',
            },
            bankNameList: [
                {
                    value: '中国工商银行',
                    label: '中国工商银行'
                },
                {
                    value: '中国农业银行',
                    label: '中国农业银行'
                },
                {
                    value: '中国建设银行',
                    label: '中国建设银行'
                },
                {
                    value: '中国邮政储蓄银行',
                    label: '中国邮政储蓄银行'
                },
                {
                    value: '招商银行',
                    label: '招商银行'
                },
                {
                    value: '中国银行',
                    label: '中国银行'
                },
                {
                    value: '交通银行',
                    label: '交通银行'
                },
                {
                    value: '中信银行',
                    label: '中信银行'
                },
                {
                    value: '华夏银行',
                    label: '华夏银行'
                },
                {
                    value: '中国民生银行',
                    label: '中国民生银行'
                },
                {
                    value: '广发银行',
                    label: '广发银行'
                },
                {
                    value: '平安银行',
                    label: '平安银行'
                },
                {
                    value: '兴业银行',
                    label: '兴业银行'
                },
                {
                    value: '上海浦东发展银行',
                    label: '上海浦东发展银行'
                },
                {
                    value: '浙商银行',
                    label: '浙商银行'
                },
                {
                    value: '渤海银行',
                    label: '渤海银行'
                },
                {
                    value: '恒丰银行',
                    label: '恒丰银行'
                },
                {
                    value: '花旗银行',
                    label: '花旗银行'
                },
                {
                    value: '渣打银行',
                    label: '渣打银行'
                },
                {
                    value: '汇丰银行',
                    label: '汇丰银行'
                },
                {
                    value: '中国光大银行',
                    label: '中国光大银行'
                },
                {
                    value: '上海银行',
                    label: '上海银行'
                },
                {
                    value: '江苏银行',
                    label: '江苏银行'
                },
                {
                    value: '重庆银行',
                    label: '重庆银行'
                },
                {
                    value: '天津银行',
                    label: '天津银行'
                },
                {
                    value: '厦门银行',
                    label: '厦门银行'
                },
                {
                    value: '城市商业银行',
                    label: '城市商业银行'
                },
                {
                    value: '农村商业银行',
                    label: '农村商业银行'
                },
                {
                    value: '徽商银行',
                    label: '徽商银行'
                },



            ],
            ruleValidate: {
                name: [
                    { required: true, message: this.$t('uc.account.verifiedmsg'), trigger: 'blur' }
                ],
                bankName: [
                    { required: true, message: this.$t('uc.account.bankaccountmsg'), trigger: 'change' }
                ],
                bankBranch: [
                    { required: true, message: this.$t('uc.account.bankbranchmsg'), trigger: 'blur' }
                ],
                bankNo: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.account.banknomsg1'), trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ],
                bankNoConfirm: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.account.banknomsg2'), trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: this.$t('uc.account.fundpwdmsg1'), trigger: 'blur' },
                    { min: 6, message: this.$t('uc.account.fundpwdmsg2'), trigger: 'blur' }
                ],
                alipay: [
                    { required: true, message: this.$t('uc.account.zfbaccountmsg'), trigger: 'blur' }
                ],
                wechat: [
                    { required: true, message: this.$t('uc.account.wxaccountmsg'), trigger: 'blur' }
                ],
            },

        }
    },
    methods: {
        aliHandleSuccess (res, file) {
          this.aliImg=this.aliPreview=res.data;
        },
        weHandleSuccess (res, file) {
          this.weImg=this.wePreview=res.data;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submit(name)
                } else {
                    this.$Message.error(this.$t('uc.account.save_failure'));
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        submit(name) {
            //银行卡
            if (name == 'formValidate1') {
                let param = {}
                param['bank'] = this.formValidate1.bankName
                param['branch'] = this.formValidate1.bankBranch
                param['jyPassword'] = this.formValidate1.password
                param['realName'] = this.formValidate1.name
                param['cardNo'] = this.formValidate1.bankNo
              if (this.user.bankVerified==1) { //修改
                this.$http.post(this.host + '/uc/approve/update/bank', param).then(response => {
                  var resp = response.body;
                  if (resp.code == 0) {
                    this.$Message.success(this.$t('uc.account.save_success'));
                    this.getAccount()
                    this.choseItem = 0
                    this.$refs[name].resetFields();
                  } else {
                    this.$Message.error(resp.message);
                  }
                })
              }else { //设置
                this.$http.post(this.host + '/uc/approve/bind/bank', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.account.save_success'));
                        this.getAccount()
                        this.choseItem = 0
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
              }
            }
            //支付宝
            if (name == 'formValidate2') {
                let param = {}
                param['ali'] = this.formValidate2.alipay
                param['jyPassword'] = this.formValidate2.password
                param['realName'] = this.formValidate2.name
                param['qrCodeUrl'] = this.aliPreview;

                if (this.user.aliVerified==1){
                  this.$http.post(this.host + '/uc/approve/update/ali', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                      this.$Message.success(this.$t('uc.account.save_success'));
                      this.getAccount()
                      this.choseItem = 0
                      this.$refs[name].resetFields();
                    } else {
                      this.$Message.error(resp.message);
                    }
                  })
                }else {
                  this.$http.post(this.host + '/uc/approve/bind/ali', param).then(response => {
                      var resp = response.body;
                      if (resp.code == 0) {
                          this.$Message.success(this.$t('uc.account.save_success'));
                          this.getAccount()
                          this.choseItem = 0
                          this.$refs[name].resetFields();
                      } else {
                          this.$Message.error(resp.message);
                      }
                  })
                }
            }
            //微信
            if (name == 'formValidate3') {
                let param = {}
                param['wechat'] = this.formValidate3.wechat
                param['jyPassword'] = this.formValidate3.password
                param['realName'] = this.formValidate3.name
                param['qrCodeUrl'] = this.wePreview;

              if(this.user.wechatVerified==1) {
                this.$http.post(this.host + '/uc/approve/update/wechat', param).then(response => {
                  var resp = response.body;
                  if (resp.code == 0) {
                    this.$Message.success(this.$t('uc.account.save_success'));
                    this.getAccount()
                    this.choseItem = 0
                    this.$refs[name].resetFields();
                  } else {
                    this.$Message.error(resp.message);
                  }
                })
              }else{
                this.$http.post(this.host + '/uc/approve/bind/wechat', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.account.save_success'));
                        this.getAccount()
                        this.choseItem = 0
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
              }
            }
        },
        showItem(index) {
            this.choseItem = index;
        },
        noName() {
            this.$Message.error(this.msg);
        },
        getAccount() {
            //获取个人账户信息
            this.$http.post(this.host + '/uc/approve/account/setting').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.user = resp.data;
                    this.formValidate1.name = this.formValidate2.name = this.formValidate3.name = this.user.realName
                    // this.usernameS = (this.user.username + '').slice(0, 1)
                    // this.dataCount = resp.data.length
                    this.isNoName = false
                    //设置
                    this.formValidate1.bankName = this.user.bankInfo == null ? '' : this.user.bankInfo.bank
                    this.formValidate1.bankBranch = this.user.bankInfo == null ? '' : this.user.bankInfo.branch
                    this.formValidate1.bankNo = this.user.bankInfo == null ? '' : this.user.bankInfo.cardNo
                    this.formValidate2.alipay = this.user.alipay == null ? '' : this.user.alipay.aliNo
                    this.formValidate3.wechat = this.user.wechatPay == null ? '' : this.user.wechatPay.wechat

                    this.aliImg = this.aliPreview = this.user.alipay == null ? aliImg1 : this.user.alipay.qrCodeUrl;
                    this.weImg = this.wePreview = this.user.wechatPay == null ? wechat1: this.user.wechatPay.qrWeCodeUrl;
                } else {
                    this.msg = resp.message;
                    this.$Message.error(resp.message)
                    this.$router.push("/uc/safe");
                }
            })
        }

    },
    created() {
        this.getAccount()
    },
    computed: {
    }
}
</script>

<style lang="less" scoped>
@import '../../styles/common.less';
	.account{
	  .wrapper{
        overflow: hidden;
		.container{
          padding: 30px;
          font-size: 14px;
          text-align: left;
          color: #666;
          .merchant-top{
            margin-bottom: 20px;
            font-size: 14px;
            height: 50px;
            display: flex;
            box-shadow: 0 4px 0 0 rgba(69,112,128,.06);
            -webkit-box-align: center;
            align-items: center;
            padding: 0 15px;
            color: #0d214e;
            .merchant-icon {
              display: inline-block;
              margin-left: 4px;
              background-size: 100% 100%;
              width: 4px;
              height: 22px;
              margin-right: 10px;
              background: @avatarColor;
            }
            .tips-word {
              -webkit-box-flex: 2;
              flex-grow: 2;
              text-align: left;
            }
            .tips-g {
              color: #8994a3;
              font-size: 12px;
            }
          }
          .accountContent{
            .account-in{
              .account-item{
                margin-bottom: 10px;
                .account-item-in{
                  display: flex;
                  -webkit-box-align: center;
                  align-items: center;
                  padding: 15px 30px 15px 50px;
                  background-color: white;
                  font-size: 14px;
                  color: #242a4a;
                  box-shadow: 0 4px 0 0 rgba(69,112,128,.06);
                  .icons {
                    height: 17px;
                    width: 17px;
                    display: inline-block;
                    margin-top: -1px;
                    background-size: 100% 100%;
                    &.bankfor {
                      background-image: url(../../assets/img/bankcard.png);
                    }
                    &.alipay {
                      background-image: url(../../assets/img/alipay.png);
                    }
                    &.wechat {
                      background-image: url(../../assets/img/wechat.png);
                    }
                  }
                  .card-number{
                    width: 142px;
                    height: 40px;
                    margin-right: 15px;
                    border-right: 1px dashed #d0d5de;
                    padding: 0 15px;
                    line-height: 40px;
                    text-align: left;
                    display: inline-block;
                  }
                  .bankInfo {
                    color: grey;
                    width: 70%;
                  }
                  .btn{
                    padding: 8px 10px;
                    color: @avatarColor;
                  }
                }
                .account-detail {
                  padding: 10px 0;
                  margin: 6px 0;
                  .detail-list{
                    width: 80%;
                    margin: 20px auto 0;
                    &.list-email{
                      width: 50%;                      
                    }
                    .btn-group{
                      text-align: center;
                      .btn1{
                        width: 60px;
                        height: 30px;
                        &.savebtn{
                        //   margin-left: -85px;
                          width: 100%; 
                          background: @avatarColor;
                          color: #fff;
                        }
                      }
                    }
                    .uploadimg{
                      height:300px;
                      .imgPhoto{
                        width: 100%;
                        height: 250px;
                        text-align: center;
                        border: 1px solid #ccc;
                        box-sizing: border-box;
                        border-radius: 5px;
                        overflow: hidden;
                        .img-style{
                          width:100%;
                          height:100%;
                        //   margin: 10px 0;
                          border-radius: 10px;
                        }
                      }
                      .acc_sc{
                        .uploadstyle{
                          text-align: center; 
                          margin: 10px 0 0 0;
                          .ivu-btn-ghost{
                            height: 30px;
                            border: 1px solid @buttonColor1;
                            &:hover{
                              color: @baseColor;
                            }
                          }
                        }
                      }
                    }
                  }
                }          
              }
            }
          }
        }
      }
    }
</style>
