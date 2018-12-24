<template>
    <div class="safecontain">
        <div class="wrapper">
            <div class="container">
                <div class="user-top-icon">
                    <div class="user-icons">
                        <div class="user-avatar-public">
                            <span class="user-avatar-in">{{usernameS}}</span>
                        </div>
                        <span class="user-name">
                            {{user.username}}
                        </span>
                        <i class="identify" v-if="certifiedBusinessStatus==2"></i>
                    </div>
                    <Row class="user-right">
                        <Col span="8">
                            <i class="m3"></i>
                            <div class="itp" v-if="user.realVerified==0&&user.phoneVerified==0&&user.fundsVerified==0">{{$t('uc.safe.safelevel_low')}}</div>
                            <div class="itp" v-else-if="user.realVerified==1&&user.phoneVerified==1&&user.fundsVerified==1">{{$t('uc.safe.safelevel_high')}}</div>
                            <div class="itp" v-else>{{$t('uc.safe.safelevel_medium')}}</div>
                        </Col>
                    </Row>
                </div>
                <section class="accountContent">
                    <div class="account-in">
                        <!-- 1 -->
                        <div class="account-item" style="display:none">
                            <div class="account-item-in">
                                <Icon type="person" class="iconstyle"></Icon>
                                <span class="card-number">{{$t('uc.safe.nickname')}}</span>
                                <p class="bankInfo">
                                    bearbaby
                                </p>
                                <span>{{$t('uc.safe.binded')}}</span>
                            </div>
                        </div>
                        <!-- 6 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="person" class="iconstyle"></Icon>
                                <span class="card-number">{{$t('uc.safe.verified')}}</span>
                                <p v-if="user.realVerified==1" class="bankInfo">{{user.realName}}</p>
                                <p v-else class="bankInfo">
                                  {{$t('uc.safe.verifiedtip')}}
                                </p>
                                <span v-if="user.realVerified==1">{{$t('uc.safe.binded')}}</span>
                                <span v-else-if="user.realAuditing==1">{{$t('uc.safe.binding')}}</span>
                                <a class="btn" @click="showItem(6)" 
                                v-else-if="user.realVerified==0&&user.realAuditing==0&&user.realNameRejectReason!=null">{{$t('uc.safe.binderr')}}</a>
                                <a v-else class="btn" @click="showItem(6)">{{$t('uc.safe.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==6">
                                <div class="detail-list">
                                    <Form ref="formValidate6" :model="formValidate6" :rules="ruleValidate" :label-width="85">
                                        <!-- 实名认证失败原因 -->
                                        <FormItem class="form-item failreason" :label="$t('uc.safe.failreason')" prop="failreason"
                                         v-show="!!user.realNameRejectReason">
                                            {{user.realNameRejectReason}}
                                        </FormItem>
                                        <!-- 真实姓名 -->
                                        <FormItem class="form-item" :label="$t('uc.safe.realname')" prop="realName">
                                            <Input v-model="formValidate6.realName" size="large"></Input>
                                        </FormItem>
                                        <!-- 身份证号 -->
                                        <FormItem class="form-item" :label="$t('uc.safe.idcard')" prop="idCard">
                                            <Input v-model="formValidate6.idCard" size="large"></Input>
                                        </FormItem>
                                        <div class="uploadimg">
                                            <p></p>
                                            <Col span="8" class="colstyle">
                                                <input type="hidden" name="imgPreview" :value="imgPreview" />
                                                <div class='imgTitle'>{{$t('uc.safe.upload_positive')}}</div>
                                                <img id="frontCardImg" class="img-style" :src="frontCardImg">
                                                <div class="acc_sc">
                                                    <Upload ref="upload" :on-success="frontHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                    </Upload>
                                                </div>
                                            </Col>
                                            <Col span="8" class="colstyle">
                                                <input type="hidden" name="imgNext" :value="imgNext" />
                                                <div class='imgTitle'>{{$t('uc.safe.upload_negative')}}</div>
                                                <img id="backCardImg" class="img-style" :src="backCardImg">
                                                <div class="acc_sc">
                                                    <Upload ref="upload" :on-success="backHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                    </Upload>
                                                </div>
                                            </Col>
                                            <Col span="8" class="colstyle">
                                                <input type="hidden" name="imgLast" :value="imgLast" />
                                                <div class='imgTitle' >{{$t('uc.safe.upload_hand')}}</div>
                                                <img id="handCardImg" class="img-style" :src="handCardImg">
                                                <div class="acc_sc">
                                                    <Upload ref="upload" :on-success="handHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                    </Upload>
                                                </div>
                                            </Col>
                                        </div>
                                        <div class='hasText'>
                                            <p>{{$t('uc.safe.imgtips1')}}</p>
                                            <p>
                                                {{$t('uc.safe.imgtips2')}}
                                            </p>
                                        </div>
                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button @click="handleSubmit('formValidate6')" class="savebtn btn1" :disabled="useable">{{$t('uc.safe.save')}}</Button>
                                            <Button @click="handleReset('formValidate6')" class="resetbtn btn1">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 2 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="email" class="iconstyle"></Icon>
                                <span class="card-number">{{$t('uc.safe.email')}}</span>
                                <p v-if="user.emailVerified==1" class="bankInfo">
                                    {{user.email}}
                                </p>
                                <p v-else class="bankInfo">
                                  {{$t('uc.safe.bindemail')}}
                                </p>
                                <span v-if="user.emailVerified==1">{{$t('uc.safe.binded')}}</span>
                                <a v-else class="btn" @click="showItem(2)">{{$t('uc.safe.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==2">
                                <div class="detail-list list-email">
                                    <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="110">
                                        <!-- mail -->
                                        <FormItem :label="$t('uc.safe.email')" prop="mail">
                                            <Input v-model="formValidate2.mail" size="large"></Input>
                                        </FormItem>
                                        <!-- 登录密码 -->
                                        <FormItem :label="$t('uc.safe.loginpwd')" prop="password">
                                            <Input v-model="formValidate2.password" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->
                                        <FormItem :label="$t('uc.safe.emailcode')" prop="vailCode1">
                                            <Input v-model="formValidate2.vailCode1" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(1)" :disabled="sendMsgDisabled1">
                                                    <span v-if="sendMsgDisabled1">{{time1+$t('uc.safe.second')}}</span>
                                                    <span v-if="!sendMsgDisabled1">{{$t('uc.safe.clickget')}}</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button class="savebtn btn1" @click="handleSubmit('formValidate2')">{{$t('uc.safe.save')}}</Button>
                                            <Button @click="handleReset('formValidate2')" class="resetbtn btn1">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 3 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="ios-telephone" class="iconstyle"></Icon>
                                <span class="card-number">{{$t('uc.safe.phone')}}</span>
                                <p v-if="user.phoneVerified==1" class="bankInfo">
                                    {{user.mobilePhone}}
                                </p>
                                <p v-else class="bankInfo">
                                  {{$t('uc.safe.bindphone')}}
                                </p>
                                <span v-if="user.phoneVerified==1">{{$t('uc.safe.binded')}}</span>
                                <a v-else class="btn" @click="showItem(3)">{{$t('uc.safe.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==3">
                                <div class="detail-list list-email">
                                    <Form ref="formValidate3" :model="formValidate3" :rules="ruleValidate" :label-width="110">
                                        <!-- 手机 -->
                                        <FormItem :label="$t('uc.safe.phone')" prop="mobile">
                                            <Input v-model="formValidate3.mobile" size="large"></Input>
                                        </FormItem>
                                        <!-- 登录密码 -->
                                        <FormItem :label="$t('uc.safe.loginpwd')" prop="password">
                                            <Input v-model="formValidate3.password" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode2">
                                            <Input v-model="formValidate3.vailCode2" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(2)" :disabled="sendMsgDisabled2">
                                                    <span v-if="sendMsgDisabled2">{{time2+$t('uc.safe.second')}}</span>
                                                    <span v-if="!sendMsgDisabled2">{{$t('uc.safe.clickget')}}</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button @click="handleSubmit('formValidate3')" class="savebtn btn1" >{{$t('uc.safe.save')}}</Button>
                                            <Button @click="handleReset('formValidate3')" class="resetbtn btn1">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 4 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="locked" class="iconstyle"></Icon>
                                <span class="card-number">{{$t('uc.safe.loginpwd')}}</span>
                                <p class="bankInfo">
                                  {{$t('uc.safe.logintip')}}
                                </p>
                                <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">{{$t('uc.safe.edit')}}</a>
                                <a class="btn" v-else @click="showItem(4)">{{$t('uc.safe.edit')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==4">
                                <div class="detail-list list-email">
                                    <Form ref="formValidate4" :model="formValidate4" :rules="ruleValidate" :label-width="85">
                                        <!-- oldPw -->
                                        <FormItem :label="$t('uc.safe.oldpwd')" prop="oldPw">
                                            <Input v-model="formValidate4.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPw -->
                                        <FormItem :label="$t('uc.safe.newpwd')" prop="newPw">
                                            <Input v-model="formValidate4.newPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPwConfirm -->
                                        <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newPwConfirm">
                                            <Input v-model="formValidate4.newPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode3">
                                            <Input v-model="formValidate4.vailCode3" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(3)" :disabled="sendMsgDisabled3">
                                                    <span v-if="sendMsgDisabled3">{{time3+$t('uc.safe.second')}}</span>
                                                    <span v-if="!sendMsgDisabled3">{{$t('uc.safe.clickget')}}</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button @click="handleSubmit('formValidate4')" class="savebtn btn1" >{{$t('uc.safe.save')}}</Button>
                                            <Button @click="handleReset('formValidate4')" class="resetbtn btn1">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 5 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="lock-combination" class="iconstyle"></Icon>
                                <span class="card-number">{{$t('uc.safe.fundpwd')}}</span>
                                <p class="bankInfo">
                                  {{$t('uc.safe.fundtip')}}
                                </p>
                                <!-- <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">{{$t('uc.safe.set')}}</a> -->
                                <a class="btn" v-if="user.fundsVerified==0" @click="showItem(5)">{{$t('uc.safe.set')}}</a>
                                <a class="btn" v-else @click="showItemFundpwd()">{{$t('uc.safe.edit')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==5">
                                <!-- 设置 -->
                                <div class="detail-list list-email" v-show="user.fundsVerified!=1">
                                    <Form ref="formValidate7" :model="formValidate7" :rules="ruleValidate" :label-width="85">
                                        <!-- newMPw -->
                                        <FormItem :label="$t('uc.safe.fundpwd')" prop="pw7">
                                            <Input v-model="formValidate7.pw7" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem :label="$t('uc.safe.confirmpwd')" prop="pw7Confirm">
                                            <Input v-model="formValidate7.pw7Confirm" size="large" type="password"></Input>
                                        </FormItem>

                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button class="savebtn btn1" @click="handleSubmit('formValidate7')">{{$t('uc.safe.save')}}</Button>
                                            <Button @click="handleReset('formValidate7')" class="resetbtn btn1">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                                <!-- 修改 -->
                                <div class="detail-list list-email" v-show="user.fundsVerified==1  && !fGetBackFundpwd">
                                    <Form ref="formValidate5" :model="formValidate5" :rules="ruleValidate" :label-width="85">
                                        <!-- oldPw -->
                                        <FormItem :label="$t('uc.safe.oldfundpwd')" prop="oldPw">
                                            <Input v-model="formValidate5.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPw -->
                                        <FormItem :label="$t('uc.safe.newfundpwd')" prop="newMPw">
                                            <Input v-model="formValidate5.newMPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newMPwConfirm">
                                            <Input v-model="formValidate5.newMPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->
                                        <!--<FormItem :label="$t('uc.safe.phonecode')" prop="vailCode5">-->
                                            <!--<Input v-model="formValidate5.vailCode5" size="large">-->
                                            <!--<div class="timebox" slot="append">-->
                                                <!--<Button @click="send(5)" :disabled="sendMsgDisabled5">-->
                                                    <!--<span v-if="sendMsgDisabled5">{{time5+$t('uc.safe.second')}}</span>-->
                                                    <!--<span v-if="!sendMsgDisabled5">{{$t('uc.safe.clickget')}}</span>-->
                                                <!--</Button>-->
                                            <!--</div>-->
                                            <!--</Input>-->
                                        <!--</FormItem>-->
                                        <p class="forgetpw"><a @click="handleReset('formValidate8');fGetBackFundpwd=!fGetBackFundpwd">忘记密码?</a></p>
                                        <!-- Button -->
                                        <FormItem class="btn-group">
                                            <Button class="savebtn btn1" @click="handleSubmit('formValidate5')">{{$t('uc.safe.save')}}</Button>
                                            <Button @click="handleReset('formValidate5')" class="resetbtn btn1">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                                <!-- 找回 -->
                                <div class="detail-list list-email" v-show="user.fundsVerified==1 && fGetBackFundpwd">
                                  <Form ref="formValidate8" :model="formValidate8" :rules="ruleValidate" :label-width="85">
                                    <!-- newMPw -->
                                    <FormItem :label="$t('uc.safe.newfundpwd')" prop="newMPw8">
                                      <Input v-model="formValidate8.newMPw8" size="large" type="password"></Input>
                                    </FormItem>
                                    <!-- newMPwConfirm -->
                                    <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newMPwConfirm8">
                                      <Input v-model="formValidate8.newMPwConfirm8" size="large" type="password"></Input>
                                    </FormItem>
                                    <!-- 邮箱验证码 -->
                                    <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode5">
                                      <Input v-model="formValidate8.vailCode5" size="large">
                                      <div class="timebox" slot="append">
                                        <Button @click="send(5)" :disabled="sendMsgDisabled5">
                                          <span v-if="sendMsgDisabled5">{{time5+$t('uc.safe.second')}}</span>
                                          <span v-if="!sendMsgDisabled5">{{$t('uc.safe.clickget')}}</span>
                                        </Button>
                                      </div>
                                      </Input>
                                    </FormItem>
                                    <!-- Button -->
                                    <FormItem class="btn-group">
                                      <Button class="savebtn btn1" @click="handleSubmit('formValidate8')">{{$t('uc.safe.save')}}</Button>
                                      <Button @click="handleReset('formValidate8')" class="resetbtn btn1">{{$t('uc.safe.reset')}}</Button>
                                    </FormItem>
                                  </Form>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.safe.newpwdmsg1')));
            } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.safe.newpwdmsg1')));
            } else {
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.safe.newpwdmsg2')));
            } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.safe.newpwdmsg2')));
            } else if (value !== this.formValidate4.newPw) {
                callback(new Error(this.$t('uc.safe.newpwdmsg2')));
            } else {
                callback();
            }
        };
        const validateMPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.safe.pwdmsg1')));
            } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.safe.pwdmsg1')));
            } else {
                callback();
            }
        };
        const validateMPassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.safe.pwdmsg2')));
            } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.safe.pwdmsg2')));
            } else if (value !== this.formValidate5.newMPw) {
                callback(new Error(this.$t('uc.safe.pwdmsg2')));
            } else {
                callback();
            }
        };
        const validatepw7 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.safe.pwdmsg1')));
            } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.safe.pwdmsg1')));
            } else {
                callback();
            }
        };
        const validatepw7check = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('uc.safe.pwdmsg1')));
            } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
                callback(new Error(this.$t('uc.safe.pwdmsg2')));
            } else if (value !== this.formValidate7.pw7) {
                callback(new Error(this.$t('uc.safe.pwdmsg2')));
            } else {
                callback();
            }
        };
        const validateMPass8 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('uc.safe.pwdmsg1')));
          } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
            callback(new Error(this.$t('uc.safe.pwdmsg1')));
          } else {
            callback();
          }
        };
        const validateMPassCheck8 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('uc.safe.pwdmsg2')));
          } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
            callback(new Error(this.$t('uc.safe.pwdmsg2')));
          } else if (value !== this.formValidate8.newMPw8) {
            callback(new Error(this.$t('uc.safe.pwdmsg2')));
          } else {
            callback();
          }
        };
        return {
            fGetBackFundpwd:false,
            imgPreview:'',
            imgNext:'',
            imgLast:'',
            useable: false,
            loginmsg:this.$t('common.logintip'),

            frontCardImg:process.env.NODE_ENV === 'production'?'/assets/images/frontCardImg.png':'/src/assets/images/frontCardImg.png',
            backCardImg:process.env.NODE_ENV === 'production'?'/assets/images/backCardImg.png':'/src/assets/images/backCardImg.png',
            handCardImg:process.env.NODE_ENV === 'production'?'/assets/images/HandCardImg.png':'/src/assets/images/HandCardImg.png',

            uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
            uploadUrl:this.host+'/uc/upload/oss/image',

            usernameS: '',
            user: {
            },
            choseItem: 0,
            accountValue: '1',
            formValidate2: {
                mail: '',
                vailCode1: '',
                password: '',

            },
            formValidate3: {
                mobile: '',
                vailCode2: '',
                password: '',
            },
            formValidate4: {
                oldPw: '',
                newPw: '',
                newPwConfirm: '',
                vailCode3: '',
            },
            formValidate5: {
                oldPw: '',
                newMPw: '',
                newMPwConfirm: '',
                // vailCode5: '',
            },
            formValidate6: {
                realName: '',
                idCard: '',
            },
            formValidate7: {
                pw7: '',
                pw7Confirm: '',
            },
            formValidate8: {
              newMPw8: '',
              newMPwConfirm8: '',
              vailCode5: '',
            },
            ruleValidate: {
                mail: [
                    { required: true, type: 'email', message: this.$t('uc.safe.emailtip'), trigger: 'blur' },
                ],
                vailCode1: [
                    { required: true, message: this.$t('uc.safe.codetip'), trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: this.$t('uc.safe.telnotip'), trigger: 'blur' }
                ],
                vailCode2: [
                    { required: true, message: this.$t('uc.safe.codetip'), trigger: 'blur' }
                ],
                vailCode3: [
                    { required: true, message: this.$t('uc.safe.codetip'), trigger: 'blur' }
                ],
                password: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.pwdmsg1'), trigger: 'blur' },
                ],
                oldPw: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.oldpwdtip'), trigger: 'blur' }
                ],
                newPw: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.newpwdmsg1'), trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ],
                newPwConfirm: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.newpwdmsg2'), trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' },

                ],
                newMPw: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.pwdmsg1'), trigger: 'blur' },
                    { validator: validateMPass, trigger: 'blur' },
                ],
                newMPwConfirm: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.pwdmsg2'), trigger: 'blur' },
                    { validator: validateMPassCheck, trigger: 'blur' },

                ],
                pw7: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.pwdmsg1'), trigger: 'blur' },
                    { validator: validatepw7, trigger: 'blur' },
                ],
                pw7Confirm: [
                    { required: true, type: 'string', min: 6, message: this.$t('uc.safe.pwdmsg2'), trigger: 'blur' },
                    { validator: validatepw7check, trigger: 'blur' },

                ],
                vailCode5: [
                    { required: true, message: this.$t('uc.safe.codetip'), trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: this.$t('uc.safe.realnametip'), trigger: 'blur' }
                ],
                idCard: [
                    { required: true, message: this.$t('uc.safe.idcardtip'), trigger: 'blur' }
                ],
                newMPw8: [
                  { required: true, type: 'string', min: 6, message: this.$t('uc.safe.pwdmsg1'), trigger: 'blur' },
                  { validator: validateMPass8, trigger: 'blur' },
                ],
                newMPwConfirm8: [
                  { required: true, type: 'string', min: 6, message: this.$t('uc.safe.pwdmsg2'), trigger: 'blur' },
                  { validator: validateMPassCheck8, trigger: 'blur' },

                ],
            },
            time1: 60, // 发送验证码倒计时
            time2: 60, // 发送验证码倒计时
            time3: 60, // 发送验证码倒计时
            time5: 60, // 发送验证码倒计时
            sendMsgDisabled1: false,
            sendMsgDisabled2: false,
            sendMsgDisabled3: false,
            sendMsgDisabled5: false,
            certifiedBusinessStatus:'',
        }
    },
    methods: {
        frontHandleSuccess (res, file) {
            this.frontCardImg=this.imgPreview=res.data;
        },
        backHandleSuccess (res, file) {
            this.backCardImg=this.imgNext=res.data;
        },
        handHandleSuccess (res, file) {
            this.handCardImg=this.imgLast=res.data;
        },
        noPhone() {
            this.$Message.info(this.$t('uc.safe.bindphonetip'));
            this.showItem(3);
        },
        showItemFundpwd() {
            this.fGetBackFundpwd = false;
            this.handleReset('formValidate5');
            this.showItem(5);
        },
        renderPw() {
            this.$Modal.confirm({
                title: this.$t('uc.safe.resetfundpwd'),
                onOk: () => {
                    this.$Message.info('Clicked ok');
                },
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                        },
                        on: {
                            input: (val) => {
                                this.value = val;
                            }
                        }
                    })
                }
            })
        },
        submit(name) {
            //实名认证
            if (name == 'formValidate6') {
                if(this.imgPreview == "") {
                    this.$Message.error(this.$t('uc.safe.upload_positivetip'));
                    return false;
                }
                if(this.imgNext == "") {
                    this.$Message.error(this.$t('uc.safe.upload_negativetip'));
                    return false;
                }
                if(this.imgLast == "") {
                    this.$Message.error(this.$t('uc.safe.upload_handtip'));
                    return false;
                }
                this.useable = true;
                let param = {}
                param['realName'] = this.formValidate6.realName
                param['idCard'] = this.formValidate6.idCard
                param['idCardFront']=this.imgPreview
                param['idCardBack']=this.imgNext
                param['handHeldIdCard']=this.imgLast
                this.$http.post(this.host + '/uc/approve/real/name', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.safe.save_success'));
                        this.getMember()
                        this.choseItem = 0
                         this.useable = false;
                    } else {
                        
                        this.$Message.error(resp.message);
                        this.useable = false
                    }
                })
            }
            //邮箱认证
            if (name == 'formValidate2') {
                let param = {}
                param['email'] = this.formValidate2.mail
                param['code'] = this.formValidate2.vailCode1
                param['password'] = this.formValidate2.password
                this.$http.post(this.host + '/uc/approve/bind/email', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.safe.save_success'));
                        this.getMember()
                        this.choseItem = 0
                    }else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //手机认证
            if (name == 'formValidate3') {
                let param = {}
                param['phone'] = this.formValidate3.mobile
                param['code'] = this.formValidate3.vailCode2
                param['password'] = this.formValidate3.password
                this.$http.post(this.host + '/uc/approve/bind/phone', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.safe.save_success'));
                        this.getMember()
                        this.choseItem = 0
                    }else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //登录密码
            if (name == 'formValidate4') {
                let param = {}
                param['oldPassword'] = this.formValidate4.oldPw
                param['newPassword'] = this.formValidate4.newPw
                param['code'] = this.formValidate4.vailCode3
                this.$http.post(this.host + '/uc/approve/update/password', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.safe.save_success'));
                        this.getMember()
                        this.choseItem = 0
                        localStorage.removeItem('MEMBER');
                        localStorage.removeItem('TOKEN');
                        this.$store.state.showLogout = true;
                        this.$store.state.showLogin = false;
                        let self = this
                        setTimeout(() => {
                            self.$router.push('/login');
                        }, 2000)
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //修改资金密码
            if (name == 'formValidate5') {
                let param = {}
                  param['oldPassword'] = this.formValidate5.oldPw
                  param['newPassword'] = this.formValidate5.newMPw
                  // param['code'] = this.formValidate5.vailCode5
                  this.$http.post(this.host + '/uc/approve/update/transaction/password', param).then(response => {
                      var resp = response.body;
                      if (resp.code == 0) {
                          this.$Message.success(this.$t('uc.safe.save_success'));
                          this.handleReset('formValidate5');
                          this.getMember();
                          this.choseItem = 0
                      }else {
                          this.$Message.error(resp.message);
                      }
                  })
            }
            //设置资金密码
            if (name == 'formValidate7') {
                let param = {}
                param['jyPassword'] = this.formValidate7.pw7
                this.$http.post(this.host + '/uc/approve/transaction/password', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.safe.save_success'));
                        this.getMember()
                        this.choseItem = 0
                    }else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //找回资金密码
            if (name == 'formValidate8') {
              let param = {}
              param['newPassword'] = this.formValidate8.newMPw8
              param['code'] = this.formValidate8.vailCode5
              this.$http.post(this.host + '/uc/approve/reset/transaction/password', param).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(this.$t('uc.safe.save_success'));
                  this.fGetBackFundpwd=false;
                  this.handleReset('formValidate5');
                  this.getMember();
                  this.choseItem = 0
                }else {
                  this.$Message.error(resp.message);
                }
              });
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.useable = true;
                    this.submit(name)
                } else {
                    this.$Message.error(this.$t('uc.safe.save_failure'));
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        showItem(index) {
            this.choseItem = index;
        },
        send(index) {
            let me = this;
            if (index == 1) {
                if (this.formValidate2.mail) {
                    //获取邮箱code
                    this.$http.post(this.host + '/uc/bind/email/code', { 'email': this.formValidate2.mail }).then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            me.sendMsgDisabled1 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time1--) <= 0) {
                                    me.time1 = 60;
                                    me.sendMsgDisabled1 = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        } else {
                            this.$Message.error(resp.message);
                        }
                    })
                } else {
                    this.$refs.formValidate2.validateField('mail');
                }
            } else if (index == 2) {
                if (this.formValidate3.mobile) {
                    //获取手机code
                    this.$http.post(this.host + '/uc/mobile/bind/code', { 'phone': this.formValidate3.mobile }).then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            me.sendMsgDisabled2 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time2--) <= 0) {
                                    me.time2 = 60;
                                    me.sendMsgDisabled2 = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        } else {
                            this.$Message.error(resp.message);
                        }
                    })

                } else {
                    this.$refs.formValidate3.validateField('mobile');
                }

            } else if (index == 3) {
                //登录密码获取手机code
                this.$http.post(this.host + '/uc/mobile/update/password/code', ).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        me.sendMsgDisabled3 = true;
                        let interval = window.setInterval(function() {
                            if ((me.time3--) <= 0) {
                                me.time3 = 60;
                                me.sendMsgDisabled3 = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            } else if (index == 5) {
                //资金密码获取手机code
                this.$http.post(this.host + '/uc/mobile/transaction/code', ).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        me.sendMsgDisabled5 = true;
                        let interval = window.setInterval(function() {
                            if ((me.time5--) <= 0) {
                                me.time5 = 60;
                                me.sendMsgDisabled5 = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    }else {
                        this.$Message.error(resp.message);
                    }
                })

            }
        },
        getMember() {
            //获取个人安全信息
            var self = this;
            this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    self.user = resp.data;
                    self.member.realName = self.user.realName
                    self.member.realVerified = self.user.realVerified;
                    self.$store.commit('setMember', self.member);
                    self.usernameS = (self.user.username + '').slice(0, 1)
                } else {
                    self.$Message.error(this.loginmsg);
                }
            })
        },
        getSetting() {
            this.$http.get(this.host + this.api.uc.identification)
            .then(res =>{
                this.certifiedBusinessStatus = res.body.data.certifiedBusinessStatus;
            })
            .catch(function (error) {
            });
        },
    },
    computed: {
        'member': function() {
            return this.$store.getters.member;
        },
    },
    created() {
        this.getMember()
        this.getSetting()
    }
}
</script>
<style scoped lang="less">
@import '../../styles/common.less';
    .hasText{
        margin:20px 0;
        p{
            font-size:14px;
            line-height:2;
            color:#888;
            text-align:center;
        }
    }
    .imgTitle{
        height:42px;
    }
	.safecontain{
	  .wrapper{
        overflow: hidden;
		.container{
          padding: 30px;
          font-size: 14px;
          text-align: left;
          .user-top-icon {
            height: 100px;
            border-bottom: 1px dashed #ebeff5;
            padding: 0 50px;
            .user-icons{
              float: left;
              height: 60px;
              line-height: 60px;
              width: 30%;
              vertical-align: middle;
              .user-avatar-public{
                vertical-align: middle;
                .user-avatar-in{
                }
                .user-face{
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                }
              }
              .user-name {
                color: #0d214e;
                margin-left: 5px;
                display: inline-block;
              }
              .identify {
                height: 50px;
                margin-bottom: 2px;
                vertical-align: middle;
                &:before {
                  background-size: 100% 100%;
                  width: 50px;
                  height: 20px;
                  display: inline-block;
                  content: '';
                  background-image: url(../../assets/images/business_v.png);
                }
              }
            }
            .user-right{
              width: 70%;
              float: right;
              height: 60px;
              line-height: 60px;
              .m3 {
                display: inline-block;
                width: 25px;
                height: 25px;
                background: url(../../assets/img/m3.png);
                background-size: 100% 100%;
                vertical-align: middle;
                margin-right: 5px;
              }
              .itp {
                display: inline-block;
              }
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
                    &.iconstyle{
                      font-size: 18px;
                      color: #ccc;
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
                    .form-item{
                      width: 98%;
                      margin: 0 0 24px 0;
                      &.failreason {
                        text-align: left;
                        color: #eb6f6c;
                      }
                    }
                    .uploadimg{
                      height:300px;
                      .colstyle{
                        text-align: center;
                        .img-style{
                          width: 230px;
                          height: 162px;
                          margin: 10px 0;
                          border-radius: 10px;
                        }
                        .acc_sc{
                          .ivu-btn-ghost{
                            border: 1px solid @buttonColor1;
                            &:hover{
                              color: @baseColor;
                            }
                          }
                        }
                      }
                    }
                    .forgetpw{
                      text-align:right;
                      a{
                        color: @avatarColor;
                      }
                    }
                    .btn-group{
                      text-align: center;
                      .btn1{
                        width: 60px;
                        height: 30px;
                        &.savebtn{
                        //   margin-left: -85px;
                          background: @avatarColor;
                          color: #fff;
                        }
                        &.resetbtn{
                          &:hover{
                            color: @avatarColor;
                          }
                          margin-left: 20px;
                          background: @buttonColor1;
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
